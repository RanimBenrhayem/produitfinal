import axios from "axios";
import { useEffect } from "react";
import { useState} from "react";
import React from "react";
import JoinedFilePreview from "./JoinedFilePreview";
import Swal from "sweetalert2";
import {
  getUserJoinedFiles,
} from "../../services/axios";

export const JoinedFilesToUpload = () => {

  const [array, setArray] = useState([]);
  const [showFile, setShowFile] = useState("");
  const [joinedFiles, setJoinedFiles] = useState("");
  const [isDeletedJoinFiles, setIsDeletedJoinFiles] = useState(false);

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
    return ()=>{
      setJoinedFiles([])
    }
  }, [isDeletedJoinFiles]);



  const handleShow2 = async (id) => {
    if (id.length > 0) {
      setShowFile("");
      setArray([]);
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/uploads/files/joined/getbyid/${id}`,
      });
      console.log(JSON.stringify(response.data[0]));
      setShowFile(JSON.stringify(response.data[0]));
      const headerKeys2 = Object.keys(Object.assign({}, ...response.data));
      const transform = ConvertToCSV(response.data);
      const headersString =
        headerKeys2.reduce(
          (previousHeader, currentHeader) =>
            previousHeader + "," + currentHeader,
          ""
        ) + "\n";
      const cleanedString = headersString.substring(1) + transform;

      csvFileToArray(cleanedString.slice(0, -1));
 
    } else {
      setShowFile("");
      setArray([]);
    }

   
  };


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

  
 

  const headerKeys = Object.keys(Object.assign({}, ...array));
  console.log(array);

  return (
    <>
      {joinedFiles.length > 0 && (
        <>
          <br />
          <h2 className="gradient_Join">Your joined Files</h2>
          <table className="tableofuploadedfiles">
            <tr>
              <th> Name</th>
              <th>Show </th>
              <th>Delete </th>
              <th>Download as CSV File</th>
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
      )}

      {showFile && (
        <table className="showtable" >
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
   

    </>
  );
};
