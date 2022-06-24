import axios from "axios";
import { useEffect } from "react";
import { useState} from "react";
import React from "react";
import { CSVLink } from "react-csv";
import { FcComboChart } from "react-icons/fc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { VscFiles } from "react-icons/vsc";
import { Button, Typography } from "@material-ui/core";
import Swal from "sweetalert2";
import { AiOutlineCloudDownload } from "react-icons/ai";
import InfoIcon from "@mui/icons-material/Info";
import {Tooltip} from "@mui/material";

import {

  downloadFiles,
  joinProcess,
  getUserSimpleFiles,
  getUserJoinedFiles,
} from "../../services/axios";

export const Join = () => {
  //const componentRef = useRef()
  //useState
  const [files, setFiles] = useState([]);
  const [array, setArray] = useState([]);
  const [showFile, setShowFile] = useState("");
  const [show, setShow] = useState(false);

  const [attribut1, setAttribut1] = useState("");
  const [attribut2, setAttribut2] = useState("");
  const [headers1, setHeaders1] = useState("");
  const [headers2, setHeaders2] = useState("");
  const [file1ToJoin, setFile1ToJoin] = useState("");
  const [file2ToJoin, setFile2ToJoin] = useState("");
  const [joinFileName, setJoinFileName] = useState("");
  const [joinedFiles, setJoinedFiles] = useState("");
  const [isDeletedJoinFiles, setIsDeletedJoinFiles] = useState(false);
  const [joinedTab, setJoinedTab] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const[button,setButton] = useState(false)

//useEffect pour simple files
useEffect(() => {
  async function fecthUserSimpleFiles() {
    const response = await getUserSimpleFiles(); //getuserSimpleFiles est definie dans axios.js
    if (response.success === true) {
      setFiles(response.data);
      console.log(response.data);
    } else {
      Swal.fire({
        icon: "error",
        title: response.data,
        showCancelButton: false,

        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  fecthUserSimpleFiles();
}, [isDeleted]);






  //useEffect pour joined files
  useEffect(() => {
    async function fetchUserJoinedFiles() {
      const response = await getUserJoinedFiles(); //getuserJoinedFiles est definie dans axios.js
      if (response.success === true) {
        setJoinedFiles(response.data);
        console.log(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: response.data,
          showCancelButton: false,

          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
    fetchUserJoinedFiles();
  }, [isDeletedJoinFiles]);

 


  function handleClick() {
    setShow(!show);
  }
 

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  function getHeadersFromCsv(data) {
    return data.slice(0, data.indexOf("\n")).split(","); //retreive headers from file
  }
  // const buttonshow = showFile ? <Button  style={{    backgroundColor: '#007FFF',color : '#ffffff',} } onClick={{setShow(false) ; handleShow("")}}>Show Joined Files</Button> :  <Button  style={{    backgroundColor: '#007FFF',color : '#ffffff',} }>Show Joined Files</Button>

  async function handleFile1Options(e) {
    setFile1ToJoin(e.target.value);
    if (e.target.value !== "") {
      const response = await downloadFiles(e.target.value);
      if (response.success === true) {
        setHeaders1(getHeadersFromCsv(response.data)); //only headers
      }
    }
  }
  function ConvertToCSV(objArray) {
    console.log(objArray)
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }
console.log(str)
    return str;
  }

  async function JoinedFiles() {
    const response = await joinProcess(
      file1ToJoin,
      file2ToJoin,
      attribut1,
      attribut2
    );
    if (response.success === true) {
      if (response.data.joinedResult.length > 0 ) {
        const headerKeys2 = Object.keys(
          Object.assign({}, ...response.data.joinedResult) //get keys
        );
        const transform = ConvertToCSV(response.data.joinedResult);
        setShowFile(response.data.joinedResult);
        setJoinFileName(response.data.originalFileName);

        const headersString = // headers qui sont séparés par , et puis transforme chaine
          headerKeys2.reduce(
            (previousHeader, currentHeader) =>
              previousHeader + "," + currentHeader,
            ""
          ) + "\n";
        csvFileToArray(headersString.substring(1) + transform); //fucntion accept only string
        setJoinedTab(false);
        setButton(true)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "can't join file .. please choose other attributs",
        });
      }
    }
  }
  async function handleFile2Options(e) {
    console.log(e.target.value);
    setFile2ToJoin(e.target.value);
    if (e.target.value !== "") {
      const response = await downloadFiles(e.target.value);
      if (response.success === true) {
        setHeaders2(getHeadersFromCsv(response.data));
      }
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  const showJoinedTab = joinedTab ? (
    <button className="buttonShowandHide" onClick={JoinedFiles}>
      show
    </button>
  ) : (
    <button
      className="buttonShowandHide"
      onClick={() => {
        setJoinedTab(true);
        setShowFile("");
        setJoinFileName("");
        setButton(false)
      }}
    >
      Hide
    </button>
  );
  return (
    <>
      <div style={{ marginLeft: 100, marginTop: 30 }}>
        <FcComboChart style={{ fontSize: 30 }} />
        <Typography
          variant="h6"
          component="h4"
          style={{ color: "grey", marginLeft: 37, marginTop: -35 }}
        >
          Data And Charts
          <ArrowRightIcon
            style={{
              fontSize: 30,

              marginBottom: -6.25,
              color: "#026aa4",
            }}
          />{" "}
          &nbsp;
          <ArrowRightIcon
            style={{
              fontSize: 30,
              marginLeft: 135,
              marginBottom: -7,
              color: "#026aa4",
            }}
          />
          <div style={{ marginLeft: 170, marginTop: -32 }}>
            &nbsp;
            <UploadFileIcon
              style={{
                fontSize: 30,
                color: "green",
              }}
            />
          </div>
          <div style={{ marginLeft: 350, marginTop: -40 }}>
            &nbsp;
            <VscFiles
              style={{
                fontSize: 30,
                color: "#8bc34a",
              }}
            />
          </div>
          <div style={{ marginLeft: 210, marginTop: -39 }}>Upload Files</div>
          <div style={{ marginLeft: 393, marginTop: -32 }}>Join Files</div>
        </Typography>
      </div>
      <Button
        className="Button"
        onClick={handleClick}
        style={{
          backgroundColor: "green",
          color: "#ffffff",
          marginLeft: 520,
          marginTop: 35,
        }}
        variant="contained"
      >
        Want to join files..?
      </Button>
      <Tooltip
                  title={
                    <Typography style={{ fontSize: 15 }}>
                      This option is used to make a join between 2 files already found in your 
                      Files Table. In the case where you want to make a join between 2 files that do not exist in the table,
                      you must redo the process from the beginning
                    </Typography>
                  }
                >
                  <InfoIcon
                    style={{ color: "green", marginLeft: 50, marginBottom: -25 }}
                  />
                </Tooltip>
      <div style={{ marginTop: -100, marginLeft: 10 }}>
        {show && (
          <>
            <div className="box">
              <select value={file1ToJoin} onChange={handleFile1Options}>
                <option value={""}>__please choose a file__</option>
                {files.map((element) => {
                  return (
                    <option value={element._id}>
                      {element.metadata.originalFileName}
                    </option>
                  );
                })}
              </select>
              <select value={file2ToJoin} onChange={handleFile2Options}>
                <option value={""}>__please choose a file__</option>
                {files.map((element) => {
                  return (
                    <option value={element._id}>
                      {element.metadata.originalFileName}
                    </option>
                  );
                })}
              </select>
            </div>
          </>
        )}
        <div >
          {headers1.length > 0 && (
            <select className="select9"
              value={attribut1}
              onChange={(e) => setAttribut1(e.target.value)}
            >
              <option value={""}>_please select an attribut_</option>
              {headers1.map((element) => {

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}

          {headers2.length > 0 && (
            <>
              <select  className="select14"
                value={attribut2}
                onChange={(e) => setAttribut2(e.target.value)}
              >
                <option value={""}>_please select an attribut_</option>
                {headers2.map((element, index) => {
                  return <option value={element}>{element}</option>;
                })}
              </select>
              <div>
                {showJoinedTab}
                 {button && (
                  <>
                  <CSVLink data={showFile} filename={joinFileName}>
                  <button className="download">
                    Download
                    <AiOutlineCloudDownload />
                  </button>
                </CSVLink>

{/*upload file csv type*/}
                <CSVLink 
                  data={showFile}
                  asyncOnClick={true} 
                  onClick={(event, done) => {
                   
                    const formData = new FormData();
                    const blob = new File(
                      //construction du fichier
                      [JSON.stringify(showFile)],
                      joinFileName,
                      {
                        type: "text/csv",
                      }
                    );
                    formData.append("file", blob);
                    formData.append("attribut1", attribut1);
                    formData.append("attribut2", attribut2);
                    formData.append("idFile1", file1ToJoin);
                    formData.append("idFile2", file2ToJoin);
                   
                    axios({
                      url: "/uploads/join/add/",
                      method: "POST",
                      data: formData,
                    }).then((response) => {
                     
                      const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                      });

                      Toast.fire({
                        icon: "success",
                        title: `${response.data} `,
                      });

                      setIsDeletedJoinFiles(!isDeletedJoinFiles);
                      done(false);
                    });
                    done(false);
                  }}
                >
                  <button className="Buttonupload"> Upload </button>
                </CSVLink>
                </>
                 )}
                
              </div>
            </>
          )}
        </div>
      </div>

      {showFile && (
        <React.Fragment>
          <table className="jointable">
            <thead>
              <tr >
                {headerKeys.map((key) => (
                  <th>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {array.map((item) => (
                <tr key={item.id}>
                  {Object.values(item).map((val) => (
                    <td>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </>
  );
};