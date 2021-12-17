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
import IndividualPost from './IndividualPost';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  var last = false
  var page = 0;
  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' });


    fetchPosts();

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);

    fetch(`http://localhost:8080/api/post/getallposts?pageNo=${page}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
      }
    })
      .then((data) => data.json())
      .then((data) => {
        setPosts((posts) => [...posts, ...data.content]);
        last = data.last
        console.log(data.content)

        setIsFirstLoad(false);
        setIsLoading(false);
      })
      .catch((e) => {

        console.log(e);
  
      });

  };


  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.offsetHeight
    ) {
      if (last) {
        return
      }
      page = page + 1
      fetchPosts();
    }
  };

  return (
    <>


      {isFirstLoad ? (
        <h3 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress disableShrink /></h3>
      ) : (
        <>
          {posts.length ? (
            <>
              {posts.map((post) => (

                <IndividualPost key={post.id} post={post}/>

                // <div key={post.id+post.userId}>
                //   <div className='post'>
                //     <div className="post__header">
                //       <Avatar src={!post.userData.profile_image ? "/images/avatar.png" : post.userData.profile_image}></Avatar>
                //       <div className="post__info">
                //         <h2>{post.title}</h2>
                //         <p>{new Date(post.created_at).toLocaleString()}</p>
                //       </div>
                //     </div>


                //     <div className="post__body">
                //       <p>{post.description}</p>
                //       <p>{post.hashtags.map(el => `#${el} `)}</p>
                //     </div>
                //     <div className="post__buttons">
                //       <span onClick={() => HandleLike(post.userId, post.id)}>

                //       <InputOption Icon={ThumbUpIcon} title={`Like : ${post.like_count}`} color={post.liked === true ? "blue" : "gray"} />
                //       </span>
                //       <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
                //       <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
                //       <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
                //     </div>
                //   </div>
                // </div>
              ))}
            </>
          ) : null}


        </>
      )}
      {last && (
        <div >
          <div >
            Loading . . . <CircularProgress disableShrink />
          </div>
        </div>
      )}


    </>
  )
}
