import { useHistory } from "react-router";
import { useState } from "react";

import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";

import { REQUIREMENTS_DONATING_BLOOD } from "../../../../constants";
import { useAuthenticated, useDonation } from "../../../../hooks";
import { toastConfig } from "../../../../configs";

import { Button, GenericModal } from "../../../components";

import * as S from "./modalCreateAppointment.style";

type Props = {
  isOpen: boolean;
  campaignId: string;
  onClose(): void;
};

type FormData = {
  appointmentDate: string;
};

export const ModalCreateAppointment = ({
  isOpen,
  campaignId,
  onClose,
}: Props) => {
  const { createAppointment } = useDonation();
  const { user } = useAuthenticated();
  const { push } = useHistory();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const initialValues = {
    appointmentDate: "2021-05-28T00:00",
  };

  const onCreateAppointment = async ({
    appointmentDate,
  }: FormData): Promise<void> => {
    const { data, status } = await createAppointment(
      appointmentDate,
      campaignId,
      user?.user?.id
    );
    status === 200
      ? push("/meus-agendamentos")
      : toast.error(`${data.message}`, toastConfig);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: FormData) => {
      onCreateAppointment(values);
    },
  });

  return (
    <>
      <ToastContainer />
      <GenericModal isOpen={isOpen} onClose={onClose}>
        <S.ConatinerInsideModal onSubmit={formik.handleSubmit}>
          <S.ModalTitle>
            <span> Requisitos para realizar a doação</span>
          </S.ModalTitle>
          <S.WrapperTerms>
            {REQUIREMENTS_DONATING_BLOOD.map(({ title, requirements }) => (
              <S.ContentTerms>
                <ul>
                  <strong>{title}</strong>
                  {requirements.map((requirement) => (
                    <li>{requirement}</li>
                  ))}
                </ul>
              </S.ContentTerms>
            ))}
          </S.WrapperTerms>
          <S.StyledCheckBox>
            <input
              type="checkbox"
              defaultChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            Eu li e estou ciente sobre os requisitos para realizar a doação de
            sangue.
          </S.StyledCheckBox>
          <S.StyledInputTime>
            <input
              type="datetime-local"
              id="appointmentDate"
              name="appointmentDate"
              min={"2021-05-28T00:00"}
              value={formik.values.appointmentDate}
              onChange={formik.handleChange}
            />
            Selecione a data e a hora desejada
          </S.StyledInputTime>
          <S.WrapperButton>
            <Button
              title="Agendar Horário"
              type="submit"
              disabled={!isChecked}
            />
          </S.WrapperButton>
        </S.ConatinerInsideModal>
      </GenericModal>
    </>
  );
};
