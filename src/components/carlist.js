import React, {useState, useEffect} from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from "ag-grid-react";





function Carlist () {
  

    const [cars, setCars] = useState([]);
    useEffect(()=>fetchData(), []);

    const deleteCar = (params) => {
      fetch(params,{method: "DELETE"})
      .then(res => fetchData())
      .catch(err => console.error(err))
    }
  
    const SimpleComp = (params) => <button onClick={()=> deleteCar(params.value)}>Delete</button>;

    
   

    

    const [columnDefs] = useState([
        {field: "brand", sortable: true, filter: true, flex: 1},
        {field: "model", sortable: true, filter: true, flex:1},
        {field: "fuel", sortable: true, filter: true, flex:1},
        {field: "year", sortable: true, filter: true,flex:1},
        {field: "price", sortable: true, filter: true,flex:1},
        {field: "_links.self.href", sortable: true, filter: true, cellRenderer: SimpleComp, flex:1},

        
    ])

    const fetchData = ()=> {
        fetch("http://carrestapi.herokuapp.com/cars")
        .then(response => response.json())
        .then(data =>setCars(data._embedded.cars))
        .catch(err => console.error(err))

    }
    

    return (
      <div className="ag-theme-material"
      style={{height: 600, width:"90%", margin: "auto"}}>
        

        <AgGridReact
       
        rowData={cars}
        columnDefs={columnDefs}>
          
        </AgGridReact>

      </div>
    );
}


export default Carlist;