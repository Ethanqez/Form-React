import './App.css';
import { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 

function App() {
  const columns = [
  { 
    name: <b>Fecha</b>, 
    selector: row => row.fecha, 
    sortable: true,
    cell: row => <b>{row.fecha}</b>   
  },
  { name: <b>Día</b>, selector: row => row.dia },
  { name: <b>H01</b>, selector: row => row.h01 },
  { name: <b>H02</b>, selector: row => row.h02 },
  { name: <b>H03</b>, selector: row => row.h03 },
  { name: <b>H04</b>, selector: row => row.h04 },
  { name: <b>H05</b>, selector: row => row.h05 },
  { name: <b>H06</b>, selector: row => row.h06 },
  { name: <b>H07</b>, selector: row => row.h07 },
  { name: <b>H08</b>, selector: row => row.h08 },
  { name: <b>TOTAL (Horas)</b>, selector: row => row.total },
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
  
  { fecha: "2025-08-12", dia: "Martes", h01: "08:30", h02: "10:45", h03: "11:50", h04: "13:00", h05: "14:15", total: "05:45", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },
  { fecha: "2025-08-14", dia: "Jueves", h01: "08:15", h02: "10:30", h03: "11:40", h04: "13:00", h05: "14:10", total: "05:00", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },
  { fecha: "2025-08-19", dia: "Martes", h01: "09:00", h02: "11:15", h03: "12:20", h04: "14:00", total: "05:00", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },

  
  { fecha: "2025-08-13", dia: "Miércoles", h01: "14:50", h02: "17:10", h03: "18:20", total: "03:30", empleado: "VILLALOBOS GIL JOSÉ LUIS" },
  { fecha: "2025-08-15", dia: "Viernes", h01: "13:45", h02: "16:00", h03: "17:20", h04: "18:35", total: "04:50", empleado: "VILLALOBOS GIL JOSÉ LUIS" },
  { fecha: "2025-08-18", dia: "Lunes", h01: "08:30", h02: "10:30", h03: "11:40", h04: "13:00", total: "04:30", empleado: "VILLALOBOS GIL JOSÉ LUIS" },

  
  { fecha: "2025-08-14", dia: "Jueves", h01: "09:50", h02: "12:00", h04: "14:30", total: "04:00", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: "2025-08-16", dia: "Sábado", h01: "11:10", h02: "13:25", h03: "14:40", h04: "15:50", total: "04:40", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: "2025-08-17", dia: "Domingo", h01: "10:45", h02: "13:00", h03: "14:15", h04: "15:30", total: "04:45", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },

  
  { fecha: "2025-08-13", dia: "Miércoles", h01: "09:15", h02: "11:20", h03: "12:35", h04: "14:00", total: "04:45", empleado: "NAVARRO CARRILLO ANA BELÉN" },
  { fecha: "2025-08-16", dia: "Sábado", h01: "08:45", h02: "10:50", h03: "12:05", h05: "13:30", total: "04:45", empleado: "NAVARRO CARRILLO ANA BELÉN" },
  { fecha: "2025-08-20", dia: "Miércoles", h01: "09:00", h02: "11:10", h03: "12:25", h04: "13:40", total: "04:40", empleado: "NAVARRO CARRILLO ANA BELÉN" },

  
  { fecha: "2025-08-13", dia: "Miércoles", h01: "15:00", h02: "17:15", h03: "18:30", h04: "19:45", total: "04:45", empleado: "DELGADO SUÁREZ LUIS MIGUEL" },
  { fecha: "2025-08-18", dia: "Lunes", h01: "09:30", h02: "11:50", h03: "13:00", h04: "14:30", total: "05:00", empleado: "DELGADO SUÁREZ LUIS MIGUEL" },

  
  { fecha: "2025-08-12", dia: "Martes", h01: "07:50", h02: "10:00", h03: "11:15", h04: "12:30", total: "04:40", empleado: "CASTRO MENDOZA LAURA VALERIA" },
  { fecha: "2025-08-15", dia: "Viernes", h01: "08:20", h02: "10:40", h03: "12:00", total: "04:00", empleado: "CASTRO MENDOZA LAURA VALERIA" },

  { fecha: "2025-08-13", dia: "Miércoles", h01: "10:00", h02: "12:15", h03: "13:30", h04: "14:45", total: "04:45", empleado: "RAMÍREZ TORRES PABLO ENRIQUE" },
  { fecha: "2025-08-16", dia: "Sábado", h01: "09:10", h02: "11:20", h03: "12:40", total: "03:30", empleado: "RAMÍREZ TORRES PABLO ENRIQUE" },

  { fecha: "2025-08-14", dia: "Jueves", h01: "08:00", h02: "10:15", h03: "11:30", h04: "12:45", total: "04:45", empleado: "HERRERA GÓMEZ DANIELA ISABEL" },
  { fecha: "2025-08-17", dia: "Domingo", h01: "09:30", h02: "11:40", h03: "12:50", total: "03:20", empleado: "HERRERA GÓMEZ DANIELA ISABEL" },
];

const empleados = [
    "FUENTES MORALES CAMILA ALEJANDRA",
    "VILLALOBOS GIL JOSÉ LUIS",
    "SALAZAR VÉLEZ RICARDO ANDRÉS",
    "NAVARRO CARRILLO ANA BELÉN",
    "DELGADO SUÁREZ LUIS MIGUEL",
    "CASTRO MENDOZA LAURA VALERIA",
    "RAMÍREZ TORRES PABLO ENRIQUE"
  ];

 console.log("queti")

  const [selectEmpleado] = useState(data);
  const [registro, setRegistro] = useState(data);
  const fechaI = useRef();
  const fechaF = useRef();


  const handleChange = (e) => {
    if (!e.target.value) {
      setRegistro(data); 
      return;
    }

    const datosFiltrados = data.filter(registro => {
      return registro.empleado.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRegistro(datosFiltrados);
  };

  const handleFilterByDate = () => {
    const startValue = fechaI.current.value;
    const endValue = fechaF.current.value;

    if (!startValue || !endValue) {
      setRegistro(data);
      return;
    }

    const start = new Date(startValue);
    const end = new Date(endValue);

    const filtrados = data.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= start && fechaRegistro <= end;
    });

    setRegistro(filtrados);
  };

  const handleGeneratePDF = () => {
    const input = document.getElementById('content');
    const button = document.getElementById('generate-pdf-btn'); 
    button.style.display = 'none'; 

    html2canvas(input, { scale: 2 }).then(canvas => { 
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('landscape'); 
      doc.addImage(imgData, 'PNG', 10, 10, 280, 150); 
      doc.save('marcaciones.pdf'); 

      button.style.display = 'block';
    });
  };

  return (
    <div id="content">
      <h2>DETALLE DE MARCACIONES</h2>
      <div className="contenedor">

        <div className="grupo">
          <h1 style={{fontSize: "14px"}}>Fecha Inicial</h1>
          <input 
            type='date' 
            ref={fechaI} 
            onChange={handleFilterByDate}
            style={{width: "280px", height: "40px"}}
          />
        </div>

        <div className="grupo">
          <h1 style={{fontSize: "14px"}}>Fecha Final</h1>
          <input 
            type='date' 
            ref={fechaF} 
            onChange={handleFilterByDate}
            style={{width: "280px", height: "40px"}}
          />
        </div>

      </div>
      <br/>

      <div>
        <h1 style={{ fontSize: "14px" }}>Empleado</h1>
        <select
          value={selectEmpleado}
          onChange={handleChange}
          
          style={{ width: "600px", height: "30px" }}>

        <option value="">Seleccione un empleado</option>
        {empleados.map((nombre, index) => (
          <option key={index} value={nombre}>
            {nombre}
          </option>
        ))}
      </select>
    </div>


      <br/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input 
          className="boton" 
          type='button' 
          value="Mostrar Marcaciones" 
          style={{ height: "40px", textAlign: 'center', fontSize: "14px", margin: "17px", width: "177px" }} 
          onClick={handleFilterByDate}
        />
      </div>

      <div id="data-table" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <DataTable columns={columns} data={registro} fixedHeader fixedHeaderScrollHeight="500px" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

        <button
          id="generate-pdf-btn"
          onClick={handleGeneratePDF}
          style={{ padding: "10px 20px", fontSize: "14px" }}
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
}

export default App;