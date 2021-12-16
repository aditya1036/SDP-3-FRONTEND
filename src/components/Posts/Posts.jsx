import React from 'react'
import "./Posts.css";
import {useState , useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InputOption from '../Home/InputOption';
import CircularProgress from '@mui/material/CircularProgress';

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
    
    fetch(`http://localhost:8080/api/post/getallposts?pageNo=${page}`,{
      headers:{
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
      }
    })
      .then((data) => data.json())
      .then((data) => {
        setPosts((posts) => [...posts , ...data.content]);
        last = data.last
        setIsFirstLoad(false);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(
          "Loading image from Unsplash failed. This is likely due to exceeding free API limit. Please clone the repo and try locally using your own API keys or come back in 60 minutes."
        );
      });
    
    
  };

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.offsetHeight
    ) {
      if(last)
      {
      return
      }
      page = page + 1
      fetchPosts();
    }
  };

    return (
        <>

            
{isFirstLoad ? (
                <h3 style={{display:"flex" , alignItems: "center" , justifyContent: "center"}}><CircularProgress disableShrink/></h3>
              ) : (
                <>
                  {posts.length ? (
                    <>
                      {posts.map((post) => (
                      
        <div>
            <div className ='post'>
        <div className="post__header">
            <Avatar src="/images/avatar.png"></Avatar>
            <div className="post__info">
                <h2>{post.title}</h2>
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
                      ))}
                    </>
                  ) : null}

                 
                </>
              )}
              {last &&(
                <div >
                  <div >
                   Loading . . . <CircularProgress disableShrink/>
                  </div>
                </div>
              )}         


        </>
    )
}
