import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ticketsCabeceraDto } from "../model/ticketsDto";
import { deleteTicket, getAllTickets } from "../controller/serviceTickets";
import { DefaultResponseDto } from "../../Dtos/DefaultResponseDto";
import { Delete, FilterAlt, FilterAltOff, RemoveRedEye } from "@mui/icons-material";
import TicketModifyModal from "./TicketModify";
import { set } from "react-hook-form";
type Order = "asc" | "desc";

const TicketList = () => {
  const [tickets, setTickets] = useState<ticketsCabeceraDto[]>([])
  const [openServicios, setOpenServicios] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof ticketsCabeceraDto>("fechaTicket");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [cabeceraSelecionada, setCabeceraSelecionada] = useState<string>('')
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [verNoAnulados, setVerNoAnulados] = useState(true);
  const [filtroPersona, setFiltroPersona] = useState("");
  const [filtroFecha, setFiltroFecha] = useState(""); // YYYY-MM-DD
  const [filtroTotal, setFiltroTotal] = useState(""); // número o texto

  const buildSearch = () => {
    const parts: string[] = [];
    if (search.trim()) parts.push(search.trim());
    if (filtroPersona.trim()) parts.push(filtroPersona.trim());
    if (filtroTotal.trim()) parts.push(filtroTotal.trim());
    return parts.join(" ");
  };

  const fetchTickets = async () => {
    try {
      const pageSize = filtroFecha ? 2000 : 20; // <-- si hay fecha, trae más
      const pageToSend = filtroFecha ? 1 : page + 1; // <-- si hay fecha, siempre primera página

      const ticketsCabeceras = await getAllTickets(
        {
          page: pageToSend,
          pageSize,
          orderBy,
          isOrderByDescending: order === "asc",
          search: buildSearch(),
        },
        verNoAnulados
      );

      setTickets(ticketsCabeceras.data);
      setTotalCount(ticketsCabeceras.total);
    } catch (error) {
      setSnackbar({
        open: true,
        message: (error as DefaultResponseDto<null>).message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [page, order, orderBy, search, verNoAnulados, filtroPersona, filtroFecha, filtroTotal]);


  const handleRequestSort = (property: keyof ticketsCabeceraDto) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((s) => ({ ...s, open: false }));
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTicket(cabeceraSelecionada);
      setSnackbar({
        open: true,
        message: 'Ticket anulado correctamente.',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: (error as DefaultResponseDto<null>).message,
        severity: 'error'
      });
    } finally {
      setConfirmOpen(false);
      setCabeceraSelecionada('');
      fetchTickets();
    }
  }

  const ticketsFiltrados = tickets.filter(t => {
    if (!filtroFecha) return true;

    const fechaTicket = new Date(t.fechaTicket);
    const fechaISO = isNaN(fechaTicket.getTime()) ? "" : fechaTicket.toISOString().slice(0, 10);

    // filtroFecha viene como YYYY-MM-DD por el input type="date"
    return fechaISO === filtroFecha;
  });



  return (
    <>
      <Box p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Historial de Tickets</Typography>
        </Box>
        <TextField
          label="Buscar tickets"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{ mb: 2, width: 300 }}
        />
        <Tooltip title={verNoAnulados ? "Ver tickets anulados" : "Ver tickets no anulados"}>
          <IconButton size="medium" onClick={() => {
            setVerNoAnulados(!verNoAnulados);
            setPage(0);
          }}>
            {verNoAnulados ? <FilterAlt /> : <FilterAltOff />}
          </IconButton>
        </Tooltip>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection={orderBy === "persona" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "persona"}
                    direction={orderBy === "persona" ? order : "asc"}
                    onClick={() => handleRequestSort("persona")}
                  >
                    Generado por
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderBy === "fechaTicket" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "fechaTicket"}
                    direction={orderBy === "fechaTicket" ? order : "asc"}
                    onClick={() => handleRequestSort("fechaTicket")}
                  >
                    Fecha
                  </TableSortLabel>
                </TableCell>

                <TableCell sortDirection={orderBy === "totalTicketCab" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "totalTicketCab"}
                    direction={orderBy === "totalTicketCab" ? order : "asc"}
                    onClick={() => handleRequestSort("totalTicketCab")}
                  >
                    Total
                  </TableSortLabel>
                </TableCell>

                <TableCell>Acciones</TableCell>
              </TableRow>

              {/* ✅ AQUÍ VA LA FILA DE FILTROS */}
              <TableRow>
                <TableCell>
                  <TextField
                    value={filtroPersona}
                    onChange={(e) => {
                      setFiltroPersona(e.target.value);
                      setPage(0);
                    }}

                    placeholder="Filtrar..."
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={filtroFecha}
                    onChange={(e) => {
                      setFiltroFecha(e.target.value);
                      setPage(0);
                    }}

                    type="date"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    value={filtroTotal}
                    onChange={(e) => {
                      setFiltroTotal(e.target.value);
                      setPage(0);
                    }}

                    placeholder="$..."
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => {
                      setFiltroPersona("");
                      setFiltroFecha("");
                      setFiltroTotal("");
                      setSearch("");
                      setPage(0);
                    }}

                  >
                    Limpiar
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {ticketsFiltrados.map((row) => (
                <TableRow key={row.idTickets} hover>
                  <TableCell>
                    {`${row.persona?.apellidosPersona} ${row.persona?.nombresPersona}`}
                  </TableCell>
                  <TableCell>
                    {new Date(row.fechaTicket).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{`$${Number(row.totalTicketCab).toFixed(2)}`}</TableCell>
                  <TableCell>
                    <Tooltip title="Ver Detalle">
                      <IconButton size="small" onClick={() => {
                        setCabeceraSelecionada(row.idTickets)
                        setOpenServicios(true)
                      }}>
                        <RemoveRedEye />
                      </IconButton >
                    </Tooltip>
                    <Tooltip title="Anular ticket">
                      <IconButton size="small" onClick={() => {
                        setCabeceraSelecionada(row.idTickets)
                        setConfirmOpen(true)
                      }}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            rowsPerPage={20}
            rowsPerPageOptions={[10, 20, 50]}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </Box>

      <TicketModifyModal
        open={openServicios}
        onClose={() => {
          setOpenServicios(false);
          fetchTickets();
        }}
        cabeceraId={cabeceraSelecionada}
      />

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Confirmar anulación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que deseas anular este ticket?
            <br />
            <b>NOTA: Esta acción no se puede deshacer.</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setConfirmOpen(false); setCabeceraSelecionada('') }}>Cancelar</Button>
          <Button color="error" onClick={() => handleConfirmDelete()}>
            Anular
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TicketList;
