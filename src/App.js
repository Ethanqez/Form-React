import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App(){
  const [name, setName] = useState("")
  const [corr, setCorr] = useState("")
  const [pass, setPass] = useState("")
  const [passCfm, setPassCfm] = useState("")
  const [nacimiento, setNacimiento] = useState("")
  const [country, setCountry] = useState("")
  const fechaObj = new Date(nacimiento);
    return(
      <div>

            <label htmlFor="nombre">Nombre</label>
            <input type='nombre' value={name} onChange={(txt)=>{
              setName(txt.target.value)
            }} placeholder='Ingrese su nombre'/>

            <label htmlFor="correo">Correo</label>
            <input type='correo' value={corr} onChange={(txt)=>{
              setCorr(txt.target.value)
            }} placeholder='Ingrese su correo'/>

            <label htmlFor="password">Contraseña</label>
            <input type='password' value={pass} onChange={(txt)=>{
              setPass(txt.target.value)
            }} placeholder='Ingrese su contraseña'/>

            <label htmlFor="cfmPassword">Confirmar Contraseña</label>
            <input type='password' value={passCfm} onChange={(txt)=>{
              setPassCfm(txt.target.value)
            }} placeholder='Confirme su correo'/>

            <label htmlFor="fechaNacimiento">Fecha De Nacimiento</label>
            <input type="date" value={nacimiento} onChange={(txt)=>{
              setNacimiento(txt.target.value) 
            }}/>

            <label htmlFor="pais">Pais</label>
            <select value={country} onChange={(txt)=>{
              setCountry(txt.target.value)

            }}>
              <option value = "Ecuador" >Ecuador</option>
              <option value= "Argentina">Argentina</option>
              <option value= "Mexico">Mexico </option>
            </select>
            <br></br>
            <button>
              Enviar
            </button>
            <button onClickCapture={()=>{console.log(name,corr,pass,passCfm,country, fechaObj)}}>Prueba consola</button>

        </div>
    )
}

export default App
