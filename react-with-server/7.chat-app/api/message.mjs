import express from 'express';
import { messageModel } from '../model.mjs';

const router = express.Router()

router.post('/chat/:id', async(req, res) => {
    let receiverId = req.params.id;
    let senderId = req.body.token.id
    try {
        let result = await messageModel.create({
            from: senderId,
            to: receiverId,
            text: req.body.message
        })
        res.send({message: "Message Sent"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

router.get('/conversation/:id', async(req, res) => {
    let receiverId = req.params.id;
    let senderId = req.body.token.id
    try {
        let conversation = await messageModel.find({
            $or: [
                {
                    from: receiverId,
                    to: senderId
                },
                {
                    from: senderId,
                    to: receiverId,
                }
            ]
        })
        res.send({message: "Message Found", conversation: conversation})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

export default router;