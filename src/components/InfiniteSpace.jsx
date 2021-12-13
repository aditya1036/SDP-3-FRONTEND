import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios';
import './InfiniteSpace.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const InfiniteSpace = () => {
	const [loading , setLoading] = useState(false)
  const [posts , allPosts] = useState([])
  const [pageNo,setPageNo] = useState(0);
  const [last , setLast] = useState(false)

  useEffect(()=>{
		getData();
	},[]);
	

 
  function getData(){

	setLoading(true)
	axios.get(`http://localhost:8080/api/post/getallposts?pageNo=${pageNo}`,{headers:
  {
    'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
  }})
			.then(response => {
				if(pageNo >= 1){
          
					let arr = [...posts,...response.data.content];
					allPosts(arr);
          setLast(response.data.last)
					setLoading(false)
				}
				else{
					allPosts(response.data.content);
					 setLoading(false)
           setLast(response.data.last)
				}
				
			})
			.catch(error => {
				alert('Axios GET request failed');
			})
	} 

  

  
console.log(last)
  const firstEvent = (e) => {
		//console.log(e);
		var bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
		if(bottom){
			let pg = pageNo + 1;
			setPageNo(pg);
			getData();
		}
	}	

  console.log(pageNo)

  return (
	  <>
  
    <div onScroll={firstEvent} className='ImageAPI example' >
			
				

					{posts && posts.map(post => {
						return(
              
              <div className='container' key={post.id}>
               <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
	
    </div>   
      
						)
					})}
<div style={{display: "flex" , alignItems: "center" , justifyContent: "center" }}>
				<h2>{loading && <CircularProgress  disableShrink />}</h2>
        {last && <h3>No More to Load</h3>}
        </div>	
			
           </div>
		</>
  )
}

export default InfiniteSpace
