import React from "react";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Paper,
  ListItemText,
  ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import axios from "axios"; //pour l'envoie des requetes
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

export default function Replies() {
  const [isUpdated2, setIsUpdated2] = React.useState(false);
  const [text, setText] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState("");
  //const [commentId, setCommentId] = React.useState("");

  const [repliesCollection, setRepliesCollection] = React.useState([]);

  async function handleSubmit2(e, id) {
    e.preventDefault();
    try {
      await axios({
        //requete
        method: "POST",
        url: `http://localhost:8080/comments/${id}/addreply`,
        data: {
          text: text,
          //userId: userId,
          //commentId: commentId,
          createdAt: createdAt,
        },
      });
      setText("");
      setIsUpdated2(!isUpdated2);

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 1100,
      });

      Toast.fire({
        icon: "success",
        title: "Reply Added Successfully !",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    }
  }
  /*React.useEffect((id) => {
    axios
      .get(`http://localhost:8080/comments/${id}/getreply`)
      .then((res) => {
        setRepliesCollection(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });*/

  //console.log(repliesCollection);
  return (
    <React.Fragment>
      <TextField
        placeholder="Reply"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          borderColor: "#ced7ff",
          outline: "none",
          borderRadius: "5px",
          fontSize: 15,
          marginLeft: 200,
          marginTop: 5,
          width: 740,
          height: 50,
        }}
      />

      <Button type="submit" onClick={handleSubmit2}>
        <SendIcon
          style={{
            fontSize: 22,
            marginLeft: -24,
            marginTop: 20,
            color: "#768ae5",
          }}
        />
      </Button>
      {repliesCollection?.map((data, i) => {
        return (
          <React.Fragment>
            <Paper
              style={{
                backgroundColor: "#f1f1f1",
                marginTop: 25,
                marginLeft: 220,
                width: 780,
                height: 90,
                borderRadius: "15px",
              }}
            >
              {/*<Grid key={i}>
                <ListItem
                  fullwidth
                  style={{ marginLeft: 50, marginBottom: 15 }}
                >
                  <div style={{ marginLeft: -30, fontSize: 40 }}>
                    <Avatar style={{ color: "#026aa4" }} />
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <ListItemText
                    primary={
                      <Typography style={{ fontWeight: "bold" }}>
                        {data?.userId?.firstName}
                        {data?.userId?.lastName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="textPrimary">
                        commentId: {data?.commentId?._id} <br />
                        {data.text} <br />
                      </Typography>
                    }
                  />
                  <Typography>
                    <AccessTimeIcon
                      style={{
                        width: 20,
                        marginTop: -25,
                        color: "#026aa4",
                        marginLeft: -40,
                      }}
                    />
                    <h6>
                      <div style={{ marginRight: 130, marginTop: -25 }}>
                        {moment(data.createdAt).format("MMMM D, Y , HH:mm")}
                      </div>
                    </h6>
                  </Typography>
                </ListItem>
              </Grid>*/}
            </Paper>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
