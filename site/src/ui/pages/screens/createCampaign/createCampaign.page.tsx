import { useCallback, useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

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

import "leaflet/dist/leaflet.css";

import { useFormik } from "formik";

import {
  Header,
  InputText,
  InputSelectCombo,
  Stepper,
  Button,
  InputDescription,
} from "../../../components";

import { masks, bloodType, priorityCampaign } from "../../../../constants";

import { useListInstitution } from "../../../../hooks";

import mapMarker from "../../../assets/svgs/map_marker.svg";

import * as S from "./createCampaign.style";

type ComboValue = {
  title: string;
  value: string;
};

type FormCreateCampaign = {
  title: string;
  description: string;
  avaibleDate: string;
  goal: string;
  priority: ComboValue;
  bloodType: ComboValue;
  institution: {};
};

export const CreateCampaign = () => {
  const happyMapIcon = L.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  const { dateMask } = masks();
  const { listInstitution } = useListInstitution();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [institutions, setInstitutions] = useState<[{}]>([{}]);

  const initialValues: FormCreateCampaign = {
    title: "",
    description: "",
    avaibleDate: "",
    goal: "",
    priority: {
      title: "",
      value: "",
    },
    bloodType: {
      title: "",
      value: "",
    },
    institution: {
      title: "",
      value: "",
      address: {
        latitude: "",
        longitude: "",
      },
    },
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
  });

  const getAllInstitutions = useCallback(async () => {
    const { data } = await listInstitution();
    setInstitutions(data);
  }, []);

  useEffect(() => {
    getAllInstitutions();
  }, []);

  const handleChangeValues = (id: string, value: any) => {
    formik.setFieldValue(id, value);
  };

  return (
    <S.Container>
      <Header />
      <S.Content>
        <S.FormBox>
          <S.Box>
            <S.Title>Cadastre sua campanha</S.Title>
            <S.Form onSubmit={formik.handleSubmit}>
              {activeStep === 0 ? (
                <>
                  <InputText
                    id="title"
                    name="title"
                    placeholder="Titulo"
                    icon={<FiEdit2 size={20} />}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  <InputSelectCombo
                    id="priority"
                    name="priority"
                    placeholder="Prioridade"
                    inputIcon={<FiActivity size={20} />}
                    options={priorityCampaign}
                    values={[formik.values.priority]}
                    onChange={(id, newValues) => {
                      handleChangeValues(id, newValues);
                    }}
                  />
                  {/* <InputSelectCombo
                    id="bloodType"
                    name="bloodType"
                    placeholder="Tipo de Sangue"
                    options={bloodType}
                    inputIcon={<FiDroplet size={20} />}
                    onChange={(id, newValues) => {
                      handleChangeValues(id, newValues);
                    }}
                  />
                  <InputSelectCombo
                    id="institution"
                    name="institution"
                    placeholder="Instituição Responsável"
                    options={institutions}
                    inputIcon={<FiHome size={20} />}
                    values={[formik.values.institution]}
                    onChange={(id, newValues) => {
                      handleChangeValues("institution", newValues);
                    }}
                  /> */}
                  <InputText
                    icon={<FiCalendar size={20} />}
                    id="avaibleDate"
                    name="avaibleDate"
                    placeholder="Data de encerramento"
                    maxLength={10}
                    value={dateMask(formik.values.avaibleDate)}
                    onChange={formik.handleChange}
                  />
                  <Button disabled title="Criar" />
                </>
              ) : (
                <>
                  <S.Profile>
                    <label htmlFor="image">
                      <FiPlus size={30} />
                      <input type="file" id="image" name="image" />
                    </label>
                  </S.Profile>

                  <InputText
                    icon={<FiPercent size={20} />}
                    id="goal"
                    name="goal"
                    maxLength={2}
                    placeholder="Meta da campanha (L)"
                    value={formik.values.goal}
                    onChange={formik.handleChange}
                  />
                  <InputDescription
                    icon={<FiFileText size={20} />}
                    id="description"
                    name="description"
                    placeholder="Descrição"
                    maxLength={300}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <Button title="Cadastrar" />
                </>
              )}
              <Stepper
                steps={2}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </S.Form>
          </S.Box>
        </S.FormBox>
        <S.Map>
          <MapContainer
            center={[-29.8002396, -51.1271811]}
            zoom={17}
            style={{ width: "100%", height: "100%" }}
            minZoom={7}
          >
            <Marker
              interactive={false}
              icon={happyMapIcon}
              position={[-29.8002396, -51.1271811]}
            />
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </MapContainer>
        </S.Map>
      </S.Content>
    </S.Container>
  );
};
