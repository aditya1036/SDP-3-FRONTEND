import { Avatar } from '@material-ui/core'
import React from 'react'
import './Leftside.css';

import  { selectUser } from "../redux/UserContext/UserSlice"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Sidebar() {
    const user = useSelector(selectUser);


    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                <Avatar src="/images/avatar.png" className="sidebar__avatar"> </Avatar>
                <span>{user.first_name + " " + user.last_name}</span>
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