import axios from "axios";
import { useEffect } from "react";
import { useState, useRef } from "react";
import React from "react";
import SingleFilePreview from "./SingleFilePreview";
import JoinedFilePreview from "./JoinedFilePreview";
import { CSVLink } from "react-csv";

import { Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { AiOutlineCloudDownload, AiFillCaretUp } from "react-icons/ai";

import {
  getUserSimpleFiles,
  deleteSignleFiles,
  downloadFiles,
  joinProcess,
  uploadJoinFiles,
  getUserJoinedFiles,
} from "../../services/axios";

export const UserSimpleFiles = () => {
  //const componentRef = useRef()
  //useState
  const [files, setFiles] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [array, setArray] = useState([]);
  const [showFile, setShowFile] = useState("");
  const [show, setShow] = useState(false);
  const fileReader = new FileReader();
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

  const lastItemRef = useRef(null);

  //useEffect pour simple files
  useEffect(() => {
    console.log("aaaaaaa");
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
    return () => {
      setFiles([]);
    };
  }, [isDeleted]);

  //useEffect pour joined files
  useEffect(() => {
    console.log("bbbbbbbb");
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

  const handleShow = async (fileName) => {
    if (fileName.length > 0) {
      setShowFile("");
      setArray([]);
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/uploads/${fileName}`,
      });
      setShowFile(response.data);

      csvFileToArray(response.data);
      fileReader.readAsText(response.data);
      // csvFileToArray(response.data.csvHeader)
    } else {
      setShowFile("");
      setArray([]);
    }
  };

  const handleShow2 = async (id) => {
    if (id.length > 0) {
      setShowFile("");
      setArray([]);
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/uploads/files/joined/getbyid/${id}`,
      });
      console.log(response);
      setShowFile(response.data);

      csvFileToArray(response.data);
      fileReader.readAsText(response.data);
      // csvFileToArray(response.data.csvHeader)
    } else {
      setShowFile("");
      setArray([]);
    }

    // console.log(file)
  };

  function swall() {
    Swal.fire({
      title:
        "This option is used to make a join between 2 files already found in'your files' table.In the case where you want to make a join between 2 files that do not exist in the table, you must redo the process from the beginning",
    });
  }

  function handleClick() {
    swall();
    setShow(!show);
  }
  // const handleJoinedShow = async (fileName) => {
  //   if (fileName.length > 0) {
  //     setShowFile("");
  //     setArray([]);
  //     const response = await axios({
  //       method: "get",
  //       url: `http://localhost:8080/uploads/${fileName}`,
  //     });
  //     setShowFile(response.data);

  //     csvFileToArray(response.data);
  //     fileReader.readAsText(response.data);
  //     // csvFileToArray(response.data.csvHeader)
  //   } else {
  //     setShowFile("");
  //     setArray([]);
  //   }
  // };

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
    return data.slice(0, data.indexOf("\n")).split(",");
  }
  // const buttonshow = showFile ? <Button  style={{    backgroundColor: '#007FFF',color : '#ffffff',} } onClick={{setShow(false) ; handleShow("")}}>Show Joined Files</Button> :  <Button  style={{    backgroundColor: '#007FFF',color : '#ffffff',} }>Show Joined Files</Button>

  async function handleFile1Options(e) {
    console.log(e.target.value);
    setFile1ToJoin(e.target.value);
    console.log(file1ToJoin);
    if (e.target.value !== "") {
      const response = await downloadFiles(e.target.value);
      if (response.success === true) {
        setHeaders1(getHeadersFromCsv(response.data));
      }
    }
  }
  function ConvertToCSV(objArray) {
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
      console.log(response.data.joinedResult);
      if (response.data.joinedResult.length > 0) {
        const headerKeys2 = Object.keys(
          Object.assign({}, ...response.data.joinedResult)
        );
        console.log(headerKeys2);
        const transform = ConvertToCSV(response.data.joinedResult);
        console.log(transform);
        setShowFile(response.data.joinedResult);
        setJoinFileName(response.data.originalFileName);

        const headersString =
          headerKeys2.reduce(
            (previousHeader, currentHeader) =>
              previousHeader + "," + currentHeader,
            ""
          ) + "\n";
        console.log(headersString);
        csvFileToArray(headersString.substring(1) + transform);
        setJoinedTab(false);
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
    console.log(file2ToJoin);
    if (e.target.value !== "") {
      const response = await downloadFiles(e.target.value);
      if (response.success === true) {
        setHeaders2(getHeadersFromCsv(response.data));
      }
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));
  console.log(array);
  const showJoinedTab = joinedTab ? (
    <button className="buttonShow" onClick={JoinedFiles}>
      show
    </button>
  ) : (
    <button
      className="buttonShow"
      onClick={() => {
        setJoinedTab(true);
        setShowFile("");
        setJoinFileName("");
      }}
    >
      Hide
    </button>
  );
  return (
    <>
      <div className="userfilesall">
        <div ref={lastItemRef}></div>
        {files.length > 0 && (
          <>
            <h2 className="gradient">Your Files</h2>
            <br />
            <table>
              <tr>
                <th> Name</th>
                <th>Show </th>
                <th>Delete</th>
              </tr>
              {files.map((element, index) => {
                //   <thead>
                //   <tr key={"header"}>
                //     {headerKeys2.map((key) => (
                //       <th>{key}</th>
                //     ))}
                //   </tr>
                // </thead>
                return (
                  <>
                    <SingleFilePreview
                      id={element._id}
                      handleShow={handleShow}
                      isDeleted={isDeleted}
                      setIsDeleted={setIsDeleted}
                    />

                    {/* <button onClick={()=>handleShow(element.fileName)}>see file</button>   <button>*/}
                  </>
                );
              })}
            </table>
            <br />
            <br />

            <br />
            <br />
          </>
        )}

        {/* {joinedFiles.length > 0 && (
          <>
            <h2 className="gradient">Your joined Files</h2>
            <br />
            <table className="tableofuploadedfiles">
              <tr>
                <th> Name</th>
                <th>Show </th>
                <th>Delete </th>
              </tr>
              {joinedFiles.map((element, index) => {
                return (
                  <>
                 
                    <JoinedFilePreview
                      id={element._id}
                      handleShow={handleShow2}
                      isDeleted={isDeletedJoinFiles}
                      setIsDeleted={setIsDeletedJoinFiles}
                    />
                  </>
                );
              })}
            </table>
          </>
        )} */}

        {showFile && (
          <table>
            <thead>
              <tr key={"header"}>
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
        )}
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />

        {/* <Button
          className="Button"
          onClick={handleClick}
          style={{
            backgroundColor: "#007FFF",
            color: "#ffffff",
          }}
          variant="contained"
        >
          Want to join files..?
        </Button>
        <div>
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
          <div className="box">
            {headers1.length > 0 && (
              <select
                value={attribut1}
                onChange={(e) => setAttribut1(e.target.value)}
              >
                <option value={""}>_please select an attribut_</option>
                {headers1.map((element, index) => {
                  let subElt = element.substring(2, element.length - 2);
                  if (index === 0) {
                    subElt = subElt.substring(1);
                  } else if (index === headers1.length - 1) {
                    subElt = subElt.substring(0, subElt.length - 2);
                  }
                  return <option value={element}>{element}</option>;
                })}
              </select>
            )}
            {headers2.length > 0 && (
              <>
                <select
                  value={attribut2}
                  onChange={(e) => setAttribut2(e.target.value)}
                >
                  <option value={""}>_please select an attribut_</option>
                  {headers2.map((element, index) => {
                    let subElt = element.substring(2, element.length - 2);
                    if (index === 0) {
                      subElt = subElt.substring(1);
                    } else if (index === headers1.length - 1) {
                      subElt = subElt.substring(0, subElt.length - 2);
                    }
                    return <option value={element}>{element}</option>;
                  })}
                </select>
                <div>
                 {showJoinedTab}
                  <CSVLink data={showFile} filename={joinFileName}>
                    <button className="download">
                      Download
                      <AiOutlineCloudDownload />
                    </button>
                  </CSVLink>
                  <CSVLink
                    data={showFile}
                    asyncOnClick={true}
                    onClick={(event, done) => {
                      console.log(showFile);
                      const formData = new FormData();
                      const blob = new File(showFile, joinFileName, {
                        type: "text/csv",
                      });
                      formData.append("file", blob);
                      formData.append("attribut1", attribut1);
                      formData.append("attribut2", attribut2);
                      formData.append("idFile1", file1ToJoin);
                      formData.append("idFile2", file2ToJoin);
                      console.log(blob);
                      axios({
                        url: "/uploads/join/add/6271101075cc6139b3b8df04",
                        method: "POST",
                        data: formData,
                      }).then((response) => {
                        console.log(response);
                        const Toast = Swal.mixin({
                          toast: true,
                          position: "bottom-right",
                          showConfirmButton: false,
                          timer: 2000,
                          timerProgressBar: true,
                        });
                        Toast.fire({
                          icon: "success",
                          title: response.data,
                        });
                        setIsDeletedJoinFiles(!isDeletedJoinFiles);
                        done(false);
                      });
                      done(false);
                      // done(false);
                    }}
                  >
                    <button className="Buttonupload"> Upload </button>
                  </CSVLink>
                </div>
              </>
            )}
          </div>
        </div>
        <footer>
          {" "}
          <button
            className="reference"
            onClick={() => lastItemRef.current.scrollIntoView()}
          >
            <AiFillCaretUp />
          </button>
        </footer> */}
      </div>
    </>
  );
};
