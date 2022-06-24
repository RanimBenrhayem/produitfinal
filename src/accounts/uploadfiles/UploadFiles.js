import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import {
  AiOutlineCloudUpload,
  AiFillEyeInvisible,
  AiFillEye} from "react-icons/ai";
import Swal from "sweetalert2";
import { uploadSingleFiles } from "../../services/axios";
import '../../styles/uploadedFiles.css'


function FileUploader() {
  //useState()
  const [file, setFile] = useState([]);
  const [array, setArray] = useState([]);
  const [show, setShow] = useState(false);
  const fileReader = new FileReader(); //read file
  //function handlechange
  function handleChange(e) {
    console.log(e)
    setFile(e);
  }


  //function CSVFileToArray
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(","); //headers 
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n"); //values tout le reste
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {  
        object[header] = values[index]; 
        return object; //return obj
      }, {});
      return obj; //return map
    });
    setArray(array);
  };

  function handleShow (){
    if (file[0]) { 
      fileReader.onload = function (event) { //chargement du fichier 
        const text = event.target.result; 
        csvFileToArray(text); //convert csv to array
        console.log(file[0]);

      };
      fileReader.readAsText(file[0]); //convert to string , used for conditions 
      
      setShow(true)
    }

  }

  //la fonction asynchrone handleUpload (en relation avec le back)
  async function handleUpload(e)
   {
   e.preventDefault()
    try {
      if (file[0]) {
        const formData = new FormData(); //to send file via post request 
        formData.append("file", file[0]); //"file" is the key 

        const response = await uploadSingleFiles(formData); //uploadSingleFiles se trouve dans le fichier Axios
        if (response.success === true) {
       
          //swal pour les alertes
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
         
            timerProgressBar: true,
            timer : 5000
          });

          Toast.fire({
            icon: "success",
            title:  `${response.data}`,
          });

        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const button = show ? (
    <button title="Hide" className="eyebutton" onClick={() => setShow(false)}>
      <AiFillEyeInvisible /> <div className="buttontexticon">Hide</div>{" "}
    </button>
  ) : (
    <button title="Show" className="eyebutton" onClick={handleShow}>
      <AiFillEye /> <div className="buttontexticon">Show</div>
    </button>
  );

  const headerKeys = Object.keys(Object.assign({}, ...array)); //retreive keys from the file

  return (

    <div className="drop" >
   
      <DropzoneArea
   
        useChipsForPreview
        previewText= 'Your selected File'
        showPreviews={true}
        showPreviewsInDropzone={false}
        filesLimit={1}
        acceptedFiles={[
          ".csv, text/csv, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
        ]}
        onChange={handleChange}
      />
      {file.length > 0 && (
        <div>
          <div>{button}</div>

          <div>
            <button className="Upload" title="Upload" onClick={handleUpload}>
              <AiOutlineCloudUpload />
              <div className="buttontexticon">Upload</div>
            </button>
          </div>
        </div>
      )}

      { file.length>0 && show && (
        <table>
          <thead>
            <tr>
              {headerKeys.map((key) => (
                <th>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {array.map((item) => (
              <tr> 
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

     
    </div>
  );
}

export default FileUploader;
