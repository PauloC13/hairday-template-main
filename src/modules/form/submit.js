import dayjs, { Dayjs } from "dayjs";
import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load";

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")

const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = inputToday

selectedDate.min = inputToday

form.onsubmit = async (event) => {
    event.preventDefault()
    console.log("enviado");
    
    try {
        const name = clientName.value.trim()
        
        if(!name){
            return alert("Informe o nome do cliente!")
        }

        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected){
            return alert("Selecione a Hora")
        }

        const[hour] = hourSelected.innerText.split(":")

        const when = dayjs(selectedDate.value).add(hour, "hour")
        
        const id = String(new Date().getTime())

        await scheduleNew({
            id,
            name,
            when
        });
        
        await schedulesDay()

        clientName.value = ""
        
    } catch (error) {

        console.log(error);
        
        alert("Não foi possivel realizar o atendimento")
    }
}