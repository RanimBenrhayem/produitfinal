import LayoutHome from "../layout/LayoutHome";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiFillCloseCircle,
    AiOutlineDownload,
  } from "react-icons/ai";
  import {FaPaintBrush}from "react-icons/fa"
export default function JoinedDashboardList() {
    const [dashboardList , setDashboardList] = useState([])
    const [deleted,setDeleted] = useState(false)
    let navigate = useNavigate()

    useEffect(()=> {
        async  function getAll() {
            try{
                const response = await  axios({
                    method : "get",
                    url : "/chart/joined/all"
                })
                setDashboardList(response.data)
                console.log(response.data)
            }catch (e) {
                console.log(e)
                setDashboardList([])
            }


        }
        getAll();
        return () => {
          setDashboardList([]); //pour re initaliser tableau 
        };
      }, [deleted]);

      
    const handleDelete= async (id)=>{
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
                  url:`http://localhost:8080/chart/delete/${id}`
                }).then(response=>{
      
      
                  Toast.fire({
                    icon: "success",
                    title: response.data,
                  });
                  setDeleted(!deleted)
      
                })
              }
            })
      
          }catch (e) {
            console.log(e)
      
          }
              
               
         
    }
    return (
        <div>
            <LayoutHome />
            <h2 className="gradient_Join">Your charts List</h2>
            <table className="tableofuploadedfiles">
                <tr>
                    <td>
                        <th>fileName</th>

                    </td>
                    <td>
                        <th>Attribut1</th>

                    </td>
                    <td>
                        <th>Attribut2</th>

                    </td>
                    <td>
                        <th>type </th>

                    </td>
                    <td>
                        <th>Draw</th>

                    </td>
                    <td>
              <th>Delete </th>

          </td>


                </tr>

                {dashboardList.length >0 && (
                    dashboardList.map((element)=> {
                        const {_id,attribut1,attribut2,fileId,typeOfDashboard} = element
                        console.log(element.file)
                        return <tr key={_id}>
                            <td>{element.file[0].metadata.originalFileName}</td>
                            <td>{attribut1}</td>
                            <td>{attribut2} </td>
                            <td> {typeOfDashboard}</td>
                            <td> <button className="paint"  onClick={()=>navigate(`/savedJoinedDashboard/${_id}`)}><FaPaintBrush/></button></td>
                            <td className="buttonpoubelle" onClick={()=>handleDelete(_id)}>   <AiFillCloseCircle /></td>
                        </tr>
                    })
                )}



            </table>
        </div>
    )
}