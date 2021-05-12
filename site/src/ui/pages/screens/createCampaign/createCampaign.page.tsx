import React, { useEffect, useState, useCallback } from "react";
import * as SC from "./createCampaign.style";
import { Header } from "../../../components";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useHistory } from "react-router-dom";
import { validationMessage, masks, paths } from "../../../../constants";
import * as Yup from "yup";
import { useListInstitution } from "../../../../hooks";
import {
  FiEdit2,
  FiDroplet,
  FiCalendar,
  FiActivity,
  FiHome,
  FiFileText,
  FiPlus,
  FiPercent,
} from "react-icons/all";

import { useFormik } from "formik";

import {
  InputText,
  InputDatePicker,
  InputSelectCombo,
  Stepper,
  Button,
  InputDescription,
} from "../../../components";

import {
  priorityStatusInitial,
  typeBloodInitial,
  goalInitial,
} from "../../components/filterCampaigns/mockFilters";

import { ComboValue } from "../../../../models/list/comboValue";
import { isObjectLiteralExpression } from "typescript";

type SelectInputs = {
  blood: any[];
  priority: any[];
};

interface NormalInputs {
  title: string;
  dateDuration: string;
  institution: any[];
  description: string;
  goal: string;
}

type Id = "blood" | "goal" | "priority";

export const CreateCampaign = () => {
  const { dateMask } = masks();
  const { push } = useHistory();
  const { listInstitution } = useListInstitution();

  const [activeStep, setActiveStep] = useState<number>(0);

  const [typeBlood, setTypeBlood] = useState<Array<ComboValue>>(
    typeBloodInitial
  );
  const [priorityStatus, setPriorityStatus] = useState<Array<ComboValue>>(
    priorityStatusInitial
  );
  const [goal, setGoalInitial] = useState<Array<ComboValue>>(goalInitial);

  const [valuesInput, setValuesInput] = useState<SelectInputs>({
    blood: [],
    priority: [],
  });

  const handleChangeFilterValues = (id: Id, values: ComboValue[]) => {
    if (id === "blood") setValuesInput({ ...valuesInput, blood: values });
    if (id === "priority") setValuesInput({ ...valuesInput, priority: values });
  };

  const initialValues = {
    title: "",
    dateDuration: "",
    institution: [],
    goal: "",
    description: "",
  } as NormalInputs;

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: NormalInputs) => {},
  });

  useEffect(() => {
    console.log("data:", formik.values.dateDuration);
  }, [formik.values.dateDuration]);

  const initialValue = useCallback(() => {
    setValuesInput({
      blood: [],
      priority: [],
    });
  }, []);

  // const onDateChange = (e, setFieldValue) => {
  //   const domain = e.target.value.replace(/.*@/, "");
  //   setFieldValue("mail.domain", domain, false);
  // };

  const getInstitution = async () => {
    const teste: any = [];
    const { data } = await listInstitution();
    data?.map((e: any) => {
      const teste1 = {
        value: e?.id,
        title: e?.razao_social,
      };
      teste.push(teste1);
    });
    formik.setFieldValue("institution", teste);
  };

  useEffect(() => {
    getInstitution();
  }, []);

  return (
    <SC.Container>
      <Header />
      <SC.Content>
        <SC.FormBox>
          <SC.Box>
            <SC.Title>Crie sua campanha</SC.Title>
            <SC.Form onSubmit={formik.handleSubmit}>
              {activeStep === 0 ? (
                <>
                  <InputText
                    icon={<FiEdit2 size={20} />}
                    id="title"
                    name="title"
                    placeholder="Titulo"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <InputSelectCombo
                    options={typeBlood}
                    inputIcon={<FiDroplet size={20} />}
                    id="blood"
                    name="blood"
                    placeholder="Tipo de Sangue"
                    values={valuesInput}
                    isMultiple={false}
                    onChange={handleChangeFilterValues}
                  />
                  <InputText
                    icon={<FiCalendar size={20} />}
                    id="dateDuration"
                    name="dateDuration"
                    maxLength={10}
                    placeholder="Data de encerramento da campanha"
                    value={dateMask(formik.values.dateDuration)}
                    onChange={formik.handleChange}
                  />
                  <InputSelectCombo
                    options={priorityStatus}
                    inputIcon={<FiActivity size={20} />}
                    id="priority"
                    name="priority"
                    placeholder="Prioridade da campanha"
                    values={valuesInput}
                    isMultiple={false}
                    onChange={handleChangeFilterValues}
                  />
                  <InputText
                    icon={<FiPercent size={20} />}
                    id="goal"
                    name="goal"
                    maxLength={2}
                    placeholder="Meta em litros da campanha"
                    value={formik.values.goal}
                    onChange={formik.handleChange}
                  />
                  <Button disabled title="Criar" />
                </>
              ) : (
                <>
                  <InputSelectCombo
                    options={/*formik.values.institution ??*/ []}
                    inputIcon={<FiHome size={20} />}
                    id="institution"
                    name="institution"
                    placeholder="Instituição da campanha"
                    values={[]}
                    isMultiple={false}
                    onChange={formik.handleChange}
                  />
                  <SC.Profile>
                    <label htmlFor="image">
                      <FiPlus size={30} />
                      <input type="file" id="image" name="image" />
                    </label>
                  </SC.Profile>
                  <InputDescription
                    icon={<FiFileText size={20} />}
                    id="description"
                    name="description"
                    placeholder="Descrição"
                    maxLength={250}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />

                  <Button title="Criar" />
                </>
              )}
              <Stepper
                steps={2}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </SC.Form>
          </SC.Box>
        </SC.FormBox>
        <SC.Map>
          <MapContainer
            center={[-29.8002396, -51.1271811]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </MapContainer>
        </SC.Map>
      </SC.Content>
    </SC.Container>
  );
};
