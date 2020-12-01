import { useAxios } from '../api/use-axios.hook';

const token = localStorage.getItem('@GoBarber:token');
const axios = useAxios()

const useAppointment = () => {
    const listAppointments = async () => {
        try {
            const response = await axios.get('appointments')
            return response.data;
        } catch (error) {
            return error.response;
        }
    }
    return { listAppointments }
}

export { useAppointment }