import {
  Grid,
  Box,
  Container,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  TextField,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import LayoutHome from "../layout/LayoutHome";
import Charts from "./Charts";


export default function DashboardHome() {
  const[list,setList] =useState(1)
 
  return (
    <div >
    
      <LayoutHome />
      <Button className="ButtonChart"
                    type="submit"
                    variant="contained"
                  
                    sx={{ marginLeft : 10  }}
                    onClick={()=>setList(list+1)}
                  
                  >
                
                   Add New Chart
                  </Button>
      <h2 className="titlechart">Create your own Dashboards</h2>
      <Paper  sx={{ padding: "2em 50em", marginTop:8,
          height: 700, width : 1000 }}elevation={5}>
             
      
       {[...Array(list)].map((element)=><Charts  />)}
   

    
       {/* <button className="addnewchart" onClick={()=>setList(list+1)}>add new chart</button> */}
  </Paper>

    </div>
  );
}
