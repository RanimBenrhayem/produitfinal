import React, {useEffect, useState} from "react";
import LayoutHome from "../layout/LayoutHome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiFillCloseCircle,
    AiOutlineDownload,
  } from "react-icons/ai";
import {FaPaintBrush}from "react-icons/fa"

export default function RecomHome() {
    const [dashboardList , setDashboardList] = useState([])
    const [deleted,setDeleted] = useState(false)
    let navigate = useNavigate()
    useEffect(()=> {
        async  function getAll() {
            try{
                const response = await  axios({
                    method : "get",
                    url : "/chart/all"
                })
                setDashboardList(response.data)
                console.log(response.data)
            }catch (e) {
                console.log(e)
                setDashboardList([])
            }


        }
        getAll()
    }, [deleted])

    const handleDelete= async (id)=>{
        try{
            const response = await axios({
                method:"delete",
                url:`http://localhost:8080/chart/delete/${id}`
            })
            console.log(response.data)
            setDeleted(!deleted)
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
                        return <tr key={_id}>
                            <td>{element.file[0].metadata.originalFileName}</td>
                            <td>{attribut1}</td>
                            <td>{attribut2} </td>
                            <td> {typeOfDashboard}</td>
                            <td> <button  className="paint"  onClick={()=>navigate(`/savedDashboard/${_id}`)}><FaPaintBrush/></button></td>
                            <td className="buttonpoubelle" onClick={()=>handleDelete(_id)}>   <AiFillCloseCircle /></td>
                        </tr>
                    })
                )}
        
        
        
        </table> 
    </div>
  );
}