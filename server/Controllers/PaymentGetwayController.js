// paymentController.js
const cache = require('memory-cache');
const stripe = require('stripe')('sk_test_51Oy7lKFqutyKD0knFO7zk600Y97WJdLrHr3hQvOPXnMZNu4bw22ZImOpeLuztRnoV6x7Z2pIInb1TzOeiyFcut5o00lBMruQ6T');

const CreatePaymentController = async (req, res) => {
    const API = process.env.FRONTEND_URL;

    try {
        const { products, user } = req.body;

        // Store products data in cache
        cache.put('products', products);


        let customer = await stripe.customers.create({
            metadata: {
                userId: user,
                // cart: JSON.stringify(products.map((item) => {
                //     return (
                //         {
                //             id: item.id,
                //             name: item.name,
                //             quantity: item.quantity,
                //             image: item.image,
                //             brand: item.brand,
                //             color: item.color,
                //             price: item.price,
                //             category: item.category
                //         }

                //     )

                // }))

            }
        })

        let quantity = products.reduce((acc, product) => {
            return acc + product.quantity;
        }, 0);

        const lineItems = products.map((product) => {
            return {
                price_data: {
                    currency: "PKR",
                    product_data: {
                        name: product.name,
                        metadata: {
                            id: product.id,
                        },
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            }
        })




        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'PK'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 50000 * quantity,
                            currency: 'PKR',
                        },
                        display_name: 'Shipping Duration',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
            ],

            // customer_email: user.email,
            // phone_number_collection: user.phone,
            phone_number_collection: {
                enabled: true
            },
            customer: customer.id,
            line_items: lineItems,

            mode: "payment",

            success_url: `${API}/PaymentSuccess`,
            cancel_url: `${API}/PaymentCancel`
        });


        res.status(200).json({ id: session.id });


    } catch (error) {
        console.log("stripe error", error.message);
        res.status(500).json({ error: "An error occurred during payment processing." });
    }
};






module.exports = { CreatePaymentController };
