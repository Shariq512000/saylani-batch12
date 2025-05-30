import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import moment from "moment";
import ProductCard from './component/productCard';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [productList , setProductList] = useState([]);
  const [apiLoad , setApiLoad] = useState(false);
  const [showModal , setShowModal] = useState(false);

  let baseUrl = "http://localhost:5003";

  const handleClose = () => {
    setShowModal(false);
    addProduct.resetForm();
  }

  const getProducts = async() => {
    try {
      let res = await axios.get(`${baseUrl}/products`);
      setProductList(res.data.product_list)
    } catch (error) {
      console.log("error" , error);
    }
  }

  useEffect(() => {
    getProducts()
  } , [apiLoad])

  const validateForm = yup.object({
    productName: yup.string('Enter Valid Data Type').required('This Field is Required'),
    productPrice: yup.number('Enter Valid Data Type').required('This Field is Required'),
    description: yup.string('Enter Valid Data Type').required('This Field is Required')
  })

  const addProduct = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      description: '',
      id: '' // Use For Update
    },
    validationSchema: validateForm,
    onSubmit: async(values) => {
      try {
        let apiData = {
          name: values.productName,
          price: values.productPrice, 
          description: values.description
        }
        let response = values.id ? await axios.put(`${baseUrl}/product/${values.id}` , apiData) : await axios.post(`${baseUrl}/product` , apiData)
        console.log(response.data)
        setApiLoad(!apiLoad);
        handleClose();
      } catch (error) {
        console.log(error)
      }
    }

  })

  /// Edit Function ///
  const editProduct = (data) => {
    console.log(data);
    /// Use For Prefilled input ///
    addProduct.setFieldValue('productName' , data.name);
    addProduct.setFieldValue('productPrice' , data.price);
    addProduct.setFieldValue('description' , data.description);
    addProduct.setFieldValue('id' , data.id);
    /// Use For Prefilled input ///
    setShowModal(true); /// To Open Modal
  }

  return (
    <>
      <div className="">

        <button onClick={() => {setShowModal(true)}}>Add Product</button>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", rowGap: 10}}>
          {productList?.map((eachProduct , i) => (
            <div className="" key={i} style={{border: "1px solid black", width: 350, borderRadius: 6, padding: 10}}>
              <h1>{eachProduct.name}</h1>
              <h6>{eachProduct.price}</h6>
              <p>{eachProduct.description}</p>
              <p>Posted At: {moment(eachProduct.created_at).format("DD MMM YYYY hh:mm:ss A")}</p>
              <button onClick={() => {editProduct(eachProduct)}}>Edit</button>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addProduct.handleSubmit}>
            <label htmlFor="">
              Name <input type="text" name='productName' value={addProduct.values.productName} onChange={addProduct.handleChange} />
            </label>
            {
              addProduct.touched.productName && Boolean(addProduct.errors.productName) ? (
                <p style={{margin: 0, color: "red"}}>{addProduct.touched.productName && addProduct.errors.productName}</p>
              )
              :
              null
            }
            <br />
            <label htmlFor="">
              Price <input type="number" name='productPrice' value={addProduct.values.productPrice} onChange={addProduct.handleChange} />
            </label>
            {
              addProduct.touched.productPrice && Boolean(addProduct.errors.productPrice) ? (
                <p style={{margin: 0, color: "red"}}>{addProduct.touched.productPrice && addProduct.errors.productPrice}</p>
              )
              :
              null
            }
            <br />
            <label htmlFor="">
              Description <textarea name='description' value={addProduct.values.description} onChange={addProduct.handleChange}></textarea>
            </label>
            {
              addProduct.touched.description && Boolean(addProduct.errors.description) ? (
                <p style={{margin: 0, color: "red"}}>{addProduct.touched.description && addProduct.errors.description}</p>
              )
              :
              null
            }
            <br />
            <button type='submit'>submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
