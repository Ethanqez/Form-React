import './App.css';
import { useState, useRef } from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react';

function App() {
  const columns = [
    { 
      name: <b>Fecha</b>, 
      selector: row => row.fecha, 
      sortable: true,
      cell: row => {
        const fecha = new Date(row.fecha);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const año = fecha.getFullYear();
        return <b>{`${dia}/${mes}/${año}`}</b>;
      }   
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

  // nuevo array unificado
  const empleados = [
    {
      nombre: "FUENTES MORALES CAMILA ALEJANDRA",
      registros: [
        { fecha: "2025-08-12", dia: "Martes", h01: "08:30", h02: "10:45", h03: "11:50", h04: "13:00", h05: "14:15", total: "05:45" },
        { fecha: "2025-08-14", dia: "Jueves", h01: "08:15", h02: "10:30", h03: "11:40", h04: "13:00", h05: "14:10", total: "05:00" },
        { fecha: "2025-08-19", dia: "Martes", h01: "09:00", h02: "11:15", h03: "12:20", h04: "14:00", total: "05:00" },
      ]
    },
    {
      nombre: "VILLALOBOS GIL JOSÉ LUIS",
      registros: [
        { fecha: "2025-08-13", dia: "Miércoles", h01: "14:50", h02: "17:10", h03: "18:20", total: "03:30" },
        { fecha: "2025-08-15", dia: "Viernes", h01: "13:45", h02: "16:00", h03: "17:20", h04: "18:35", total: "04:50" },
        { fecha: "2025-08-18", dia: "Lunes", h01: "08:30", h02: "10:30", h03: "11:40", h04: "13:00", total: "04:30" },
      ]
    },
    {
      nombre: "SALAZAR VÉLEZ RICARDO ANDRÉS",
      registros: [
        { fecha: "2025-08-14", dia: "Jueves", h01: "09:50", h02: "12:00", h04: "14:30", total: "04:00" },
        { fecha: "2025-08-16", dia: "Sábado", h01: "11:10", h02: "13:25", h03: "14:40", h04: "15:50", total: "04:40" },
        { fecha: "2025-08-17", dia: "Domingo", h01: "10:45", h02: "13:00", h03: "14:15", h04: "15:30", total: "04:45" },
      ]
    },
    {
      nombre: "NAVARRO CARRILLO ANA BELÉN",
      registros: [
        { fecha: "2025-08-13", dia: "Miércoles", h01: "09:15", h02: "11:20", h03: "12:35", h04: "14:00", total: "04:45" },
        { fecha: "2025-08-16", dia: "Sábado", h01: "08:45", h02: "10:50", h03: "12:05", h05: "13:30", total: "04:45" },
        { fecha: "2025-08-20", dia: "Miércoles", h01: "09:00", h02: "11:10", h03: "12:25", h04: "13:40", total: "04:40" },
      ]
    },
    {
      nombre: "DELGADO SUÁREZ LUIS MIGUEL",
      registros: [
        { fecha: "2025-08-13", dia: "Miércoles", h01: "15:00", h02: "17:15", h03: "18:30", h04: "19:45", total: "04:45" },
        { fecha: "2025-08-18", dia: "Lunes", h01: "09:30", h02: "11:50", h03: "13:00", h04: "14:30", total: "05:00" },
      ]
    },
    {
      nombre: "CASTRO MENDOZA LAURA VALERIA",
      registros: [
        { fecha: "2025-08-12", dia: "Martes", h01: "07:50", h02: "10:00", h03: "11:15", h04: "12:30", total: "04:40" },
        { fecha: "2025-08-15", dia: "Viernes", h01: "08:20", h02: "10:40", h03: "12:00", total: "04:00" },
      ]
    },
    {
      nombre: "RAMÍREZ TORRES PABLO ENRIQUE",
      registros: [
        { fecha: "2025-08-13", dia: "Miércoles", h01: "10:00", h02: "12:15", h03: "13:30", h04: "14:45", total: "04:45" },
        { fecha: "2025-08-16", dia: "Sábado", h01: "09:10", h02: "11:20", h03: "12:40", total: "03:30" },
      ]
    },
    {
      nombre: "HERRERA GÓMEZ DANIELA ISABEL",
      registros: [
        { fecha: "2025-08-14", dia: "Jueves", h01: "08:00", h02: "10:15", h03: "11:30", h04: "12:45", total: "04:45" },
        { fecha: "2025-08-17", dia: "Domingo", h01: "09:30", h02: "11:40", h03: "12:50", total: "03:20" },
      ]
    },
  ];

  const allRegistros = empleados.flatMap(emp =>
    emp.registros.map(r => ({ ...r, empleado: emp.nombre }))
  );

  const [registro, setRegistro] = useState(allRegistros);
  const fechaI = useRef();
  const fechaF = useRef();

  const handleChange = (e) => {
    const nombre = e.target.value;
    if (!nombre) {
      setRegistro(allRegistros);
      return;
    }
    const empleadoSeleccionado = empleados.find(emp => emp.nombre === nombre);
    if (empleadoSeleccionado) {
      setRegistro(
        empleadoSeleccionado.registros.map(r => ({
          ...r,
          empleado: empleadoSeleccionado.nombre
        }))
      );
    }
  };

  const handleFilterByDate = () => {
    const startValue = fechaI.current.value;
    const endValue = fechaF.current.value;

    if (!startValue || !endValue) {
      setRegistro(allRegistros);
      return;
    }

    const start = new Date(startValue);
    const end = new Date(endValue);

    const filtrados = allRegistros.filter(registro => {
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
    <CContainer id="content" className="py-5">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{ background: 'linear-gradient(90deg, #2193b0, #6dd5ed)' }}>
          <h2 className="m-0 text-center">DETALLE DE MARCACIONES</h2>
        </CCardHeader>
        <CCardBody style={{ backgroundColor: '#f0f8ff' }}>

          {/* FECHAS LADO A LADO */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <label>Fecha Inicial</label>
              <input type="date" ref={fechaI} onChange={handleFilterByDate} style={{ width: '280px', height: '40px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label>Fecha Final</label>
              <input type="date" ref={fechaF} onChange={handleFilterByDate} style={{ width: '280px', height: '40px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
          </div>

          {/* Select Empleado */}
          <CRow className="mb-3">
            <CCol>
              <label>Empleado</label>
              <CFormSelect onChange={handleChange}>
                <option value=""></option>
                {empleados.map((emp, index) => <option key={index} value={emp.nombre}>{emp.nombre}</option>)}
              </CFormSelect>
            </CCol>
          </CRow>

          {/* Botón Mostrar Marcaciones */}
          <CRow className="mb-3">
            <CCol className="text-center" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <CButton class= "boton" color="info" className="px-4" onClick={handleFilterByDate} style={{ height: "40px", textAlign: 'center', fontSize: "14px", margin: "10px", width: "177px" }}>
                Mostrar Marcaciones
              </CButton>
            </CCol>
          </CRow>

          {/* Tabla */}
          <div id="data-table" style={{ marginTop: '20px' }}>
            <DataTable
              columns={columns}
              data={registro}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              highlightOnHover
              striped
              customStyles={{
                headCells: { style: { backgroundColor: '#2193b0', color: 'white', fontWeight: 'bold', fontSize: '14px', borderRadius: '5px 5px 0 0' } },
                cells: { style: { fontSize: '13px', padding: '8px' } },
              }}
            />
          </div>

          {/* Botón PDF */}
          <CRow className="mt-4">
            <CCol className="text-center">
              <CButton
                color="success"
                className="px-5 py-2"
                id="generate-pdf-btn"
                onClick={handleGeneratePDF}
                style={{ background: 'linear-gradient(90deg, #56ab2f, #a8e063)', border: 'none', borderRadius: '8px' }}
              >
                Generar PDF
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default App;
