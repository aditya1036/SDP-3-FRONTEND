import {Avatar} from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Leftside.css';

import  { selectUser, updateImage } from "../redux/UserContext/UserSlice"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Sidebar() {
    const user = useSelector(selectUser);
    const [userData , setUserData] = useState({}); 

  const dispatch = useDispatch();
    
    const [postCount, setPostCount] = useState(0);
    useEffect(() => {
        let fetching = true;

        
    fetch(`https://secure-stream-79742.herokuapp.com/api/post/getallpostbyuserid/${user.id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
            // console.log(data.numberOfElements)
            setPostCount(data.totalElements)
            // console.log(data)
            // 
        //   setPosts((posts) => [...posts, ...data.content]);
        //   last = data.last;
          // console.log(data.content);
    // setIsFirstLoad(false);
  
    //       setIsLoading(false);
        })
        .catch((e) => {
          // console.log(e);
        });

        axios.get(`https://secure-stream-79742.herokuapp.com/api/profile/user/profile/${user.id}`, {
           headers: {
               Authorization : `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`
           }
          }).then((res) => {
            if (fetching) {
                setUserData(res.data.data[0]);
                dispatch(updateImage(res.data.data[0].profile_image))
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
                <span className="sidebar__statNumber">{postCount}</span>
                </div>

            </div>
        </div>
    )
}