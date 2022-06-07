import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AssistantIcon from "@mui/icons-material/Assistant";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

import {
  TableRow,
  TableHead,
  Grid,
  Typography,
  TextField,
  Container,
  Tooltip,
  Button,
  ButtonGroup,
  DialogTitle,
  Dialog,
  DialogContent,
  ListItem,
  ListItemIcon,
  Link,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import LayoutHome from "../layout/LayoutHome";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UsersList() {
  const [usersCollection, setUsersCollection] = React.useState([]);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [id, setId] = React.useState("");
  const [emailContent, setEmailContent] = React.useState("");
  const [listUpdated, setLisUpdated] = React.useState(false);
  const [open2, setOpen2] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/user/userslist")
      .then((res) => {
        console.log(res.data);
        setUsersCollection(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [listUpdated]);
  const handleDeleteUser = (_id) => {
    Swal.fire({
      title: "Do You Realy Want To Delete This User?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/user/deleteuser/${_id}`)
          .then((res) => {
            console.log(res.data);
            // setUsersCollection([res.data]);
            setLisUpdated(!listUpdated);
            console.log("cbon");
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
            });

            Toast.fire({
              icon: "success",
              title: "User Deleted Successfully !",
            });
          })
          .catch(function (error) {
            console.log(error);
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
            });

            Toast.fire({
              icon: "error",
              title: error,
            });
          });
      }
    });
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8080/user/updateuser/${id}`,
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });
      //console.log("c bon");

      setLisUpdated(!listUpdated);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: "user Updated successfully",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: ` ${error.response.data} `,
      }).then(function () {
        setOpen(true);
      });
    } finally {
      setOpen(false);
    }
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //     set search query to empty string
  const [searchInput, setSearchInput] = React.useState("");
  //A new state for the filtered data
  const [filteredResults, setFilteredResults] = React.useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    //console.log(searchValue);
    if (searchInput !== "") {
      const filteredData = usersCollection.filter((data, i) => {
        return Object.values(data, i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      //console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(usersCollection);
    }
  };

  const sendEmail = async () => {
    console.log(emailContent);

    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8080/user/sendEmail`,
        data: {
          email: email,
          message: emailContent,
        },
      });
      setEmailContent("");
      setShow(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: "success",
        title: 'Email sended...',
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - usersCollection.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = async (userId) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/user/userById/${userId}`,
      });
      const { _id, firstName, lastName, email, phoneNumber, password } =
        response.data;
      setId(_id);
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNumber(phoneNumber);
      setEmail(email);
      setPassword(password);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const handleClick2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePreviewClick = (mail) => {
    setEmail(mail);

    setShow(true);
  };
  const handleShow = () => {
    setShow(false);
  };
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  return (
    <div
      style={{
        backgroundColor: "#eceff1",
        width: "100%",
        height: 700,
      }}
    >
      <LayoutHome />
      <Container
        width="ld"
        sx={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 15,
        }}
      >
        <Paper sx={{ padding: "2em 2em", boxShadow: 3 }}>
          <Grid justifyContent="space-between" sx={{ m: 1 }} container>
            <Grid item sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Users List
              </Typography>
            </Grid>
            <PersonSearchIcon
              style={{
                marginLeft: 170,
                marginTop: 20,
                fontSize: 29,
                color: "#026aa4",
              }}
            />
            <TextField
              //  inputRef={inputElem}
              id="outlined-basic"
              label="Search User "
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              style={{ width: 350, marginRight: 420 }}
              onChange={(e) => searchItems(e.target.value)}
            />
          </Grid>
          <Tooltip
            title={
              <Typography style={{ fontsize: 13 }}>
                Click here if you want to add simple user or admin
              </Typography>
            }
          >
            <Button
              variant="outlined"
              onClick={handleClick2}
              startIcon={<AssistantIcon />}
              style={{ marginLeft: 850, marginTop: -120 }}
            >
              Suggestions
            </Button>
          </Tooltip>
          <Dialog open={open2} onClose={handleClose2}>
            <DialogTitle>Here's a few suggestions :</DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ mt: 0 }} style={{ width: 350 }}>
                <ListItem
                  button
                  sx={{ pl: 6 }}
                  style={{ marginLeft: 13 }}
                  onClick={() => navigate("/AddUser")}
                >
                  <ListItemIcon>
                    <AddCircleIcon style={{ color: "#026aa4", fontSize: 27 }} />
                  </ListItemIcon>
                  <Typography> Add Simple User</Typography>
                </ListItem>
                <ListItem
                  button
                  sx={{ pl: 6 }}
                  style={{ marginLeft: 13 }}
                  onClick={() => navigate("/AddAdmin")}
                >
                  <ListItemIcon>
                    <AddCircleIcon style={{ color: "#026aa4", fontSize: 27 }} />
                  </ListItemIcon>
                  <Typography> Add Administrator</Typography>
                </ListItem>
                <Grid item sm={5}>
                  <Button
                    style={{ marginTop: 30, marginLeft: 50, width: 170 }}
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead style={{ backgroundColor: "#DAE4F6" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    Id
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    First Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    Last Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    Phone Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "#026aa4" }}>
                    Role
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold", color: "#026aa4" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchInput.length > 1
                  ? filteredResults.map((data, i) => {
                      return (
                        <TableRow key={data._id}>
                          <TableCell component="th" scope="row">
                            {data._id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.firstName}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.lastName}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.phoneNumber}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.roleId.name}
                          </TableCell>
                          <TableCell>
                            <ButtonGroup
                              variant="outlined"
                              orientation={"horizontal"}
                              aria-label="item action group"
                              color="inherit"
                            >
                              <Button
                                color="info"
                                //onClick={handleClickOpen}
                                onClick={() => handleClickOpen(data._id)}
                                startIcon={<EditIcon />}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                fullWidth
                              >
                                <DialogTitle>Edit User Profile</DialogTitle>
                                <DialogContent>
                                  <Box
                                    component="form"
                                    sx={{ mt: 2 }}
                                    onSubmit={handleUpdateUser}
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <TextField
                                          name="firstName"
                                          required
                                          fullWidth
                                          id="firstName"
                                          label="First Name"
                                          value={firstName}
                                          onChange={(e) =>
                                            setFirstName(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="lastName"
                                          label="Last Name"
                                          name="lastName"
                                          value={lastName}
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="email"
                                          label="Email Address"
                                          name="email"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="phonenumber"
                                          label="Phone Number"
                                          name="phonenumber"
                                          value={phoneNumber}
                                          onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                          }
                                        />
                                      </Grid>

                                      <Grid item sm={5}>
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          fullWidth
                                          sx={{ mt: 2, mb: 2 }}
                                        >
                                          Save
                                        </Button>
                                      </Grid>
                                      <Grid item sm={5}>
                                        <Button
                                          type="reset"
                                          variant="outlined"
                                          fullWidth
                                          sx={{ mt: 2, mb: 2 }}
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </DialogContent>
                              </Dialog>
                              <Tooltip title="View More Details">
                                <Button
                                  color="success"
                                  //onClick={handlePreviewClick}
                                  startIcon={<EmailOutlinedIcon />}
                                />
                              </Tooltip>
                              <Tooltip title="Delete">
                                <Button
                                  color="error"
                                  onClick={(e) =>
                                    handleDeleteUser(
                                      data._id
                                    ).setUsersCollection(data, i)
                                  }
                                  startIcon={<DeleteIcon />}
                                />
                              </Tooltip>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : (rowsPerPage > 0
                      ? usersCollection.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : setUsersCollection
                    ).map((data, i) => {
                      const bg =
                        data.roleId.name === "admin" ? "#eceff1" : "white";
                      return (
                        <TableRow
                          key={data._id}
                          style={{ backgroundColor: bg }}
                        >
                          <TableCell component="th" scope="row">
                            {data._id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.firstName}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.lastName}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {data.phoneNumber}
                          </TableCell>

                          <TableCell component="th" scope="row">
                            {data.roleId.name}
                          </TableCell>

                          <TableCell>
                            <ButtonGroup
                              variant="outlined"
                              orientation={"horizontal"}
                              aria-label="item action group"
                              color="inherit"
                            >
                              <Button
                                color="info"
                                //onClick={handleEditClick}
                                onClick={() => handleClickOpen(data._id)}
                                startIcon={<EditIcon />}
                              />
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                fullWidth
                              >
                                <DialogTitle>Edit User Profile</DialogTitle>
                                <DialogContent>
                                  <Box
                                    component="form"
                                    sx={{ mt: 2 }}
                                    onSubmit={handleUpdateUser}
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={12}>
                                        <TextField
                                          name="firstName"
                                          required
                                          fullWidth
                                          id="firstName"
                                          label="First Name"
                                          value={firstName}
                                          onChange={(e) =>
                                            setFirstName(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="lastName"
                                          label="Last Name"
                                          name="lastName"
                                          value={lastName}
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="email"
                                          label="Email Address"
                                          name="email"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <TextField
                                          required
                                          fullWidth
                                          id="phonenumber"
                                          label="Phone Number"
                                          name="phonenumber"
                                          value={phoneNumber}
                                          onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                          }
                                        />
                                      </Grid>

                                      <Grid item sm={5}>
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          fullWidth
                                          sx={{ mt: 2, mb: 2 }}
                                        >
                                          Save
                                        </Button>
                                      </Grid>
                                      <Grid item sm={5}>
                                        <Button
                                          type="reset"
                                          variant="outlined"
                                          fullWidth
                                          sx={{ mt: 2, mb: 2 }}
                                          onClick={handleClose}
                                        >
                                          Cancel
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </DialogContent>
                              </Dialog>

                              <Button
                                color="success"
                                onClick={() => handlePreviewClick(data.email)}
                                startIcon={<EmailOutlinedIcon />}
                              />
                              <Dialog
                                open={show}
                                onClose={handleShow}
                                fullWidth
                              >
                                <DialogTitle>Send message</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Please write your message here ...!
                                  </DialogContentText>
                                  <TextField
                                    autoFocus
                                    margin="dense"
                                    id="message"
                                    label="message"
                                    type="message"
                                    fullWidth
                                    variant="standard"
                                    value={emailContent}
                                    onChange={(e) =>
                                      setEmailContent(e.target.value)
                                    }
                                  />
                                  <Grid container spacing={2}>
                                    <Grid item sm={5}>
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={sendEmail}
                                        sx={{ mt: 5, mb: 1 }}
                                      >
                                        Save
                                      </Button>
                                    </Grid>
                                    <Grid item sm={5}>
                                      <Button
                                        type="reset"
                                        variant="outlined"
                                        onClick={handleShow}
                                        sx={{ mt: 5, mb: 1 ,marginLeft : 5 }}
                                      >
                                        Cancel
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </DialogContent>
                              </Dialog>

                              {/* 
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent  >
          <DialogContentText>
            To send an email to this user , please write your message...
          </DialogContentText>
          <TextField
            
            id="message"
            label="message"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog> */}

                              <Tooltip title="Delete">
                                <Button
                                  color="error"
                                  onClick={() => handleDeleteUser(data._id)}
                                  startIcon={<DeleteIcon />}
                                />
                              </Tooltip>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={7}
                    count={usersCollection.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
