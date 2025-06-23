import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddProduct = () => {
    const [categoryList , setCategoryList] = useState([]);
    const getCategory = async() => {
        try {
            let res = await axios.get('http://localhost:5004/categories');
            setCategoryList(res.data.category_list);
        } catch (error) {
            console.log("error" , error);
        }
    }
    useEffect(() => {
    } , [])
  return (
    <div>
        <select onChange={(e) => {console.log(e.target.value)}}>
            {categoryList?.map((eachCategory , i) => (
                <option value={eachCategory.category_id}>{eachCategory?.category_name}</option>
            ))}
        </select>
    </div>
  )
}

export default AddProduct