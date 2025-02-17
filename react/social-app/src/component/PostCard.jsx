import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import Swal from 'sweetalert2';

const PostCard = ({eachPost, editPost, deletePost, fileExtension}) => {
    let {state , dispatch} = useContext(GlobalContext)
    return (
        <Card style={{ width: '20rem' }} className='p-4 !tw-bg-theme-200'>
            <div className="d-flex align-items-center justify-content-between">
            <div className="postHead">
                <div className="userProfile">
                    <img src={eachPost?.userProfile || '/defaultProfile.png'} alt="" onError={(e) => {e.target.src = '/defaultProfile.png'}} />
                </div>
                <div className="postDetail">
                <h6>{eachPost?.userName}</h6>
                <p>{eachPost?.postDate?.seconds ? moment((eachPost?.postDate?.seconds * 1000)).fromNow() : "Just Now"}</p>
                {/* <p>{`${eachPost?.postDate}`}</p> */}
                </div>
            </div>
            {(state.user?.uid == eachPost.userId) ?
                <>
                <button onClick={() => {
                    Swal.fire({
                    title: "Do you want delete this post?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        deletePost(eachPost.id)
                        // Swal.fire("Saved!", "", "success");
                    }
                    });
                }}>delete</button>

                <button onClick={() => {editPost(eachPost.postText , eachPost?.id)}}>Edit</button>
                </>
                :
                null
            }
            </div>
            <div className="postContent pt-4">
            <p className='m-0'>{eachPost?.postText}</p>
            {(eachPost?.postFile) ?
                (fileExtension == "mp4")?
                <video src={eachPost?.postFile} controls style={{width: "100%"}}></video>
                :
                <img src={eachPost?.postFile} alt="" style={{width: "100%"}} />
                :
                null
            }
            </div>
        </Card>
    )
}

export default PostCard