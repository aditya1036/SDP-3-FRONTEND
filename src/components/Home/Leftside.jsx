import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { selectUser } from '../redux/UserContext/UserSlice';
import './Leftside.css';

export default function Sidebar() {

    const user_state = useSelector(selectUser)

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                <Avatar src="/images/avatar.png" className="sidebar__avatar"> </Avatar>
                <h2>{user_state.first_name} {user_state.last_name}</h2>
                <h4>{user_state.email}</h4>
            </div>
            
            <div className="sidebar__stats">
                <div className="sidebar__stat">
                <p>Views of your post</p>
                <Link to="/userposts" style={{textDecoration : "None"}} ><p className="sidebar__statNumber">67</p></Link>
                </div>

            </div>
        </div>
    )
}