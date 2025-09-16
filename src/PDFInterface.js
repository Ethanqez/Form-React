import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { formatDate, getDayAbbr, getCurrentDateSpanish, timeToDecimal } from '../utils/dateUtils';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react';

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
  subHeader: {
    flexDirection: 'row',
  },
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
  totalSection: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 4,
  },
  totalText: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2193b0',
  },
});

// Componente del documento PDF
const PDFDocument = ({ registros, empleadoSeleccionado, fechaInicio, fechaFin }) => {
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('es-ES');
  };

  const getEmpleadoInfo = () => {
    // Si hay un empleado seleccionado, mostrar su nombre
    if (empleadoSeleccionado) {
      return empleadoSeleccionado;
    }
    
    // Si no hay empleado seleccionado, verificar si todos los registros son del mismo empleado
    const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];
    
    if (empleadosUnicos.length === 1) {
      return empleadosUnicos[0];
    }
    
    return "TODOS LOS EMPLEADOS";
  };

  const getFechaRange = () => {
    if (fechaInicio && fechaFin) {
      return `${new Date(fechaInicio).toLocaleDateString('es-ES')} - ${new Date(fechaFin).toLocaleDateString('es-ES')}`;
    } else if (fechaInicio) {
      return `Desde: ${new Date(fechaInicio).toLocaleDateString('es-ES')}`;
    } else if (fechaFin) {
      return `Hasta: ${new Date(fechaFin).toLocaleDateString('es-ES')}`;
    } else {
      return "Todos los períodos";
    }
  };

  // Función para calcular total de horas
  const calcularTotalHoras = (registrosEmpleado) => {
    const totalDecimal = registrosEmpleado.reduce((total, reg) => total + reg.totalDecimal, 0);
    const horas = Math.floor(totalDecimal);
    const minutos = Math.round((totalDecimal - horas) * 60);
    return `${horas.toString().padStart(2, '0')} horas ${minutos.toString().padStart(2, '0')} minutos`;
  };

  // Verificar si necesitamos mostrar múltiples empleados
  const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];
  const esMultipleEmpleados = empleadosUnicos.length > 1 && !empleadoSeleccionado;

  // Agrupar registros por empleado si es necesario
  const registrosAgrupados = esMultipleEmpleados 
    ? registros.reduce((acc, reg) => {
        if (!acc[reg.empleado]) {
          acc[reg.empleado] = [];
        }
        acc[reg.empleado].push(reg);
        return acc;
      }, {})
    : { [getEmpleadoInfo()]: registros };

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
                {getFechaRange()}
              </Text>
            </View>
            <View>
              <Text style={styles.date}>
                Fecha de emisión: {getCurrentDate()}
              </Text>
            </View>
          </View>
          
          <View style={styles.userKeySection}>
            <Text style={styles.userKeyLabel}>Clave Usuario</Text>
            <Text style={styles.userKey}>1202</Text>
          </View>
          
          <View style={styles.dateSection}>
            <Text style={styles.dateText}>{getCurrentDateSpanish()}</Text>
          </View>
        </View>

        {/* Contenido principal */}
        {Object.entries(registrosAgrupados).map(([nombreEmpleado, registrosEmpleado], empleadoIndex) => (
          <View key={empleadoIndex}>
            {/* Mostrar nombre del empleado solo si hay múltiples */}
            {esMultipleEmpleados && (
              <View style={styles.employeeSection}>
                <Text style={styles.employeeSectionTitle}>
                  {nombreEmpleado}
                </Text>
              </View>
            )}

            {/* Tabla */}
            <View style={styles.table}>
              {/* Header de la tabla */}
              <View style={styles.tableRow}>
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
              {registrosEmpleado.map((registro, index) => (
                <View key={index} style={styles.tableRow}>
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

            {/* Sección de totales */}
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>
                TOTAL DE HORAS: {calcularTotalHoras(registrosEmpleado)}
              </Text>
              <Text style={styles.totalText}>
                DÍAS TRABAJADOS: {registrosEmpleado.length}
              </Text>
            </View>

            {/* Espacio entre empleados */}
            {esMultipleEmpleados && empleadoIndex < Object.keys(registrosAgrupados).length - 1 && (
              <View style={{ marginBottom: 20 }} />
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
};

// Componente principal PDFInterface simplificado
const PDFInterface = ({ savedConfiguration, onBack }) => {
  const { registros, empleado, fechaInicio, fechaFin } = savedConfiguration;

  // Función para obtener el nombre del empleado para el filename
  const getEmpleadoParaFilename = () => {
    if (empleado) {
      return empleado.replace(/\s+/g, '_').substring(0, 20);
    }
    
    const empleadosUnicos = [...new Set(registros.map(reg => reg.empleado))];
    if (empleadosUnicos.length === 1) {
      return empleadosUnicos[0].replace(/\s+/g, '_').substring(0, 20);
    }
    
    return 'todos';
  };

  return (
    <CContainer className="py-3" fluid>
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
          
          {/* Información de la configuración actual */}
          <CRow className="mb-3">
            <CCol className="text-center">
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '10px', 
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <strong style={{ color: '#2193b0' }}>Configuración del Reporte:</strong>
                <br />
                <span style={{ fontSize: '14px' }}>
                  Empleado: {empleado || "Todos los empleados"} | 
                  Registros: {registros.length} | 
                  Período: {fechaInicio && fechaFin ? 
                    `${new Date(fechaInicio).toLocaleDateString('es-ES')} - ${new Date(fechaFin).toLocaleDateString('es-ES')}` : 
                    "Todas las fechas"}
                </span>
              </div>
            </CCol>
          </CRow>

          {/* Botón de descarga */}
          <CRow className="mb-3">
            <CCol className="text-center">
              <PDFDownloadLink
                document={
                  <PDFDocument 
                    registros={registros} 
                    empleadoSeleccionado={empleado}
                    fechaInicio={fechaInicio}
                    fechaFin={fechaFin}
                  />
                }
                fileName={`marcaciones_${getEmpleadoParaFilename()}_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  <CButton 
                    color="success"
                    disabled={loading}
                    style={{ 
                      background: 'linear-gradient(90deg, #28a745, #20c997)',
                      border: 'none',
                      fontSize: '16px',
                      padding: '12px 30px'
                    }}
                  >
                    {loading ? 'Generando PDF...' : 'Descargar PDF'}
                  </CButton>
                }
              </PDFDownloadLink>
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
                registros={registros} 
                empleadoSeleccionado={empleado}
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