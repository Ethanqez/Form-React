import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
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

// Estilos para el PDF - Replicando el diseño original
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontSize: 10,
  },
  header: {
    marginBottom: 15,
    paddingBottom: 10,
  },
  employeeSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  employeeLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'left',
  },
  employeeName: {
    fontSize: 12,
    fontWeight: 'bold',
    borderBottom: 2,
    borderBottomColor: '#000',
    paddingBottom: 2,
    flex: 1,
    paddingLeft: 10,
  },
  userKeySection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  userKeyLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 80,
  },
  userKey: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  dateSection: {
    textAlign: 'right',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 10,
  },
  tableHeader: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  // Columnas específicas
  colDia: {
    width: '6%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  colFecha: {
    width: '12%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  colHora: {
    width: '6.5%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  colHorasTotal: {
    width: '8%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  colHHmm: {
    width: '8%',
    borderStyle: 'solid',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  cellHeader: {
    margin: 2,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 3,
  },
  cellCenter: {
    margin: 2,
    fontSize: 9,
    textAlign: 'center',
    padding: 2,
  },
  cellLeft: {
    margin: 2,
    fontSize: 9,
    textAlign: 'left',
    padding: 2,
  },
  cellRight: {
    margin: 2,
    fontSize: 9,
    textAlign: 'right',
    padding: 2,
  },
  // Subcabecera de números
  numberHeader: {
    margin: 'auto',
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  colNumber: {
    width: '6.5%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  spacerCol: {
    width: '18%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

// Función para convertir fecha a formato dd/mm/yyyy
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Función para obtener día de la semana en español
const getDayOfWeek = (date) => {
  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  return days[new Date(date).getDay()];
};

// Función para convertir horas totales a formato HH:mm
const formatTotalHours = (total) => {
  if (!total) return '00:00';
  return total.replace(':', ':');
};

// Componente del documento PDF
const PDFDocument = ({ empleado, registros }) => {
  const getCurrentDate = () => {
    const now = new Date();
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
  };

  // Generar código de usuario (simulado)
  const getUserCode = () => {
    return "1202"; // Puedes hacerlo dinámico basado en el empleado
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header con información del empleado */}
        <View style={styles.header}>
          <View style={styles.employeeSection}>
            <Text style={styles.employeeLabel}>Empleado</Text>
            <Text style={styles.employeeName}>{empleado?.nombre || 'EMPLEADO NO SELECCIONADO'}</Text>
          </View>
          
          <View style={styles.userKeySection}>
            <Text style={styles.userKeyLabel}>Clave Usuario</Text>
            <Text style={styles.userKey}>{getUserCode()}</Text>
          </View>
          
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>

        {/* Tabla principal */}
        <View style={styles.table}>
          {/* Header principal */}
          <View style={styles.tableHeader}>
            <View style={styles.colDia}>
              <Text style={styles.cellHeader}>Día</Text>
            </View>
            <View style={styles.colFecha}>
              <Text style={styles.cellHeader}>Fecha</Text>
            </View>
            <View style={styles.spacerCol}>
              <Text style={styles.cellHeader}></Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>1</Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>2</Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>3</Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>4</Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>5</Text>
            </View>
            <View style={styles.colNumber}>
              <Text style={styles.cellHeader}>6</Text>
            </View>
            <View style={styles.colHorasTotal}>
              <Text style={styles.cellHeader}>Horas</Text>
            </View>
            <View style={styles.colHHmm}>
              <Text style={styles.cellHeader}>HH:mm</Text>
            </View>
          </View>

          {/* Subheader con E y S */}
          <View style={styles.numberHeader}>
            <View style={styles.colDia}>
              <Text style={styles.cellHeader}></Text>
            </View>
            <View style={styles.colFecha}>
              <Text style={styles.cellHeader}></Text>
            </View>
            <View style={styles.spacerCol}>
              <Text style={styles.cellHeader}></Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>E</Text>
            </View>
            <View style={styles.colHora}>
              <Text style={styles.cellHeader}>S</Text>
            </View>
            <View style={styles.colHorasTotal}>
              <Text style={styles.cellHeader}></Text>
            </View>
            <View style={styles.colHHmm}>
              <Text style={styles.cellHeader}></Text>
            </View>
          </View>

          {/* Filas de datos */}
          {registros.map((registro, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.colDia}>
                <Text style={styles.cellCenter}>{getDayOfWeek(registro.fecha)}</Text>
              </View>
              <View style={styles.colFecha}>
                <Text style={styles.cellCenter}>{formatDate(registro.fecha)}</Text>
              </View>
              <View style={styles.spacerCol}>
                <Text style={styles.cellCenter}></Text>
              </View>
              
              {/* Horas de entrada y salida */}
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h01 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h02 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h03 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h04 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h05 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h06 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h07 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}>{registro.h08 || ''}</Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}></Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}></Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}></Text>
              </View>
              <View style={styles.colHora}>
                <Text style={styles.cellCenter}></Text>
              </View>
              
              {/* Total de horas */}
              <View style={styles.colHorasTotal}>
                <Text style={styles.cellCenter}>{registro.total?.split(':')[0] || '0'}.{registro.total?.split(':')[1] || '00'}</Text>
              </View>
              <View style={styles.colHHmm}>
                <Text style={styles.cellCenter}>{formatTotalHours(registro.total)}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Componente principal PDFInterface
const PDFInterface = ({ registros, onBack }) => {
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [empleadoData, setEmpleadoData] = useState(null);

  const handleEmpleadoChange = (e) => {
    const nombre = e.target.value;
    setEmpleadoSeleccionado(nombre);
    
    if (!nombre) {
      setRegistrosFiltrados([]);
      setEmpleadoData(null);
      return;
    }

    // Buscar el empleado completo
    const empleado = empleados.find(emp => emp.nombre === nombre);
    if (empleado) {
      setEmpleadoData(empleado);
      setRegistrosFiltrados(empleado.registros);
    }
  };

  // Obtener lista única de empleados
  const empleadosDisponibles = empleados;

  return (
    <CContainer className="py-3">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{ background: 'linear-gradient(90deg, #2193b0, #6dd5ed)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="m-0">REPORTE DE MARCACIONES - EMPLEADO</h3>
            <CButton 
              color="light" 
              onClick={onBack}
              style={{ height: "35px", fontSize: "12px" }}
            >
              ← Volver
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody style={{ backgroundColor: '#f8f9fa' }}>
          
          {/* Control de selección de empleado */}
          <CRow className="mb-4">
            <CCol md={8}>
              <label><strong>Seleccionar Empleado para Generar Reporte Individual</strong></label>
              <CFormSelect 
                value={empleadoSeleccionado} 
                onChange={handleEmpleadoChange}
              >
                <option value="">Seleccione un empleado...</option>
                {empleadosDisponibles.map((empleado, index) => (
                  <option key={index} value={empleado.nombre}>
                    {empleado.nombre}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={4} className="d-flex align-items-end">
              {empleadoSeleccionado && (
                <PDFDownloadLink
                  document={
                    <PDFDocument 
                      empleado={empleadoData}
                      registros={registrosFiltrados} 
                    />
                  }
                  fileName={`reporte_${empleadoSeleccionado.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    <CButton 
                      color="success"
                      disabled={loading}
                      style={{ 
                        width: '100%',
                        background: 'linear-gradient(90deg, #28a745, #20c997)',
                        border: 'none'
                      }}
                    >
                      {loading ? 'Generando...' : '📥 Descargar PDF'}
                    </CButton>
                  }
                </PDFDownloadLink>
              )}
            </CCol>
          </CRow>

          {/* Información del empleado seleccionado */}
          {empleadoSeleccionado && (
            <CRow className="mb-3">
              <CCol>
                <div style={{ 
                  backgroundColor: '#e9ecef',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6'
                }}>
                  <h5 style={{ color: '#495057', marginBottom: '10px' }}>
                    📋 Empleado Seleccionado
                  </h5>
                  <p style={{ marginBottom: '5px', fontSize: '14px' }}>
                    <strong>Nombre:</strong> {empleadoData?.nombre}
                  </p>
                  <p style={{ marginBottom: '5px', fontSize: '14px' }}>
                    <strong>Total de Registros:</strong> {registrosFiltrados.length}
                  </p>
                  <p style={{ marginBottom: '0', fontSize: '14px' }}>
                    <strong>Período:</strong> {
                      registrosFiltrados.length > 0 
                        ? `${formatDate(registrosFiltrados[0].fecha)} - ${formatDate(registrosFiltrados[registrosFiltrados.length - 1].fecha)}`
                        : 'Sin registros'
                    }
                  </p>
                </div>
              </CCol>
            </CRow>
          )}

          {/* Vista previa del PDF */}
          {empleadoSeleccionado && registrosFiltrados.length > 0 ? (
            <div style={{ 
              height: '700px', 
              border: '2px solid #dee2e6', 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}>
              <PDFViewer 
                style={{ 
                  width: '100%', 
                  height: '100%',
                  border: 'none'
                }}
              >
                <PDFDocument 
                  empleado={empleadoData}
                  registros={registrosFiltrados} 
                />
              </PDFViewer>
            </div>
          ) : (
            <div style={{ 
              height: '400px', 
              border: '2px dashed #dee2e6', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa'
            }}>
              <div style={{ textAlign: 'center', color: '#6c757d' }}>
                <h4>👤 Selecciona un empleado</h4>
                <p>Elige un empleado de la lista para ver la vista previa de su reporte de marcaciones</p>
              </div>
            </div>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PDFInterface;