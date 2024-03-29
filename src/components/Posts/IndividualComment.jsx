import { Avatar, Card, Paper } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';
import axios from 'axios';

function IndividualComment({data, setComments, comments}) {
    const user = useSelector(selectUser);
// console.log(data);
    const HandleDelete = async () => {

        try {


            let res = await axios.delete(`https://secure-stream-79742.herokuapp.com/api/post/deletepostbyid/${data.id}`, {
                headers: {
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                    
                }
            })
            
            // console.log(res);
            
            let newComments = comments.filter(el => el.id !== data.id);

            setComments(newComments);



            
        }
        catch (e) {
            // console.log(e);
        }

    }


    return (
        <div>


            <Paper elevation={3} className="team__member">
                <Card style={{ borderRadius: "50%", marginRight: "10px" }}>
                    <Avatar src={`${data.userData.profile_image}`} width="20%" height="20%" />
                </Card>
                <div style={{ flex: " 1" }}>
                    <div >
                        <div style={{display: "flex" , justifyContent: "space-between", alignItems: "center"}}>

                        <p >
                           {data.description}
                        </p>
                        <span>
                        {data.userId === user.id &&  <span onClick={HandleDelete}><DeleteIcon color='error'  style={{cursor: "pointer"}} /></span>}
                       
                        </span>
                        </div>
                        <div style={{display: "flex" , justifyContent: "space-between", alignItems: "center"}}>
                        <span style={{ fontSize: ".8rem", fontWeight: "bold", color: "GrayText" }}> Created At : {new Date(data.created_at).toLocaleString()}</span>
                        <span style={{ fontSize: ".8rem", fontWeight: "bold", color: "GrayText" }}> By : {data.userData.fullname ? data.userData.fullname : "Anonymous"}</span>

                        </div>
                    </div>
                </div>

            </Paper>

        </div>
    )
}

export default IndividualComment
