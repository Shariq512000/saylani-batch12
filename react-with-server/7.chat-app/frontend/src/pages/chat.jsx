import React, { useState } from 'react'
import { useParams } from 'react-router'
import api from '../component/api'

const Chat = () => {
    const [message , setMessage] = useState("")
    // /api/v1/chat/:id
    const {id} = useParams()
    
    const sendMessage = async(e) => {
        e.preventDefault();
        try {
            let res = await api.post(`chat/${id}`, {message: message})
            console.log(res.data);
            setMessage("");
        } catch (error) {
            console.log("Error" , error)
        }
    }

  return (
    <div>
        <form onSubmit={sendMessage} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8}}>
            <textarea value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Write your message...'></textarea>
            <button>Send</button>
        </form>
    </div>
  )
}

export default Chat