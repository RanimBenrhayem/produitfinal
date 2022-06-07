import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import {
  AiOutlineCloudUpload,
  AiFillEyeInvisible,
  AiFillEye,
  AiFillCaretUp,
} from "react-icons/ai";
import Swal from "sweetalert2";
import { useRef } from "react";
import { uploadSingleFiles } from "../../services/axios";
import '../../styles/uploadedFiles.css'


function FileUploader() {
  //useState()
  const [file, setFile] = useState([]);
  const [array, setArray] = useState([]);
  const [show, setShow] = useState(false);
  const lastItemRef = useRef(null);

  const fileReader = new FileReader();

  //function handlechanege
  function handleChange(e) {
    console.log(e)
    setFile(e);
  //console.log(file)
 

  }
  //console.log(fileReader.readAsText(file[0]))

  //fucntion CSVFileToArray
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

  function handleShow (){
    if (file[0]) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
        console.log(file[0]);

      };
      console.log(file[0]);
      fileReader.readAsText(file[0]);
      
      setShow(true)
    }

  }

  //la fonction asynchrone handleUpload (en relation avec le back)
  async function handleUpload(e)
   {
   e.preventDefault()
    try {
      if (file[0]) {
        const formData = new FormData();
        formData.append("file", file[0]);

        const response = await uploadSingleFiles(formData); //uploadSingleFiles se trouve dans le fichier Axios
        if (response.success === true) {
          // setFile(response.data);
          fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text);
            console.log(file[0]);
          };
          fileReader.readAsText(file[0]);
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
            title:  `${response.data}, you can now check your files list`,
          });

        }
      }
      console.log(file[0])
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

  const headerKeys = Object.keys(Object.assign({}, ...array));

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

     
    </div>
  );
}

export default FileUploader;
