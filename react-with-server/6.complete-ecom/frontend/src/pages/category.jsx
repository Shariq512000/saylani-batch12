import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Category = () => {
  const [categoryList , setCategoryList] = useState([]);
  const [showForm , setShowForm] = useState(false);
  const [categoryName , setCategoryName] = useState("");
  const [categoryDescription , setCategoryDescription] = useState("");
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

  const addCategory = async(e) => {
    e.preventDefault()
    try {
      let res = await axios.post('http://localhost:5004/category', {name: categoryName, description: categoryDescription})
      console.log("Res", res)
      getCategory();
    } catch (error) {
      console.log("Error" , error);
    }
  }

  return (
    <div className='categoryPage'>
      <div className="">
        <button onClick={() => {setShowForm(!showForm)}}>Add Category</button>
      </div>
      {(showForm) ?
        <form onSubmit={addCategory}>
          <label htmlFor="">
            Name: <input type="text" value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} />
          </label>
          <br />
          <label htmlFor="">
            Description: 
            <textarea value={categoryDescription} onChange={(e) => {setCategoryDescription(e.target.value)}}></textarea>
          </label>
          <br />
          <button>Submit</button>
        </form>
        :
        null
      }
      <table>
        <thead>
          <tr>
            <th>Category id</th>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((eachCategory , i) => {
            return(
              <tr>
                <td>{eachCategory?.category_id}</td>
                <td>{eachCategory?.category_name}</td>
                <td>{eachCategory?.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Category