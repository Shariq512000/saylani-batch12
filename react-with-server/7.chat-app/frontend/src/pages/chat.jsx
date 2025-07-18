import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../component/api';
import moment from 'moment';
import { GlobalContext } from '../context/Context';
import io from 'socket.io-client';

const Chat = () => {
    let {state, dispatch} = useContext(GlobalContext);
    const [message , setMessage] = useState("");
    const [conversations , setConversations] = useState([]);
    const [userDetail , setUserDetail] = useState({})
    // /api/v1/chat/:id
    const {id} = useParams();

    const getConversation = async() => {
        try {
            let conversation = await api.get(`/conversation/${id}`);
            console.log("conversation", conversation)
            setConversations(conversation.data?.conversation)
            // setLoad(!load)
        } catch (error) {
            console.log("Error", error);
        }
    }

    const getUserDetail = async() => {
        try {
            let response = await api.get(`/profile?user_id=${id}`);
            console.log("conversation", response)
            setUserDetail(response.data?.user)
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        getConversation();
        getUserDetail();
    } , [])

    useEffect(() => {
        const socket = io("");
    
        socket.on('connect', () => {
            console.log("Connected to server");
        });
    
        socket.on(`${id}-${state.user.user_id}`, (data) => {
            console.log("Received:", data);
            setConversations(prev => [...prev, data])
            // getConversation();
        });
    
        socket.on('disconnect', (reason) => {
            console.log("Disconnected. Reason:", reason);
        });

        socket.on('error', (error) => {
            console.log("Error:", error);
        });
    
        return () => {
            console.log("Component unmount")
            socket.close();  // cleanup on unmount
        };
    }, []);
    
    const sendMessage = async(e) => {
        e.preventDefault();
        try {
            let res = await api.post(`chat/${id}`, {message: message})
            console.log(res.data);
            setMessage("");
            setConversations(prev => [...prev, res.data.chat])
        } catch (error) {
            console.log("Error" , error)
        }
    }
    console.log("userDetail" , userDetail)
  return (
    <div>
        <div className="">
            <h1>
                {userDetail?.first_name} {userDetail?.last_name}
            </h1>
            <p>{userDetail?.email}</p>
        </div>
        <div className="messageWrapper">
            {conversations?.map((eachMessage, i) => {
                return(
                    <div key={i} className={`conversation ${(eachMessage?.from == state.user.user_id) ? "myMessage" : ""}`}>
                        <p>
                            {eachMessage?.text}
                        </p>
                        <span>
                            {moment(eachMessage?.createdOn).fromNow()}
                        </span>
                    </div>
                )
            })}
        </div>
        <form onSubmit={sendMessage} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8}}>
            <textarea value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder='Write your message...'></textarea>
            <button>Send</button>
        </form>
    </div>
  )
}

export default Chat;














//// Nested Routing (Ignore) ////


// ------- route.jsx -------- //

{/* <Routes>
    {(state?.isLogin == true) ?
    <>
        <Route path='/my-space' element={<MySpaceLayout />} >
        <Route path='' element={<Overview />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='calander' element={<Calendar />} />
        <Route path="*" element={<Navigate to="/my-space" replace />} />
        </Route>

        <Route path='/team' element={<TeamMainPage />}>
        <Route path='list' element={<UserList />} />
        <Route path='create-user' element={<CreateUser />} />
        <Route path='list/update-user/:id' element={<CreateUser />} />
        <Route path='update-user-detail' element={<UpdateUserDetail />} />
        <Route path='hr-process' element={<HRProcess />} />
        
        <Route path='profile/:id' element={<TeamProfile />} />
        </Route>


        <Route path='/organization' element={<OrganizationMainPage />} >
        <Route path='benefits' element={<Benefit />} />
        <Route path='birthday' element={<OrganizationBirthdayFolks />} />
        <Route path='anniversaries' element={<OrganizationAnniversaries />} />
        <Route path='department-tree' element={<OrganizationDepartmentTree />} />
        <Route path='employee-tree' element={<OrganizationEmployeeTree />} />
        </Route>



        <Route path='*' element={<Navigate to={'/my-space'} />} />
    </>
    :
    (state?.isLogin == false) ?
        <>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to={'/login'} />} />
        </>
        :
        <></>
    }
</Routes> */}

// ------- route.jsx -------- //


// ------- MySpaceLayout Component -------- //

// import React from 'react'
// import Header from '../../component/layout/header'
// import { Outlet } from 'react-router'
// import { mySpaceBottomNav, topHeaderNav } from '../../script/tabingNavArray'

// const MySpaceLayout = () => {
//   return (
//     <div className="webBody">
//       <Header  bottomTabs={mySpaceBottomNav} topTabs={topHeaderNav}/>
//       <Outlet />
//     </div>
//   )
// }

// export default MySpaceLayout

// ------- MySpaceLayout Component -------- //