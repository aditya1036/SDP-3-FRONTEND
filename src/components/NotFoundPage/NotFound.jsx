import React from 'react'
import "./NotFound.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",}}>
            <span style={{fontSize: "2rem", margin:"20px", fontFamily: "Rubik, sans-serif", fontWeight: "500"}}>Looks like you are lost my friend 🧐</span>
            <img
    src="./images/notFound.svg"
    alt="triangle with all three sides equal"
    style={{marginBottom : "20px"}}
  />
  <Link to="/">
<span style={{display:"flex", justifyContent: "space-between", color:"blue", cursor:"pointer"}}>
    <ArrowBackIcon /> Go back
    </span>
    </Link>

       </div>
    )
}

export default NotFound
