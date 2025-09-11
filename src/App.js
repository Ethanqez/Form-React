import './App.css';
import { useState, useRef, Component } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 

function App() {
  const columns = [
    { name: <b>Fecha</b>, selector: row => row.fecha, sortable: true },
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
    { name: <b>Empleado</b>, selector: row => row.empleado, 
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
  { fecha: <b>12/08/2025</b>, dia: "Martes", h01: "08:30", h02: "10:45", h03: "11:50", h04: "13:00", h05: "14:15", total: "05:45", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },
  { fecha: <b>13/08/2025</b>, dia: "Miércoles", h01: "14:50", h02: "17:10", h03: "18:20", total: "03:30", empleado: "VILLALOBOS GIL JOSÉ LUIS" },
  { fecha: <b>15/08/2025</b>, dia: "Viernes", h01: "13:45", h02: "16:00", h03: "17:20", h04: "18:35", total: "04:50", empleado: "VILLALOBOS GIL JOSÉ LUIS" },
  { fecha: <b>14/08/2025</b>, dia: "Jueves", h01: "08:15", h02: "10:30", h03: "11:40", h04: "13:00", h05: "14:10", total: "05:00", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },
  { fecha: <b>14/08/2025</b>, dia: "Jueves", h01: "09:50", h02: "12:00", h04: "14:30", total: "04:00", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>13/08/2025</b>, dia: "Miércoles", h01: "09:15", h02: "11:20", h03: "12:35", h04: "14:00", total: "04:45", empleado: "NAVARRO CARRILLO ANA BELÉN" },
  { fecha: <b>16/08/2025</b>, dia: "Sábado", h01: "08:45", h02: "10:50", h03: "12:05", h05: "13:30", total: "04:45", empleado: "NAVARRO CARRILLO ANA BELÉN" },
  { fecha: <b>13/08/2025</b>, dia: "Miércoles", h01: "15:00", h02: "17:15", h03: "18:30", h04: "19:45", total: "04:45", empleado: "DELGADO SUÁREZ LUIS MIGUEL" },
  { fecha: <b>16/08/2025</b>, dia: "Sábado", h01: "11:10", h02: "13:25", h03: "14:40", h04: "15:50", total: "04:40", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>17/08/2025</b>, dia: "Domingo", h01: "10:45", h02: "13:00", h03: "14:15", h04: "15:30", total: "04:45", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>12/08/2025</b>, dia: "Martes", h01: "07:45", h02: "10:00", h03: "11:15", h04: "12:30", total: "04:45", empleado: "CÓRDOVA PÉREZ MARÍA FERNANDA" },
  { fecha: <b>17/08/2025</b>, dia: "Domingo", h01: "08:00", h02: "10:10", h03: "11:25", h04: "12:40", h05: "13:50", total: "05:30", empleado: "FUENTES MORALES CAMILA ALEJANDRA" },
  { fecha: <b>14/08/2025</b>, dia: "Jueves", h01: "15:30", h02: "17:40", h03: "19:00", h04: "20:15", total: "04:45", empleado: "VILLALOBOS GIL JOSÉ LUIS" },
  { fecha: <b>13/08/2025</b>, dia: "Miércoles", h01: "11:00", h02: "13:15", h03: "14:30", h04: "15:45", h05: "16:50", total: "05:45", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>15/08/2025</b>, dia: "Viernes", h01: "10:20", h02: "12:35", h04: "15:00", total: "03:40", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>16/08/2025</b>, dia: "Sábado", h01: "15:20", h02: "17:30", h03: "18:50", h04: "20:10", total: "04:50", empleado: "DELGADO SUÁREZ LUIS MIGUEL" },
  { fecha: <b>12/08/2025</b>, dia: "Martes", h01: "10:15", h02: "12:30", h03: "13:45", h04: "15:00", h05: "16:00", total: "05:45", empleado: "SALAZAR VÉLEZ RICARDO ANDRÉS" },
  { fecha: <b>15/08/2025</b>, dia: "Viernes", h01: "07:50", h02: "10:00", h03: "11:20", h04: "12:30", total: "04:40", empleado: "CÓRDOVA PÉREZ MARÍA FERNANDA" },
  { fecha: <b>13/08/2025</b>, dia: "Miércoles", h01: "08:00", h02: "10:15", h03: "11:30", h04: "13:00", h05: "14:10", total: "05:30", empleado: "CÓRDOVA PÉREZ MARÍA FERNANDA" },
  { fecha: <b>14/08/2025</b>, dia: "Jueves", h01: "09:10", h02: "11:20", h03: "12:40", total: "03:30", empleado: "CÓRDOVA PÉREZ MARÍA FERNANDA" },
  { fecha: <b>17/08/2025</b>, dia: "Domingo", h01: "09:00", h02: "11:00", h03: "12:15", h04: "13:30", total: "04:30", empleado: "CÓRDOVA PÉREZ MARÍA FERNANDA" },
  { fecha: <b>12/08/2025</b>, dia: "Martes", h01: "14:30", h02: "16:45", h03: "18:00", h04: "19:15", total: "04:45", empleado: "DELGADO SUÁREZ LUIS MIGUEL" },
  { fecha: <b>14/08/2025</b>, dia: "Jueves", h01: "08:50", h02: "10:55", h03: "12:10", h04: "13:30", total: "04:40", empleado: "NAVARRO CARRILLO ANA BELÉN" },
  { fecha: <b>15/08/2025</b>, dia: "Viernes", h01: "09:30", h02: "11:35", h03: "12:50", h04: "14:10", h05: "15:30", total: "06:00", empleado: "NAVARRO CARRILLO ANA BELÉN" }
  ];

  const [registro, setRegistro] = useState(data);
  const fechaI = useRef();
  const fechaF = useRef();

  const handleChange = (e) => {
    const datosFiltrados = data.filter(registro => {
      return registro.empleado.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRegistro(datosFiltrados);

  //ComponentDidMount(){
    //axios.get("");
    //then(Response=>{console.log(Response)}).catch(error=>{console.log(error)});
    
  //}

  };

  // Función para generar el PDF con todo 
  const handleGeneratePDF = () => {
    const input = document.getElementById('content');
    const button = document.getElementById('generate-pdf-btn'); 
    button.style.display = 'none'; 

    html2canvas(input, { scale: 2 }).then(canvas => { 
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('landscape'); 
      doc.addImage(imgData, 'PNG', 10, 10, 280, 150); 
      doc.save('marcaciones.pdf'); 

      button.style.display = 'block'; //mostrar botón
    });
  };

  return (
    <div id="content">
      <h2>DETALLE DE MARCACIONES</h2>
      
      <div className="contenedor">
        <div className="grupo">
          <h1 style={{fontSize: "14px"}}>Fecha Inicial</h1>
          <input type='date' ref={fechaI} style={{width: "280px", height: "30px"}}/>
        </div>
        <div className="grupo">
          <h1 style={{fontSize: "14px"}}>Fecha Final</h1>
          <input type='date' ref={fechaF} style={{width: "280px", height: "30px"}}/>
        </div>
      </div>
      <br/>
      <h1 style={{fontSize: "14px"}}>Empleado</h1>
      <input type='text' onChange={handleChange} style={{width: "600px", height: "30px"}}/>
      <br/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input className="boton" type='button' value="Mostrar Marcaciones" style={{ height: "40px", textAlign: 'center', fontSize: "14px", margin: "17px", width: "177px" }} />
      </div>

      {/* Se renderiza la tabla */}
      <div id="data-table" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <DataTable columns={columns} data={registro} fixedHeader fixedHeaderScrollHeight="500px" />
      </div>

      {/* Botón para generar PDF debajo de la tabla */}
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
