//Query para obtener todos los aprendices

import React, { useState } from "react";
import { Box, Typography, Button, TextField, Stack, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AprendizForm from "../components/AprendizForm";
import AprendizTable from "../components/AprendizTable";

import {
  obtenerAprendices,
  obtenerAprendizPorId,
  crearAprendiz as crearServicio,
  actualizarAprendiz as actualizarServicio,
  eliminarAprendiz as eliminarServicio
} from "../services/aprendizServices";

// Crear un tema personalizado para MUI
const theme = createTheme({
  palette:{
    mode:"dark",
    primary:{main:"#22d3ee"},
    secondary:{main:"#a78bfa"},
    error:{main:"#ef4444"},
    background:{default:"#0b1220",paper:"#111827"},
    text:{primary:"#e5e7eb",secondary:"#94a3b8"}
  }
});

// Estilos para los campos de entrada
const inputSX = {
  bgcolor:"#f3f4f6",
  borderRadius:1,
  "& .MuiInputBase-input":{
    color:"#111827",
    padding:"14px"
  },
  "& .MuiInputLabel-root":{
    color:"#374151"
  },
  "& .MuiInputLabel-root.Mui-focused":{
    color:"#22d3ee"
  },
  "& .MuiOutlinedInput-notchedOutline":{
    borderColor:"#cbd5e1"
  }
};

// Componente principal que maneja la lista de aprendices
const ListaAprendices =()=>{

const [data,setData]=useState([]);
const [loading,setLoading]=useState(false);

const [form,setForm]=useState({
 nombre:"",
 apellido:"",
 email:"",
 telefono:"",
 direccion:"",
 ficha:"",
 estado:"",
 RH:"",
 regional:"",
 programa:""
});

const [idFiltro,setIdFiltro]=useState("");
const [editando,setEditando]=useState(false);
const [idActualizar,setIdActualizar]=useState(null);


// Función para limpiar el formulario
const limpiarFormulario=()=>{
 setForm({
  nombre:"",
  apellido:"",
  email:"",
  telefono:"",
  direccion:"",
  ficha:"",
  estado:"",
  rh:"",
  regional:"",
  programa:""
 });
};


// Función para obtener todos los aprendices
const fetchTodos=async()=>{
 try{
  setLoading(true);
  const res=await obtenerAprendices();
  setData(res.data || []);
 }catch(error){
  console.log(error);
  setData([]);
 }finally{
  setLoading(false);
 }
};


// Función para obtener un aprendiz por ID
const fetchPorId=async()=>{

if(!idFiltro)return;

try{

 const res=await obtenerAprendizPorId(idFiltro);

 setData(res.data ? [res.data] : []);

}catch(error){

 console.log(error);
 setData([]);

}

};


// Función para buscar un aprendiz por ID y llenar el formulario para actualizar
const buscarParaActualizar=async(id)=>{

if(!id)return;

setIdFiltro(id);

try{

 const res=await obtenerAprendizPorId(id);

 const aprendiz=res.data;


 setForm({
  nombre:aprendiz.nombre || "",
  apellido:aprendiz.apellido || "",
  email:aprendiz.email || "",
  telefono:aprendiz.telefono || "",
  direccion:aprendiz.direccion || "",
  ficha:aprendiz.ficha || "",
  estado:aprendiz.estado || "",
  rh:aprendiz.rh || "",
  regional:aprendiz.regional || "",
  programa:aprendiz.programa || ""
 });


 setIdActualizar(aprendiz.id);
 setEditando(true);


}catch(error){

console.log(error);

}

};


// Función para crear un nuevo aprendiz
const crearAprendiz=async()=>{

  console.log(form);

try{

setLoading(true);

await crearServicio(form);

limpiarFormulario();

await fetchTodos();

}catch(error){

if(error.response?.status === 500){

alert("No se pudo crear el aprendiz. Verifique que el correo no esté registrado.");

}else{

alert("Ocurrió un error al crear el aprendiz.");

}

console.log(error);

}finally{

setLoading(false);

}

};

// Función para actualizar un aprendiz existente

const actualizarAprendiz=async()=>{

try{

await actualizarServicio(idActualizar,form);

setEditando(false);

setIdActualizar(null);

limpiarFormulario();

await fetchTodos();

}catch(error){

console.log(error);

}

};

// Función para eliminar un aprendiz por ID
const eliminarPorId=async()=>{if(!idFiltro)return;

try{

setLoading(true);

await eliminarServicio(idFiltro);

await fetchTodos();

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};

return(

// Renderizado del componente con tema personalizado y formulario de aprendices
<ThemeProvider theme={theme}>

<CssBaseline/>

<Box sx={{mt:4,px:{xs:2,md:4}}}>

<Stack direction="row" spacing={2} alignItems="center" sx={{mb:2}}>

<Typography variant="h5" sx={{flex:1,fontWeight:700}}>
Aprendices
</Typography>


<Button 
variant="contained" 
onClick={fetchTodos}
disabled={loading}
>
{loading?"Cargando...":"VER TODOS"}
</Button>


<TextField
size="small"
label="ID"
value={idFiltro}
onChange={(e)=>setIdFiltro(e.target.value)}
sx={{...inputSX,width:140}}
/>


<Button
variant="contained"
color="secondary"
onClick={fetchPorId}
disabled={!idFiltro}
>
BUSCAR POR ID
</Button>


<Button
variant="contained"
color="primary"
onClick={()=>buscarParaActualizar(idFiltro)}
disabled={!idFiltro}
>
Actualizar por ID
</Button>


<Button
variant="contained"
color="error"
onClick={eliminarPorId}
disabled={!idFiltro}
>
ELIMINAR
</Button>


{
editando && (

<Button
variant="outlined"
color="error"
onClick={()=>{

setEditando(false);
setIdActualizar(null);
limpiarFormulario();

}}
>
CANCELAR
</Button>

)
}


</Stack>

<AprendizForm
form={form}
setForm={setForm}
crearAprendiz={crearAprendiz}
actualizarAprendiz={actualizarAprendiz}
editando={editando}
inputSX={inputSX}
/>

<AprendizTable
data={data}
buscarParaActualizar={buscarParaActualizar}
/>

</Box>
</ThemeProvider>

);
};

export default ListaAprendices;