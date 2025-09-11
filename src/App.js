import './App.css';
import { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';

function App() {
  const columns = [
    {
      name: "Fecha",
      selector: row => row.fecha,
      sortable: true
    },
    {
      name: "Dia",
      selector: row => row.dia
    },
    {
      name: "H01",
      selector: row => row.h01,
    },
    {
      name: "H02",
      selector: row => row.h02,
    },
    {
      name: "H03",
      selector: row => row.h03,
    },
    {
      name: "H04",
      selector: row => row.h04,
    },
    {
      name: "H05",
      selector: row => row.h05,
    },
    {
      name: "H06",
      selector: row => row.h06,
    },
    {
      name: "H07",
      selector: row => row.h07,
    },
    {
      name: "H08",
      selector: row => row.h08,
    },
    {
      name: "TOTAL (Horas)",
      selector: row => row.total,
    },
    {
      name: "Empleado",
      selector: row => row.empleado,
    },
  ];

const data = [
  {
    fecha: "30/07/2025", 
    dia: "Miercoles", 
    h01: "18:00",
    h02: "20:06",
    total: "02:06",
    empleado: "CHUQUILLA TAIPE SANDRA MARLENE"
  },
  {
    fecha: "30/06/2025", 
    dia: "Lunes", 
    h01: "14:22",
    total: "00:00",
    empleado: "IZAN MONRROY"
  },
  {
    fecha: "30/04/2025", 
    dia: "Miercoles", 
    h01: "18:00",
    h02: "20:00",
    total: "02:00",
    empleado: "FRANKLIN ORDOÑEZ"
  },
  {
    fecha: "01/08/2025", 
    dia: "Viernes", 
    h01: "09:15", 
    h02: "11:30", 
    total: "02:15", 
    empleado: "MARTÍNEZ PÉREZ JUAN CARLOS"
  },
  {
    fecha: "02/08/2025", 
    dia: "Sábado", 
    h01: "14:00", 
    h02: "16:00", 
    total: "02:00", 
    empleado: "GÓMEZ RAMÍREZ LAURA"
  },
  {
    fecha: "03/08/2025", 
    dia: "Domingo", 
    h01: "11:30", 
    h02: "13:45", 
    total: "02:15", 
    empleado: "PÉREZ MENDOZA JULIO ALBERTO"
  },
  {
    fecha: "04/08/2025", 
    dia: "Lunes", 
    h01: "10:00", 
    h02: "12:15", 
    total: "02:15", 
    empleado: "SÁNCHEZ FERNÁNDEZ ANDREA"
  },
  {
    fecha: "05/08/2025", 
    dia: "Martes", 
    h01: "08:45", 
    h02: "10:55", 
    total: "02:10", 
    empleado: "JIMÉNEZ GARCÍA FABIOLA"
  },
  {
    fecha: "06/08/2025", 
    dia: "Miércoles", 
    h01: "16:30", 
    h02: "18:30", 
    total: "02:00", 
    empleado: "CASTRO SERRANO FRANCISCO"
  },
  {
    fecha: "07/08/2025", 
    dia: "Jueves", 
    h01: "13:00", 
    h02: "15:00", 
    total: "02:00", 
    empleado: "RODRÍGUEZ TORO MARÍA VICTORIA"
  },
  {
    fecha: "08/08/2025", 
    dia: "Viernes", 
    h01: "19:45", 
    h02: "21:50", 
    total: "02:05", 
    empleado: "LOPEZ DÍAZ FRANCISCO JAVIER"
  },
  {
    fecha: "09/08/2025", 
    dia: "Sábado", 
    h01: "12:00", 
    h02: "14:10", 
    total: "02:10", 
    empleado: "MORALES HERRERA EDUARDO"
  },
  {
    fecha: "10/08/2025", 
    dia: "Domingo", 
    h01: "17:30", 
    h02: "19:30", 
    total: "02:00", 
    empleado: "RIVERA CASTAÑO VERÓNICA"
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
      title="Mostrar Macaciones"
        columns={columns} 
        data={registro} 
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />
    </div>
  );
}

export default App 
