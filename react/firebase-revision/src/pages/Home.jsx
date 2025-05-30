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
  const [events, setEvents] = useState([]);
  const [file , setFile] = useState();
  const [show , setShow] = useState(false);
  const [currentCaption , setCurrentCaption] = useState("");
  const [currentPostId , setCurrentPostId] = useState("")


  const [title , setTitle] = useState("");
  const [location , setLocation] = useState("");
  const [date , setDate] = useState("");
  const [time , setTime] = useState("");
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
      setEvents((prev) => [...prev , doc.data()])
    });
  }

  useEffect(() => {
    // getPost();

    let unsubscribe;

    const getRealTimeUpdates = () => {
      const q = query(collection(db, "events"), orderBy("postedDate", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let realTimePost = []
        querySnapshot.forEach((doc) => {
          realTimePost.push({...doc.data() , id: doc.id})
        });
        console.log("realTimePost" , realTimePost)
        setEvents(realTimePost);
      });
    }
    getRealTimeUpdates();

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
        const docRef = await addDoc(collection(db, "events"), {
          userName: state.user?.displayName,
          userEmail: state.user?.email,
          userProfile: state.user?.photoURL,
          userId: state.user?.uid,
          postedDate: serverTimestamp(),
          eventDescription: postCaption,
          eventFile: res.data.url,
          eventTitle: title,
          eventDate: date,
          eventTime: time,
          eventLocation: location,
          status: 'pending'
        });
        alert("Posted")
        // setPostCaption("");
      }else{
        const docRef = await addDoc(collection(db, "events"), {
          userName: state.user?.displayName,
          userEmail: state.user?.email,
          userProfile: state.user?.photoURL,
          userId: state.user?.uid,
          postedDate: serverTimestamp(),
          eventDescription: postCaption,
          eventFile: '',
          eventTitle: title,
          eventDate: date,
          eventTime: time,
          eventLocation: location,
          status: 'pending'
        });
        alert("Posted")
        // setPostCaption("");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const deleteEvent = async(id) => {
    await deleteDoc(doc(db, "events", id));
    Swal.fire({
      icon: "success",
      title: "Event Updated!"
    })
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

  // console.log("state" , state)

  const styles = {
    inputStyle: 'tw-border tw-border-black tw-p-3 tw-rounded focus:tw-outline-none'
  }

  return (
    <div className='tw-bg-slate-400 dark:tw-bg-red-400'>
      
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div className="">
          <h1>{state?.user?.displayName}</h1>
          <h6>{state?.user?.email}</h6>
        </div>

        <form onSubmit={addPost} className='tw-flex tw-w-[320px] tw-flex-col tw-gap-y-2'>
          <input className={styles.inputStyle} placeholder='Title' type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} />
          <input className={styles.inputStyle} placeholder='Date' type="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
          <input className={styles.inputStyle} placeholder='Time' type="time" value={time} onChange={(e) => {setTime(e.target.value)}} />
          <input className={styles.inputStyle} placeholder='Location' type="text" value={location} onChange={(e) => {setLocation(e.target.value)}} />
          <textarea className={styles.inputStyle} placeholder={`Description`} onChange={(e) => {setPostCaption(e.target.value)}}></textarea>
          
          <div className="tw-relative tw-w-full">
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-x-2 tw-border tw-border-black tw-rounded tw-p-3">
              <span className="material-symbols-outlined">
                upload
              </span>
              {(file) ? file?.name : "Click to Upload Or Drag To Upload"}
            </div>
            <input type="file" className='tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-left-0 tw-w-full tw-h-full tw-opacity-0' onChange={(e) => {setFile(e?.target?.files[0])}} />
          </div>
          
          <button className='tw-bg-transparent tw-text-blue-500 tw-px-3 tw-py-1 tw-transition-all tw-duration-500 tw-rounded tw-border tw-border-blue-500 hover:tw-bg-blue-500 hover:tw-text-white'>Post</button>
        </form>
      </div>

      <div className="p-3 d-flex flex-column align-items-center row-gap-3">
        {events.map((eachPost , i) => {
          // console.log("eachPost" , eachPost)
          // let slittedFileName = eachPost?.postFile?.split(".");
          // let fileExtension = slittedFileName[slittedFileName.length - 1]
          return(
            <div className="eventCard">
              <div className="userDetail">
                <div className="profile">
                  <img src={eachPost?.userProfile} alt="" />
                </div>
                <div className="userData">
                  <h6>{eachPost?.userName}</h6>
                  <p>{eachPost?.userEmail}</p>
                </div>
              </div>
              <div className="eventDetail">
                <h4>{eachPost?.eventTitle}</h4>
                <img src={eachPost?.eventFile} alt="" />
                <p>Event Date: {eachPost?.eventDate} {eachPost?.eventTime} ({eachPost?.status})</p>
              </div>
              {(state.user.uid == eachPost.userId) ?
                <div className="btnWrapper">
                  <Button>Edit</Button>
                  <Button onClick={() => {deleteEvent(eachPost?.id)}}>Delete</Button>
                </div>
                :
                null
              }
            </div>
            // <PostCard key={i} eachPost={eachPost} fileExtension={fileExtension} editPost={editPost} deletePost={deletePost} />
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