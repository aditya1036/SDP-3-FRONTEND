import React from 'react'
import "./Feed.css";
import InputOption from './InputOption'
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Posts from '../Posts/Posts';
export default function Feed() {
    return (
            <div className="feed">
<div className="feed__inputContainer">
    <div className="feed__input">
        <CreateIcon />
        <form>
            <input type="text" placeholder="Start a post" />
            <button type="submit">Send</button>
        </form>
       
    </div>
</div>

<Posts/>
</div>
    )
}
