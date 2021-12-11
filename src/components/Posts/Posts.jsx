import React from 'react'
import "./Posts.css";
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InputOption from '../Home/InputOption';

export default function Posts() {
    return (
        <div>
            <div className ='post'>
        <div className="post__header">
            <Avatar src="/images/avatar.png"></Avatar>
            <div className="post__info">
                <h2>Name</h2>
                <p>this is the place for description</p>
            </div>
        </div>


         <div className="post__body">
             <p>this is the message place</p>
         </div>
         <div className="post__buttons">
             <InputOption Icon = {ThumbUpIcon}  title ="Like" color ="gray"/>
             <InputOption Icon = {ChatOutlinedIcon}  title ="Comment" color ="gray"/>
             <InputOption Icon = {ShareOutlinedIcon}  title ="Share" color ="gray"/>
             <InputOption Icon = {SendOutlinedIcon}  title ="Send" color ="gray"/>
         </div>   
        </div>
        </div>
    )
}
