import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import PostCard from '../component/PostCard';
import { GlobalContext } from '../context/Context';

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
      const q = query(collection(db, "posts"), where("userId", "==" , state.user.uid));
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
      <div className="p-3 d-flex flex-column align-items-center row-gap-3">
        {posts.map((eachPost , i) => {
          console.log("eachPost" , eachPost)
          let slittedFileName = eachPost?.postFile?.split(".");
          let fileExtension = slittedFileName[slittedFileName.length - 1]
          return(
            <PostCard eachPost={eachPost} fileExtension={fileExtension} editPost={editPost} deletePost={deletePost} />
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