import { useState } from "react";
import Header from "./component/Header";
import LeftBar from "./component/Leftbar";
import PostCard from "./component/MainSec";
import RightBar from "./component/RightBar";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [userName, setUserName] = useState("")
  const [data, setData] = useState(
    [
      {
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
        userName: "Saylani Mass I.T. Training",
        postTime: "4 December at 12:36",
        postText: "🚀 Ready to elevate your HR career? 🌟 Join us for the **Flow HCM Certified HR Professional** Entrance Exam! 🏢✨ 📅 Date: Thursday, 5th December 2024",
        postImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
        userName: "Saylani Mass I.T. Training",
        postTime: "4 December at 12:36",
        postText: "🚀 Ready to elevate your HR career? 🌟 Join us for the **Flow HCM Certified HR Professional** Entrance Exam! 🏢✨ 📅 Date: Thursday, 5th December 2024",
        postImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
        userName: "Saylani Mass I.T. Training",
        postTime: "4 December at 12:36",
        postText: "🚀 Ready to elevate your HR career? 🌟 Join us for the **Flow HCM Certified HR Professional** Entrance Exam! 🏢✨ 📅 Date: Thursday, 5th December 2024",
        postImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
        userName: "Saylani Mass I.T. Training",
        postTime: "4 December at 12:36",
        postText: "🚀 Ready to elevate your HR career? 🌟 Join us for the **Flow HCM Certified HR Professional** Entrance Exam! 🏢✨ 📅 Date: Thursday, 5th December 2024",
        postImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s",
        userName: "Saylani Mass I.T. Training",
        postTime: "4 December at 12:36",
        postText: "🚀 Ready to elevate your HR career? 🌟 Join us for the **Flow HCM Certified HR Professional** Entrance Exam! 🏢✨ 📅 Date: Thursday, 5th December 2024",
        postImage: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ]
  )

  return(
    <div className="App">
      <Header />
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <LeftBar />
        <div className="pt-4 d-flex flex-column row-gap-4">
          {
            data?.map((ele , i) => {
              return(
                <PostCard key={i} data={ele} />
              )
            })
          }
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default App;