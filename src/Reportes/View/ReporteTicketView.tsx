import { useEffect, useState } from "react";
import { getReporteTickets } from "../Controller/ReporteTicketController";
import { ReporteTicket } from "../Modelo/ReporteTicket";
import dayjs from "dayjs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReporteTicketView = () => {
    const [datos, setDatos] = useState<ReporteTicket[]>([]);
    const [usuario, setUsuario] = useState("");
    const [servicio, setServicio] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const [filtroFechaTipo, setFiltroFechaTipo] = useState<"DIA" | "SEMANA" | "MES" | "NINGUNO">("NINGUNO");

    const cargar = async () => {
        try {
            const response = await getReporteTickets({ page: 1, pageSize: 100 });
            setDatos(response.data);
        } catch (error) {
            console.error("❌ Error cargando tickets:", error);
        }
    };

    useEffect(() => {
        cargar();
    }, []);

    useEffect(() => {
        const hoy = dayjs();

        if (filtroFechaTipo === "DIA") {
            const hoyStr = hoy.format("YYYY-MM-DD");
            setFechaInicio(hoyStr);
            setFechaFin(hoyStr);
        } else if (filtroFechaTipo === "SEMANA") {
            const inicio = hoy.startOf("week").format("YYYY-MM-DD");
            const fin = hoy.endOf("week").format("YYYY-MM-DD");
            setFechaInicio(inicio);
            setFechaFin(fin);
        } else if (filtroFechaTipo === "MES") {
            const inicio = hoy.startOf("month").format("YYYY-MM-DD");
            const fin = hoy.endOf("month").format("YYYY-MM-DD");
            setFechaInicio(inicio);
            setFechaFin(fin);
        }
    }, [filtroFechaTipo]);
const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte de Tickets", 14, 20);

    const columnas = ["Fecha", "Usuario", "Servicio", "Subtotal", "Total"];
    const filas = datosFiltrados.map((item) => [
        dayjs(item.fechaTicket).format("YYYY-MM-DD HH:mm"),
        item.usuario,
        item.servicio,
        `$${item.subtotal.toFixed(2)}`,
        `$${item.total.toFixed(2)}`
    ]);

    autoTable(doc, {
        head: [columnas],
        body: filas,
        startY: 30,
    });

    doc.save("reporte_tickets.pdf");
};
 
    const datosFiltrados = datos.filter((item) => {
        const fecha = dayjs(item.fechaTicket);
        const fechaIni = fechaInicio ? dayjs(fechaInicio) : null;
        const fechaFinal = fechaFin ? dayjs(fechaFin) : null;

        return (
            (!usuario || item.usuario.toLowerCase().includes(usuario.toLowerCase())) &&
            (!servicio || item.servicio.toLowerCase().includes(servicio.toLowerCase())) &&
            (!fechaIni || fecha.isAfter(fechaIni.subtract(1, "day"))) &&
            (!fechaFinal || fecha.isBefore(fechaFinal.add(1, "day")))
        );
    });

    // Agrupar tickets únicos por usuario + fecha para evitar duplicación de totales
    const ticketsUnicos = new Map<string, { usuario: string; total: number }>();
    datosFiltrados.forEach((item) => {
        const clave = `${item.usuario}-${item.fechaTicket}`;
        if (!ticketsUnicos.has(clave)) {
            ticketsUnicos.set(clave, { usuario: item.usuario, total: item.total });
        }
    });

    const totalPorUsuario = Array.from(ticketsUnicos.values()).reduce((acc, item) => {
        acc[item.usuario] = acc[item.usuario] || { usuario: item.usuario, total: 0 };
        acc[item.usuario].total += item.total;
        return acc;
    }, {} as Record<string, { usuario: string; total: number }>);

    const totalPorUsuarioArray = Object.values(totalPorUsuario);

    const totalGenerado = totalPorUsuarioArray.reduce((sum, u) => sum + u.total, 0);
    const datosPintado = [{ nombre: "Pintado", total: totalGenerado }];

    const totalPorServicio = Object.values(
        datosFiltrados.reduce((acc, item) => {
            if (!acc[item.servicio]) {
                acc[item.servicio] = {
                    servicio: item.servicio,
                    total: 0,
                    veces: 0,
                };
            }
            acc[item.servicio].total += item.subtotal;
            acc[item.servicio].veces = item.totalVecesServicio;
            return acc;
        }, {} as Record<string, { servicio: string; total: number; veces: number }>)
    );

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#1976d2" }}>📊 Reporte de Tickets</h2>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
  <button
    onClick={exportarPDF}
    style={{
      padding: "8px 16px",
      backgroundColor: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    📄 Exportar a PDF
  </button>
</div>


            {/* Filtros */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <input type="text" placeholder="🔍 Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                <input type="text" placeholder="🔍 Servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} />
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </div>

            {/* Filtros automáticos */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "center", flexWrap: "wrap" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={filtroFechaTipo === "DIA"}
                        onChange={() => setFiltroFechaTipo(filtroFechaTipo === "DIA" ? "NINGUNO" : "DIA")}
                    /> Día actual
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filtroFechaTipo === "SEMANA"}
                        onChange={() => setFiltroFechaTipo(filtroFechaTipo === "SEMANA" ? "NINGUNO" : "SEMANA")}
                    /> Semana actual
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filtroFechaTipo === "MES"}
                        onChange={() => setFiltroFechaTipo(filtroFechaTipo === "MES" ? "NINGUNO" : "MES")}
                    /> Mes actual
                </label>
            </div>

            {/* Total generado */}
            <h3 style={{ marginTop: "2rem" }}>💼 Total Generado: Pintado</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={datosPintado}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`$${value}`, "Ganancia total"]}
                        labelFormatter={(label) => `Empresa: ${label}`}
                    />
                    <Legend />
                    <Bar dataKey="total" fill="#2e7d32" name="Total Ganado" />
                </BarChart>
            </ResponsiveContainer>

            {/* Gráfico por Usuario */}
            <h3 style={{ marginTop: "3rem" }}>Gráfico: Total por Usuario</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={totalPorUsuarioArray}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="usuario" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Total"]} />
                    <Legend />
                    <Bar dataKey="total" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>

            {/* Gráfico por Servicio */}
            <h3 style={{ marginTop: "3rem" }}>Gráfico: Total por Servicio</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={totalPorServicio}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="servicio" />
                    <YAxis />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid #ccc" }}>
                                        <p><strong>{label}</strong></p>
                                        <p style={{ color: "#ffa726" }}>💰 total: ${payload[0].value}</p>
                                        <p style={{ color: "#66bb6a" }}>🔁 veces: {payload[0].payload.veces}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend />
                    <Bar dataKey="total" fill="#ffa726" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReporteTicketView;
