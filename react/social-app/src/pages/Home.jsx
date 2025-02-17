import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'
import { getAuth, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { getFirestore, updateDoc, collection, addDoc, getDocs, query, onSnapshot, where, deleteDoc, doc, serverTimestamp, Timestamp, orderBy } from "firebase/firestore";
import { Button, Card, Modal } from 'react-bootstrap';
import moment from 'moment';
import './home.css'
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import PostCard from '../component/PostCard';
// import defaultImage from ''

const Home = () => {

  const [newEmail , setNewEmail] = useState("");
  const [showForm , setShowForm] = useState(false);
  const [postCaption , setPostCaption] = useState("");
  const [posts, setPosts] = useState([]);
  const [file , setFile] = useState();

  const [show , setShow] = useState(false);

  const [currentCaption , setCurrentCaption] = useState("");
  const [currentPostId , setCurrentPostId] = useState("")

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
    // getPost();

    let unsubscribe;

    const getRealTimeUpdates = () => {
      const q = query(collection(db, "posts"), orderBy("postDate", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let realTimePost = []
        querySnapshot.forEach((doc) => {
          realTimePost.push({...doc.data() , id: doc.id})
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
    // {}
    formData.append("file", file);
    //{file: file}
    formData.append("upload_preset", "posts-image");
    //{file: file, upload_preset: posts-image}

    try {
      if(file){                                                       //Cloud Name
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);
        const docRef = await addDoc(collection(db, "posts"), {
          userName: state.user?.displayName,
          userEmail: state.user?.email,
          userProfile: state.user?.photoURL,
          userId: state.user?.uid,
          postText: postCaption,
          postDate: serverTimestamp(),
          postFile: res.data.url
        });
        setPostCaption("");
      }else{
        const docRef = await addDoc(collection(db, "posts"), {
          userName: state.user?.displayName,
          userEmail: state.user?.email,
          userProfile: state.user?.photoURL,
          userId: state.user?.uid,
          postText: postCaption,
          postDate: serverTimestamp(),
          postFile: ""
        });
        setPostCaption("");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const deletePost = async(id) => {
    await deleteDoc(doc(db, "posts", id));
  }

  const updatePost = async() => {
    await updateDoc(doc(db, "posts", currentPostId), {
      postText: currentCaption
    });
    handleClose()
  }

  const handleClose = () => {
    setShow(false)
    setCurrentCaption("")
    setCurrentPostId("")
  }

  const editPost = (val , id) => {
    setShow(true);
    setCurrentCaption(val);
    setCurrentPostId(id)
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
          let slittedFileName = eachPost?.postFile?.split(".");
          let fileExtension = slittedFileName[slittedFileName.length - 1]
          return(
            <PostCard key={i} eachPost={eachPost} fileExtension={fileExtension} editPost={editPost} deletePost={deletePost} />
          )
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={currentCaption} onChange={(e) => {setCurrentCaption(e.target.value)}} className='w-100 py-2 px-1 rounded-2' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updatePost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home