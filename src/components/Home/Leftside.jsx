import { Avatar } from '@material-ui/core'
import React from 'react'
import './Leftside.css';

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img src="/images/linkedIn.png" alt="background" />
                <Avatar src="/images/avatar.png" className="sidebar__avatar"> </Avatar>
                <h2>Name</h2>
                <h4>Email</h4>
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