import React from "react";
import "./Posts.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import IndividualPost from "./IndividualPost";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import Leftside from '../Home/Leftside';
import Widgets from "../Widgets/Widgets";
import { Skeleton } from "@mui/material";

export default function UserPosts() {
    const user = useSelector(selectUser);
    const [posts, setPosts] = React.useState([])

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  var last = false;
  var page = 0;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchPosts();

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);
    

    fetch(`http://localhost:8080/api/post/getallpostbyuserid/${user.id}?pageNo=${page}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).token
        }`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setPosts((posts) => [...posts, ...data.content]);
        last = data.last;
        console.log(data.content);
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
        return;
      }
      page = page + 1;
      fetchPosts();
    }
  };

  return (
    <div>

      
        
      <Container>
        <Layout>
          <Leftside />
          <div >
          <div style={{marginTop: "-1rem", marginBottom: "1rem", textAlign: "center", fontSize: "2rem",fontFamily: "Rubik, sans-serif", fontWeight: "500"}}>
          {posts.length === 0 ? <span>You don't even have a single post 👏</span> : <span>Here are your posts...</span> }

        </div>

      {isFirstLoad ? (
        <div>
        <SkeletonPosts />
        <SkeletonPosts />
        <SkeletonPosts />
        </div>
      ) : (
          <>
          {posts.length ? (
              <>
              {posts.map((post) => (
                  <IndividualPost key={post.id} post={post} />
                  ))}
            </>
          ) : null}
        </>
      )}
      {last && (
          <div>
          <div>
            Loading . . . <CircularProgress disableShrink />
          </div>
        </div>
      )}
      </div>
        <Widgets />

</Layout>
</Container>
    </div>
  );
}
const Container = styled.div`
  padding-top: 10px;
  max-width: 100%;
`;


const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const SkeletonPosts = () => {
  return  <div className="post">
  <div className="post__header">
  <Skeleton variant="circular" width={40} height={40} animation="pulse" style={{marginRight: "1rem"}}/>
      <Skeleton animation="wave" width={"10vh"} />
    <div className="post__info" style={{float: "right"}}>
    
    <Skeleton animation="wave"  width={"10vh"} />
    </div>
  </div>

  <div className="post__body">
  <Skeleton animation="wave" width={"70vh"} />
  <Skeleton animation="wave" width={"70vh"} />
  <Skeleton animation="wave" width={"70vh"} style={{marginBottom : "1rem"}}/>
  <Skeleton animation="wave" variant="rectangular" height={"50vh"} width={"85vh"}/>

  </div>

  <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
    
  <Skeleton animation="wave" width={"70vh"} height={"10vh"}/>
  </div>
</div>
}