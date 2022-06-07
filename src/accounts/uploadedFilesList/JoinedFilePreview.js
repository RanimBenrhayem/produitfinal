import React from "react";
import {
  getJoinedFileById,
  deleteJoinedFiles,
  joinProcess,
} from "../../services/axios";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCloseCircle,
  AiOutlineDownload,
} from "react-icons/ai";
import { BsCloudArrowDownFill } from "react-icons/bs";
import {GrDocumentCsv}from "react-icons/gr"
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import axios from "axios";

function JoinedFilePreview({ id, handleShow, isDeleted, setIsDeleted }) {
  const navigate = useNavigate();
  const [showFile, setShowFile] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [fileContent, setFileContent] = useState("");
  const [joinFileName, setJoinFileName] = useState("");
  const [joinedTab, setJoinedTab] = useState(true);
  const [file1ToJoin, setFile1ToJoin] = useState("");
  const [file2ToJoin, setFile2ToJoin] = useState("");
  const [attribut1, setAttribut1] = useState("");
  const [attribut2, setAttribut2] = useState("");

  useEffect(() => {
    async function fetchFileById() {
      const response = await getJoinedFileById(id);
      if (response.success === true) {
        setFileInfo(response.data);
      }
    }
    fetchFileById();
  }, []);
  /*
  useEffect(() => {
    async function downloadFileById() {
      const response = await axios({
        method : "get",
        url : `http://localhost:8080/uploads/files/joined/getbyid/${id}`
      });
      console.log(response)
        setShowFile(response);
    }
    downloadFileById();
  }, []);
*/
  const button =
    !(
      fileInfo &&
      Object.keys(fileInfo).length === 0 &&
      Object.getPrototypeOf(fileInfo) === Object.prototype
    ) && showFile ? (
      <button
        className="showeyes"
        onClick={() => {
          setShowFile(false);
          handleShow("");
        }}
      >
        <AiFillEyeInvisible />{" "}
      </button>
    ) : (
      <button
        className="showeyes"
        onClick={() => {
          handleShow(id);
          setShowFile(true);
        }}
      >
        <AiFillEye />{" "}
      </button>
    );
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJoinedFiles(id, "").then((response) => {
          if (response.success === true) {
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "success",
              title: response.data,
            });

            setIsDeleted(!isDeleted);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
      }
    });
  };
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
        // const transform = ConvertToCSV(response.data.joinedResult);
        // console.log(transform);
        setFileContent(response.data.joinedResult);
        setJoinFileName(response.data.originalFileName);

        const headersString =
          headerKeys2.reduce(
            (previousHeader, currentHeader) =>
              previousHeader + "," + currentHeader,
            ""
          ) + "\n";
        console.log(headersString);
        // csvFileToArray(headersString.substring(1) + transform);
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
          title: "Could not join files .. please choose other attributs",
        });
      }
    }
  }

  return (
    <>
      {!(
        fileInfo &&
        Object.keys(fileInfo).length === 0 &&
        Object.getPrototypeOf(fileInfo) === Object.prototype
      ) && (
        <tr  >
          <td>
            <label>{fileInfo.metadata.originalFileName}</label>
          </td>
          {/* <td> <CheckBox ></CheckBox>{element.originaleFileName}</td> */}
          <td>{button}</td>
          <td>
            <button className="buttonpoubelle" onClick={handleDelete}>
              <AiFillCloseCircle />
            </button>
          </td>
          <td> <button className='csvbutton' >
            <GrDocumentCsv/>
            </button> </td>
        </tr>
      )}
    </>
  );
}

export default JoinedFilePreview;
