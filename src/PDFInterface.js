import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, Font } from '@react-pdf/renderer';
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
import { empleados } from './empleados';

// --- Registrar fuente (igual que App.js) ---
Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', // o reemplaza con la fuente que quieras
});

// Estilos PDF con fuente
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontSize: 8,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#2193b0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#2193b0',
  },
  employeeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
  },
  employeeName: { fontSize: 10, fontWeight: 'bold' },
  date: { fontSize: 9, color: '#666' },
  employeeSection: {
    marginBottom: 15,
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 4,
  },
  employeeSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 8,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: {
    width: '9%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#e3f2fd',
  },
  tableCol: {
    width: '9%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: { margin: 2, fontSize: 7, fontWeight: 'bold', textAlign: 'center' },
  tableCell: { margin: 2, fontSize: 7, textAlign: 'center' },
});

// --- Componente PDF ---
const PDFDocumentComp = ({ registros, empleadoSeleccionado, fechaInicio, fechaFin }) => {
  const getCurrentDate = () => new Date().toLocaleDateString('es-ES');

  const getEmpleadoInfo = () => {
    if (empleadoSeleccionado) return empleadoSeleccionado;
    const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];
    return empleadosUnicos.length === 1 ? empleadosUnicos[0] : 'TODOS LOS EMPLEADOS';
  };

  const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];
  const esMultipleEmpleados = empleadosUnicos.length > 1 && !empleadoSeleccionado;

  const registrosAgrupados = esMultipleEmpleados
    ? registros.reduce((acc, reg) => {
        if (!acc[reg.empleado]) acc[reg.empleado] = [];
        acc[reg.empleado].push(reg);
        return acc;
      }, {})
    : { [getEmpleadoInfo()]: registros };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SISTEMA DE CONTROL DE MARCACIONES</Text>
          <View style={styles.employeeInfo}>
            <View>
              <Text style={styles.employeeName}>Empleado: {getEmpleadoInfo()}</Text>
              <Text style={styles.date}>
                {fechaInicio && fechaFin
                  ? `${new Date(fechaInicio).toLocaleDateString('es-ES')} - ${new Date(fechaFin).toLocaleDateString('es-ES')}`
                  : fechaInicio
                  ? `Desde: ${new Date(fechaInicio).toLocaleDateString('es-ES')}`
                  : fechaFin
                  ? `Hasta: ${new Date(fechaFin).toLocaleDateString('es-ES')}`
                  : ''}
              </Text>
            </View>
            <View>
              <Text style={styles.date}>Fecha de emisión: {getCurrentDate()}</Text>
            </View>
          </View>
        </View>

        {Object.entries(registrosAgrupados).map(([nombreEmpleado, registrosEmpleado], idx) => (
          <View key={idx}>
            {esMultipleEmpleados && (
              <View style={styles.employeeSection}>
                <Text style={styles.employeeSectionTitle}>{nombreEmpleado}</Text>
              </View>
            )}

            <View style={styles.table}>
              <View style={styles.tableRow}>
                {['Fecha','Día','H1','H2','H3','H4','H5','H6','H7','H8','Total'].map((col,i)=>(
                  <View key={i} style={styles.tableColHeader}><Text style={styles.tableCellHeader}>{col}</Text></View>
                ))}
              </View>

              {registrosEmpleado.map((reg,i)=>(
                <View key={i} style={styles.tableRow}>
                  {[reg.fecha,reg.dia,reg.h01,reg.h02,reg.h03,reg.h04,reg.h05,reg.h06,reg.h07,reg.h08,reg.total].map((val,j)=>(
                    <View key={j} style={styles.tableCol}>
                      <Text style={styles.tableCell}>{val ? (j===0 ? new Date(val).toLocaleDateString('es-ES') : val) : ''}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {esMultipleEmpleados && idx < Object.keys(registrosAgrupados).length - 1 && <View style={{marginBottom:20}} />}
          </View>
        ))}
      </Page>
    </Document>
  );
};

// --- Componente principal PDFInterface ---
const PDFInterface = ({ registros, onBack }) => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [registrosFiltrados, setRegistrosFiltrados] = useState(registros);

  const handleEmpleadoChange = (e) => {
    const nombre = e.target.value;
    setEmpleadoSeleccionado(nombre);

    let filtrados = registros;
    if (nombre) filtrados = filtrados.filter(reg => reg.empleado === nombre);
    if (fechaInicio || fechaFin) {
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;
      filtrados = filtrados.filter(registro => {
        const fechaReg = new Date(registro.fecha);
        if (inicio && fin) return fechaReg >= inicio && fechaReg <= fin;
        if (inicio) return fechaReg >= inicio;
        if (fin) return fechaReg <= fin;
        return true;
      });
    }
    setRegistrosFiltrados(filtrados);
  };

  const handleFechaChange = () => {
    let filtrados = registros;
    if (empleadoSeleccionado) filtrados = filtrados.filter(reg => reg.empleado === empleadoSeleccionado);
    setRegistrosFiltrados(filtrados);
  };

  const resetFilters = () => {
    setEmpleadoSeleccionado('');
    setFechaInicio('');
    setFechaFin('');
    setRegistrosFiltrados(registros);
  };

  const getEmpleadoParaFilename = () => {
    if (empleadoSeleccionado) return empleadoSeleccionado.replace(/\s+/g,'_').substring(0,20);
    const empleadosUnicos = [...new Set(registrosFiltrados.map(reg => reg.empleado))];
    return empleadosUnicos.length===1 ? empleadosUnicos[0].replace(/\s+/g,'_').substring(0,20) : 'todos';
  };

  return (
    <CContainer fluid className="p-0">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{background:'linear-gradient(90deg, #2193b0, #6dd5ed)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3 className="m-0">VISTA PREVIA PDF - MARCACIONES</h3>
            <CButton color="light" onClick={onBack} style={{height:"35px", fontSize:"12px"}}>← Volver</CButton>
          </div>
        </CCardHeader>
        <CCardBody className="p-3" style={{backgroundColor:'#f8f9fa', minHeight:'calc(100vh - 80px)'}}>
          {/* Filtros */}
          <CRow className="mb-3">
            <CCol md={5}>
              <label><strong>Filtrar por Empleado</strong></label>
              <CFormSelect value={empleadoSeleccionado} onChange={handleEmpleadoChange}>
                <option value="">Todos los empleados</option>
                {empleados.map((emp,index)=>(<option key={index} value={emp.nombre}>{emp.nombre}</option>))}
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <label><strong>Fecha Inicio</strong></label>
              <input type="date" value={fechaInicio} onChange={(e)=>{setFechaInicio(e.target.value); setTimeout(handleFechaChange,100);}} className="form-control form-control-sm"/>
            </CCol>
            <CCol md={3}>
              <label><strong>Fecha Fin</strong></label>
              <input type="date" value={fechaFin} onChange={(e)=>{setFechaFin(e.target.value); setTimeout(handleFechaChange,100);}} className="form-control form-control-sm"/>
            </CCol>
            <CCol md={2} className="d-flex justify-content-center my-3">
              <CButton color="warning" onClick={resetFilters} size="sm" style={{width:'100%', padding:'8px 20px'}}>Limpiar</CButton>
            </CCol>
          </CRow>

          {/* Botón descargar PDF */}
          <CRow className="mb-3">
            <CCol className="d-flex justify-content-center align-items-center gap-3">
              <PDFDownloadLink
                document={<PDFDocumentComp registros={registrosFiltrados} empleadoSeleccionado={empleadoSeleccionado} fechaInicio={fechaInicio} fechaFin={fechaFin}/>}
                fileName={`marcaciones_${getEmpleadoParaFilename()}_${new Date().toLocaleDateString('es-ES').replace(/\//g,'-')}.pdf`}
              >
                {({loading})=>
                  <CButton color="success" disabled={loading} style={{background:'linear-gradient(90deg,#28a745,#20c997)', border:'none', padding:'10px 20px'}}>
                    {loading ? 'Generando PDF...' : '📥 Descargar PDF'}
                  </CButton>
                }
              </PDFDownloadLink>
              <span style={{fontSize:'14px', color:'#666', backgroundColor:'#e9ecef', padding:'8px 12px', borderRadius:'4px'}}>
                📊 {registrosFiltrados.length} registros para generar
              </span>
            </CCol>
          </CRow>

          {/* PDFViewer con tamaño controlado */}
          <div className="pdf-viewer-container">
            <PDFViewer style={{width:'100%', height:'100%', border:'none'}}>
              <PDFDocumentComp registros={registrosFiltrados} empleadoSeleccionado={empleadoSeleccionado} fechaInicio={fechaInicio} fechaFin={fechaFin}/>
            </PDFViewer>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PDFInterface;
