import {Avatar} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Leftside.css';

import  { selectUser } from "../redux/UserContext/UserSlice"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Sidebar() {
    const user = useSelector(selectUser);
    const [userData , setUserData] = useState({}); 

    useEffect(() => {
        let fetching = true;
        axios.get(`https://secure-stream-79742.herokuapp.com/api/profile/user/profile/${user.id}`, {
           headers: {
               Authorization : `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`
           }
          }).then((res) => {
            if (fetching) {
                setUserData(res.data.data[0]);

            }

        }).catch(e => {
            fetching = false;
            // console.log(e);
        })
        return () => {
            fetching = false;
        }
    },[])


    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                <Avatar src={userData ? userData.profile_image : "/images/avatar.png"} className="sidebar__avatar"> </Avatar>
                <span>{userData.fullname}</span>
                <span>{user.email}</span>
            </div>
            
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                <Link to="/userposts">
                <span>Views of your post</span>
                </Link>
                <span className="sidebar__statNumber">67</span>
                </div>

            </div>
        </div>
    )
}