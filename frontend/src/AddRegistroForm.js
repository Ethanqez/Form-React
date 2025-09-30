import { useState } from 'react';
import { CButton, CFormInput, CRow, CCol } from '@coreui/react';

function AddRegistroForm({ onAdd }) {
  const [empleado, setEmpleado] = useState('');
  const [fecha, setFecha] = useState('');
  const [h01, setH01] = useState('');
  const [h02, setH02] = useState('');
  const [h03, setH03] = useState('');
  const [h04, setH04] = useState('');
  const [h05, setH05] = useState('');
  const [h06, setH06] = useState('');
  const [h07, setH07] = useState('');
  const [h08, setH08] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = {
      empleado,
      fecha,
      h01, h02, h03, h04, h05, h06, h07, h08
    };
    onAdd(nuevoRegistro);

    // Limpiar formulario
    setEmpleado('');
    setFecha('');
    setH01(''); setH02(''); setH03(''); setH04('');
    setH05(''); setH06(''); setH07(''); setH08('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <CRow className="mb-2">
        <CCol>
          <CFormInput 
            type="text" 
            placeholder="Empleado" 
            value={empleado} 
            onChange={(e) => setEmpleado(e.target.value)} 
            required
          />
        </CCol>
        <CCol>
          <CFormInput 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required
          />
        </CCol>
      </CRow>
      <CRow className="mb-2">
        <CCol><CFormInput placeholder="H01" value={h01} onChange={(e) => setH01(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H02" value={h02} onChange={(e) => setH02(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H03" value={h03} onChange={(e) => setH03(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H04" value={h04} onChange={(e) => setH04(e.target.value)} /></CCol>
      </CRow>
      <CRow className="mb-2">
        <CCol><CFormInput placeholder="H05" value={h05} onChange={(e) => setH05(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H06" value={h06} onChange={(e) => setH06(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H07" value={h07} onChange={(e) => setH07(e.target.value)} /></CCol>
        <CCol><CFormInput placeholder="H08" value={h08} onChange={(e) => setH08(e.target.value)} /></CCol>
      </CRow>
      <CButton type="submit" color="primary">Agregar Registro</CButton>
    </form>
  );
}

export default AddRegistroForm;
