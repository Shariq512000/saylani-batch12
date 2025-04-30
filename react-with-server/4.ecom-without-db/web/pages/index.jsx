import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [productName , setProductName] = useState("")
  const [productPrice , setProductPrice] = useState("")
  const [productDes , setProductDes] = useState("");
  const [allProducts , setAllProducts] = useState([]);
  const [apiLoad , setApiLoad] = useState(false);

  let baseUrl = "http://localhost:5002"

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
      // console.log(res.data)
      setAllProducts(res.data)
    }).catch((err) => {
      console.log(err)
    })
  },[apiLoad])

  let styles = {
    inputs: "border-black border rounded-sm p-1"
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
            <h6>
              Name: {eachProduct?.name}
            </h6>
            <h6>
              Price: {eachProduct?.price}
            </h6>
            <p>
              Description: {eachProduct?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
