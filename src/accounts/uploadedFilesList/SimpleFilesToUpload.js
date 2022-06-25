import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import SingleFilePreview from "./SingleFilePreview";
import Swal from "sweetalert2";
import {
  getUserSimpleFiles,
} from "../../services/axios";

export const UserSimpleFiles = () => {
  //useState
  const [files, setFiles] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [array, setArray] = useState([]);
  const [showFile, setShowFile] = useState("");

  //useEffect pour simple files
  useEffect(() => {
    async function fecthUserSimpleFiles() {
      const response = await getUserSimpleFiles(); //getuserSimpleFiles est definie dans axios.js
      if (response.success === true) {
        console.log(response.data)
        setFiles(response.data);
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
      setFiles([]); //pour re initaliser tableau 
    };
  }, [isDeleted]);
  

  const handleShow = async (idfile) => {
    if (idfile.length > 0) {
      setShowFile(""); //initialisation
      setArray([]);
      const response = await axios({
        method: "get",
        url: `http://localhost:8080/uploads//download/file/${idfile}`,
      });
      setShowFile(response.data);
      csvFileToArray(response.data);
      // fileReader.readAsText(response.data);
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

 

  const headerKeys = Object.keys(Object.assign({}, ...array));
  return (
    <>
      <div className="userfilesall">
        {files.length > 0 && (
          <>
            <h2 className="gradient">Your Files</h2>
            
            <table>
              <tr>
                <th> Name</th>
                <th>Show </th>
                <th>Delete</th>
              </tr>
              {files.map((element) => {
             
                return (
                  <>
                    <SingleFilePreview
                      id={element._id}
                      handleShow={handleShow}
                      isDeleted={isDeleted}
                      setIsDeleted={setIsDeleted}
                    />
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
        {showFile && (
          <table>
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
        )}
      </div>
    </>
  );
};
