import React, { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, TextField, Stack, CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },       // cian
    secondary: { main: "#a78bfa" },     // violeta
    error: { main: "#ef4444" },
    background: { default: "#0b1220", paper: "#111827" }, // dark limpio
    text: { primary: "#e5e7eb", secondary: "#94a3b8" }
  }
});

const inputSX = {

  bgcolor: "#f3f4f6",

  borderRadius: 1,


  "& .MuiInputBase-input": {
    color: "#111827",
    padding: "14px"
  },


  "& .MuiInputLabel-root": {
    color: "#374151"
  },


  "& .MuiInputLabel-root.Mui-focused": {
    color: "#22d3ee"
  },


  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#cbd5e1"
  },


  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#94a3b8"
  },


  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#22d3ee"
  }

};

const ListaAprendices = () => {
  const API_BASE = "http://localhost:8081/api/v1/aprendiz";
  //const API_BASE = "https://backadso-production.up.railway.app/api/v1/aprendiz"

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    ficha: "",
    estado: "",
    RH: "",
    regional: "",
    programa: ""
  }); const [idFiltro, setIdFiltro] = useState("");

  const [editando, setEditando] = useState(false);
  const [idActualizar, setIdActualizar] = useState(null);
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE);
      setData(res.data || []);
    } catch (e) {
      console.error("Error cargando aprendices:", e);
      setData([]);
    } finally { setLoading(false); }
  };

  const fetchPorId = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/${idFiltro}`);
      setData(res.data ? [res.data] : []);
    } catch { setData([]); } finally { setLoading(false); }
  };

  const buscarParaActualizar = async () => {

    if (!idFiltro) return;

    try {

      const res = await axios.get(`${API_BASE}/${idFiltro}`);

      const aprendiz = res.data;


      setForm({

        nombre: aprendiz.nombre || "",
        apellido: aprendiz.apellido || "",
        email: aprendiz.email || "",
        telefono: aprendiz.telefono || "",
        direccion: aprendiz.direccion || "",
        ficha: aprendiz.ficha || "",
        estado: aprendiz.estado || "",
        RH: aprendiz.RH || "",
        regional: aprendiz.regional || "",
        programa: aprendiz.programa || ""

      });

      setIdActualizar(aprendiz.id);

      setEditando(true);

    } catch (error) {

      console.log(error);

    }

  };

  const crearAprendiz = async () => {
    try {
      setLoading(true);
      await axios.post(API_BASE, form, { headers: { "Content-Type": "application/json" } });
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ficha: "",
        estado: "",
        RH: "",
        regional: "",
        programa: ""
      }); await fetchTodos();
    } catch (e) { console.error("Error creando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const actualizarAprendiz = async () => {

    try {


      await axios.put(
        `${API_BASE}/${idActualizar}`,
        form
      );


      setEditando(false);

      setIdActualizar(null);

      setForm({

        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ficha: "",
        estado: "",
        RH: "",
        regional: "",
        programa: ""

      });

      await fetchTodos();

    } catch (error) {

      console.log(error);

    }


  };

  const eliminarPorId = async () => {
    if (!idFiltro) return;
    try { setLoading(true); await axios.delete(`${API_BASE}/${idFiltro}`); await fetchTodos(); }
    catch (e) { console.error("Error eliminando aprendiz:", e); }
    finally { setLoading(false); }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
        {/* Barra de acciones */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700, color: "text.primary" }}>
            Aprendices
          </Typography>
          <Button variant="contained" color="primary" onClick={fetchTodos} disabled={loading}>
            {loading ? "Cargando..." : "VER TODOS"}
          </Button>

          <TextField
            variant="outlined"
            size="small" label="ID" value={idFiltro} onChange={(e) => setIdFiltro(e.target.value)}
            sx={{ ...inputSX, width: 140 }}
          />
          <Button variant="contained" color="secondary" onClick={fetchPorId} disabled={loading || !idFiltro}>
            BUSCAR POR ID
          </Button>
          <Button variant="contained" color="error" onClick={eliminarPorId} disabled={loading || !idFiltro}>
            ELIMINAR POR ID
          </Button>
          <Button variant="contained" color="primary" onClick={buscarParaActualizar}>
            CARGAR PARA EDITAR
          </Button>

          {editando && (
            <Button variant="outlined" color="error" onClick={() => {

              setEditando(false);
              setIdActualizar(null);

            }}
            >

              CANCELAR

            </Button>

          )
          }

        </Stack>

        {/* Formulario creación */}
        <Paper elevation={4} sx={{ p: 2, mb: 3, border: "1px solid #334155", bgcolor: "background.paper" }}>
          <Typography sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>Crear aprendiz</Typography>
          <Stack direction="column" spacing={2}>

            <TextField
              variant="outlined"
              label="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Apellido"
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Dirección"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Ficha"
              value={form.ficha}
              onChange={(e) => setForm({ ...form, ficha: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Estado"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="RH"
              value={form.RH}
              onChange={(e) => setForm({ ...form, RH: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Regional"
              value={form.regional}
              onChange={(e) => setForm({ ...form, regional: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Programa"
              value={form.programa}
              onChange={(e) => setForm({ ...form, programa: e.target.value })}
              sx={inputSX}
            />


            <Button variant="contained" color={editando ? "secondary" : "primary"} onClick={editando ? actualizarAprendiz : crearAprendiz}
            >

              {editando ? "ACTUALIZAR" : "CREAR"}

            </Button>

          </Stack>
        </Paper>

        {/* Tabla */}
<TableContainer
  component={Paper}
  elevation={3}
  sx={{
    width: "100%",
    overflow: "hidden",
    border: "1px solid #334155",
    bgcolor: "background.paper"
  }}
>

<Table
  size="small"
  sx={{
    width: "100%"
  }}
>

<TableHead>

<TableRow
sx={{
background:"#22d3ee"
}}
>

{
[
"ID",
"Nombre",
"Apellido",
"Email",
"Teléfono",
"Ficha",
"Estado",
"RH",
"Regional",
"Programa",
"Acciones"
].map((h)=>(

<TableCell
key={h}
sx={{
color:"#0b1220",
fontWeight:700,
padding:"12px 8px",
fontSize:"14px"
}}
>

{h}

</TableCell>

))

}

</TableRow>

</TableHead>


<TableBody>

{
data.map((row,i)=>(

<TableRow
key={row.id ?? i}
sx={{
backgroundColor:
i%2===0 ? "#0f172a":"#111827",

"&:hover":{
backgroundColor:"#1f2937"
}

}}
>


<TableCell>{row.id}</TableCell>


<TableCell>
{row.nombre}
</TableCell>


<TableCell>
{row.apellido}
</TableCell>


<TableCell
sx={{
maxWidth:160,
whiteSpace:"normal",
wordBreak:"break-word"
}}
>
{row.email}
</TableCell>


<TableCell>
{row.telefono}
</TableCell>


<TableCell>
{row.ficha}
</TableCell>


<TableCell>
{row.estado}
</TableCell>


<TableCell>
{row.RH}
</TableCell>


<TableCell>
{row.regional}
</TableCell>


<TableCell
sx={{
maxWidth:150,
whiteSpace:"normal",
wordBreak:"break-word"
}}
>
{row.programa}
</TableCell>


<TableCell>

<Button

size="small"

variant="contained"

color="secondary"

onClick={()=>{

setIdFiltro(row.id);

buscarParaActualizar();

}}

>

EDITAR

</Button>

</TableCell>


</TableRow>

))

}


{
data.length===0 &&

<TableRow>

<TableCell
colSpan={11}
align="center"
>

Sin registros

</TableCell>

</TableRow>

}


</TableBody>


</Table>

</TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default ListaAprendices;
