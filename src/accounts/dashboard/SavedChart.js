import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import LayoutHome from "../layout/LayoutHome";
import { Bar, Bubble, Line ,Pie, Radar,Doughnut,Scatter, PolarArea} from 'react-chartjs-2';
import {Paper} from "@material-ui/core";



const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your  Chart',
        },
    },
};

const SavedChart = ()=>{
    let {id} = useParams()
    const ref = useRef(null);
    const [graph,setGraph] = useState({}) ;
    const [show , setShow] = useState(false)
    const [chartType , setChartType] = useState("bar");

    useEffect(()=>{
        async function getDrawData() {
            try {
                const response = await axios({
                    method:"get",
                    url : `/chart/one/${id}`,

                })
                
                const {xaxis,yaxis,labels,returnedData} = response.data.data ;
                setChartType(response.data.type)
                
                const values = returnedData.map((element)=>parseFloat(element))
                
                setGraph({
                    labels,
                    datasets: [
                        {
                            label: `${yaxis} = fn(${xaxis})`,
                            data: values,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(60, 179, 113)',
                                'rgb(255, 205, 86)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 255, 0)',



                            ],
                            hoverOffset: 8

                        },



                    ],
                })
                setShow(true)
            }catch (e) {
                console.log(e)
            }
        }
        getDrawData()
    }, [])
    const downloadImage = useCallback (()=>{
        const link = document.createElement('a');
        link.download = 'chart.png'
        link.href = ref.current.toBase64Image()
        link.click();
    },[])



    return (
        <  >
            <LayoutHome />

        <div className="chartssimple" style={{ marginTop: 200, marginLeft: 300 }}>
            {
                show && (
                    <>
                        { chartType ==="bar" && (
                            <div style={{height : '720px' , width : '750px',marginLeft : '-70px'}}>

                                <Bar  ref={ref} options={options} data={graph} />
                                <button className="buttondownloadasimage2"  onClick={downloadImage}>download as image</button>
                            </div>
                        )}
                        { chartType ==="polararea" && (
                            <div style={{height : '520px' , width : '550px',marginLeft : '-70px',marginTop:'-120px'}}>

                                {<PolarArea  ref={ref} options={options} data={graph} />}
                                <button className="buttondownloadasimage2" onClick={downloadImage}>download as image</button>
                            </div>
                        )}
                        { chartType ==="pie" && (
                            <div style={{height : '520px' , width : '550px',marginLeft : '-70px',marginTop:'-120px'}}>

                                {<Pie  ref={ref} options={options} data={graph} />}
                                <button className="buttondownloadasimage2"  onClick={downloadImage}>download as image</button>
                            </div>
                        )}
                        { chartType ==="bubble" && (
                            <div style={{height : '720px' , width : '750px',marginLeft : '-70px',marginTop:'-120px'}}>

                                {<Bubble className="buttondownloadasimage2" ref={ref} options={options} data={graph} />}
                                <button  onClick={downloadImage}>download as image</button>
                            </div>
                        )}

                    </>
                )
            }


</div>


        </>
    )
}



export default  SavedChart;