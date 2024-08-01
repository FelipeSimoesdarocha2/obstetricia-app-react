// Axios
import axios from 'axios';

// Models
import { DataItemGestantes, DataItemObstetras, ICreateObstetras, ICreateGestantes, TypeDateGrafico, TypeTabGrafico, GestationReminder } from '../models';

// Query-string
import queryString from 'query-string';

// Api
export const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Home
export const getHome = () => api.get<DataItemObstetras>('admin/home');
export const getGraficoNovos = (inicio: string, final: string, type: TypeDateGrafico, tab: TypeTabGrafico) =>
  api.get<DataItemObstetras[]>(`admin/home/graph/novos?${queryString.stringify({ inicio, final, type, tab })}`);
export const getGraficoAtivos = (inicio: string, final: string, type: TypeDateGrafico, tab: TypeTabGrafico) =>
  api.get<DataItemObstetras[]>(`admin/home/graph/ativos?${queryString.stringify({ inicio, final, type, tab })}`);
export const getGraficoRatios = (inicio: string, final: string, type: TypeDateGrafico, tab: TypeTabGrafico) =>
  api.get<DataItemObstetras[]>(`admin/home/graph/ratios?${queryString.stringify({ inicio, final, type, tab })}`);
export const getGraficoRetencao = (Inicial: string, Final: string, Aplicacao: number, type: TypeDateGrafico) =>
  api.get<DataItemObstetras[]>(`admin/home/graph/retencao?${queryString.stringify({ Inicial, Final, Aplicacao, type })}`);

// Obstetras
export const getObstetras = () => api.get<DataItemObstetras[]>('admin/obstetras');
export const deleteObstetras = (id: string) => api.delete<FormData[]>(`Doctors/${id}`);
export const createObstetras = (obstetras: FormData) => api.post<ICreateObstetras>('Doctors', obstetras)

// Gestants
export const getGestantes = () => api.get<DataItemGestantes[]>('admin/gestantes');
export const deleteGestantes = (id: string) => api.delete<FormData[]>(`Pacients/${id}`);
export const createGestantes = (data: ICreateGestantes) => api.post<ICreateGestantes>('Pacients', data);

// MonitoringReminder
export const getMonitoringReminder = (gestationId: string) => api.get<GestationReminder>(`MonitoringReminder/${gestationId}`);
export const createMonitoringReminder = (data: GestationReminder) => api.post<GestationReminder>('MonitoringReminder', data);
