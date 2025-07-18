// src/components/GraficoHistorial.tsx
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ReporteTicket } from "../Modelo/ReporteTicket";
import dayjs from "dayjs";

interface Props {
  datosFiltrados: ReporteTicket[];
}

const GraficoHistorial = ({ datosFiltrados }: Props) => {
  const [modo, setModo] = useState<"USUARIO" | "SERVICIO">("USUARIO");
  const [opciones, setOpciones] = useState<any>({});

  useEffect(() => {
    const agrupados: Record<string, Record<string, number>> = {};

    datosFiltrados.forEach((item) => {
      const clave = modo === "USUARIO" ? item.usuario : item.servicio;
      const fecha = dayjs(item.fechaTicket).format("YYYY-MM-DD");

      if (!agrupados[clave]) agrupados[clave] = {};
      if (!agrupados[clave][fecha]) agrupados[clave][fecha] = 0;

      agrupados[clave][fecha] += item.subtotal;
    });

    const todasFechas = Array.from(
      new Set(datosFiltrados.map((item) => dayjs(item.fechaTicket).format("YYYY-MM-DD")))
    ).sort();

    const series = Object.entries(agrupados).map(([nombre, valores]) => {
      const data = todasFechas.map((fecha) => valores[fecha] || 0);
      return { name: nombre, data };
    });

    setOpciones({
      chart: { type: "line" },
      title: { text: `📆 Historial por ${modo === "USUARIO" ? "Usuario" : "Servicio"}` },
      xAxis: { categories: todasFechas, title: { text: "Fecha" } },
      yAxis: { title: { text: "Subtotal ($)" } },
      tooltip: { shared: true, valuePrefix: "$" },
      series,
    });
  }, [modo, datosFiltrados]);

  return (
    <div style={{ marginTop: "4rem", backgroundColor: "#fff", padding: "2rem", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3>📆 Gráfico Historial</h3>
        <button
          onClick={() => setModo(modo === "USUARIO" ? "SERVICIO" : "USUARIO")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Ver por {modo === "USUARIO" ? "Servicio" : "Usuario"}
        </button>
      </div>

      <HighchartsReact highcharts={Highcharts} options={opciones} />
    </div>
  );
};

export default GraficoHistorial;
