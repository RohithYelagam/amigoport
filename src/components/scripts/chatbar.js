import { React, useState, useEffect } from "react";

import "../styles/chatbar.css";

import { useSelector, useDispatch } from "react-redux";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImageIcon from "@material-ui/icons/Image";
import Message from "./message";
import { selectallclubs, setallclubs } from "../redux/allclubSlice";
import { selectUser } from "../redux/userSlice";
import axios from "../../axios";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ClubProfile from "./clubprofile";

function Chatbar() {
  const [msg, setMsg] = useState("");
  const user = useSelector(selectUser);
  const clubp = useSelector(selectallclubs);
  const [allClub, setAllClub] = useState([])
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    var time = Math.floor(Date.now() / 1000);
    const milliseconds = time * 1000;
    const date = new Date(milliseconds);
    const read_date = date.toLocaleString();

    axios
      .post("/new/message", {
        clubName: clubp[0].club_name,
        from_uid: user.uid,
        timestamp: read_date,
        msg: msg,
        photo: user.photo,
      })
      .then(() => {
        if (clubp != null) {
          axios
            .post("/get/present/club", {
              club_name: clubp[0].club_name,
              user_id: user.uid,
            })
            .then((res) => {
              // console.log(res.data[0][0]);
              if (res.data != undefined) {
                dispatch(setallclubs(res.data));
                console.log(res.data);
              }
            });
        }
      });
  };

  useEffect(() => {
    axios.get('/get/clubsList').then((res)=>{
      //console.log(res.data);
      setAllClub(res.data);
      console.log(allClub);
    })
  }, [])

  return (
    <div className="chatbar">
      {clubp != null ? (
        <div className="chat_header">
          <div className="chat_header_profile">
            <AccountCircleRoundedIcon fontSize="large" />
            <h3>{clubp[0].club_name}</h3>
          </div>
          <div className="chat_options">
            <MoreVertRoundedIcon />
          </div>
        </div>
      ) : (
        <div className="chat_header">
        <div className="chat_header_profile">
          <GroupWorkIcon fontSize="large" />
          <h3>Channels In The Server</h3>
        </div>
        <div className="chat_options">
          <MoreVertRoundedIcon />
        </div>
      </div>
      )}

      <div className="message_box">
        {clubp != null ? (
          clubp[1].map((allmsg) => (
            <Message
              msg_body={allmsg.msg}
              photo_url={allmsg.photo}
              msg_from={allmsg.from_uid}
              msg_timestamp={allmsg.timestamp}
            />
          ))
        ) : (
         
          ((allClub != null)?(
             allClub.map((cl)=>(
               <ClubProfile club_name={cl.clubName}/>
             ))
          ):(
            <ClubProfile/>
          ))
        )}
      </div>

     {(clubp!=null)?(
      <div className="chat_message">
        <div className="send">
          <div className="emoji">
            <EmojiEmotionsIcon fontSize="large" />
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              name="value"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="insert">
          <div className="file">
            <InsertDriveFileIcon fontSize="large" />
          </div>
          <div className="photo">
            <ImageIcon fontSize="large" />
          </div>
        </div>
      </div>
     ):(
    //   <div className="chat_message">
      
    // </div>
    <div></div>
     )}
      
    </div>
  );
}

export default Chatbar;
