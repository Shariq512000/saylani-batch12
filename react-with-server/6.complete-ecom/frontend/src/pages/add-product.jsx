import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context';

const AddProduct = () => {
    let {state} = useContext(GlobalContext)
    const [categoryList , setCategoryList] = useState([]);
    const [productName , setProductName] = useState("");
    const [productPrice , setProductPrice] = useState("");
    const [productDescription , setProductDescription] = useState("");
    const [productCategory , setProductCategory] = useState("");
    const [productImage , setProductImage] = useState("");
    const getCategory = async() => {
        try {
            let res = await axios.get('http://localhost:5004/categories');
            setCategoryList(res.data.category_list);
        } catch (error) {
            console.log("error" , error);
        }
    }
    useEffect(() => {
        getCategory();
    } , [])

    const addProduct = async(e) => {
        e.preventDefault();
        // {name, description, price, category_id, image}
        try {
            let response = await axios.post(`${state.baseUrl}/product` , {name: productName, price: productPrice, description: productDescription, category_id: productCategory, image: productImage})
            clearForm();
            console.log("Response" , response);
        } catch (error) {
            console.log("Error" , error)
        }
    }

    const clearForm = () => {
        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductCategory("");
        setProductImage("");
    }
  return (
    <div>
        {/* name, description, price, category_id, image */}
        <form onSubmit={addProduct}>
            <label htmlFor="">
                Category:
                <select value={productCategory} onChange={(e) => {setProductCategory(e.target.value)}}>
                    <option value="" disabled>SELECT CATEGORY</option>
                    {categoryList?.map((eachCategory , i) => (
                        <option value={eachCategory.category_id}>{eachCategory?.category_name}</option>
                    ))}
                </select>
            </label>
            <br />
            <label htmlFor="">
                Name: <input type="text" value={productName} onChange={(e) => {setProductName(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                price: <input type="number" value={productPrice} onChange={(e) => {setProductPrice(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                image url: <input type="" value={productImage} onChange={(e) => {setProductImage(e.target.value)}} />
            </label>
            <br />
            <label htmlFor="">
                Description:
                <textarea value={productDescription} onChange={(e) => {setProductDescription(e.target.value)}}></textarea>
            </label>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default AddProduct