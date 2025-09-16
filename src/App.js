import './App.css';
import { useState, useRef } from 'react';
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
import PDFInterface from './PDFInterface';
import { empleados } from './empleados';

function App() {
  const allRegistros = empleados.flatMap(emp =>
    emp.registros.map(r => ({ ...r, empleado: emp.nombre }))
  );

  const [registro, setRegistro] = useState(allRegistros);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [showPDFInterface, setShowPDFInterface] = useState(false);
  const fechaI = useRef();
  const fechaF = useRef();

  const handleChange = (e) => {
    const nombre = e.target.value;
    setEmpleadoSeleccionado(nombre);
    if (!nombre) { 
      setRegistro(allRegistros); 
      return; 
    }
    const emp = empleados.find(emp => emp.nombre === nombre);
    if (emp) {
      setRegistro(emp.registros.map(r => ({ ...r, empleado: emp.nombre })));
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

  const handleMostrar = () => {
    setRegistro(allRegistros);
    setEmpleadoSeleccionado("");
    fechaI.current.value = "";
    fechaF.current.value = "";
  };

  const handleShowPDFInterface = () => {
    setShowPDFInterface(true);
  };

  const handleBackToMain = () => {
    setShowPDFInterface(false);
  };


  if (showPDFInterface) {
    return (
      <PDFInterface 
        registros={registro} 
        onBack={handleBackToMain}
      />
    );
  }
const selectedEmployee = empleados.find(emp => emp.nombre === empleadoSeleccionado);


  return (
    
    <CContainer className="py-5">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{ background: 'linear-gradient(90deg, #2193b0, #6dd5ed)' }}>
          <h2 className="m-0 text-center">SISTEMA DE MARCACIONES</h2>
        </CCardHeader>
        <CCardBody style={{ backgroundColor: '#f0f8ff' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <label><strong>Fecha Inicial</strong></label>
              <input 
                type="date" 
                ref={fechaI} 
                style={{ 
                  width: '280px', 
                  height: '40px', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  border: '1px solid #ccc',
                  marginLeft: '10px'
                }} 
              />
            </div>
            <div>
              <label><strong>Fecha Final</strong></label>
              <input 
                type="date" 
                ref={fechaF} 
                style={{ 
                  width: '280px', 
                  height: '40px', 
                  padding: '5px', 
                  borderRadius: '5px', 
                  border: '1px solid #ccc',
                  marginLeft: '10px'
                }} 
              />
            </div>
            <CButton 
              color="primary" 
              onClick={handleFilterByDate}
              style={{ height: "40px", alignSelf: "end" }}
            >
              Filtrar por Fechas
            </CButton>
          </div>

          <CRow className="mb-3">
            <CCol>
              <label><strong>Empleado</strong></label>
              <CFormSelect value={empleadoSeleccionado} onChange={handleChange}>
                <option value="" hidden>
                  Seleccione un empleado
                </option>
                {empleados.map((emp, index) => (
                  <option key={index} value={emp.nombre}>
                    {emp.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-4">
            <CCol className="text-center">
              <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                <CButton 
                  color="info" 
                  onClick={handleMostrar} 
                  style={{ 
                    height: "45px", 
                    fontSize: "14px", 
                    width: "180px",
                    borderRadius: "8px"
                  }}
                >
                  Mostrar Todas las Marcaciones
                </CButton>
                
                <CButton 
                  color="success" 
                  onClick={handleShowPDFInterface}
                  style={{ 
                    height: "45px", 
                    fontSize: "14px", 
                    width: "180px",
                    background: 'linear-gradient(90deg, #56ab2f, #a8e063)',
                    border: 'none',
                    borderRadius: "8px"
                  }}
                >
                  Ver Vista Previa PDF
                </CButton>
              </div>
            </CCol>
          </CRow>

          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'white'
          }}>
            <h5 style={{ marginBottom: '20px', color: '#2193b0' }}>
              Registros Actuales ({registro.length} encontrados)
            </h5>
            
            {registro.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No se encontraron registros con los filtros aplicados</p>
              </div>
            ) : (
              registro.map((reg, index) => (
                <div key={index} style={{
                  border: '1px solid #eee',
                  borderRadius: '5px',
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#2193b0' }}>{reg.empleado}</strong>
                      <br />
                      <span>{reg.fecha.toLocaleDateString('es-ES')} - {reg.dia}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong>Total: {reg.total} horas</strong>
                      <br />
                      <small>
                        {[reg.h01, reg.h02, reg.h03, reg.h04, reg.h05, reg.h06, reg.h07, reg.h08]
                          .filter(h => h)
                          .join(' | ')
                        }
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default App;