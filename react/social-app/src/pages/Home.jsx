import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, onSnapshot, where } from "firebase/firestore";
import { Card } from 'react-bootstrap';
import moment from 'moment';
import './home.css'
import { Link } from 'react-router';
import axios from 'axios';

const Home = () => {

  const [newEmail , setNewEmail] = useState("");
  const [showForm , setShowForm] = useState(false);
  const [postCaption , setPostCaption] = useState("");
  const [posts, setPosts] = useState([]);

  const [file , setFile] = useState();

  let {state, dispatch} = useContext(GlobalContext);

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

  const db = getFirestore();

  const getPost = async() => {
    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setPosts((prev) => [...prev , doc.data()])
    });
  }

  useEffect(() => {

    console.log("Component Mount")
    // getPost();

    let unsubscribe;

    const getRealTimeUpdates = () => {
      const q = query(collection(db, "posts"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let realTimePost = []
        querySnapshot.forEach((doc) => {
          realTimePost.push(doc.data())
        });
        setPosts(realTimePost);
      });
    }
    getRealTimeUpdates()

    return () => {
      unsubscribe();
    }
  } , [])

  const addPost = async(e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "posts-image");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);
      const docRef = await addDoc(collection(db, "posts"), {
        userName: state.user?.displayName,
        userEmail: state.user?.email,
        userProfile: state.user?.photoURL,
        userId: state.user?.uid,
        postText: postCaption,
        postDate: new Date().getTime(),
        postFile: res.data.url
      });
      setPostCaption("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div>

      <Link to={"/profile"}>Profile</Link>
      
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
        <input type="file" onChange={(e) => {setFile(e?.target?.files[0])}} />
        <br />
        <button>Post</button>
      </form>

      <div className="p-3 d-flex flex-column align-items-center row-gap-3">
        {posts.map((eachPost , i) => {
          console.log("eachPost" , eachPost)
          return(
            <Card key={i} style={{ width: '20rem' }} className='p-4'>
              <div className="postHead">
                <div className="userProfile">
                  <img src={eachPost?.userProfile} alt="" />
                </div>
                <div className="postDetail">
                  <h6>{eachPost?.userName}</h6>
                  <p>{moment(eachPost?.postDate).fromNow()}</p>
                </div>
              </div>
              <div className="postContent pt-4">
                <p className='m-0'>{eachPost?.postText}</p>
                {(eachPost?.postFile) ?
                  <img src={eachPost?.postFile} alt="" style={{width: "100%"}} />
                  :
                  null
                }
              </div>
            </Card>
          )
        })}
      </div>

    </div>
  )
}

export default Home