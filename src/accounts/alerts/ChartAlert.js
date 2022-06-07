import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios"


export default function ChartAlert({attributes,labels,data,saved,setSaved,attribut1,attribut2,fileId,typeOfDashboard}){

    const [choice,setChoice] = useState("")
    const [operator,setOperator] = useState("")
    const [val,setVal] = useState("")
    const [confirmed,setConfirmed] = useState(false)
    const [xAlertResult , setXAlertResult] = useState([])
    const [yAlertResult, setYAlertResult] = useState([])
    const saveButtonText = saved.length>0? "save alert" :"save chart & alert"


const handleConfirm = ()=>{
        const alertData = choice == attributes[0]? labels : data
    const compareVal = parseFloat(val)
    let indexes = []
        const alertResult = alertData.filter((element,index)=>{
            switch (operator) {
                case "=": if (element == compareVal) {
                    indexes.push(index);
                    return true
                }
                return false ;
                case ">" : if(  element > compareVal){
                    indexes.push(index);
                    return true;
                }
                return false;
                case ">=" : if (element >= compareVal){
                    indexes.push(index);
                    return true;
                }
                return false;
                case  "<" : if (element < compareVal){
                    indexes.push(index)
                    return true
                }
                return false;
                case "<=" : if (element <= compareVal) {
                    indexes.push(index);
                    return true
                }
                return false;
            }
        })
    const alertLabels =  choice == attributes[1]? labels : data
    const otherChoice = choice == attributes[1]?attributes[0]:attributes[1]
    const resultLabels = indexes.map((elt)=>alertLabels[elt])

    setXAlertResult(resultLabels)
    setYAlertResult(alertResult)
    if(alertResult.length>0) {
        let swalText = "<br> <br> "
        alertResult.map((elt,index)=>{
             swalText += ` ${choice}: ${elt} ${operator} ${val} for ${otherChoice}: ${resultLabels[index]} <br>`
        })
        Swal.fire({
            title : 'Alert Box',
            icon :"warning",
            showCancelButton : true,
            html : `${swalText}`,
            footer : `you can save chart and alert by clicking the button : "${saveButtonText}"`

        })
    }
    

}

const handleSaveAlert =async ()=> {
        try {
            if(saved.length>0) {
                const response = await axios({
                    method: "post",
                    url : `/chart/alert/simple/add/${saved}`,
                    data : {value:val,operator,attribute:choice}
                })
            
                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-right",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                  });
            
                  Toast.fire({
                    icon: "success",
                    title: 'Saved',
                  });
            }else {
                const response = await axios({

                        method :"post",
                        url : `http://localhost:8080/chart/save/database`,
                        data : {attribut1 ,  attribut2,fileId : `${fileId}` , typeOfDashboard , isJoined:false},
                     
                   
                   
                    })
                    const Toast2 = Swal.mixin({
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                      });
                
                      Toast2.fire({
                        icon: "success",
                        title: 'saved',
                      });
                await axios({
                    method: "post",
                    url : `/chart/alert/simple/add/${response.data._id}`,
                    data : {value:val,operator,attribute:choice}
                })
                    setSaved(response.data._id)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "bottom-right",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                      });
                
                      Toast.fire({
                        icon: "success",
                        title: 'Saved',
                      });


            }
            

        }catch (e) {
            console.log(e)
        }
}

    return(
        <>

            {attributes.length > 0 && (
                <>
                <select className="select6"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                >
                    <option value={""}>please select an attribute</option>
                    {attributes.map((element, index) => {


                        return <option value={element}>{element}</option>;
                    })}
                </select>
                <select className="select7"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                >
                <option value={""}>please select an operator_</option>
                    <option value={"="}>=</option>
                    <option value={">"}> > </option>
                    <option value={">="}> >=</option>
                    <option value={"<"}> {"<"}  </option>
                    <option value={"<="}>{"<="}</option>

            })}
                </select>
               
                   
                    <input className='input' className="input" name="value" type="text" value={val} onChange={(e)=>setVal(e.target.value)}/>
                    <button  className="buttonalert" onClick={handleConfirm}> confirm alert</button>
                    <button className="savealerte" onClick={handleSaveAlert}>{saveButtonText}</button>
                </>
            )}

        </>
    )
}