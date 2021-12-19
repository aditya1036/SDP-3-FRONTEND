import React from 'react'
import "./Feed.css";
import InputOption from './InputOption'
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Posts from '../Posts/Posts';
import { Box, Button, Card, Container, createTheme, CssBaseline, Grid, Input, Link, Modal, Paper, TextField, ThemeProvider, Typography, Zoom } from '@material-ui/core';
import { Label, LabelOffOutlined } from '@material-ui/icons';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"
import { green } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/UserContext/UserSlice';



const theme = createTheme();
const style = {
    position: 'sticky',
    top: '20%',
    left: '20%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: "15px",
    p: 2
};
export default function Feed() {

    const user = useSelector(selectUser);

  const [posts, setPosts] = React.useState([]);


    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [files, setFiles] = React.useState(null)
    const [image, setImage] = React.useState("");
    const [enableUpload, setEnableUpload] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [formErrors, setFormErrors] = React.useState({});
    const [submitfailure, setsubmitfailure] = React.useState(false);

    let errorStatus = false;

    const HandleSubmit = async () => {

        setsubmitfailure(false);

        validate({ "description": description, "title": title });

        if (!errorStatus) {

            try {
                let hashtags = []

                hashtags = description.match(/#[a-z]+/gi);

                if (!hashtags) {
                    hashtags = []
                }

                let postData = {
                    userId: user.id,
                    image: image,
                    description: description,
                    hashtags: hashtags,
                    post_type: "parent",
                    title: title
                }



                let res = await axios.post(`http://localhost:8080/api/post/addposts`, JSON.stringify(postData), {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
                        "Content-Type": "application/json"
                    }
                })

                console.log("RESSS" , res);

                setPosts([ res.data.data, ...posts])
                setTitle("");
                setDescription("")
                setFiles(null)
                setImage("")

                setOpen(false);



            } catch (e) {
                setsubmitfailure(true);
                console.log(e);
            }
        }
    }

    const validate = (data) => {

        const errors = {};
        if (!data.description) {
            errors.description = "Description is required";
        }
        if (!data.title) {
            errors.title = "Title is required";
        }
        setFormErrors(errors);
        if (Object.entries(errors).length > 0) errorStatus = true;
        return errors;
    };


    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const HandleUpload = async () => {

        if (!loading) {
            setSuccess(false);
            setLoading(true);

            setEnableUpload(true);

            let form = new FormData();

            form.append("image", files, files.name);


            let res = await axios.post("http://localhost:3002/upload", form, {
                onUploadProgress: progressEvent => console.log(progressEvent.loaded)
            })

            console.log(res);

            setImage(res.data.publicUrl);

            setSuccess(true);
            setLoading(false);

            setFiles(null);

        }



    }

    const HandleFileChange = async (e) => {
        setEnableUpload(false)
        setFiles(e.target.files[0])


    }


    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input onClick={handleOpen} type="text" placeholder="Start a post" />
                        <button type="submit">Send</button>
                    </form>

                </div>

                <div>


                    <Modal
                        trans
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        {/* <Zoom in={open} style={{ transitionDelay: open ? '500ms' : '0ms' }}> */}
                        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                            <Box sx={style}>
                                <div style={{ textAlign: "center" }}>
                                    <ThemeProvider theme={theme}>
                                        <Container component="main" maxWidth="xl">
                                            <CssBaseline />
                                            <Box
                                                sx={{
                                                    marginTop: 8,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography component="h1" variant="h5">
                                                    Create a post 😁
                                                </Typography>
                                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                                    <TextField
                                                        margin="normal"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                        variant="outlined"
                                                        fullWidth
                                                        id="email"
                                                        label="Post Title"
                                                        name="title"
                                                        autoFocus
                                                        value={title}
                                                    />
                                                    <small style={{ color: "red" }}>{formErrors.title}</small>

                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        fullWidth
                                                        variant="outlined"
                                                        minRows={15}
                                                        name="description"
                                                        label="Description"
                                                        id="description"
                                                        multiline
                                                        value={description}
                                                        style={{ marginBottom: "30px" }}
                                                    />

                                                    <small style={{ color: "red" }}>{formErrors.description}</small>




                                                    <div>

                                                        <label htmlFor="contained-button-file" >
                                                            Upload a Image
                                                            <Input onChange={(e) => HandleFileChange(e)} accept="image/*" id="contained-button-file" multiple type="file" />

                                                        </label>
                                                    </div>
                                                    {/* <Button disabled={enableUpload} variant="raised" component="span" onClick={() => HandleUpload()}>
                                                            Upload
                                                        </Button> */}

                                                    <Box sx={{ m: 1, position: 'relative' }}>
                                                        <Button
                                                            variant="contained"
                                                            sx={buttonSx}
                                                            disabled={enableUpload}
                                                            onClick={HandleUpload}
                                                            color="primary"
                                                        >
                                                            Upload
                                                        </Button>
                                                        {loading && (
                                                            <CircularProgress
                                                                size={24}
                                                                sx={{
                                                                    color: green[500],
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    marginTop: '-12px',
                                                                    marginLeft: '-12px',
                                                                }}
                                                            />
                                                        )}
                                                    </Box>


                                                    <Button
                                                        style={{ marginTop: "30px" }}

                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => HandleSubmit()}
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Create Post ✨
                                                    </Button>

                                                    {submitfailure && (
                                                        <div style={{ color: "red" }}>Invalid title or description</div>
                                                    )}

                                                </Box>
                                            </Box>
                                        </Container>
                                    </ThemeProvider>


                                </div>
                            </Box>
                        </Slide>
                    </Modal>
                </div>
            </div>

            <Posts posts={posts} setPosts={setPosts}/>
        </div>
    )
}
