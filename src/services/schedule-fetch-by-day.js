import { apiConfig } from "./api-config";
import dayjs, { Dayjs } from "dayjs";

export async function scheduleFetchByDay({date}) {
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        const data = await response.json()

        const dayleSchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, "day"))

        return dayleSchedules
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia selecionado.")
    }
}