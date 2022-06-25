import React from "react";
import {
  getJoinedFileById,
  deleteJoinedFiles,

} from "../../services/axios";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCloseCircle,

} from "react-icons/ai";

import {GrDocumentCsv}from "react-icons/gr"
import {RiDownloadCloud2Fill}from "react-icons/ri"
import { useState } from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";



function JoinedFilePreview({ id, handleShow, isDeleted, setIsDeleted }) {
  const [showFile, setShowFile] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [content,setContent] =useState("")
  const [loaded,setLoaded] =useState(false)

  useEffect(() => {
    async function fetchFileById() {
      const response = await getJoinedFileById(id);
      if (response.success === true) {
        setFileInfo(response.data);
      }
    }
    fetchFileById();
  }, []);

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
  const getFileContent =()=>{
    if(!loaded) {

  axios.get(`/uploads/files/joined/getbyid/${id}`)
      .then((res)=>{
        setContent(res.data);
        setLoaded(true)
      }).catch(()=>{
        setLoaded(false)
  })
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
          <td>{!loaded ? <button onClick={getFileContent} className='csvbutton'>< RiDownloadCloud2Fill/></button>:<CSVLink data={content} filename={fileInfo.metadata.originalFileName} className='csvbutton'><GrDocumentCsv/></CSVLink> } </td>
        </tr>
      )}
    </>
  );
}

export default JoinedFilePreview;
