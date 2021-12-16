import { Avatar } from '@material-ui/core'
import React from 'react'
import './Leftside.css';

import  { selectUser } from "../redux/UserContext/UserSlice"
import { useSelector } from 'react-redux';


export default function Sidebar() {
    const user = useSelector(selectUser);


    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                <Avatar src="/images/avatar.png" className="sidebar__avatar"> </Avatar>
                <h2>{user.first_name + " " + user.last_name}</h2>
                <h4>{user.email}</h4>
            </div>
            
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                <p>Views of your post</p>
                <p className="sidebar__statNumber">67</p>
                </div>

            </div>
        </div>
    )
}