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

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontSize: 8,
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
  employeeName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 9,
    color: '#666',
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
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '8%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#e3f2fd',
  },
  tableColHeaderWide: {
    width: '12%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#e3f2fd',
  },
  tableCol: {
    width: '8%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColWide: {
    width: '12%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 2,
    fontSize: 7,
    textAlign: 'center',
  },
  tableCellLeft: {
    margin: 2,
    fontSize: 7,
    textAlign: 'left',
  },
  summary: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 4,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2193b0',
  },
  summaryText: {
    fontSize: 8,
    marginBottom: 2,
  },
});

// Componente del documento PDF
const PDFDocument = ({ registros, empleadoSeleccionado, fechaInicio, fechaFin }) => {
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTotalHoras = () => {
    return registros.reduce((total, reg) => {
      const horas = parseFloat(reg.total.replace(':', '.')) || 0;
      return total + horas;
    }, 0);
  };

  const getDiasLaborados = () => {
    return registros.length;
  };

  const getEmpleadoInfo = () => {
    if (empleadoSeleccionado) {
      const emp = empleados.find(e => e.nombre === empleadoSeleccionado);
      return emp ? emp.nombre : empleadoSeleccionado;
    }
    return "TODOS LOS EMPLEADOS";
  };

  // Agrupar registros por empleado
  const registrosAgrupados = registros.reduce((acc, reg) => {
    if (!acc[reg.empleado]) {
      acc[reg.empleado] = [];
    }
    acc[reg.empleado].push(reg);
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SISTEMA DE CONTROL DE MARCACIONES</Text>
          <View style={styles.employeeInfo}>
            <View>
              <Text style={styles.employeeName}>
                Empleado: {getEmpleadoInfo()}
              </Text>
              <Text style={styles.date}>
                Período: {fechaInicio || 'Desde el inicio'} - {fechaFin || 'Hasta la fecha'}
              </Text>
            </View>
            <View>
              <Text style={styles.date}>
                Fecha de emisión: {getCurrentDate()}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabla */}
        <View style={styles.table}>
          {/* Header de la tabla */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderWide}>
              <Text style={styles.tableCellHeader}>Empleado</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Día</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H1</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H2</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H3</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H4</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H5</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H6</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H7</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>H8</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
          </View>

          {/* Filas de datos */}
          {registros.map((registro, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColWide}>
                <Text style={styles.tableCellLeft}>
                  {registro.empleado.length > 25 
                    ? registro.empleado.substring(0, 25) + '...' 
                    : registro.empleado
                  }
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {registro.fecha.toLocaleDateString('es-ES')}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.dia}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h01 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h02 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h03 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h04 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h05 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h06 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h07 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.h08 || ''}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{registro.total}</Text>
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
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState(registros);

  const handleEmpleadoChange = (e) => {
    const nombre = e.target.value;
    setEmpleadoSeleccionado(nombre);
    
    let filtrados = registros;
    
    if (nombre) {
      filtrados = filtrados.filter(reg => reg.empleado === nombre);
    }
    
    if (fechaInicio || fechaFin) {
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;
      
      filtrados = filtrados.filter(registro => {
        const fechaReg = new Date(registro.fecha);
        if (inicio && fin) {
          return fechaReg >= inicio && fechaReg <= fin;
        } else if (inicio) {
          return fechaReg >= inicio;
        } else if (fin) {
          return fechaReg <= fin;
        }
        return true;
      });
    }
    
    setRegistrosFiltrados(filtrados);
  };

  const handleFechaChange = () => {
    let filtrados = registros;
    
    if (empleadoSeleccionado) {
      filtrados = filtrados.filter(reg => reg.empleado === empleadoSeleccionado);
    }
    
    if (fechaInicio || fechaFin) {
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;
      
      filtrados = filtrados.filter(registro => {
        const fechaReg = new Date(registro.fecha);
        if (inicio && fin) {
          return fechaReg >= inicio && fechaReg <= fin;
        } else if (inicio) {
          return fechaReg >= inicio;
        } else if (fin) {
          return fechaReg <= fin;
        }
        return true;
      });
    }
    
    setRegistrosFiltrados(filtrados);
  };

  const resetFilters = () => {
    setEmpleadoSeleccionado("");
    setFechaInicio("");
    setFechaFin("");
    setRegistrosFiltrados(registros);
  };

  // Obtener lista única de empleados de los registros
  const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];

  return (
    <CContainer className="py-3">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{ background: 'linear-gradient(90deg, #2193b0, #6dd5ed)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="m-0">VISTA PREVIA PDF - MARCACIONES</h3>
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
          
          {/* Controles de filtros */}
          <CRow className="mb-3">
            <CCol md={4}>
              <label><strong>Filtrar por Empleado</strong></label>
              <CFormSelect 
                value={empleadoSeleccionado} 
                onChange={handleEmpleadoChange}
                size="sm"
              >
                <option value="">Todos los empleados</option>
                {empleadosUnicos.map((empleado, index) => (
                  <option key={index} value={empleado}>
                    {empleado.length > 40 ? empleado.substring(0, 40) + '...' : empleado}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <label><strong>Fecha Inicio</strong></label>
              <input 
                type="date" 
                value={fechaInicio}
                onChange={(e) => {
                  setFechaInicio(e.target.value);
                  setTimeout(handleFechaChange, 100);
                }}
                className="form-control form-control-sm"
              />
            </CCol>
            <CCol md={3}>
              <label><strong>Fecha Fin</strong></label>
              <input 
                type="date" 
                value={fechaFin}
                onChange={(e) => {
                  setFechaFin(e.target.value);
                  setTimeout(handleFechaChange, 100);
                }}
                className="form-control form-control-sm"
              />
            </CCol>
            <CCol md={2} className="d-flex align-items-end">
              <CButton 
                color="warning" 
                onClick={resetFilters}
                size="sm"
                style={{ width: '100%' }}
              >
                Limpiar
              </CButton>
            </CCol>
          </CRow>

          {/* Botones de acción */}
          <CRow className="mb-3">
            <CCol className="text-center">
              <PDFDownloadLink
                document={
                  <PDFDocument 
                    registros={registrosFiltrados} 
                    empleadoSeleccionado={empleadoSeleccionado}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                  />
                }
                fileName={`marcaciones_${empleadoSeleccionado || 'todos'}_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  <CButton 
                    color="success"
                    disabled={loading}
                    style={{ 
                      marginRight: '10px',
                      background: 'linear-gradient(90deg, #28a745, #20c997)',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Generando PDF...' : '📥 Descargar PDF'}
                  </CButton>
                }
              </PDFDownloadLink>
              
              <span style={{ 
                fontSize: '14px', 
                color: '#666',
                backgroundColor: '#e9ecef',
                padding: '8px 12px',
                borderRadius: '4px'
              }}>
                📊 {registrosFiltrados.length} registros para generar
              </span>
            </CCol>
          </CRow>

          {/* Vista previa del PDF */}
          <div style={{ 
            height: '600px', 
            border: '2px solid #dee2e6', 
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <PDFViewer 
              style={{ 
                width: '100%', 
                height: '100%',
                border: 'none'
              }}
            >
              <PDFDocument 
                registros={registrosFiltrados} 
                empleadoSeleccionado={empleadoSeleccionado}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
              />
            </PDFViewer>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PDFInterface;