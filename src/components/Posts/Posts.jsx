import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL } from '../../config/env';
import { selectUser } from '../redux/UserContext/UserSlice';


const Posts = () => {
    const state = useSelector(selectUser)
    const [posts, setPosts] = useState([])


    useEffect(() => {

        async function userPosts(){
         const res = await fetch(`${API_URL}/api/post/getallpostbyuserid/${state.id}`, {
             method: 'GET',
             headers: {
                 "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
             }
         })
         
         const data = await res.json();
         setPosts([...posts,...data.ListData])
         
        }
        userPosts()
    },[])

    


    const handleDeletePost =async (e,id) =>
    {
        e.preventDefault()

        let newpost = posts.filter(el => el.id !== id);

        setPosts(newpost);

            const res = await fetch(`${API_URL}/api/post/deletepostbyid/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
                }
            })
            
            const data = await res.json();
      
 }
        




    return (
        <div>

<h1>Posts Component</h1>
{posts.length === 0 && <h1>No Post available</h1>}
      { posts &&
    //   <h1>Posts Not Available</h1>:
      posts.map(post => (
        <div key={post.id}>
          <h4>{post.title} </h4>
          <h4>{post.image}</h4>
          <h4>{post.description}</h4>
          <h4>{post.like_count}</h4>
              {post.hashtags.map((tag) => (
            <h4>{tag}</h4>
          ))}

          <button onClick={(e) => handleDeletePost(e, post.id)}>Delete</button>
          {/* <button onClick={handleUpdatePost(post.id)}>Update</button> */}
          </div>
      ))}
            
        </div>
    )
}

export default Posts
