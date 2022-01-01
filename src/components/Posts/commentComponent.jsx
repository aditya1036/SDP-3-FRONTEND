import { Avatar, Button, Card, Paper, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UserContext/UserSlice";
import "./comment.css";
import IndividualComment from "./IndividualComment";

let form = {
  description: null,
};

function CommentComponent({ parentId }) {
  const [comments, setComments] = React.useState([]);
  const [desc, setDesc] = React.useState("");
  const user = useSelector(selectUser);
  const [formErrors, setFormErrors] = React.useState(form);
  const [Submitfailure, setSubmitfailure] = React.useState(false);

  let errorStatus = false;

  React.useEffect(() => {
    let isApiSubscribed = true;
    axios
      .get(`http://localhost:8080/api/post/getCommentByParentId/${parentId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("token")).token
          }`,
        },
      })
      .then((res) => {
        if (isApiSubscribed) {
          setComments([...comments, ...res.data]);
        }
      });
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, []);

  const handleSubmit = async () => {
    setSubmitfailure(false);

    let data = {
      userId: user.id,
      description: desc,
      post_type: "comment",
      parentId: parentId,
      title: "comment",
    };
    validate(data);

    if (!errorStatus) {
      try {
        let res = await axios.post(
          `http://localhost:8080/api/post/addposts`,
          data,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("token")).token
              }`,
            },
          }
        );

        console.log(res);

        setComments([res.data.data, ...comments]);

        setDesc("");
      } catch (e) {
        setSubmitfailure(true);
        console.log(e);
      }
    }
  };

  const validate = (data) => {
    const errors = {};
    if (!data.description) {
      errors.description = "description is required";
    }

    setFormErrors(errors);
    if (Object.entries(errors).length > 0) errorStatus = true;
    return errors;
  };

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        overflow: "auto",
        height: comments.length > 3 ? "50vh" : "auto",
      }}
    >
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "70px",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <TextField
          margin="none"
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
        <small style={{ color: "red" }}>{formErrors.description}</small>

        <div>
          <Button onClick={handleSubmit}  variant="contained" color="primary">
            Comment
          </Button>
        </div>
      </div>

      {comments &&
        comments.map((el) => (
          <IndividualComment
            key={el.id}
            data={el}
            setComments={setComments}
            comments={comments}
          />
        ))}
    </div>
  );
}

export default CommentComponent;
