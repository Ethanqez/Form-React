import './App.css';
import { useState, useRef, useEffect } from 'react';
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

function App() {
  const [allRegistros, setAllRegistros] = useState([]);
  const [registro, setRegistro] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [showPDFInterface, setShowPDFInterface] = useState(false);
  const [configurationSaved, setConfigurationSaved] = useState(false);
  const [savedConfiguration, setSavedConfiguration] = useState({
    registros: [],
    empleado: "",
    fechaInicio: "",
    fechaFin: ""
  });

  const fechaI = useRef();
  const fechaF = useRef();

  // 🔹 Obtener empleados desde backend
  useEffect(() => {
    fetch("http://localhost:4000") // URL de tu backend
      .then(res => res.json())
      .then(data => {
        const registrosAdaptados = data.map(emp => ({
          fecha: new Date(emp.fecha), 
          dia: emp.DiaSemana,
          h01: emp.H01,
          h02: emp.H02,
          h03: emp.H03,
          h04: emp.H04,
          h05: emp.H05,
          h06: emp.H06,
          h07: emp.H07,
          h08: emp.H08,
          total: emp.totHoraMin,
          totalDecimal: emp.total,
          empleado: emp.Empleado
        }));
        setAllRegistros(registrosAdaptados);
        setRegistro(registrosAdaptados);
      })
      .catch(err => console.error("Error al cargar empleados:", err));
  }, []);

  // 🔹 Funciones de filtrado (igual que antes)
  const applyFilters = () => {
    let filtrados = allRegistros;
    if (empleadoSeleccionado) {
      filtrados = filtrados.filter(reg => reg.empleado === empleadoSeleccionado);
    }
    const startValue = fechaI.current?.value;
    const endValue = fechaF.current?.value;
    if (startValue && endValue) {
      const start = new Date(startValue);
      const end = new Date(endValue);
      filtrados = filtrados.filter(r => r.fecha >= start && r.fecha <= end);
    }
    setRegistro(filtrados);
  };

  const handleChange = (e) => {
    setEmpleadoSeleccionado(e.target.value);
    setConfigurationSaved(false);
    setTimeout(() => applyFilters(), 0);
  };

  const handleFilterByDate = () => {
    setConfigurationSaved(false);
    applyFilters();
  };

  const handleMostrar = () => {
    setRegistro(allRegistros);
    setEmpleadoSeleccionado("");
    if (fechaI.current) fechaI.current.value = "";
    if (fechaF.current) fechaF.current.value = "";
    setConfigurationSaved(false);
  };

  const handleSaveConfiguration = () => {
    const startValue = fechaI.current?.value || "";
    const endValue = fechaF.current?.value || "";
    setSavedConfiguration({
      registros: registro,
      empleado: empleadoSeleccionado,
      fechaInicio: startValue,
      fechaFin: endValue
    });
    setConfigurationSaved(true);
  };

  const empleadosUnicos = [...new Set(allRegistros.map(reg => reg.empleado))].sort();

  const handleShowPDFInterface = () => setShowPDFInterface(true);
  const handleBackToMain = () => setShowPDFInterface(false);

  if (showPDFInterface) {
    return (
      <PDFInterface 
        savedConfiguration={savedConfiguration}
        onBack={handleBackToMain}
      />
    );
  }

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
                onChange={() => {
                  setConfigurationSaved(false);
                  setTimeout(() => applyFilters(), 0);
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
                onChange={() => {
                  setConfigurationSaved(false);
                  setTimeout(() => applyFilters(), 0);
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
                {empleadosUnicos.map((empleado, index) => (
                  <option key={index} value={empleado}>
                    {empleado}
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
                  color="warning" 
                  onClick={handleSaveConfiguration}
                  style={{ 
                    height: "45px", 
                    fontSize: "14px", 
                    width: "180px",
                    borderRadius: "8px"
                  }}
                >
                  Guardar Configuración
                </CButton>
                
                <CButton 
                  color="success" 
                  onClick={handleShowPDFInterface}
                  disabled={!configurationSaved}
                  style={{ 
                    height: "45px", 
                    fontSize: "14px", 
                    width: "180px",
                    background: configurationSaved ? 'linear-gradient(90deg, #56ab2f, #a8e063)' : '#ccc',
                    border: 'none',
                    borderRadius: "8px",
                    cursor: configurationSaved ? 'pointer' : 'not-allowed'
                  }}
                >
                  Ver Vista Previa PDF
                </CButton>
              </div>
              
              {configurationSaved && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '8px', 
                  backgroundColor: '#d4edda', 
                  color: '#155724', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  Configuración guardada correctamente. Puede proceder a generar el PDF.
                </div>
              )}
              
              {!configurationSaved && (
                <div style={{ 
                  marginTop: '10px', 
                  fontSize: '12px',
                  color: '#856404',
                  backgroundColor: '#fff3cd',
                  padding: '8px',
                  borderRadius: '4px'
                }}>
                  Debe guardar la configuración antes de generar el PDF.
                </div>
              )}
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
                      <strong>Total: {reg.total}</strong>
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
