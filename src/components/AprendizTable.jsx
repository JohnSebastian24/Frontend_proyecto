import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper
} from "@mui/material";


const AprendizTable = ({
  data,
  buscarParaActualizar
}) => {


  return (

    <>

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
                background: "#22d3ee"
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
                ].map((h) => (

                  <TableCell
                    key={h}
                    sx={{
                      color: "#0b1220",
                      fontWeight: 700,
                      padding: "12px 8px",
                      fontSize: "14px"
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
              data.map((row, i) => (

                <TableRow

                  key={row.id ?? i}

                  sx={{
                    backgroundColor:
                      i % 2 === 0
                        ? "#0f172a"
                        : "#111827",

                    "&:hover": {
                      backgroundColor: "#1f2937"
                    }
                  }}

                >


                  <TableCell>
                    {row.id}
                  </TableCell>


                  <TableCell>
                    {row.nombre}
                  </TableCell>


                  <TableCell>
                    {row.apellido}
                  </TableCell>


                  <TableCell

                    sx={{
                      maxWidth: 160,
                      whiteSpace: "normal",
                      wordBreak: "break-word"
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
                      maxWidth: 150,
                      whiteSpace: "normal",
                      wordBreak: "break-word"
                    }}

                  >

                    {row.programa}

                  </TableCell>


                  <TableCell>


                    <Button

                      size="small"

                      variant="contained"

                      color="secondary"

                      onClick={() =>
                        buscarParaActualizar(row.id)
                      }

                    >

                      EDITAR

                    </Button>


                  </TableCell>


                </TableRow>

              ))

            }


            {
              data.length === 0 && (

                <TableRow>

                  <TableCell
                    colSpan={11}
                    align="center"
                  >

                    Sin registros

                  </TableCell>

                </TableRow>

              )
            }


          </TableBody>


        </Table>


      </TableContainer>


    </>

  );


};


export default AprendizTable;