import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import LayoutHome from "../layout/LayoutHome";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios"; //pour l'envoie des requetes
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentIcon from "@mui/icons-material/Comment";
import SortIcon from "@mui/icons-material/Sort";
import "./comment.css";
import {
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  DialogTitle,
  Dialog,
  DialogContent,
  Divider,
  Slide,
  Menu,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";

import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { BiEdit } from "react-icons/bi";
import Replies from "./Replies";

function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items || 1,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  //console.log(total_pages, items.length, per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}
const useStyles = makeStyles((theme) => ({
  commentNum: {
    color: "#026aa4",
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(8),
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    width: theme.spacing(90),
    height: theme.spacing(8),
    overflow: "auto",
    display: "block",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid black",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(0),
    fontSize: "20px",
    outline: 0,
  },
  name: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(3),
  },
  topic: {
    width: 150,
  },

  btnSubmit: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-70),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  btnCancel: {
    backgroundColor: "#000000",
    color: "#fff",
    height: "100%",
    marginTop: theme.spacing(13),
    marginLeft: theme.spacing(-25),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: "20px",
    borderRadius: "30px",
    transition: "transform 0.5s",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#fff",
      transform: "translateY(-5px)",
    },
  },
  responses: {
    marginLeft: theme.spacing(10),
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(-5),
    borderRadius: 5,
    //backgroundColor: "rgb(240 , 240 , 240)",
  },
  paper: {
    width: 900,

    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(4),

    borderRadius: "15px",
    borderColor: "text.primary",
  },

  Delete: {
    marginRight: theme.spacing(11),
  },

  Edit: {
    marginRight: theme.spacing(13),
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CommentsHome = () => {
  const classes = useStyles();

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [topic, setTopic] = React.useState("");
  const [content, setContent] = React.useState("");
  const [topic2, setTopic2] = React.useState("");
  const [content2, setContent2] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [commentCollection, setCommentCollection] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [createdAt, setCreatedAt] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [choice, setChoice] = React.useState("");
  const [filter1, setFilter1] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [searchUser, setSearchUser] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [open2, setOpen2] = React.useState("");
  const [openReply, setOpenReply] = React.useState(false);
  const [isUpdated2, setIsUpdated2] = React.useState(false);
  const [text, setText] = React.useState("");
  const [openUserDial, setOpenUserDial] = React.useState(false);
  const [openDateDial, setOpenDateDial] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openWeekDial, setOpenWeekDial] = React.useState(false);
  const [openMonthDial, setOpenMonthDial] = React.useState(false);
  const [openYearDial, setOpenYearDial] = React.useState(false);
  const [openDayDial, setOpenDayDial] = React.useState(false);
  const [open15DaysDial, setOpen15DaysDial] = React.useState(false);
  const [commentId, setCommentId] = React.useState("");
  const [repliesCollection, setRepliesCollection] = React.useState([]);
  const [likesCollection, setLikesCollection] = React.useState([]);
  const [Likes, setLikes] = React.useState(0);
  const [Dislikes, setDislikes] = React.useState(0);
  const [LikeAction, setLikeAction] = React.useState(null);
  const [DislikeAction, setDislikeAction] = React.useState(null);
  const [disliked, setDisliked] = React.useState(false);

  const handleLikes = (id, userId) => {
    if (LikeAction == null) {
      axios
        .post(`http://localhost:8080/comments/${id}/addlike`)
        .then((res) => {
          console.log(res.data);
          setLikes(Likes + 1);
          setLikeAction("liked");
          console.log(LikeAction);
          console.log(Likes);

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 1300,
          });

          Toast.fire({
            customClass: {
              container: "myswal",
            },
            icon: "info",
            title: res.data,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`http://localhost:8080/comments/${id}/unlike`)
        .then((res) => {
          console.log(res.data);

          setLikes(Likes - 1);
          setLikeAction(null);

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 1300,
          });

          Toast.fire({
            customClass: {
              container: "myswal",
            },
            icon: "info",
            title: "You unliked this comment.",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDislikes = (id) => {
    if (DislikeAction == null) {
      axios
        .post(`http://localhost:8080/comments/${id}/adddislike`)
        .then((res) => {
          console.log(res.data);
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          console.log(DislikeAction);
          console.log(Dislikes);

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 1300,
          });

          Toast.fire({
            customClass: {
              container: "myswal",
            },
            icon: "info",
            title: res.data,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`http://localhost:8080/comments/${id}/undislike`)
        .then((res) => {
          console.log(res.data);

          setDislikes(Dislikes - 1);
          setDislikeAction(null);

          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 1300,
          });

          Toast.fire({
            customClass: {
              container: "myswal",
            },
            icon: "info",
            title: "You undisliked this comment.",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClickOpenDateDial = (event) => {
    setAnchorEl(event.currentTarget);
    //setOpenDateDial(true);
  };

  const handleCloseDateDial = () => {
    setAnchorEl(null);
  };
  const handleClickOpenDayDial = () => {
    setOpenDayDial(true);
  };

  const handleCloseDayDial = () => {
    setOpenDayDial(false);
  };
  const handleClickOpenWeekDial = () => {
    setOpenWeekDial(true);
  };

  const handleCloseWeekDial = () => {
    setOpenWeekDial(false);
  };
  const handleClickOpenMonthDial = () => {
    setOpenMonthDial(true);
  };

  const handleCloseMonthDial = () => {
    setOpenMonthDial(false);
  };
  const handleCloseYearDial = () => {
    setOpenYearDial(false);
  };
  const handleClickOpenYearDial = () => {
    setOpenYearDial(true);
  };
  const handleClose15DaysDial = () => {
    setOpen15DaysDial(false);
  };
  const handleClickOpen15DaysDial = () => {
    setOpen15DaysDial(true);
  };

  const handleClickOpenUserDial = () => {
    setOpenUserDial(true);
  };

  const handleCloseUserDial = () => {
    setOpenUserDial(false);
  };

  const getCommentByUser = async (userId) => {
    axios
      .get(`http://localhost:8080/comments/getCommentByUser/:userId?`)
      .then((res) => {
        setFilteredUsers(res.data.reverse());

        //console.log(filteredUsers);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //console.log();

  const handleClick2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleChange = (event, value) => {
    setPage(paginator(commentCollection, value, 1).page);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/comments/getcomment")
      .then((res) => {
        setCommentCollection(res.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isUpdated, content]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios({
        //requete
        method: "POST",
        url: "http://localhost:8080/comments/addcomment",
        data: {
          //donnees de la requete
          topic: topic,
          content: content,
          userId: userId,

          createdAt: createdAt,
        },
      });

      //setRole("");
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 1100,
      });

      Toast.fire({
        icon: "success",
        title: "Comment Added Successfully !",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      });
    } finally {
      setIsUpdated(!isUpdated);
      setContent("");
      setTopic("");
    }
  }

  const handleDeleteComment = (_id) => {
    Swal.fire({
      customClass: {
        container: "myswal",
      },
      title: "Do You Realy Want To Delete This Comment ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8080/comments/deletecomment/${_id}`)
          .then((res) => {
            console.log(res.data);
            // setCommentCollection([res.data]);
            //console.log("c bon deleted");
            setIsUpdated(!isUpdated);

            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });

            Toast.fire({
              customClass: {
                container: "myswal",
              },
              icon: "success",
              title: "Comment Deleted Successfully !",
            });
          })
          .catch(function (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1100,
            });

            Toast.fire({
              customClass: {
                container: "myswal",
              },
              icon: "error",
              title: error.response.data,
            });
          });
      }
    });
  };
  const handleClickOpen = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/comments/getCommentById/${id}`,
      });
      const { _id, topic, content } = response.data;
      setTopic(topic);
      setContent(content);
      setOpen2(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateComment = async (id) => {
    //e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8080/comments/updatecomment/${id}`,
        data: {
          topic: topic,
          content: content,
        },
      });
      //console.log("c bon");

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        customClass: {
          container: "myswal",
        },
        icon: "success",
        title: "Comment Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        customClass: {
          container: "myswal",
        },
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      }).then(function () {
        setOpen2(true);
      });
    } finally {
      setOpen2(false);
      setIsUpdated(!isUpdated);
    }
  };

  ////////////////////////////////////////////// 1 week filter ///////////////////////////////////////
  var seventhDay = new Date();
  seventhDay.setDate(seventhDay.getDate() - 7);
  var filter2 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= seventhDay.getTime();
  });
  //console.log(filter2, "1 week");
  ////////////////////////////////////////////// 1 month filter ///////////////////////////////////////

  var thirteenththDay = new Date();
  thirteenththDay.setDate(thirteenththDay.getDate() - 30);

  var filter3 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= thirteenththDay.getTime();
  });
  //console.log(filter3, "1 month");
  ////////////////////////////////////////////// 1 year filter ///////////////////////////////////////
  var lastDayInYear = new Date();
  lastDayInYear.setDate(lastDayInYear.getDate() - 365);

  var filter4 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= lastDayInYear.getTime();
  });
  //console.log(filter4, "1 year");
  ////////////////////////////////////////////// 15 days filter ///////////////////////////////////////
  var lastDayIn15 = new Date();
  lastDayIn15.setDate(lastDayIn15.getDate() - 15);

  var filter5 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= lastDayIn15.getTime();
  });

  ////////////////////////////////////////////// last day filter ///////////////////////////////////////
  var lastDay = new Date();
  lastDay.setDate(lastDay.getDate() - 2);

  var filter6 = commentCollection.filter((data, i) => {
    return new Date(data.createdAt).getTime() >= lastDay.getTime();
  });

  /////////////////////////////////////////

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    //console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = commentCollection.filter((data, i) => {
        return Object.values(data, i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      //console.log(filteredData);
      //console.log(commentCollection.userId.firstName);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(commentCollection);
    }
  };

  const handleClickReply = (id) => {
    if (id) {
      setOpenReply(!openReply);
      console.log(id);
    }
  };
  const handleTotalUser = (id) => {
    getCommentByUser(id);
    handleClickOpenUserDial();
  };

  return (
    <div
      style={{
        backgroundColor: "#eceff1",
        width: "100%",
        height: 900,
        marginTop: "100px",

        //marginLeft: "110px",
      }}
    >
      <LayoutHome />
      <AppBar
        position="fixed"
        style={{ marginTop: 60, backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton style={{ color: "#026aa4", marginLeft: 60 }}>
            <EditIcon />
          </IconButton>
          <Typography variant="h6" className={classes.commentNum}>
            Comments Section : Feel Free !
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          padding: "2em 5em",
          marginLeft: 13.5,

          width: 1215,
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar className={classes.large} style={{ color: "#026aa4" }} />

          <Grid item xs={10}>
            <TextField
              name="topic"
              //required
              id="topic"
              label="Click here to add a Topic"
              variant="outlined"
              style={{ width: 950 }}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Grid>
        </div>
        <div>
          <React.Fragment>
            <Box
              style={{ marginLeft: -10 }}
              component="form"
              sx={{ mt: 2 }}
              onSubmit={handleSubmit}
              spacing={5}
            >
              <Grid container spacing={3}>
                <Grid item xs={10} style={{ marginLeft: "90px" }}>
                  <TextField
                    //required
                    label="Express your thoughts !"
                    variant="outlined"
                    multiline
                    rows={2.5}
                    style={{ width: 950 }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  sm={3}
                  className={classes.name}
                  style={{ marginLeft: "95px" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    <SendIcon />
                    &nbsp;&nbsp; Post It
                  </Button>
                </Grid>
                <Grid item sm={3} style={{ marginLeft: "95px" }}>
                  <Button
                    type="reset"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
              <div style={{ marginTop: 50 }}>
                <Divider style={{ height: 1.5 }} />
                <SearchIcon
                  style={{
                    color: "#026aa4",
                    marginTop: 60,
                    marginLeft: 340,
                    fontSize: 35,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Search Comment "
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                  style={{
                    marginLeft: 10,
                    marginTop: 50,
                    width: 350,
                    color: "#026aa4",
                  }}
                  onChange={(e) => searchItems(e.target.value)}
                />
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 15 }}>
                      This search functionality filter comments basing on it's
                      "Topic", "Content" and the day in which was posted,
                      written as : "YYYY-MM-DD" ( for example : "2020-01-14")
                    </Typography>
                  }
                >
                  <InfoIcon
                    style={{ color: "#026aa4", marginLeft: 5, marginBottom: 5 }}
                  />
                </Tooltip>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 13 }}>
                      Display my comments list
                    </Typography>
                  }
                >
                  <IconButton onClick={handleTotalUser}>
                    <img
                      src="filtericon.webp"
                      alt=""
                      style={{ width: 35, marginTop: -25, marginLeft: 17 }}
                    />
                  </IconButton>
                </Tooltip>
                {/*//////////////////////////////////////Filter Date/////////////////////////////////////////////////////////////////*/}

                <Tooltip
                  title={
                    <Typography style={{ fontSize: 13 }}>
                      Filter comments by date
                    </Typography>
                  }
                >
                  <IconButton onClick={handleClickOpenDateDial}>
                    <img
                      src="filtericon3.webp"
                      alt=""
                      style={{ width: 35, marginTop: -20, marginLeft: 28 }}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseDateDial}
                >
                  <img
                    src="1all.png"
                    alt=""
                    style={{ width: 45, marginLeft: 10 }}
                  />
                  &nbsp;&nbsp;
                  <MenuItem
                    style={{ fontSize: 20, marginTop: -35 }}
                    onClick={handleClickOpenDayDial}
                  >
                    Last Day Comments
                  </MenuItem>
                  <br />
                  <br />
                  <img
                    src="7.jpg"
                    alt=""
                    style={{ width: 45, marginLeft: 10 }}
                  />
                  &nbsp;&nbsp;
                  <MenuItem
                    style={{ fontSize: 20, marginTop: -35 }}
                    onClick={handleClickOpenWeekDial}
                  >
                    Last Week Comments
                  </MenuItem>
                  &nbsp;
                  <br />
                  <br />
                  <img
                    src="15.jpg"
                    alt=""
                    style={{ width: 45, marginLeft: 10 }}
                  />
                  &nbsp;&nbsp;
                  <MenuItem
                    style={{ fontSize: 20, marginTop: -35 }}
                    onClick={handleClickOpen15DaysDial}
                  >
                    Last 15 Days Comments
                  </MenuItem>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <br />
                  <br />
                  <img
                    src="1all.png"
                    alt=""
                    style={{ width: 45, marginLeft: 10 }}
                  />
                  &nbsp;&nbsp;
                  <MenuItem
                    style={{ fontSize: 20, marginTop: -35 }}
                    onClick={handleClickOpenMonthDial}
                  >
                    Last Month Comments
                  </MenuItem>
                  &nbsp;
                  <br />
                  <br />
                  <img
                    src="1all.png"
                    alt=""
                    style={{ width: 45, marginLeft: 10 }}
                  />
                  &nbsp;&nbsp;
                  <MenuItem
                    style={{ fontSize: 20, marginTop: -35 }}
                    onClick={handleClickOpenYearDial}
                  >
                    Last Year Comments
                  </MenuItem>
                  &nbsp;
                  <br />
                </Menu>
                {/*//////////////////////////////////////Filter Date/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////Filter last day Dialog/////////////////////////////////////////////////////////////////*/}

                <div>
                  <Dialog
                    fullScreen
                    open={openDayDial}
                    onClose={handleCloseDayDial}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      style={{ backgroundColor: "gray" }}
                    >
                      <Toolbar>
                        <img src="Logo.png" alt="" style={{ width: 160 }} />
                        <CommentIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 330,
                            fontSize: 27,
                          }}
                        />
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              The comments are sorted in descending order.
                            </Typography>
                          }
                        >
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            style={{ marginLeft: 30, color: "#e0f2f1" }}
                            variant="h5"
                            component="div"
                          >
                            Last Day Comments List
                          </Typography>
                        </Tooltip>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseDayDial}
                          aria-label="close"
                          style={{ marginLeft: 380 }}
                        >
                          <CloseIcon style={{ fontSize: 32 }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <img
                      src="1day.png"
                      alt=""
                      style={{
                        width: 190,
                        marginTop: 120,
                        marginLeft: 35,
                      }}
                    />
                    <Typography
                      style={{
                        marginLeft: 55,
                        marginTop: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Total Comments : {filter6.length}
                    </Typography>
                    <List style={{ marginTop: -266 }}>
                      {filter6.map((data, i) => {
                        return (
                          <div style={{ marginLeft: 220, marginTop: -35 }}>
                            <Paper
                              className={classes.paper}
                              style={{
                                backgroundColor: "#f0f0f0",
                                marginTop: 80,
                                marginRight: 70,
                              }}
                            >
                              <Grid key={i} className={classes.responses}>
                                <ListItem fullwidth>
                                  <div
                                    style={{ marginLeft: -30, fontSize: 40 }}
                                  >
                                    <Avatar style={{ color: "#026aa4" }} />
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#026aa4",
                                        }}
                                      >
                                        {data?.userId?.firstName} &nbsp;
                                        {data?.userId?.lastName}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        color="textPrimary"
                                      >
                                        Topic : {data.topic} <br />
                                        Content : {data.content}
                                      </Typography>
                                    }
                                  />
                                  <Typography>
                                    <AccessTimeIcon
                                      style={{
                                        width: 20,
                                        marginTop: -25,
                                        color: "#026aa4",
                                        marginLeft: 13,
                                      }}
                                    />
                                    <h6>
                                      <div
                                        style={{
                                          marginLeft: 50,
                                          marginTop: -25,
                                        }}
                                      >
                                        {moment(data.createdAt).format(
                                          "MMMM D, Y, HH:mm"
                                        )}
                                      </div>
                                    </h6>
                                  </Typography>
                                  <Button
                                    icon
                                    className={classes.Delete}
                                    onClick={(e) =>
                                      handleDeleteComment(
                                        data._id
                                      ).setFilteredUsers(data, i)
                                    }
                                  >
                                    <DeleteIcon style={{ color: "#026aa4" }} />
                                  </Button>
                                  <Button
                                    icon
                                    //className={classes.Delete}
                                    //onClick={
                                    onClick={() => handleClickOpen(data._id)}
                                  >
                                    <BiEdit
                                      style={{
                                        color: "#026aa4",
                                        marginLeft: -220,
                                        fontSize: 24,
                                      }}
                                    />
                                  </Button>
                                </ListItem>
                              </Grid>
                            </Paper>
                          </div>
                        );
                      })}
                    </List>
                    <br />
                  </Dialog>
                </div>
                {/*//////////////////////////////////////Filter last day Dialog/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////Filter Per Week Dialog/////////////////////////////////////////////////////////////////*/}

                <div>
                  <Dialog
                    fullScreen
                    open={openWeekDial}
                    onClose={handleCloseWeekDial}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      style={{ backgroundColor: "gray" }}
                    >
                      <Toolbar>
                        <img src="Logo.png" alt="" style={{ width: 160 }} />
                        <CommentIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 330,
                            fontSize: 27,
                          }}
                        />
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              The comments are sorted in descending order.
                            </Typography>
                          }
                        >
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            style={{ marginLeft: 30, color: "#e0f2f1" }}
                            variant="h5"
                            component="div"
                          >
                            Last Week Comments List
                          </Typography>
                        </Tooltip>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseWeekDial}
                          aria-label="close"
                          style={{ marginLeft: 380 }}
                        >
                          <CloseIcon style={{ fontSize: 32 }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <img
                      src="7days.jpg"
                      alt=""
                      style={{
                        width: 190,
                        marginTop: 120,
                        marginLeft: 35,
                      }}
                    />
                    <Typography
                      style={{
                        marginLeft: 55,
                        marginTop: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Total Comments : {filter2.length}
                    </Typography>
                    <List style={{ marginTop: -266 }}>
                      {filter2.map((data, i) => {
                        return (
                          <div style={{ marginLeft: 220, marginTop: -35 }}>
                            <Paper
                              className={classes.paper}
                              style={{
                                backgroundColor: "#f0f0f0",
                                marginTop: 80,
                                marginRight: 70,
                              }}
                            >
                              <Grid key={i} className={classes.responses}>
                                <ListItem fullwidth>
                                  <div
                                    style={{ marginLeft: -30, fontSize: 40 }}
                                  >
                                    <Avatar style={{ color: "#026aa4" }} />
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#026aa4",
                                        }}
                                      >
                                        {data?.userId?.firstName} &nbsp;
                                        {data?.userId?.lastName}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        color="textPrimary"
                                      >
                                        Topic : {data.topic} <br />
                                        Content : {data.content}
                                      </Typography>
                                    }
                                  />
                                  <Typography>
                                    <AccessTimeIcon
                                      style={{
                                        width: 20,
                                        marginTop: -25,
                                        color: "#026aa4",
                                        marginLeft: 13,
                                      }}
                                    />
                                    <h6>
                                      <div
                                        style={{
                                          marginLeft: 50,
                                          marginTop: -25,
                                        }}
                                      >
                                        {moment(data.createdAt).format(
                                          "MMMM D, Y, HH:mm"
                                        )}
                                      </div>
                                    </h6>
                                  </Typography>
                                  <Button
                                    icon
                                    className={classes.Delete}
                                    onClick={(e) =>
                                      handleDeleteComment(
                                        data._id
                                      ).setFilteredUsers(data, i)
                                    }
                                  >
                                    <DeleteIcon style={{ color: "#026aa4" }} />
                                  </Button>
                                  <Button
                                    icon
                                    //className={classes.Delete}
                                    //onClick={
                                    onClick={() => handleClickOpen(data._id)}
                                  >
                                    <BiEdit
                                      style={{
                                        color: "#026aa4",
                                        marginLeft: -220,
                                        fontSize: 24,
                                      }}
                                    />
                                  </Button>
                                </ListItem>
                              </Grid>
                            </Paper>
                          </div>
                        );
                      })}
                    </List>
                    <br />
                  </Dialog>
                </div>
                {/*//////////////////////////////////////Filter Per Week Dialog/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////Filter Per Month Dialog/////////////////////////////////////////////////////////////////*/}

                <div>
                  <Dialog
                    fullScreen
                    open={openMonthDial}
                    onClose={handleCloseMonthDial}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      style={{ backgroundColor: "gray" }}
                    >
                      <Toolbar>
                        <img src="Logo.png" alt="" style={{ width: 160 }} />
                        <CommentIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 330,
                            fontSize: 27,
                          }}
                        />
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              The comments are sorted in descending order.
                            </Typography>
                          }
                        >
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            style={{ marginLeft: 30, color: "#e0f2f1" }}
                            variant="h5"
                            component="div"
                          >
                            Last Month Comments List
                          </Typography>
                        </Tooltip>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseMonthDial}
                          aria-label="close"
                          style={{ marginLeft: 380 }}
                        >
                          <CloseIcon style={{ fontSize: 32 }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <img
                      src="1month.png"
                      alt=""
                      style={{
                        width: 190,
                        marginTop: 120,
                        marginLeft: 35,
                      }}
                    />
                    <Typography
                      style={{
                        marginLeft: 55,
                        marginTop: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Total Comments : {filter3.length}
                    </Typography>
                    <List style={{ marginTop: -266 }}>
                      {filter3.map((data, i) => {
                        return (
                          <div style={{ marginLeft: 220, marginTop: -35 }}>
                            <Paper
                              className={classes.paper}
                              style={{
                                backgroundColor: "#f0f0f0",
                                marginTop: 80,
                                marginRight: 70,
                              }}
                            >
                              <Grid key={i} className={classes.responses}>
                                <ListItem fullwidth>
                                  <div
                                    style={{ marginLeft: -30, fontSize: 40 }}
                                  >
                                    <Avatar style={{ color: "#026aa4" }} />
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#026aa4",
                                        }}
                                      >
                                        {data?.userId?.firstName} &nbsp;
                                        {data?.userId?.lastName}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        color="textPrimary"
                                      >
                                        Topic : {data.topic} <br />
                                        Content : {data.content}
                                      </Typography>
                                    }
                                  />
                                  <Typography>
                                    <AccessTimeIcon
                                      style={{
                                        width: 20,
                                        marginTop: -25,
                                        color: "#026aa4",
                                        marginLeft: 13,
                                      }}
                                    />
                                    <h6>
                                      <div
                                        style={{
                                          marginLeft: 50,
                                          marginTop: -25,
                                        }}
                                      >
                                        {moment(data.createdAt).format(
                                          "MMMM D, Y, HH:mm"
                                        )}
                                      </div>
                                    </h6>
                                  </Typography>
                                  <Button
                                    icon
                                    className={classes.Delete}
                                    onClick={(e) =>
                                      handleDeleteComment(
                                        data._id
                                      ).setFilteredUsers(data, i)
                                    }
                                  >
                                    <DeleteIcon style={{ color: "#026aa4" }} />
                                  </Button>
                                  <Button
                                    icon
                                    //className={classes.Delete}
                                    //onClick={
                                    onClick={() => handleClickOpen(data._id)}
                                  >
                                    <BiEdit
                                      style={{
                                        color: "#026aa4",
                                        marginLeft: -220,
                                        fontSize: 24,
                                      }}
                                    />
                                  </Button>
                                </ListItem>
                              </Grid>
                            </Paper>
                          </div>
                        );
                      })}
                    </List>
                    <br />
                  </Dialog>
                </div>
                {/*//////////////////////////////////////Filter Per Month Dialog/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////Filter Per Year Dialog/////////////////////////////////////////////////////////////////*/}

                <div>
                  <Dialog
                    fullScreen
                    open={openYearDial}
                    onClose={handleCloseYearDial}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      style={{ backgroundColor: "gray" }}
                    >
                      <Toolbar>
                        <img src="Logo.png" alt="" style={{ width: 160 }} />
                        <CommentIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 330,
                            fontSize: 27,
                          }}
                        />
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              The comments are sorted in descending order.
                            </Typography>
                          }
                        >
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            style={{ marginLeft: 30, color: "#e0f2f1" }}
                            variant="h5"
                            component="div"
                          >
                            Last Year Comments List
                          </Typography>
                        </Tooltip>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseYearDial}
                          aria-label="close"
                          style={{ marginLeft: 380 }}
                        >
                          <CloseIcon style={{ fontSize: 32 }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <img
                      src="1year.jpg"
                      alt=""
                      style={{
                        width: 190,
                        marginTop: 120,
                        marginLeft: 35,
                      }}
                    />
                    <Typography
                      style={{
                        marginLeft: 55,
                        marginTop: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Total Comments : {filter4.length}
                    </Typography>
                    <List style={{ marginTop: -266 }}>
                      {filter4.map((data, i) => {
                        return (
                          <div style={{ marginLeft: 220, marginTop: -35 }}>
                            <Paper
                              className={classes.paper}
                              style={{
                                backgroundColor: "#f0f0f0",
                                marginTop: 80,
                                marginRight: 70,
                              }}
                            >
                              <Grid key={i} className={classes.responses}>
                                <ListItem fullwidth>
                                  <div
                                    style={{ marginLeft: -30, fontSize: 40 }}
                                  >
                                    <Avatar style={{ color: "#026aa4" }} />
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#026aa4",
                                        }}
                                      >
                                        {data?.userId?.firstName} &nbsp;
                                        {data?.userId?.lastName}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        color="textPrimary"
                                      >
                                        Topic : {data.topic} <br />
                                        Content : {data.content}
                                      </Typography>
                                    }
                                  />
                                  <Typography>
                                    <AccessTimeIcon
                                      style={{
                                        width: 20,
                                        marginTop: -25,
                                        color: "#026aa4",
                                        marginLeft: 13,
                                      }}
                                    />
                                    <h6>
                                      <div
                                        style={{
                                          marginLeft: 50,
                                          marginTop: -25,
                                        }}
                                      >
                                        {moment(data.createdAt).format(
                                          "MMMM D, Y, HH:mm"
                                        )}
                                      </div>
                                    </h6>
                                  </Typography>
                                  <Button
                                    icon
                                    className={classes.Delete}
                                    onClick={(e) =>
                                      handleDeleteComment(
                                        data._id
                                      ).setFilteredUsers(data, i)
                                    }
                                  >
                                    <DeleteIcon style={{ color: "#026aa4" }} />
                                  </Button>
                                  <Button
                                    icon
                                    //className={classes.Delete}
                                    //onClick={
                                    onClick={() => handleClickOpen(data._id)}
                                  >
                                    <BiEdit
                                      style={{
                                        color: "#026aa4",
                                        marginLeft: -220,
                                        fontSize: 24,
                                      }}
                                    />
                                  </Button>
                                </ListItem>
                              </Grid>
                            </Paper>
                          </div>
                        );
                      })}
                    </List>
                    <br />
                  </Dialog>
                </div>
                {/*//////////////////////////////////////Filter Per Year Dialog/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////Filter Per 10 days Dialog/////////////////////////////////////////////////////////////////*/}

                <div>
                  <Dialog
                    fullScreen
                    open={open15DaysDial}
                    onClose={handleClose15DaysDial}
                    TransitionComponent={Transition}
                  >
                    <AppBar
                      sx={{ position: "relative" }}
                      style={{ backgroundColor: "gray" }}
                    >
                      <Toolbar>
                        <img src="Logo.png" alt="" style={{ width: 160 }} />
                        <CommentIcon
                          style={{
                            marginTop: 3,
                            marginLeft: 330,
                            fontSize: 27,
                          }}
                        />
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 18 }}>
                              The comments are sorted in descending order.
                            </Typography>
                          }
                        >
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            style={{ marginLeft: 30, color: "#e0f2f1" }}
                            variant="h5"
                            component="div"
                          >
                            Last 15 Days Comments List
                          </Typography>
                        </Tooltip>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose15DaysDial}
                          aria-label="close"
                          style={{ marginLeft: 380 }}
                        >
                          <CloseIcon style={{ fontSize: 32 }} />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <img
                      src="15days.jpg"
                      alt=""
                      style={{
                        width: 190,
                        marginTop: 120,
                        marginLeft: 35,
                      }}
                    />
                    <Typography
                      style={{
                        marginLeft: 55,
                        marginTop: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Total Comments : {filter5.length}
                    </Typography>
                    <List style={{ marginTop: -266 }}>
                      {filter5.map((data, i) => {
                        return (
                          <div style={{ marginLeft: 220, marginTop: -35 }}>
                            <Paper
                              className={classes.paper}
                              style={{
                                backgroundColor: "#f0f0f0",
                                marginTop: 80,
                                marginRight: 70,
                              }}
                            >
                              <Grid key={i} className={classes.responses}>
                                <ListItem fullwidth>
                                  <div
                                    style={{ marginLeft: -30, fontSize: 40 }}
                                  >
                                    <Avatar style={{ color: "#026aa4" }} />
                                  </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontWeight: "bold",
                                          color: "#026aa4",
                                        }}
                                      >
                                        {data?.userId?.firstName} &nbsp;
                                        {data?.userId?.lastName}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography
                                        variant="body2"
                                        color="textPrimary"
                                      >
                                        Topic : {data.topic} <br />
                                        Content : {data.content}
                                      </Typography>
                                    }
                                  />
                                  <Typography>
                                    <AccessTimeIcon
                                      style={{
                                        width: 20,
                                        marginTop: -25,
                                        color: "#026aa4",
                                        marginLeft: 13,
                                      }}
                                    />
                                    <h6>
                                      <div
                                        style={{
                                          marginLeft: 50,
                                          marginTop: -25,
                                        }}
                                      >
                                        {moment(data.createdAt).format(
                                          "MMMM D, Y, HH:mm"
                                        )}
                                      </div>
                                    </h6>
                                  </Typography>
                                  <Button
                                    icon
                                    className={classes.Delete}
                                    onClick={(e) =>
                                      handleDeleteComment(
                                        data._id
                                      ).setFilteredUsers(data, i)
                                    }
                                  >
                                    <DeleteIcon style={{ color: "#026aa4" }} />
                                  </Button>
                                  <Button
                                    icon
                                    //className={classes.Delete}
                                    //onClick={
                                    onClick={() => handleClickOpen(data._id)}
                                  >
                                    <BiEdit
                                      style={{
                                        color: "#026aa4",
                                        marginLeft: -220,
                                        fontSize: 24,
                                      }}
                                    />
                                  </Button>
                                </ListItem>
                              </Grid>
                            </Paper>
                          </div>
                        );
                      })}
                    </List>
                    <br />
                  </Dialog>
                </div>
                {/*//////////////////////////////////////Filter Per 10 days Dialog/////////////////////////////////////////////////////////////////*/}
                {/*////////////////////////////////////// End Filter Date/////////////////////////////////////////////////////////////////*/}

                {/*//////////////////////////////////////total comments/////////////////////////////////////////////////////////////////*/}

                <Typography
                  style={{
                    marginTop: -57,
                    marginLeft: 130,
                    fontWeight: "bold",
                  }}
                >
                  Total Comments : {commentCollection.length}
                </Typography>
                {/*//////////////////////////////////////total comments end/////////////////////////////////////////////////////////////////*/}
              </div>

              <br />
              <div>
                <Dialog
                  fullScreen
                  open={openUserDial}
                  onClose={handleCloseUserDial}
                  TransitionComponent={Transition}
                >
                  <AppBar
                    sx={{ position: "relative" }}
                    style={{ backgroundColor: "#d32f2f" }}
                  >
                    <Toolbar>
                      <img src="Logo.png" alt="" style={{ width: 160 }} />
                      <CommentIcon
                        style={{
                          marginTop: 3,
                          marginLeft: 370,
                          fontSize: 27,
                          color: "#026aa4",
                        }}
                      />
                      <Tooltip
                        title={
                          <Typography style={{ fontSize: 18 }}>
                            The comments are sorted in descending order.
                          </Typography>
                        }
                      >
                        <Typography
                          sx={{ ml: 2, flex: 1 }}
                          style={{ marginLeft: 30 }}
                          variant="h5"
                          component="div"
                        >
                          My Comments List
                        </Typography>
                      </Tooltip>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseUserDial}
                        aria-label="close"
                        style={{ marginLeft: 380 }}
                      >
                        <CloseIcon style={{ fontSize: 32 }} />
                      </IconButton>
                    </Toolbar>
                  </AppBar>

                  <br />
                  <img
                    src="MyComment.png"
                    alt=""
                    style={{ width: 280, marginTop: 60 }}
                  />
                  <Typography
                    style={{
                      marginLeft: 70,
                      marginTop: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Total Comments : {filteredUsers.length}
                  </Typography>
                  <List style={{ marginTop: -300, marginLeft: 120 }}>
                    {filteredUsers.map((data, i) => {
                      return (
                        <div style={{ marginLeft: 130, marginTop: -35 }}>
                          <Paper
                            className={classes.paper}
                            style={{
                              backgroundColor: "#f0f0f0",
                              marginTop: 80,
                            }}
                          >
                            <Grid key={i} className={classes.responses}>
                              <ListItem fullwidth>
                                <div style={{ marginLeft: -30, fontSize: 40 }}>
                                  <Avatar style={{ color: "#026aa4" }} />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <ListItemText
                                  primary={
                                    <Typography
                                      style={{
                                        fontWeight: "bold",
                                        color: "#026aa4",
                                      }}
                                    >
                                      {data?.userId?.firstName} &nbsp;
                                      {data?.userId?.lastName}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      Topic : {data.topic} <br />
                                      Content : {data.content}
                                    </Typography>
                                  }
                                />
                                <Typography>
                                  <AccessTimeIcon
                                    style={{
                                      width: 20,
                                      marginTop: -25,
                                      color: "#026aa4",
                                      marginLeft: 13,
                                    }}
                                  />
                                  <h6>
                                    <div
                                      style={{
                                        marginLeft: 50,
                                        marginTop: -25,
                                      }}
                                    >
                                      {moment(data.createdAt).format(
                                        "MMMM D, Y, HH:mm"
                                      )}
                                    </div>
                                  </h6>
                                </Typography>
                                <Button
                                  icon
                                  className={classes.Delete}
                                  onClick={(e) =>
                                    handleDeleteComment(
                                      data._id
                                    ).setFilteredUsers(data, i)
                                  }
                                >
                                  <DeleteIcon style={{ color: "#026aa4" }} />
                                </Button>
                                <Button
                                  icon
                                  //className={classes.Delete}
                                  //onClick={
                                  onClick={() => handleClickOpen(data._id)}
                                >
                                  <BiEdit
                                    style={{
                                      color: "#026aa4",
                                      marginLeft: -220,
                                      fontSize: 24,
                                    }}
                                  />
                                </Button>
                              </ListItem>
                            </Grid>
                          </Paper>
                        </div>
                      );
                    })}
                  </List>
                </Dialog>
              </div>

              {searchInput.length > 1
                ? paginator(filteredResults, page, 2)?.data.map((data, i) => {
                    return (
                      <React.Fragment>
                        <Paper
                          className={classes.paper}
                          style={{
                            backgroundColor: "#deeaee",
                          }}
                        >
                          <Grid key={i} className={classes.responses}>
                            <ListItem fullwidth>
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
                                  <Typography
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    Topic : {data.topic} <br />
                                    Content : {data.content}
                                  </Typography>
                                }
                              />
                              <Typography>
                                <AccessTimeIcon
                                  style={{
                                    width: 20,
                                    marginTop: -25,
                                    color: "#026aa4",
                                    marginLeft: 13,
                                  }}
                                />
                                <h6>
                                  <div
                                    style={{ marginLeft: 50, marginTop: -25 }}
                                  >
                                    {moment(data.createdAt).format(
                                      "MMMM D, Y, HH:mm"
                                    )}
                                  </div>
                                </h6>
                              </Typography>
                              <Button
                                icon
                                className={classes.Delete}
                                onClick={(e) =>
                                  handleDeleteComment(
                                    data._id
                                  ).setCommentCollection(data, i)
                                }
                              >
                                <DeleteIcon style={{ color: "#026aa4" }} />
                              </Button>
                              <Button
                                icon
                                //className={classes.Delete}
                                //onClick={
                                onClick={() => handleClickOpen(data._id)}
                              >
                                <BiEdit
                                  style={{
                                    color: "#026aa4",
                                    marginLeft: -220,
                                    fontSize: 24,
                                  }}
                                />
                              </Button>
                            </ListItem>
                          </Grid>
                        </Paper>

                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 12 }}>
                              Like
                            </Typography>
                          }
                        >
                          <Button icon>
                            <ThumbUpIcon
                              style={{
                                color: "009933",
                                marginTop: 45,
                                marginLeft: 80,
                                fontSize: 22,
                              }}
                            />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          title={
                            <Typography style={{ fontSize: 12 }}>
                              Dislike
                            </Typography>
                          }
                        >
                          <Button icon>
                            <ThumbDownAltIcon
                              style={{
                                color: "e22400",
                                marginTop: 45,
                                marginLeft: 50,

                                fontSize: 22,
                              }}
                            />
                          </Button>
                        </Tooltip>
                      </React.Fragment>
                    );
                  })
                : commentCollection.length > 0 &&
                  paginator(commentCollection, page, 2)?.data?.map(
                    (data, i) => (
                      <>
                        <React.Fragment>
                          <Paper
                            className={classes.paper}
                            style={{ backgroundColor: "#deeaee" }}
                            //value={commentId}
                            //onChange={(e) => setcommentId(e.target.value)}
                          >
                            <Grid key={i} className={classes.responses}>
                              <ListItem fullwidth>
                                <div style={{ marginLeft: -30, fontSize: 40 }}>
                                  <Avatar style={{ color: "#026aa4" }} />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <ListItemText
                                  primary={
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {data?.userId?.firstName}{" "}
                                      {data?.userId?.lastName}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      Topic: {data.topic} <br />
                                      Content: {data.content}
                                    </Typography>
                                  }
                                />
                                <Typography>
                                  <AccessTimeIcon
                                    style={{
                                      width: 20,
                                      marginTop: -25,
                                      color: "#026aa4",
                                      marginLeft: 13,
                                    }}
                                  />
                                  <h6>
                                    <div
                                      style={{ marginLeft: 50, marginTop: -25 }}
                                    >
                                      {moment(data.createdAt).format(
                                        "MMMM D, Y, HH:mm"
                                      )}
                                    </div>
                                  </h6>
                                </Typography>
                                <Button
                                  icon
                                  className={classes.Delete}
                                  onClick={(e) =>
                                    handleDeleteComment(
                                      data._id
                                    )?.setCommentCollection(data, i)
                                  }
                                >
                                  <DeleteIcon style={{ color: "#026aa4" }} />
                                </Button>
                                <Button
                                  icon
                                  //className={classes.Delete}
                                  //onClick={
                                  onClick={() => handleClickOpen(data._id)}
                                >
                                  <BiEdit
                                    style={{
                                      color: "#026aa4",
                                      marginLeft: -220,
                                      fontSize: 24,
                                    }}
                                  />
                                </Button>
                                <Dialog open={open2} onClose={handleClose2}>
                                  <DialogTitle>
                                    Update Your Comment :
                                  </DialogTitle>

                                  <DialogContent>
                                    <Box
                                      component="form"
                                      sx={{ mt: 0 }}
                                      style={{ width: 550, height: 300 }}
                                      onSubmit={handleUpdateComment}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <Avatar
                                          className={classes.large}
                                          style={{
                                            color: "#026aa4",
                                            marginTop: 15,
                                          }}
                                        />
                                        <Grid item xs={10}>
                                          <TextField
                                            required
                                            label="Update Topic"
                                            variant="outlined"
                                            style={{
                                              width: 450,
                                              marginTop: 15,
                                            }}
                                            value={topic}
                                            onChange={(e) =>
                                              setTopic(e.target.value)
                                            }
                                          />
                                        </Grid>
                                      </div>
                                      <Grid
                                        item
                                        xs={10}
                                        style={{ marginLeft: "90px" }}
                                      >
                                        <TextField
                                          required
                                          label="Update Content !"
                                          variant="outlined"
                                          multiline
                                          rows={2.5}
                                          style={{
                                            width: 450,
                                            marginLeft: -10,
                                            marginTop: 23,
                                          }}
                                          value={content}
                                          onChange={(e) =>
                                            setContent(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item sm={5}>
                                        <Button
                                          style={{
                                            marginTop: 45,
                                            marginLeft: 50,
                                            width: 170,
                                          }}
                                          type="submit"
                                          variant="outlined"
                                          sx={{ mt: 2, mb: 2 }}
                                          //onClick={handleClose2}
                                        >
                                          Save and update
                                        </Button>
                                      </Grid>
                                      <Grid item sm={5}>
                                        <Button
                                          style={{
                                            marginTop: -43,
                                            marginLeft: 240,
                                            width: 170,
                                          }}
                                          type="reset"
                                          variant="outlined"
                                          //fullWidth
                                          sx={{ mt: 2, mb: 2 }}
                                          onClick={handleClose2}
                                        >
                                          Cancel
                                        </Button>
                                      </Grid>
                                    </Box>
                                  </DialogContent>
                                </Dialog>
                              </ListItem>
                            </Grid>
                          </Paper>

                          <div>
                            <Tooltip
                              title={
                                <Typography style={{ fontSize: 12 }}>
                                  Like
                                </Typography>
                              }
                            >
                              <Button
                                icon
                                onClick={() => {
                                  handleLikes(data._id);
                                }}
                              >
                                {LikeAction === "liked" ? (
                                  <ThumbUpIcon
                                    style={{
                                      color: "009933",
                                      marginTop: 45,
                                      marginLeft: 80,
                                      fontSize: 22,
                                    }}
                                  />
                                ) : (
                                  <ThumbUpOutlinedIcon
                                    style={{
                                      color: "009933",
                                      marginTop: 45,
                                      marginLeft: 80,
                                      fontSize: 22,
                                    }}
                                  />
                                )}
                                {/*<ThumbUpOutlinedIcon
                                  onClick={() => {
                                    handleLikes(data._id);
                                  }}
                                  style={{
                                    color: "009933",
                                    marginTop: 45,
                                    marginLeft: 80,
                                    fontSize: 22,
                                  }}
                                />*/}
                              </Button>
                            </Tooltip>

                            <Tooltip
                              title={
                                <Typography style={{ fontSize: 12 }}>
                                  Dislike
                                </Typography>
                              }
                            >
                              <Button icon>
                                {disliked ? (
                                  <ThumbDownAltIcon
                                    style={{
                                      color: "e22400",
                                      marginTop: 45,
                                      marginLeft: 50,

                                      fontSize: 22,
                                    }}
                                  />
                                ) : (
                                  <ThumbDownAltOutlinedIcon
                                    onClick={() => {
                                      handleDislikes(data._id);
                                    }}
                                    style={{
                                      color: "e22400",
                                      marginTop: 45,
                                      marginLeft: 50,

                                      fontSize: 22,
                                    }}
                                  />
                                )}
                              </Button>
                            </Tooltip>
                            <Tooltip
                              title={
                                <Typography style={{ fontSize: 12 }}>
                                  Reply
                                </Typography>
                              }
                            >
                              <Button icon>
                                <ReplyIcon
                                  onClick={() => handleClickReply(data._id)}
                                  style={{
                                    color: "#4169E1",
                                    marginTop: 45,
                                    marginLeft: 33,

                                    fontSize: 25,
                                  }}
                                />
                              </Button>
                            </Tooltip>
                            {openReply ? (
                              <React.Fragment>
                                <Replies />
                              </React.Fragment>
                            ) : null}
                          </div>
                        </React.Fragment>
                      </>
                    )
                  )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Pagination
                  count={paginator(commentCollection, page, 2).total_pages}
                  page={paginator(commentCollection, page, 2).page}
                  onChange={handleChange}
                  color="success"
                />
              </div>
            </Box>
          </React.Fragment>
        </div>
      </Paper>
    </div>
  );
};

export default CommentsHome;
