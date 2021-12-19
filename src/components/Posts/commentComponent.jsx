import { Avatar, Button, Card, Paper, TextField } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';
import "./comment.css";
import IndividualComment from './IndividualComment';

function CommentComponent({parentId}) {

    const [comments, setComments] = React.useState([]);
    const [desc, setDesc] = React.useState("");
    const user = useSelector(selectUser);

    React.useEffect(() => {
        let isApiSubscribed = true;
        axios.get(`http://localhost:8080/api/post/getCommentByParentId/${parentId}`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
            }
        }).then(res => {
            if (isApiSubscribed) {
                setComments([...comments, ...res.data])
            }
        });
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };

    }, [])


    const handleSubmit = async () =>  {

        try {


            
            let data = {
                userId: user.id,
                description : desc,
                post_type: "comment",
                parentId: parentId,
                title: "comment"
            }
            
            let res = await axios.post(`http://localhost:8080/api/post/addposts`, data, {
                headers: {
                    "Authorization" : `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                    
                }
            })
            
            console.log(res);

            setComments([res.data.data, ...comments])

            setDesc("")
        }
        catch(e) {
            console.log(e);
        }
            
    }

    

    return (
        <div style={{ padding: "10px", marginBottom: "10px", overflow: "auto", height: comments.length > 3 ? "50vh" : "auto"   }} >

            <div style={{ alignItems: "center", justifyContent: "center", display: "flex", height: "70px", marginBottom: "10px", padding: "10px" }}>


                <TextField
                    margin='none'
                    required
                    onChange={(e) => setDesc(e.target.value)}
                    variant="outlined"
                    fullWidth
                    id="comment"
                    label="comment"
                    name="comment"
                    style={{ marginRight: "10px" }}
                    value={desc}
                />

                <div>

                    <Button onClick={handleSubmit} variant='outlined' color="primary">Comment</Button>
                </div>

            </div>
            

            {comments && comments.map(el => <IndividualComment key={el.id} data={el} setComments={setComments} comments={comments}/>)}


        </div>
    )
}

export default CommentComponent
