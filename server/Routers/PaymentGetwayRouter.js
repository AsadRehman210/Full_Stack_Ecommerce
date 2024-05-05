const express = require("express");
const stripe = require('stripe')('sk_test_51Oy7lKFqutyKD0knFO7zk600Y97WJdLrHr3hQvOPXnMZNu4bw22ZImOpeLuztRnoV6x7Z2pIInb1TzOeiyFcut5o00lBMruQ6T');
const { CreatePaymentController } = require("../Controllers/PaymentGetwayController");
const Order = require("../Models/OrderModel");
const router = express.Router();
const cache = require('memory-cache');


// Payments
router.route('/API/create-checkout-session').post(CreatePaymentController);

// WebHook

const createOrder = async (customer, data) => {

    // Generate an order ID (assuming you want to use a UUID)
    const orderID = generateOrderID();

    // Retrieve products data from cache
    const storedProducts = cache.get('products');

    console.log(storedProducts);

    const newOrder = new Order({
        orderId: orderID,
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: storedProducts,
        subTotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status
    })

    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder)

        // Clear the cache after the order is saved
        cache.del('products');
        console.log("Cache cleared");
    } catch (error) {
        console.log(error)

    }
}

// Function to generate an order ID (using UUID)

function generateOrderID() {
    // Generate a random number (4 to 7 digits)
    const randomNumLength = Math.floor(Math.random() * 4) + 4;
    const randomNum = Math.floor(10 ** randomNumLength * Math.random());

    // Pad the random number with leading zeros to ensure it has the desired length
    const paddedRandomNum = String(randomNum).padStart(randomNumLength, '0');

    return paddedRandomNum;
}


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret = "whsec_69c2b7c793eea513e9b36231d96ef7b24ea230bd59c566032c7ebf17abe97230";

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let data;
    let eventType;

    if (endpointSecret) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("WebHook Verified")
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type

    } else {
        data = req.body.data.object;
        eventType = req.body.type
    }


    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then((customer) => {
            createOrder(customer, data)


        }).catch(error => console.log("error1: ", error.message))

    }


    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
});


module.exports = router