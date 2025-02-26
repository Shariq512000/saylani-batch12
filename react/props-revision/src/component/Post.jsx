const Post = (props) => {
    return(
      <div>
        <h6>
          {props.userName}
        </h6>
        <p>{props.userAge}</p>
        <span>{props.rollNumber}</span>
      </div>
    )
}

export default Post;