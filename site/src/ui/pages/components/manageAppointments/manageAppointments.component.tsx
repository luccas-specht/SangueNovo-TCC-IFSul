import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

import { FiClock } from "react-icons/fi";

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

import imageDefaultProfile from "../../../assets/images/default_user_image.png";

import * as S from "./manageAppointments.style";
import { AppointmentRequestedCard, AppointmentCard } from "../../../components";
import { IoIosArrowDown } from "react-icons/io";

interface Appointment {
  id: string;
  appointment_date: string;
  hourFormatted: string;
  donator: {
    id: string;
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

  const [showButtons, setShowButtons] = useState(false);
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

  const renderButtons = useCallback(
    () =>
      showButtons && (
        <S.WrapperButtons>
          <S.StyledButton color="#FF9000" type="submit">
            Não compareceu ao agendamento
          </S.StyledButton>
          <S.StyledButton color="#6DBA73" type="submit">
            Compareceu ao agendamento
          </S.StyledButton>
        </S.WrapperButtons>
      ),
    [showButtons]
  );

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

  const selectedDateAsText = useMemo(
    () =>
      format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
    [selectedDate]
  );

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
          {isToday(selectedDate) && tabActive && nextAppointment && (
            <S.NextAppointment>
              <strong>Agendamento a seguir</strong>
              <S.WrapperInfo isOpen={showButtons}>
                <div>
                  <img
                    src={nextAppointment.campaign.avatar ?? imageDefaultProfile}
                    alt={nextAppointment.donator.name}
                  />
                  <strong>{nextAppointment.donator.name}</strong>
                  <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </span>
                </div>
                <S.Footer>
                  <S.StyledButtonIcon
                    isShowButton={showButtons}
                    onClick={() => setShowButtons(!showButtons ?? false)}
                  >
                    <IoIosArrowDown size={23} />
                  </S.StyledButtonIcon>
                  {renderButtons()}
                </S.Footer>
              </S.WrapperInfo>
            </S.NextAppointment>
          )}
          <S.WrapperAppointments>
            <S.Section>
              <strong>Manhã</strong>
              {morningAppointments.length === 0 ? (
                <p>Nenhum agendamento para este período.</p>
              ) : tabActive ? (
                morningAppointments.map((appointment) => (
                  <AppointmentCard
                    id={appointment.id}
                    donator={appointment.donator}
                    hourFormatted={appointment.hourFormatted}
                    campaign={appointment.campaign}
                  />
                ))
              ) : (
                morningAppointments.map((appointment) => (
                  <AppointmentRequestedCard
                    id={appointment.id}
                    donator={appointment.donator}
                    hourFormatted={appointment.hourFormatted}
                    campaign={appointment.campaign}
                  />
                ))
              )}
            </S.Section>
            <S.Section>
              <strong>Tarde</strong>
              {afternoonAppointments.length === 0 ? (
                <p>Nenhum agendamento para este período.</p>
              ) : tabActive ? (
                afternoonAppointments.map((appointment) => (
                  <AppointmentCard
                    id={appointment.id}
                    donator={appointment.donator}
                    hourFormatted={appointment.hourFormatted}
                    campaign={appointment.campaign}
                  />
                ))
              ) : (
                afternoonAppointments.map((appointment) => (
                  <AppointmentRequestedCard
                    id={appointment.id}
                    donator={appointment.donator}
                    hourFormatted={appointment.hourFormatted}
                    campaign={appointment.campaign}
                  />
                ))
              )}
            </S.Section>
          </S.WrapperAppointments>
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
