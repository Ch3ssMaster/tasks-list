export const SERVER_URL:string = "http://localhost";
/**
 * @constant {string} SERVER_PORT Puerto del servidor
 */
export const SERVER_PORT:string = "8000";
/**
 * @constant {string} SERVER_API_URL URL de la API
 * @example http://localhost:8000/
 * @example http://localhost:8000/task_id/
 * 
 */
export const SERVER_API_URL:string = `${SERVER_URL}:${SERVER_PORT}/`;
/**
 * @constant {string} TOKEN Token de autenticación, duración de 15 días
 * 
 */
export const TOKEN:string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk3NDY1NDgsImV4cCI6MTY4MTA0MjU0OH0.r26ygmMi4jt7YDlgRNKH6L_w-Ft1GK97dfR8EXjvZus";
