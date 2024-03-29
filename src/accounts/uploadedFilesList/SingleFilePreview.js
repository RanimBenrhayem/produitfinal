//importations
import React from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillCloseCircle,
} from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { getSimpleFileById, deleteSignleFiles } from "../../services/axios";
import Swal from "sweetalert2";

function SingleFilePreview({ id, handleShow, isDeleted, setIsDeleted }) {
  const [showFile, setShowFile] = useState(false);
  const [fileInfo, setFileInfo] = useState({});

  useEffect(() => {
    async function fetchFileById() {
      const response = await getSimpleFileById(id);
      if (response.success === true) {
        setFileInfo(response.data); //file info
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
        deleteSignleFiles(id).then((response) => {
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
            const Toast = Swal.mixin({
              toast: true,
              position: "bottom-right",
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Could not delete this file.",
            });
          }
        });
      }
    });
  };
  return (
    <>
      {!(
        fileInfo &&
        Object.keys(fileInfo).length === 0 &&
        Object.getPrototypeOf(fileInfo) === Object.prototype
      ) && (
        <tr>
          <td>
            <label>{fileInfo.metadata.originalFileName}</label>
          </td>
          <td>{button}</td>
          <td>
            <button className="buttonpoubelle" onClick={handleDelete}>
              <AiFillCloseCircle />
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default SingleFilePreview;
