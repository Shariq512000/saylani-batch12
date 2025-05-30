import { collection, doc, getFirestore, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Dashboard = () => {

    const [events, setEvents] = useState([]);
    const [show , setShow] = useState(false);
    const [currentEventId , setCurrentEventId] = useState("");
    const [currentStatus , setCurrentStatus] = useState("");

    const db = getFirestore();

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

    const modalClose = () => {
        setShow(false)
        setCurrentEventId("");
        setCurrentStatus("")
    }

    const changeStatus = async() => {
        try {
            await updateDoc(doc(db, "events", currentEventId), {
                status: currentStatus
            });
            Swal.fire({
                icon: "success",
                title: "Event Updated!"
            })
            modalClose();
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='dashboardPage'>
        <table>
            <thead>
                <tr>
                    <th>
                        User Profile
                    </th>
                    <th>
                        User Name
                    </th>
                    <th>
                        User Email
                    </th>
                    <th>
                        Event Title
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {events?.map((eachEvent , i) => {
                    return(
                        <tr key={i}>
                            <td>
                                <img src={eachEvent?.userProfile} alt="" />
                            </td>
                            <td>
                                {eachEvent?.userName}
                            </td>
                            <td>
                                {eachEvent?.userEmail}
                            </td>
                            <td>
                                {eachEvent?.eventTitle}
                            </td>
                            <td>
                                {eachEvent?.status}
                            </td>
                            {/* <td>
                                <Link to={`/detail/${eachEvent.id}`}>Detail</Link>
                            </td> */}
                            <td>
                                <button onClick={() => {
                                    setCurrentStatus(eachEvent?.status)
                                    setCurrentEventId(eachEvent?.id);
                                    setShow(true)
                                }}>Change Status</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <Modal show={show} centered onHide={modalClose}>
            <Modal.Header closeButton>
                <h6>Change Status</h6>
            </Modal.Header>
            <Modal.Body>
                <div className="changeStatus">
                    <label htmlFor="">
                        Status :
                    </label>
                    <select value={currentStatus} onChange={(e) => {setCurrentStatus(e.target.value)}}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className="buttonContainer">
                        <Button onClick={changeStatus}>Submit</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Dashboard