import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const NewComponent = (props) => {
    return(
        <div>
            <h1>Hello World {`${props.firstName} ${props.lastName}`}</h1>
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </div>
    )
}

export default NewComponent;