import Card from 'react-bootstrap/Card';
import './post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'


const PostCard = (props) => {
    return(
        <div className="postCard">
            <Card style={{ width: 450 }}>
                <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="postDetailSec">
                            <div className="profilePicture">
                                <img src={props.data.profilePic} alt="" />
                            </div>
                            <div className="">
                                <h6>{props.data.userName}</h6>
                                <p>{props.data.postTime}</p>
                            </div>
                        </div>

                        <div className="d-flex column-gap-2">
                            <FontAwesomeIcon icon={faEllipsisV} />
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <div className='postContent pt-3'>
                        <p>{props.data.postText}</p>
                        <img src={props.data.postImage} alt="" />
                    </div>
                    <div className='d-flex align-items-center justify-content-between px-4 pt-3'>
                        <div className='d-flex align-items-center column-gap-1'>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <p className='mb-0'>Like</p>
                        </div>

                        <div className='d-flex align-items-center column-gap-1'>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <p className='mb-0'>Comment</p>
                        </div>

                        <div className='d-flex align-items-center column-gap-1'>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <p className='mb-0'>Share</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PostCard;