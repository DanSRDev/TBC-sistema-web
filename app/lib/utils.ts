import { QueryResultRow } from "@vercel/postgres";
import { Datos, DatosUltimoAño } from "./definitions";

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-GB"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const cambiarFormatoFecha = (fecha: string) => {
  // Dividir la fecha en día, mes y año
  const partes = fecha.split("/");
  const dia = partes[0];
  const mes = partes[1];
  const año = partes[2];

  // Construir la nueva fecha en formato "MM/DD/YYYY"
  const nuevaFecha = `${mes}/${dia}/${año}`;

  return nuevaFecha;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const generarDataPorAño = (
  data1: QueryResultRow[],
  data2: QueryResultRow[]
) => {
  // Convertir los resultados de la primera consulta a un arreglo de Datos
  const arreglo1: Datos[] = data1.map((row) => ({
    año: row.año,
    cantidad: row.cantidad,
  }));

  // Convertir los resultados de la segunda consulta a un arreglo de Datos
  const arreglo2: Datos[] = data2.map((row) => ({
    año: row.año,
    cantidad: row.cantidad,
  }));

  // Obtener todos los años únicos
  const añosUnicos: string[] = Array.from(
    new Set([
      ...arreglo1.map((item) => item.año),
      ...arreglo2.map((item) => item.año),
    ])
  );

  // Inicializar nuevos arreglos
  const nuevoArreglo1: Datos[] = [];
  const nuevoArreglo2: Datos[] = [];

  // Iterar sobre los años únicos
  añosUnicos.forEach((año) => {
    // Buscar datos correspondientes en el primer arreglo
    const datos1 = arreglo1.find((item) => item.año === año);
    // Si no se encuentran datos, agregar un objeto con cantidad 0
    if (!datos1) {
      nuevoArreglo1.push({ año: año, cantidad: "0" });
    } else {
      nuevoArreglo1.push(datos1);
    }

    // Buscar datos correspondientes en el segundo arreglo
    const datos2 = arreglo2.find((item) => item.año === año);
    // Si no se encuentran datos, agregar un objeto con cantidad 0
    if (!datos2) {
      nuevoArreglo2.push({ año: año, cantidad: "0" });
    } else {
      nuevoArreglo2.push(datos2);
    }
  });

  return [nuevoArreglo1, nuevoArreglo2];
};

export const generarDataLastYear = (
  data1: QueryResultRow[],
  data2: QueryResultRow[]
) => {
  const arregloTbc = convertirMesAño(data1);
  const arregloN = convertirMesAño(data2);

  const arregloCombinado = [arregloTbc, arregloN];

  return arregloCombinado;
};

const convertirMesAño = (data: QueryResultRow[]) => {
  const arreglo1: DatosUltimoAño[] = data.map((row) => ({
    año: row.año,
    mes: row.mes,
    cantidad: row.cantidad,
  }));

  // Crear dos arreglos vacíos para almacenar los datos
  const registrosPorMesAnio: { [clave: string]: string } = {};

  // Llenar el objeto con los datos de la consulta
  for (const dato of arreglo1) {
    const { año, mes, cantidad } = dato;
    const clave = `${mes}-${año}`;
    registrosPorMesAnio[clave] = cantidad;
  }

  // Crear dos arreglos para almacenar los meses-año y la cantidad de registros
  const nuevoArreglo: Datos[] = [];

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular los últimos 12 meses
  for (let i = 0; i < 12; i++) {
    const fecha = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() - i,
      1
    );
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, así que sumamos 1
    const año = fecha.getFullYear();
    const clave = `${mes}-${año}`;
    const cantidad = registrosPorMesAnio[clave] || "0";
    nuevoArreglo.unshift({ año: clave, cantidad: cantidad });
  }

  return nuevoArreglo;
};
