import './App.css';
import { useState, useRef } from 'react';
import {
  CButton,
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


  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f8ff", fontFamily: "'Segoe UI', Roboto, Arial, sans-serif" }}>
      <CContainer className="py-5">
        {/* Encabezado */}
        <header 
          style={{ 
            background: 'linear-gradient(90deg, #2193b0, #6dd5ed)', 
            padding: "25px", 
            borderRadius: "12px", 
            marginBottom: "30px",
            textAlign: "center",
            color: "white",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
          }}
        >
          <h2 style={{ margin: 0, fontWeight: "600", letterSpacing: "1px" }}>
            SISTEMA DE MARCACIONES
          </h2>
        </header>

        <section style={{ backgroundColor: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          {/* Fechas */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: "wrap", gap: "15px" }}>
            <div>
              <label><strong>Fecha Inicial</strong></label>
              <input 
                type="date" 
                ref={fechaI} 
                style={{ 
                  width: '280px', 
                  height: '40px', 
                  padding: '5px', 
                  borderRadius: '8px', 
                  border: '1px solid #ccc',
                  marginLeft: '10px',
                  transition: "all 0.2s ease"
                }} 
                onFocus={(e) => e.target.style.border = "1px solid #2193b0"}
                onBlur={(e) => e.target.style.border = "1px solid #ccc"}
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
                  borderRadius: '8px', 
                  border: '1px solid #ccc',
                  marginLeft: '10px',
                  transition: "all 0.2s ease"
                }} 
                onFocus={(e) => e.target.style.border = "1px solid #2193b0"}
                onBlur={(e) => e.target.style.border = "1px solid #ccc"}
              />
            </div>
            <CButton 
              color="primary" 
              onClick={handleFilterByDate}
              style={{ 
                height: "42px", 
                alignSelf: "end",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(33,147,176,0.4)"}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              Filtrar por Fechas
            </CButton>
          </div>

          {/* Empleado */}
          <CRow className="mb-3">
            <CCol>
              <label><strong>Empleado</strong></label>
              <CFormSelect 
                value={empleadoSeleccionado} 
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
              >
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

          {/* Botones */}
          <CRow className="mb-4">
            <CCol className="text-center">
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "20px", 
                  flexWrap: "wrap", 
                  marginTop: "30px", 
                  marginBottom: "30px" 
                }}
              >
                <CButton 
                  color="info" 
                  onClick={handleMostrar} 
                  style={{ 
                    height: "50px", 
                    fontSize: "15px", 
                    width: "210px",
                    borderRadius: "10px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  Mostrar Todas las Marcaciones
                </CButton>
                
                <CButton 
                  color="success" 
                  onClick={handleShowPDFInterface}
                  style={{ 
                    height: "50px", 
                    fontSize: "15px", 
                    width: "210px",
                    background: 'linear-gradient(90deg, #56ab2f, #a8e063)',
                    border: 'none',
                    borderRadius: "10px",
                    fontWeight: "500",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(86,171,47,0.4)"}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  Ver Vista Previa PDF
                </CButton>
              </div>
            </CCol>
          </CRow>

          {/* Registros */}
          <div style={{ 
            maxHeight: '400px', 
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            backgroundColor: '#fafafa'
          }}>
            <h5 style={{ marginBottom: '20px', color: '#2193b0', fontWeight: "600" }}>
              Registros Actuales ({registro.length} encontrados)
            </h5>
            
            {registro.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No se encontraron registros con los filtros aplicados</p>
              </div>
            ) : (
              registro.map((reg, index) => (
                <div 
                  key={index} 
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '12px',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
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
        </section>
      </CContainer>
    </div>
  );
}

export default App;
