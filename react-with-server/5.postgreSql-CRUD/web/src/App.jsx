import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import moment from "moment";
import ProductCard from './component/productCard';
import {useFormik} from 'formik';
import * as yup from 'yup';

function App() {

  const [productList , setProductList] = useState([]);

  let baseUrl = "http://localhost:5003";

  const getProducts = async() => {
    try {
      let result = await axios.get(`${baseUrl}/products`);
      setProductList(result.data.product_list)
    } catch (error) {
      console.log("error" , error);
    }
  }

  useEffect(() => {
    getProducts()
  } , [])

  const validateForm = yup.object({
    productName: yup.string('Enter Valid Data Type').required('This Field is Required')
  })

  const addProduct = useFormik({
    initialValue: {
      productName: '',
      productPrice: '',
      description: ''
    },
    validationSchema: validateForm,
    onSubmit: (values) => {
      
    }

  })

  return (
    <div className="">

      <form>
        <label htmlFor="">
          Name <input type="text" />
        </label>
        <br />
        <label htmlFor="">
          Price <input type="number" />
        </label>
        <br />
        <label htmlFor="">
          Description <textarea name="" id=""></textarea>
        </label>
      </form>

      <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: 10}}>
        {productList?.map((eachProduct , i) => (
          <ProductCard key={i} eachProduct={eachProduct} />
        ))}
      </div>
    </div>
  );
}

export default App;
