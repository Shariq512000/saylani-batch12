import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [productName , setProductName] = useState("")
  const [productPrice , setProductPrice] = useState("")
  const [productDes , setProductDes] = useState("");
  const [allProducts , setAllProducts] = useState([]);
  const [apiLoad , setApiLoad] = useState(false);
  const [showPopup , setShowPopup] = useState(false);
  const [editId , setEditId] = useState("")

  let baseUrl = "http://localhost:5002";

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(productName, productPrice, productDes)
    axios.post(`${baseUrl}/add-product`,{
      name: productName,
      price: productPrice,
      description: productDes
    }).then((res) => {
      console.log(res.data)
      setProductName("");
      setProductDes("")
      setProductPrice("");
      setApiLoad(!apiLoad)
    }).catch((err) => {
      console.log(err)
    })



    // let config = {
    //   method: "Post",
    //   url: "http://localhost:5002/add-product",
    //   data: {}
    // }
    // axios.request(config)
  }

  useEffect(() => {
    axios.get(`${baseUrl}/get-products`).then((res) => {
      setAllProducts(res.data)
    }).catch((err) => {
      console.log(err)
    })
  },[apiLoad])

  let styles = {
    inputs: "border-black border rounded-sm p-1"
  }

  const deleteProduct = (productId) => {
    // /delete-product/:id
    axios.delete(`${baseUrl}/delete-product/${productId}`).then((res) => {
      console.log(res.data)
      setApiLoad(!apiLoad)
    }).catch((err) => {
      console.log(err)
    })
  }

  const editProduct = (data) => {
    console.log("Data" , data)
    setEditId(data.id);
    setProductName(data.name);
    setProductPrice(data.price)
    setProductDes(data.description);
    setShowPopup(true);
  }

  const closePopup = () => {
    setProductName("");
    setEditId("");
    setProductPrice("");
    setProductDes("");
    setShowPopup(false)
  }

  const updateProduct = (e) => {
    e.preventDefault();
    axios.put(`${baseUrl}/edit-product/${editId}`,{
      name: productName,
      price: productPrice,
      description: productDes
    }).then((res) => {console.log("Res" , res)}).catch((err) => {
      console.log("Err" , err)
    })
  }

  return (
    <div>
      <form onSubmit={addProduct}>
        <div className="mb-2">
          <label htmlFor="">
            Name: <input type="text" className={styles.inputs} required placeholder="Product Name" value={productName} onChange={(e) => {setProductName(e.target.value)}} />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="">
            Price: 
            <input 
              type="number" 
              value={productPrice} 
              className={styles.inputs}
              required
              placeholder="Product Price" 
              onChange={
                (e) => {setProductPrice(e.target.value)}
              }
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="">
            Description: <textarea required 
            className={styles.inputs}
            value={productDes} 
            onChange={
              (e) => {setProductDes(e.target.value)}
            }></textarea>
          </label>
        </div>
        <button className={styles.inputs}>Submit</button>
      </form>
      <div className="mt-3 flex flex-col items-center justify-center gap-y-3">
        {allProducts?.map((eachProduct , i) => (
          <div className="p-3 border border-black rounded-sm" key={i}>

            <div className="flex items-center justify-between">
              <button onClick={() => {deleteProduct(eachProduct.id)}}>Delete</button>
              <button onClick={() => editProduct(eachProduct)}>Edit</button>
            </div>

            <div className="flex items-center justify-between">
              <h6>
                Name: {eachProduct?.name}
              </h6>
            </div>

            <h6>
              Price: {eachProduct?.price}
            </h6>

            <p>
              Description: {eachProduct?.description}
            </p>

          </div>
        ))}
      </div>
      {(showPopup) ?
        <>
          <div className="popupLayout" onClick={closePopup}></div>
          <div className="customPopup">
            <form onSubmit={updateProduct}>
              <div className="mb-2">
                <label htmlFor="">
                  Name: <input type="text" className={styles.inputs} required placeholder="Product Name" value={productName} onChange={(e) => {setProductName(e.target.value)}} />
                </label>
              </div>
              <div className="mb-2">
                <label htmlFor="">
                  Price: 
                  <input 
                    type="number" 
                    value={productPrice} 
                    className={styles.inputs}
                    required
                    placeholder="Product Price" 
                    onChange={
                      (e) => {setProductPrice(e.target.value)}
                    }
                  />
                </label>
              </div>
              <div className="mb-2">
                <label htmlFor="">
                  Description: <textarea required 
                  className={styles.inputs}
                  value={productDes} 
                  onChange={
                    (e) => {setProductDes(e.target.value)}
                  }></textarea>
                </label>
              </div>
              <button className={styles.inputs}>Submit</button>
            </form>
          </div>
        </>
        :
        null
      }
    </div>
  );
}
