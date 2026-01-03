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
  LabelList
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReporteTicketViewBar = () => {
  const [datos, setDatos] = useState<ReporteTicket[]>([]);
  const [usuario, setUsuario] = useState("");
  const [servicio, setServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filtroFechaTipo, setFiltroFechaTipo] = useState<"DIA" | "SEMANA" | "MES" | "NINGUNO">("NINGUNO");
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    try {
      const filtros: any = {
        page: 1,
        pageSize: 1000
      };

      if (fechaInicio) filtros.fechaInicio = fechaInicio;
      if (fechaFin) filtros.fechaFin = fechaFin;

      const response = await getReporteTickets(filtros);
      setDatos(response.data);
    } catch (error) {
      console.error("❌ Error cargando tickets:", error);
    }
  };


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
    } else {
      setFechaInicio(hoy.startOf("month").format("YYYY-MM-DD"));
      setFechaFin(hoy.format("YYYY-MM-DD"));
    }
  }, [filtroFechaTipo]);



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


  const totalPorUsuario = datosFiltrados.reduce((acc, item) => {
    if (!acc[item.usuario]) {
      acc[item.usuario] = { usuario: item.usuario, total: 0 };
    }
    acc[item.usuario].total += item.subtotal;
    return acc;
  }, {} as Record<string, { usuario: string; total: number }>);
  const totalPorUsuarioArray = Object.values(totalPorUsuario);
  const totalGenerado = totalPorUsuarioArray.reduce((sum, u) => sum + u.total, 0);
  const datosPintado = [{ nombre: "Pintado", total: totalGenerado }];

  // ✅ Recalcular total y veces por servicio basados en el filtro
  const totalPorServicio = Object.values(
    datosFiltrados.reduce((acc, item) => {
      if (!acc[item.servicio]) {
        acc[item.servicio] = {
          servicio: item.servicio,
          total: 0,
          veces: 0,
        };
      }
      acc[item.servicio].total += item.subtotal; // ✅ más preciso que costo * cantidad
      acc[item.servicio].veces += item.cantidad;
      return acc;
    }, {} as Record<string, { servicio: string; total: number; veces: number }>)
  );


  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Tickets", 14, 20);

    // 🔽 Tabla de tickets detallados
    const columnas = ["Fecha", "Usuario", "Servicio", "Subtotal", "Total"];
    const filas = datosFiltrados
      .sort((a, b) => a.usuario.localeCompare(b.usuario)) // Ordenar por usuario
      .map((item) => [
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

    const resumenPorUsuario = datosFiltrados.reduce((acc, item) => {
      if (!acc[item.usuario]) {
        acc[item.usuario] = { usuario: item.usuario, total: 0 };
      }
      acc[item.usuario].total += item.subtotal;
      return acc;
    }, {} as Record<string, { usuario: string; total: number }>);


    const resumenArray = Object.values(resumenPorUsuario).map((item) => ({
      usuario: item.usuario,
      total: item.total,
      comision:
        item.usuario.toLowerCase() === "gjesus"
          ? item.total * 0.6   // 👈 Gjesus 60%
          : item.total * 0.5   // 👈 demás 50%
    }));

    // 📌 Añadir tabla de resumen por usuario debajo de la anterior
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [["Usuario", "Total", "Comisión (50%)"]],
      body: resumenArray.map(r => [
        r.usuario,
        `$${r.total.toFixed(2)}`,
        `$${r.comision.toFixed(2)}`
      ])
    });

    doc.save("reporte_tickets.pdf");
  };


  useEffect(() => {
    cargar();
  }, [fechaInicio, fechaFin]);

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "2rem", borderRadius: "8px", fontFamily: "Arial, sans-serif" }}>
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
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#125ea2")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
        >
          📄 Exportar a PDF
        </button>
      </div>

      <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <legend style={{ fontWeight: "bold", color: "#333" }}>🎛️ Filtros</legend>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" placeholder="🔍 Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input type="text" placeholder="🔍 Servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid #ccc" }} />
          <label>
            <input
              type="checkbox"
              checked={filtroFechaTipo === "DIA"}
              onChange={() => setFiltroFechaTipo(filtroFechaTipo === "DIA" ? "NINGUNO" : "DIA")}
            /> Día actual
          </label>
        </div>
      </fieldset>

      {loading ? <p>Cargando datos...</p> : <p><strong>Registros mostrados:</strong> {datosFiltrados.length}</p>}

      <h3 style={{ marginTop: "3rem" }}>👤 Total por Usuario</h3>
      {/* <p style={{ marginTop: "-1rem", marginBottom: "1rem", fontSize: "0.9rem", color: "#555" }}>
                Monto total generado por cada usuario en el periodo seleccionado.
            </p> */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={totalPorUsuarioArray}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="usuario" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Total"]} />
          <Legend />
          <Bar dataKey="total" fill="#1976d2">
            <LabelList dataKey="total" position="top" formatter={(val) => `$${val}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "3rem" }}>🛠️ Total por Servicio</h3>
      {/* <p style={{ marginTop: "-1rem", marginBottom: "1rem", fontSize: "0.9rem", color: "#555" }}>
                Total facturado y veces utilizado por cada servicio.
            </p> */}
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
          <Bar dataKey="total" fill="#ffa726">
            <LabelList dataKey="total" position="top" formatter={(val) => `$${val}`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReporteTicketViewBar;