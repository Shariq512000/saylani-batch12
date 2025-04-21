import express from 'express';
const app = express()
const port = 5000;

/// 192.168.200.121:5000

app.get('/' , (req , res) => {
    console.log(req.ip);
    res.send("Hello World")
})

////get, post, patch, put, delete

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})