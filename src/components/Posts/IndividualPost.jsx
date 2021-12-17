import React from 'react'
import "./Posts.css";
import { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InputOption from '../Home/InputOption';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import  { selectUser } from "../redux/UserContext/UserSlice"
import { useSelector } from 'react-redux';
import { color } from '@mui/system';
function IndividualPost({post}) {

    const user = useSelector(selectUser);


    const [isLiked, setIsliked] = useState(post.liked);
    const [likeCount, setLikeCount] = useState(post.like_count);
    const [individualPost, setindividualPost] = useState(post);

    const HandleLike = async () => {

        setIsliked(!isLiked);

        if (!isLiked) {
            setLikeCount(likeCount+1);
        }else {
            setLikeCount(likeCount-1);
        }

        let data = {userId : user.id , postId: post.id, isliked : !isLiked};
        console.log(data)

    let re = await axios.post(`http://localhost:8080/api/activity/create`,data, {
           headers : {
               "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
           }
       })

       console.log(re);

       
        
      }
    
    return (
        <div key={individualPost.id}>
        <div className='post'>
          <div className="post__header">
            <Avatar src={!individualPost.userData.profile_image ? "/images/avatar.png" :individualPost.userData.profile_image}></Avatar>
            <div className="post__info">
              <h2>{individualPost.title}</h2>
              <p>{new Date(individualPost.created_at).toLocaleString()}</p>
            </div>
          </div>


          <div className="post__body">
            <p>{individualPost.description}</p>
            <p>{individualPost.hashtags.map(el => `#${el} `)}</p>
          </div>
          <div className="post__buttons">
            <span onClick={HandleLike} style={{color:isLiked === true ? "blue" : "gray" }}>

            <InputOption Icon={ThumbUpIcon} title={`Like : ${likeCount}`} color={isLiked === true ? "blue" : "gray"} />
            </span>
            <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
            <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
            <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
          </div>
        </div>
      </div>
    )
}

export default IndividualPost
