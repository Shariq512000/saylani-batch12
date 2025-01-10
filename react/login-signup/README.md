### Libraries
    ### react-bootstrap
        npm install react-bootstrap bootstrap
    ### formik
        npm i formik
    ### axios
        npm i axios
    ### react-router
        npm i react-router
    ### yup
        npm i yup
    ### material ui
        npm install @mui/material @emotion/react @emotion/styled

### Assignment 
    Add To Cart
        fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: [
                {
                    id: 144,
                    quantity: 4,
                },
                {
                    id: 98,
                    quantity: 1,
                },
                ]
            })
        })
        .then(res => res.json())
        .then(console.log);
    Get Cart List
        fetch('https://dummyjson.com/carts/user/5')
        .then(res => res.json())
        .then(console.log);