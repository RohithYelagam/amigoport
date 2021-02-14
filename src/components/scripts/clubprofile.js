import React, {useState } from 'react';
import "../styles/clubprofile.css";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import axios from "../../axios";
import { useSelector } from 'react-redux';
import {selectUser} from "../redux/userSlice";


export default function ClubProfile(props){
    const [club_name, setclub_name] = useState('club');
    const userrr = useSelector(selectUser);

   const  handleAdd = () => {
        alert(props.club_name);
        axios.post('/new/user/club',{
            club_name: props.club_name,
            user_name: userrr.uid,
        })
    }

        return (
            <div className="club_info">
                <GroupWorkIcon fontSize="large" className="club_photo"/>
                  <div className="club_info_action"><h2>{props.club_name}</h2></div>
                <div>
                    <button onClick={handleAdd} className="addc_icon_button">
                        <PlaylistAddIcon className="addc_icon" />
                        </button>
                        <ThumbUpAltIcon className="follow_icon"/>
                        <FavoriteIcon className="fav_icon"/>
                </div>
            
            </div>
        )
}

