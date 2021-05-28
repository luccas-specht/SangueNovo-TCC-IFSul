import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";

import { isToday, format, parseISO, isAfter } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import {
  DAYS_AVAILABLE,
  DAYS_NOT_WORKED,
  DAYS_PT,
  MONTHS_PT,
} from "../../../../constants";

import { toastConfig } from "../../../../configs";

import { useDonation } from "../../../../hooks";

import * as S from "./manageAppointments.style";
import { FiClock } from "react-icons/fi";

interface Appointment {
  appointment_date: string;
  hourFormatted: string;
  donator: {
    name: string;
  };
  campaign: {
    title: string;
    priority: string;
    bloodType: string;
    avatar: string;
  };
}

export const ManageAppointments = () => {
  const { listAllAppointments } = useDonation();
  const { push } = useHistory();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabActive, setTabActive] = useState<boolean>(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const renderTab = useCallback(
    () => (
      <S.Ul active={tabActive}>
        <button onClick={() => setTabActive(true)}>
          <li>Ativos</li>
        </button>
        <button onClick={() => setTabActive(false)}>
          <li>Solicitados</li>
        </button>
      </S.Ul>
    ),
    [tabActive]
  );

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const { data, status } = await listAllAppointments(
        selectedDate.getDate(),
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        tabActive ? "Ativo" : "Solicitado"
      );

      if (status === 200) {
        const appointmentsFormatted = data.map((appointment: Appointment) => ({
          ...appointment,
          hourFormatted: format(
            parseISO(appointment.appointment_date),
            "HH:mm"
          ),
        }));
        setAppointments(appointmentsFormatted);
      } else {
        toast.error(`${data.message}`, toastConfig);
      }
    };
    callApi();
  }, [selectedDate, tabActive, push]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(
    () => format(selectedDate, "cccc", { locale: ptBR }),
    [selectedDate]
  );

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.appointment_date).getHours() < 12
      ),
    [appointments]
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => parseISO(appointment.appointment_date).getHours() >= 12
      ),
    [appointments]
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find((appointment) =>
        isAfter(parseISO(appointment.appointment_date), new Date())
      ),
    [appointments]
  );

  return (
    <>
      <ToastContainer />
      <S.Content>
        <S.Schedule>
          <S.InfoDaily>
            <div>
              <h1>Horários {tabActive ? "agendados" : "solicitados"}</h1>
              <p>
                {isToday(selectedDate) && <span>Hoje</span>}
                <span>{selectedDateAsText}</span>
                <span>{selectedWeekDay}</span>
              </p>
            </div>
            {renderTab()}
          </S.InfoDaily>
          {isToday(selectedDate) && nextAppointment && (
            <S.NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.campaign.avatar}
                  alt={nextAppointment.donator.name}
                />
                <strong>{nextAppointment.donator.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </S.NextAppointment>
          )}
          <S.Section>
            <strong>Manhã</strong>
            {morningAppointments.length === 0 ? (
              <p>Nenhum agendamento neste periodo.</p>
            ) : (
              morningAppointments.map((appointment) => (
                <S.Appointment key={appointment.appointment_date}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={appointment.campaign.avatar}
                      alt={appointment.campaign.title}
                    />
                    <strong> {appointment.campaign.title}</strong>
                  </div>
                </S.Appointment>
              ))
            )}
          </S.Section>
          <S.Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 ? (
              <p>Nenhum agendamento neste periodo.</p>
            ) : (
              afternoonAppointments.map((appointment) => (
                <S.Appointment key={appointment.appointment_date}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    <img
                      src={appointment.campaign.avatar}
                      alt={appointment.campaign.title}
                    />
                    <strong> {appointment.campaign.title}</strong>
                  </div>
                </S.Appointment>
              ))
            )}
          </S.Section>
        </S.Schedule>
        <S.Calendar>
          <DayPicker
            fromMonth={new Date()}
            weekdaysShort={DAYS_PT}
            months={MONTHS_PT}
            disabledDays={DAYS_NOT_WORKED}
            modifiers={{ available: DAYS_AVAILABLE }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
          />
        </S.Calendar>
      </S.Content>
    </>
  );
};
