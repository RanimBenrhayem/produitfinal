import * as React from "react";
import {
    List,
    TableCell,
    TableRow,
    TableBody,
    ListItemText,
    ListItem,
    Container,
    Pagination,
    Divider,
    Tabs,
    Tab,
    Typography,
    Box,
    TableContainer,
    Table,
    TableHead,
    Paper,
    TableFooter,
    FormControlLabel,
    TextField,
    Stack,
} from "@mui/material";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import { BsInfoLg } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { GoSettings } from "react-icons/go";
import {useState} from "react";
import Swal from "sweetalert2";
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiFillCloseCircle,
  } from "react-icons/ai";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LayoutHome from "../layout/LayoutHome";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useNavigate } from "react-router-dom";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
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
export default function WarningJoined() {
    const [value, setValue] = React.useState(0);
    const [deleted,setDeleted]=useState(false)
    let navigate = useNavigate()

    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };
    const [searchInput, setSearchInput] = React.useState("");
    const [alertsCollection, setAlertsCollection] = React.useState([]);
    const [usersCollection, setUsersCollection] = React.useState([]);
    const [filteredResults, setFilteredResults] = React.useState([]);

    const [listUpdated, setLisUpdated] = React.useState(false);
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
            console.log(filteredData);
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(usersCollection);
        }
    };
    React.useEffect(() => {
        axios
            .get("http://localhost:8080/chart/alert/joined/all")
            .then((res) => {
                //console.log(res.data);
                setUsersCollection(res.data.result.reverse());
            })
            .catch(function (error) {
                console.log(error);
            });
    } , [deleted]);
    const handleDelete =async (fileId)=>{
        try{
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!",
          }).then((result) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            });
            if(result.isConfirmed) {
              axios({
                method:'delete',
                url : `http://localhost:8080/chart/alert/delete/${fileId}`
              }).then(response=>{
    
    
                Toast.fire({
                  icon: "success",
                  title: response.data,
                });
                setDeleted(!deleted)
    
              })
            }else {
              Toast.fire({
                icon: "error",
                title: "Could not delete this file.",
              });
            }
          })
    
        }catch (e) {
          console.log(e)
    
        }
      }

    const count = Math.ceil(usersCollection.length / 1);
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(paginator(usersCollection, value, 1).page);
    };
    const [checked, setChecked] = React.useState(true);

    const handleChange2 = (event) => {
        setChecked(event.target.checked);
        if (checkedBox) {
            setCheckedBox("");
        }
        if (checkedBox2) {
            setCheckedBox2("");
        }
        setChecked(!checked);
    };
    const [checkedBox, setCheckedBox] = React.useState(true);

    const handleChangeBox = (event) => {
        setCheckedBox(event.target.checkedBox);
        if (checkedBox) {
            setText("");
        }
        setCheckedBox(!checkedBox);
    };
    const [checkedBox2, setCheckedBox2] = React.useState(true);

    const handleChangeBox2 = (event) => {
        setCheckedBox2(event.target.checkedBox2);
        if (checkedBox2) {
            setText2("");
        }
        setCheckedBox2(!checkedBox2);
    };
    const [text, setText] = React.useState("");
    const [text2, setText2] = React.useState("");
    return (
        <div>
            <LayoutHome />
            <Box style={{ marginLeft: 100, marginTop: 10 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange1}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            label="Warnings"
                            {...a11yProps(0)}
                            component={Link}
                            to="/Warning"
                        />
           
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>

                    <br />
                    <TableContainer
                        component={Paper}
                        variant="outlined"
                        style={{ borderColor: "#e53935" }}
                    >
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead
                style={{ backgroundColor: "#e53935", borderColor: "#e53935"  }}
              >
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white", fontSize: 15}}
                  >
                  
                    Alerts Details
                  </TableCell>
                </TableRow>
              </TableHead>
                            <TableBody>
                                <TableBody>
                                    <FcSearch
                                        style={{ fontSize: 25, marginLeft: 600, marginBottom: -30 }}
                                    />
                                    <TextField
                                        //  inputRef={inputElem}
                                        id="outlined-basic"
                                        label="Search Alert "
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 1, mb: 2 }}
                                        style={{
                                            marginLeft: 900,
                                            marginTop: -10,
                                            width: 250,
                                            //height: 150,
                                            color: "#026aa4",
                                        }}
                                        onChange={(e) => searchItems(e.target.value)}
                                    />
                                    <TableContainer
                                        component={Paper}
                                        style={{ width: 1160, marginLeft: 17 }}
                                    >
                                        <Table aria-label="custom pagination table">
                                            <TableHead style={{ backgroundColor: "white" }}>
                                                <TableRow>
                                                    <TableCell
                                                        style={{ fontWeight: "bold", color: "#026aa4" }}
                                                    >
                                                        Chart Type


                                                    </TableCell>


                                                    <TableCell
                                                        style={{ fontWeight: "bold", color: "#026aa4" }}
                                                    >
                                                        Alert conditions
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontWeight: "bold", color: "#026aa4" }}
                                                    >
                                                        View
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ fontWeight: "bold", color: "#026aa4" }}
                                                    >
                                                        Delete
                                                    </TableCell>

                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {searchInput.length > 1
                                                    ? filteredResults.map((data, i) => {
                                                        return (
                                                            <TableRow key={data.alert[0]._id}>
                                                                <TableCell component="th" scope="row">
                                                                    {data.typeOfDashboard}
                                                                </TableCell>

                                                                <TableCell component="th" scope="row">
                                                                    {data.alert[0].attribute} {data.alert[0].operator} {data.alert[0].value}
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                    <div className="showeyes" onClick={()=>navigate(`/savedDashboard/${data._id}`)}>  <AiFillEye /></div>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <div className="buttonpoubelle" onClick={()=>handleDelete(data._id)}>    <AiFillCloseCircle /></div>
                                  </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                    : paginator(usersCollection, page, 2).data.map(
                                                        (data, i) => {
                                                            return (
                                                                <TableRow  key={data.alert[0]._id}>
                                                                    <TableCell component="th" scope="row">
                                                                        {data.typeOfDashboard}
                                                                    </TableCell>

                                                                    <TableCell component="th" scope="row">
                                                                        {data.alert[0].attribute} {data.alert[0].operator} {data.alert[0].value}
                                                                    </TableCell>
                                                                    <TableCell component="th" scope="row">
                                    <div className="showeyes" onClick={()=>navigate(`/savedDashboard/${data._id}`)}>  <AiFillEye /></div>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <div className="buttonpoubelle" onClick={()=>handleDelete(data._id)}>    <AiFillCloseCircle /></div>
                                  </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TableBody>
                                <br />
                               
                            </TableBody>
                            <br />
                        </Table>
                    </TableContainer>
                </TabPanel>
              
            </Box>
        </div>
    );
}
