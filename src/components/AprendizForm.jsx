import {
 Paper,
 Typography,
 TextField,
 Button,
 Stack
} from "@mui/material";



const AprendizForm = ({
 form,
 setForm,
 crearAprendiz,
 actualizarAprendiz,
 editando,
 inputSX
}) => {

  return (
    <>
        {/* Formulario creación */}
        <Paper elevation={4} sx={{ p: 2, mb: 3, border: "1px solid #334155", bgcolor: "background.paper" }}>
          <Typography sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>Crear aprendiz</Typography>
          <Stack direction="column" spacing={2}>

            <TextField
              variant="outlined"
              label="Nombre"
              value={form.nombre ?? ""}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Apellido"
              value={form.apellido ?? ""}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Email"
              value={form.email ?? ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Teléfono"
              value={form.telefono ?? ""}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Dirección"
              value={form.direccion ?? ""}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Ficha"
              value={form.ficha ?? ""}
              onChange={(e) => setForm({ ...form, ficha: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Estado"
              value={form.estado ?? ""}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="RH"
              value={form.RH ?? ""}
              onChange={(e) => setForm({ ...form, RH: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Regional"
              value={form.regional ?? ""}
              onChange={(e) => setForm({ ...form, regional: e.target.value })}
              sx={inputSX}
            />

            <TextField
              variant="outlined"
              label="Programa"
              value={form.programa ?? ""}
              onChange={(e) => setForm({ ...form, programa: e.target.value })}
              sx={inputSX}
            />


            <Button type="button" variant="contained" color={editando ? "secondary" : "primary"} onClick={editando ? actualizarAprendiz : crearAprendiz}
            >

              {editando ? "ACTUALIZAR" : "CREAR"}

            </Button>

          </Stack>
        </Paper>
    </>
  );
};

export default AprendizForm;

