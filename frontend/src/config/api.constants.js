export const SERVER_URL = "http://localhost";
/**
 * @constant {string} SERVER_PORT Puerto del servidor
 */
export const SERVER_PORT = "8000";
/**
 * @constant {string} SERVER_API_URL URL de la API
 * @example http://localhost:8000/
 * @example http://localhost:8000/task_id/
 * 
 */
export const SERVER_API_URL = `${SERVER_URL}:${SERVER_PORT}/`;
/**
 * @constant {string} TOKEN Token de autenticación, duración de 15 días
 * 
 */
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzc5NDkwMzEsImV4cCI6MTY3OTI0NTAzMX0.vZ5IQ0duRKumUP4aofjOoSSnUj2cNsVZMsyXFQL5FQQ";
