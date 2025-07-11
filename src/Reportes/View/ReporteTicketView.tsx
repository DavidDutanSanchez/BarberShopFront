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

const ReporteTicketView = () => {
    const [datos, setDatos] = useState<ReporteTicket[]>([]);
    const [usuario, setUsuario] = useState("");
    const [servicio, setServicio] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

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

    const totalGenerado = datosFiltrados.reduce((acum, item) => acum + item.total, 0);

    // Prepara el dato en un array con formato para mostrar en el gráfico
    const datosPintado = [{ nombre: "Pintado", total: totalGenerado }];

    // Datos para gráficas
    const totalPorUsuario = Object.values(
        datosFiltrados.reduce((acc, item) => {
            acc[item.usuario] = acc[item.usuario] || { usuario: item.usuario, total: 0 };
            acc[item.usuario].total += item.total;
            return acc;
        }, {} as Record<string, { usuario: string; total: number }>)
    );

    //   const totalPorServicio = Object.values(
    //     datosFiltrados.reduce((acc, item) => {
    //       acc[item.servicio] = acc[item.servicio] || { servicio: item.servicio, total: 0 };
    //       acc[item.servicio].total += item.total;
    //       return acc;
    //     }, {} as Record<string, { servicio: string; total: number }>)
    //   );

    const totalPorServicio = Object.values(
        datosFiltrados.reduce((acc, item) => {
            if (!acc[item.servicio]) {
                acc[item.servicio] = {
                    servicio: item.servicio,
                    total: 0,
                    veces: 0,
                };
            }
            acc[item.servicio].total += item.total;
            acc[item.servicio].veces = item.totalVecesServicio; // valor ya viene del backend
            return acc;
        }, {} as Record<string, { servicio: string; total: number; veces: number }>),
    );


    const vecesPorServicio = Object.values(
        datosFiltrados.reduce((acc, item) => {
            acc[item.servicio] = acc[item.servicio] || { servicio: item.servicio, veces: 0 };
            acc[item.servicio].veces = item.totalVecesServicio;
            return acc;
        }, {} as Record<string, { servicio: string; veces: number }>),
    );

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ color: "#1976d2" }}>📊 Reporte de Tickets</h2>

            {/* Filtros */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                <input type="text" placeholder="🔍 Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                <input type="text" placeholder="🔍 Servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} />
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </div>

            {/* Lista estilizada
      {datosFiltrados.length === 0 ? (
        <p style={{ color: "#999" }}>⚠️ No hay datos para mostrar</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          {datosFiltrados.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: "#f4f6f8",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderLeft: "4px solid #1976d2",
              }}
            >
              <div><strong>📅 Fecha:</strong> {dayjs(item.fechaTicket).format("YYYY-MM-DD HH:mm")}</div>
              <div><strong>👤 Usuario:</strong> {item.usuario}</div>
              <div><strong>🛠 Servicio:</strong> {item.servicio}</div>
              <div><strong>💵 Total:</strong> ${item.total}</div>
            </div>
          ))}
        </div>
      )} */}

            <h3 style={{ marginTop: "3rem" }}>💼 Total Generado: Pintado</h3>
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
                <BarChart data={totalPorUsuario}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="usuario" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#1976d2" />
                </BarChart>
            </ResponsiveContainer>

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
                                        <p style={{ color: "#ffa726" }}>💰 total: {payload[0].value}</p>
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
