import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../component/api';
import moment from 'moment';
import { GlobalContext } from '../context/Context';

const Chat = () => {
    let {state, dispatch} = useContext(GlobalContext);
    const [message , setMessage] = useState("");
    const [conversations , setConversations] = useState([]);
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

    useEffect(() => {
        getConversation();
    } , [])
    
    const sendMessage = async(e) => {
        e.preventDefault();
        try {
            let res = await api.post(`chat/${id}`, {message: message})
            console.log(res.data);
            setMessage("");
            getConversation();
        } catch (error) {
            console.log("Error" , error)
        }
    }
  return (
    <div>
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