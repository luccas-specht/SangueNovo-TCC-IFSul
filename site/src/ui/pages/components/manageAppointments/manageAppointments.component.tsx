import { useCallback, useState } from "react";

import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";

import {
  DAYS_AVAILABLE,
  DAYS_NOT_WORKED,
  DAYS_PT,
  MONTHS_PT,
} from "../../../../constants";

import * as S from "./manageAppointments.style";

export const ManageAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabActive, setTabActive] = useState<boolean>(true);

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

  const handleDateChange = useCallback(
    (day: Date, dayModifiers: DayModifiers) => {
      if (dayModifiers.available) {
        setSelectedDate(day);
      }
    },
    []
  );

  return (
    <>
      <S.Content>
        <S.Schedule>
          <S.InfoDaily>
            <div>
              <h1>Horários agendados</h1>
              <p>
                <span>Hoje</span>
                <span>Dia 06</span>
                <span>Segunda-feira</span>
              </p>
            </div>

            {renderTab()}
          </S.InfoDaily>
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
