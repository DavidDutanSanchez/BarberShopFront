import  { useEffect, useState } from "react";
import { getReporteTickets } from "../Controller/ReporteTicketController";
import { ReporteTicket } from "../Modelo/ReporteTicket";

const ReporteTicketView = () => {
  const [datos, setDatos] = useState<ReporteTicket[]>([]);


 const cargar = async () => {
      try {
        const datos = (await getReporteTickets({page:1,pageSize:100}));
        console.log("Datos cargados:", datos);
       // setDatos(datos);
      } catch (error) {
        console.error(" Error cargando tickets:", error);
      }
    };

  useEffect(() => {
    // const cargar = async () => {
    //   try {
    //     const datos = (await getReporteTickets({page:1,pageSize:100})).data;
    //     console.log("Datos cargados:", datos);
    //    // setDatos(datos);
    //   } catch (error) {
    //     console.error(" Error cargando tickets:", error);
    //   }
    // };
     cargar();
  }, []);

  return (
    <div>
      <h2>Reporte de Tickets</h2>
      {datos.length === 0 ? (
        <p>No hay datos para mostrar</p>
      ) : (
        <ul>
          {datos.map((item, index) => (
            <li key={index}>
              {item.fechaTicket} - {item.usuario} - {item.servicio} - Total: {item.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReporteTicketView;
