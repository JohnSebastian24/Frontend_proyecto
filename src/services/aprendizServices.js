import axios from "axios";


const API_BASE = "http://localhost:8081/api/v1/aprendiz";


// Obtener todos
export const obtenerAprendices = () => {
    return axios.get(API_BASE);
};


// Buscar por ID
export const obtenerAprendizPorId = (id) => {
    return axios.get(`${API_BASE}/${id}`);
};


// Crear
export const crearAprendiz = (data) => {
    return axios.post(API_BASE, data);
};


// Actualizar
export const actualizarAprendiz = (id, data) => {
    return axios.put(`${API_BASE}/${id}`, data);
};


// Eliminar
export const eliminarAprendiz = (id) => {
    return axios.delete(`${API_BASE}/${id}`);
};