import React, {useState, useEffect} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcar from "./addcar";
import Editcar from "./editcar";
import EditIcon from '@mui/icons-material/Edit';




function Carlist () {
  
  
  const [cars, setCars] = useState([]);



 

  useEffect(()=>fetchData(), []);
  
  const fetchData = ()=> {
      fetch("https://carrestapi.herokuapp.com/cars")
      .then(response => response.json())
      .then(data =>setCars(data._embedded.cars))
      .catch(err => console.error(err))
    };

    const deleteCar = (params) => {
      if(window.confirm("click to confirm delete")){
      fetch(params,{method: "DELETE"})
      .then(res => fetchData())
      .catch(err => console.error(err))
      }
    };
  
    
    const saveCar = (car) => {
      fetch("https://carrestapi.herokuapp.com/cars",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(car)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
      
    }

    const updateCar = (car, link) => {
      fetch(link, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(car)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))

        

    }
    
    const [columnDefs] = useState([
        {field: "brand", sortable: true, filter: true, flex: 1},
        {field: "model", sortable: true, filter: true, flex:1},
        {field: "fuel", sortable: true, filter: true, flex:1},
        {field: "year", sortable: true, filter: true,flex:1},
        {field: "price", sortable: true, filter: true,flex:1},
        {cellRenderer: row => <Editcar startIcon={<EditIcon/>} updateCar={updateCar} car={row.data} />},
        {field: "_links.self.href", cellRenderer: ({value}) => <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={()=> deleteCar(value)}>Delete</Button>},

        
    ])
    

    
    

    return (
      <div className="ag-theme-material"
      style={{height: 600, width:"90%", margin: "auto"}}>
        

        <Addcar saveCar={saveCar}/>
        <AgGridReact
        rowData={cars}
        columnDefs={columnDefs}>
          
        </AgGridReact>

      </div>
    );
}


export default Carlist;