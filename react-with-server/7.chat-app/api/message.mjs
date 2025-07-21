import express from 'express';
import { messageModel } from '../model.mjs';

export default function(io){

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
            let conversation = await messageModel.findById(result._id)
            .populate({path: 'from', select: "firstName lastName email"})
            .populate({path: 'to', select: "firstName lastName email"})
            .exec();
            io.emit(`${senderId}-${receiverId}`, conversation)
            io.emit(`personal-channel-${receiverId}`, conversation)
            
            res.send({message: "Message Sent", chat: conversation})
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
            .populate({path: 'from', select: "firstName lastName email"})
            .populate({path: 'to', select: "firstName lastName email"})
            .exec();
            res.send({message: "Message Found", conversation: conversation})
        } catch (error) {
            res.status(500).send({message: "Internal Server Error"})
        }
    })
    
    return router;
}