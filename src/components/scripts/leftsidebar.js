import React, { useEffect } from 'react';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Clubs from "./clubs";
import { auth } from "../../firebase";
import AddIcon from '@material-ui/icons/Add';
import axios from "../../axios";
import "../styles/leftsidebar.css";

import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from "../redux/userSlice";
import { selectClubs, setClubs, closeClubs } from "../redux/clubSlice";
import {setallclubs,closeallclubs} from "../redux/allclubSlice";

function Leftsidebar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    var clubs = useSelector(selectClubs);


    const handleClub = (nn) => {
        axios.post('/get/present/club',{
            club_name:nn,
            user_id:user.uid,
        }).then((res)=>{
           // console.log(res.data[0][0]);
            if(res.data != undefined) dispatch(setallclubs(res.data));
        })
    }

    const handleAdd = () => {
        const club_Name = prompt("Enter the Club Name");
        // add new club in db
        axios.post('/new/club',{
            clubName:club_Name,
            admin_id:user.uid
        })
        //add the club in user db
        axios.post('/new/user/club',{
            user_uid:user.uid,
            user_name:user.name,
            club_name:club_Name
        }).then(()=>{
            axios.post('/get/user/clubsList', {
                uid: user.uid
            }).then((res) => {
                dispatch(setClubs(res.data));
                clubs=res.data;
              // console.log(clubs);
            });
        })
       
    }

    useEffect(() => {
        if (user != null) {
            axios.post('/get/user/clubsList', {
                uid: user.uid
            }).then((res) => {
                dispatch(setClubs(res.data));
            });
        }else{
            dispatch(closeClubs());
            dispatch(closeallclubs());
        }
    }, [])


    return (
        <div className="leftsidebar">
            
            {/* navbar */}
            <div className="navbar">
                <div className="homeicon"><HomeIcon /></div>
                <div className="profile">
                    <img src={user.photo} ></img>
                    <button onClick={() => auth.signOut()} title="Logout"><div className="logout"><PowerSettingsNewIcon /></div></button>
                </div>
            </div>


            {/* clubs bar */}
            <div className="clubsbar">
                <div className="clubsheader">
                    <div className="club_profile_icon"><GroupIcon /></div>
                    <div className="club_name"><h3>Clubs</h3></div>
                    <div className="club_add_icon"><AddIcon onClick={handleAdd} /></div>
                </div>
                <div className="clubss">
                {(clubs != null) ? (
                    clubs.map((list) => (
                        <div>
                            <button className="clubs_button" onClick={() => handleClub(list.clubname)} key={list.clubid} ><Clubs name={list.clubname} /></button>
                        </div>
                    ))
                ) : (
                        <div>
                            <button className="clubs_button" ><Clubs name={'No Clubs Present'} /></button>
                        </div>

                    )}
                </div>
            </div>
        </div>

    )
}

export default Leftsidebar
