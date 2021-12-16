import React from 'react'
import "./Feed.css";
import InputOption from './InputOption'
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Posts from '../Posts/Posts';
import { Box, Button, Card, Container, createTheme, CssBaseline, Grid, Link, Modal, Paper, TextField, ThemeProvider, Typography, Zoom } from '@material-ui/core';
import { Label, LabelOffOutlined } from '@material-ui/icons';
import Slide from '@mui/material/Slide';

const theme = createTheme();
const style = {
    position: 'absolute',
    top: '20%',
    left: '20%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: "15px",
    // // border: '2px solid #000',
    // boxShadow: 24,
    p: 2
};
export default function Feed() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                                        required
                                                        variant="outlined"
                                                        fullWidth
                                                        id="email"
                                                        label="Post Title"
                                                        name="title"
                                                        autoFocus
                                                    />
                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        variant="outlined"
                                                        minRows={15}
                                                        name="description"
                                                        label="Description"
                                                        id="description"
                                                        multiline
                                                    />

                                                    <Button

                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Create Post ✨
                                                    </Button>

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

            <Posts />
        </div>
    )
}
