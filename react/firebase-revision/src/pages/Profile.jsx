import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import PostCard from '../component/PostCard';
import { GlobalContext } from '../context/Context';
import Swal from 'sweetalert2';

const Profile = () => {

  let {state , dispatch} = useContext(GlobalContext)

  const [posts , setPosts] = useState([])
  const [show , setShow] = useState(false);
  const [currentCaption , setCurrentCaption] = useState("");
  const [currentPostId , setCurrentPostId] = useState("")

  const db = getFirestore();

  useEffect(() => {
    // getPost();

    let unsubscribe;

    const getRealTimeUpdates = () => {
      // , orderBy("postDate", "desc")
      const q = query(collection(db, "events"), where("userId", "==" , state.user.uid));
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

  return (
    <div>
      <div className="p-3 d-flex flex-column align-items-center row-gap-3">
        {posts.map((eachPost , i) => {
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

export default Profile