const Subscriber = require("../Models/SubsModel");
const { subscribe } = require("../Routers/authRouter");

const postSubscriber = async (req, res) => {
    try {
        const { email } = req.body;
        const existingSubscriber = await Subscriber.findOne({ email: email })
        if (existingSubscriber) {
            return res.status(400).json({ message: "Already Subscribed" })
        }
        const newSubscriber = await Subscriber.create({ email })
        return res.status(201).json({ message: "Subscribed Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Email is Wrong" })

    }

}
const getSubscriber = async (req, res) => {
    try {
        const userSubs = await Subscriber.find();
        if (!userSubs || userSubs.length === 0) {
            return res.status(404).json({ message: "Subscriber list didn't find" })
        }
        return res.status(200).json({ message: userSubs })
    } catch (error) {
        return res.status(400).json({ message: "Subscriber list didn't find" })

    }
}
const deleteSubscriber = async (req, res)=>{
    try {
        const { id } = req.params;
        const userDelete = await Subscriber.deleteOne({ _id: id })
        return res.status(200).json({ message: "Delete Successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Delete didn't Successfully" })

    }
}

module.exports = { postSubscriber, getSubscriber, deleteSubscriber }