import React from 'react';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react';

// Función para formatear fechas a DD/MM/YYYY
const formatDateLatino = (date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const PDFInterface = ({ registros, onBack }) => {
  const columns = [
    { 
      name: <b>Fecha</b>, 
      selector: row => row.fecha, 
      sortable: true, 
      cell: row => <b>{formatDateLatino(row.fecha)}</b> 
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

  const handleGeneratePDF = () => {
  const input = document.getElementById('pdf-content');
  const buttons = document.querySelectorAll('.pdf-button'); 
  
  // Ocultar botones antes de generar PDF
  buttons.forEach(button => {
    button.style.display = 'none';
  });

  html2canvas(input, { 
    scale: 2,
    useCORS: true,
    allowTaint: true,
    height: input.scrollHeight,
    width: input.scrollWidth
  }).then(canvas => { 
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // Dimensiones de la página A4 en landscape
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Calcular dimensiones de la imagen
    const imgWidth = pageWidth - 20; // 10mm de margen a cada lado
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 10; // margen superior
    
    // Agregar primera página
    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - 20); // 20mm de márgenes (10 superior + 10 inferior)
    
    // Agregar páginas adicionales si es necesario
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10; // ajustar posición
      doc.addPage();
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - 20);
    }
    
    doc.save('marcaciones.pdf'); 

    // Mostrar botones nuevamente
    buttons.forEach(button => {
      button.style.display = 'block';
    });
  }).catch(error => {
    console.error('Error al generar PDF:', error);
    // Mostrar botones en caso de error
    buttons.forEach(button => {
      button.style.display = 'block';
    });
  });
};

  // Calcular estadísticas para el PDF
  const totalHoras = registros.reduce((acc, reg) => {
    const [horas, minutos] = reg.total.split(':').map(Number);
    return acc + horas + (minutos / 60);
  }, 0);

  const empleadosUnicos = [...new Set(registros.map(r => r.empleado))];

  return (
    <CContainer id="pdf-content" className="py-5">
      <CCard className="shadow-lg border-0">
        <CCardHeader className="text-white" style={{ background: 'linear-gradient(90deg, #2193b0, #6dd5ed)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <h2 className="m-0 text-center">DETALLE DE MARCACIONES</h2>
            <div>
              <small style={{ fontSize: '12px' }}></small>
            </div>
          </div>
        </CCardHeader>
        
        <CCardBody style={{ backgroundColor: '#f0f8ff' }}>
          
          {/* BOTONES DE NAVEGACIÓN Y ACCIÓN */}
          <CRow className="mb-3">
            <CCol className="text-left">
              <CButton 
                color="secondary" 
                onClick={onBack}
                className="pdf-button"
                style={{ 
                  borderRadius: '8px',
                  marginRight: '10px'
                }}
              >
                ← Volver al Sistema
              </CButton>
            </CCol>
            <CCol className="text-right">
              <CButton
                color="success"
                className="px-4 py-2 pdf-button"
                onClick={handleGeneratePDF}
                style={{ 
                  background: 'linear-gradient(90deg, #56ab2f, #a8e063)', 
                  border: 'none', 
                  borderRadius: '8px' 
                }}
              >
                📄 Descargar PDF
              </CButton>
            </CCol>
          </CRow>

          {/* TABLA DE DATOS */}
          <div style={{ marginTop: '20px' }}>
            {registros.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px', 
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <h4 style={{ color: '#666' }}>No hay registros para mostrar</h4>
                <p style={{ color: '#999' }}>
                  Aplica filtros en el sistema principal para generar el reporte
                </p>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={registros}
                highlightOnHover
                striped
                customStyles={{
                  headCells: { 
                    style: { 
                      backgroundColor: '#2193b0', 
                      color: 'white', 
                      fontWeight: 'bold', 
                      fontSize: '14px', 
                      borderRadius: '5px 5px 0 0' 
                    } 
                  },
                  cells: { 
                    style: { 
                      fontSize: '13px', 
                      padding: '8px' 
                    } 
                  },
                }}
              />
            )}
          </div>

          {/* PIE DE PÁGINA PARA PDF */}
          <div style={{ 
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #ddd',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center'
          }}>
          </div>

        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default PDFInterface;