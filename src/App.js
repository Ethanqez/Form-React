import './App.css';
import { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';

function App() {
  const columns = [
    {
      name: <b>Fecha</b>,
      selector: row => row.fecha,
      sortable: true
    },
    {
      name: <b>Día</b>,
      selector: row => row.dia
    },
    {
      name: <b>H01</b>,
      selector: row => row.h01,
    },
    {
      name: <b>H02</b>,
      selector: row => row.h02,
    },
    {
      name: <b>H03</b>,
      selector: row => row.h03,
    },
    {
      name: <b>H04</b>,
      selector: row => row.h04,
    },
    {
      name: <b>H05</b>,
      selector: row => row.h05,
    },
    {
      name: <b>H06</b>,
      selector: row => row.h06,
    },
    {
      name: <b>H07</b>,
      selector: row => row.h07,
    },
    {
      name: <b>H08</b>,
      selector: row => row.h08,
    },
    {
      name: <b>TOTAL (Horas)</b>,
      selector: row => row.total,
    },
    {
      name: <b>Empleado</b>,
      selector: row => row.empleado,
      cell: row => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {row.empleado.split(" ").map((palabra, i) => (
            <div key={i}>{palabra}</div>
          ))}
        </div>
      )
    },
  ];

  const data = [
    {
      fecha: "30/07/2025", 
      dia: "Miércoles", 
      h01: "08:00",
      h02: "10:00",
      h03: "11:00",
      h04: "13:00",
      total: "05:00",
      empleado: "LOOR HURTADO LUIS ANTONIO"
    },
    {
      fecha: "30/06/2025", 
      dia: "Lunes", 
      h01: "14:22",
      h02: "16:00",
      h03: "17:15",
      total: "03:00",
      empleado: "MONRROY ZAMBRANO IZAN MANUEL"
    },
    {
      fecha: "30/04/2025", 
      dia: "Miércoles", 
      h01: "18:00",
      h02: "20:00",
      h03: "21:00",
      h04: "22:00",
      total: "04:00",
      empleado: "ORDÓÑEZ GASPAR FRANKLIN JESSIEL"
    },
    {
      fecha: "01/08/2025", 
      dia: "Viernes", 
      h01: "09:15", 
      h02: "11:30", 
      h03: "12:30", 
      h04: "14:00", 
      total: "04:45", 
      empleado: "MARTÍNEZ PÉREZ JUAN CARLOS"
    },
    {
      fecha: "02/08/2025", 
      dia: "Sábado", 
      h01: "14:00", 
      h02: "16:00", 
      h03: "17:00",
      h04: "18:00",
      h05: "19:00",
      total: "05:00", 
      empleado: "GÓMEZ RAMÍREZ LAURA SOFÍA"
    },
    {
      fecha: "03/08/2025", 
      dia: "Domingo", 
      h01: "11:30", 
      h02: "13:45", 
      h03: "15:00", 
      h04: "16:00", 
      h05: "17:30", 
      total: "06:00", 
      empleado: "PÉREZ MENDOZA JULIO ALBERTO"
    },
    {
      fecha: "04/08/2025", 
      dia: "Lunes", 
      h01: "10:00", 
      h02: "12:15", 
      h03: "13:30", 
      h04: "15:00", 
      total: "05:15", 
      empleado: "SÁNCHEZ FERNÁNDEZ ANDREA LUISA"
    },
    {
      fecha: "05/08/2025", 
      dia: "Martes", 
      h01: "08:45", 
      h02: "10:55", 
      h03: "12:00", 
      h04: "13:15", 
      h05: "14:30",
      total: "05:45", 
      empleado: "JIMÉNEZ GARCÍA SARA PAOLA"
    },
    {
      fecha: "06/08/2025", 
      dia: "Miércoles", 
      h01: "16:30", 
      h02: "18:30", 
      h03: "19:30", 
      h04: "21:00", 
      total: "04:30", 
      empleado: "CASTRO SERRANO FRANCISCO JUAN"
    },
    {
      fecha: "07/08/2025", 
      dia: "Jueves", 
      h01: "13:00", 
      h02: "15:00", 
      h03: "16:30", 
      h04: "18:00", 
      h05: "19:15",
      total: "06:15", 
      empleado: "RODRÍGUEZ TORO MARÍA VICTORIA"
    },
    {
      fecha: "08/08/2025", 
      dia: "Viernes", 
      h01: "19:45", 
      h02: "21:50", 
      h03: "22:30", 
      total: "03:45", 
      empleado: "LOPEZ DÍAZ FRANCISCO JAVIER"
    },
    {
      fecha: "09/08/2025", 
      dia: "Sábado", 
      h01: "12:00", 
      h02: "14:10", 
      h03: "15:30", 
      h04: "17:00", 
      h05: "18:20",
      total: "06:20", 
      empleado: "MORALES HERRERA EDUARDO ENRIQUE"
    },
    {
      fecha: "10/08/2025", 
      dia: "Domingo", 
      h01: "17:30", 
      h02: "19:30", 
      h03: "20:45", 
      h04: "22:00", 
      total: "04:30", 
      empleado: "RIVERA CASTAÑO VERÓNICA LISBETH"
    }
  ]

const [registro, setRegistro] = useState(data)


const handleChange = (e) => {
  const datosFiltrados = data.filter(registro =>{
    return registro.empleado.toLowerCase().includes(e.target.value.toLowerCase())
  })
  setRegistro(datosFiltrados)
}

const fechaI = useRef();
/*const fechaF = useRef();*/


  return (
    <div>
      <h1>Fecha Inicial</h1>
      <input type='date'
        ref={fechaI}
      />
      <h1>Empleado</h1>
      <input type='text'
        onChange={handleChange}      
      />
      <DataTable 
        title="Mostrar Marcaciones"
        columns={columns} 
        data={registro} 
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />
    </div>
  );
}

export default App;
