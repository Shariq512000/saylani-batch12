import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const Home = () => {

  const [newEmail , setNewEmail] = useState("");
  const [showForm , setShowForm] = useState(false);
  const [postCaption , setPostCaption] = useState("");
  const [posts, setPosts] = useState([]);

  let {state, dispatch} = useContext(GlobalContext);

  const db = getFirestore();

  const auth = getAuth();
  const changeEmail = (e) => {

    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      console.log("Email Updated")
      // ...
    }).catch((error) => {
      // An error occurred
      console.log("Update Email Error" , error)
      // ...
    });
  }

  const addPost = async(e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: state?.user?.uid,
        caption: postCaption,
        authorName: state?.user?.displayName,
        authorProfile: state?.user?.photoURL,
        postDate: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getAllData = async() => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} =>`, doc.data());
        setPosts((prev) => [...prev, doc.data()])
      });
    }

    getAllData();
  } , []);

  console.log(posts)

  return (
    <div>
      
      <h1>{state?.user?.displayName}</h1>
      <h6>{state?.user?.email}</h6>

      {/* <button onClick={() => setShowForm((oldValue) => !oldValue)}>
        {showForm ? "Hide" : "Show"} Form
      </button> */}


      {/* {(showForm)?
        <form onSubmit={changeEmail}>
          <label htmlFor="newEmail">
            New Email: <input value={newEmail} type="email" onChange={(e) => {setNewEmail(e.target.value)}} required />

            <button type='submit'>Submit</button>
          </label>
        </form>
        :
        null
      } */}

      <form onSubmit={addPost}>
        <textarea placeholder={`what's on your mind`} onChange={(e) => {setPostCaption(e.target.value)}}></textarea>
        <br />
        <button>Post</button>
      </form>

    </div>
  )
}

export default Home