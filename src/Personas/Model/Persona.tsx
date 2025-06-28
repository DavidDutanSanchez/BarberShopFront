export interface Persona {
  idPersona: string;               // varchar(36)
  cedulaPersona: string;           // varchar(13)
  nombresPersona: string;          // varchar(255)
  apellidosPersona: string;        // varchar(255)
  direccionPersona: string;        // text
  fechaNacimientoPersona: string; // date (formato ISO: "YYYY-MM-DD")
  celularPersona: string;         // varchar(20)
  correoPersona: string;          // varchar(255)
}
