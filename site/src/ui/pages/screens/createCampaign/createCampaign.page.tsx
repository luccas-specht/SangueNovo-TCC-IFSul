import React, { useEffect, useState } from "react";
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
} from "../../components/filterCampaigns/mockFilters";

import { ComboValue } from "../../../../models/list/comboValue";

type CreateCampaingn = {
  title: string;
  dateDuration: any;
  blood: string;
  priority: string;
  institution: any[];
  description: string;
};

export const CreateCampaign = () => {
  const { push } = useHistory();
  const { listInstitution } = useListInstitution();
  const [activeStep, setActiveStep] = useState<number>(0);

  const [typeBlood, setTypeBlood] = useState<Array<ComboValue>>(
    typeBloodInitial
  );
  const [priorityStatus, setPriorityStatus] = useState<Array<ComboValue>>(
    priorityStatusInitial
  );

  const initialValues: CreateCampaingn = {
    title: "",
    dateDuration: "",
    blood: "",
    priority: "",
    institution: [],
    description: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: CreateCampaingn) => {},
  });

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
                    error={formik.touched.title && formik.errors.title}
                    onChange={formik.handleChange}
                  />
                  <InputSelectCombo
                    options={typeBlood}
                    inputIcon={<FiDroplet size={20} />}
                    id="blood"
                    name="blood"
                    placeholder="Tipo de Sangue"
                    values={formik.values.blood}
                    isMultiple={false}
                    onChange={formik.handleChange}
                  />
                  <InputDatePicker
                    icon={<FiCalendar size={20} />}
                    id="dateDuration"
                    name="dateDuration"
                    placeholder="Data de duração"
                    value={formik.values.dateDuration}
                    error={
                      formik.touched.dateDuration && formik.errors.dateDuration
                    }
                    onChange={formik.handleChange}
                  />
                  <InputSelectCombo
                    options={priorityStatus}
                    inputIcon={<FiActivity size={20} />}
                    id="priority"
                    name="priority"
                    placeholder="Prioridade da campanha"
                    values={formik.values.priority}
                    isMultiple={false}
                    onChange={formik.handleChange}
                  />
                  <Button disabled title="Criar" />
                </>
              ) : (
                <>
                  <SC.Profile>
                    <label htmlFor="image">
                      <FiPlus size={30} />
                      <input type="file" id="image" name="image" />
                    </label>
                  </SC.Profile>
                  <InputSelectCombo
                    options={formik.values.institution ?? []}
                    inputIcon={<FiHome size={20} />}
                    id="institution"
                    name="institution"
                    placeholder="Instituição da campanha"
                    values={[]}
                    isMultiple={false}
                    onChange={formik.handleChange}
                  />

                  <InputDescription
                    icon={<FiFileText size={20} />}
                    id="description"
                    name="description"
                    placeholder="Descrição"
                    maxLength={250}
                    value={formik.values.description}
                    error={
                      formik.touched.description && formik.errors.description
                    }
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
