import React from "react";
import "./Feed.css";
import CreateIcon from '@mui/icons-material/Create';
import Posts from "../Posts/Posts";
import ModelForm from "./ModelForm";

export default function Feed() {

  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              onClick={handleOpen}
              type="text"
              placeholder="Start a post"
            />
            <button type="submit">Send</button>
          </form>
        </div>

        <div>
        <ModelForm setPosts={setPosts} open={open} setOpen={setOpen} handleClose={handleClose} posts={posts} />
        </div>
      </div>

      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
}
