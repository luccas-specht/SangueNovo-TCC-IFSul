import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { ToastContainer, toast } from "react-toastify";
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

import { toastConfig } from "../../../../configs";
import { masks, bloodType, priorityCampaign } from "../../../../constants";

import {
  useInstitution,
  useCampaign,
  useAuthenticated,
} from "../../../../hooks";

import mapMarker from "../../../assets/svgs/map_marker.svg";

import * as S from "./createCampaign.style";

type ComboValue = {
  title: string;
  value: string;
};

type FormCreateCampaign = {
  title: string;
  description: string;
  availableDate: string;
  goal: string;
  priority: ComboValue;
  bloodType: ComboValue;
  institution: {
    title: string;
    value: string;
    address: {
      latitude: number;
      longitude: number;
    };
  };
};

export const CreateCampaign = () => {
  const happyMapIcon = L.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  const { dateMask } = masks();
  const { push } = useHistory();
  const { listInstitution } = useInstitution();
  const { registerCampaign } = useCampaign();
  const { user } = useAuthenticated();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [institutions, setInstitutions] = useState<[{}]>([{}]);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lgn: number;
  }>({
    lat: -29.8002396,
    lgn: -51.1271811,
  });

  const initialValues: FormCreateCampaign = {
    title: "",
    description: "",
    availableDate: "",
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
        latitude: -29.8002396,
        longitude: -51.1271811,
      },
    },
  };

  const onCreateCampaign = async ({
    title,
    goal,
    institution,
    priority,
    bloodType,
    availableDate,
    description,
  }: FormCreateCampaign): Promise<void> => {
    const { data, status } = await registerCampaign(
      title,
      description,
      availableDate,
      priority.value,
      bloodType.value,
      goal,
      user.user.userId,
      institution.value
    );

    if (status === 200) {
      push("minhas-campanhas");
    } else {
      toast.error(`${data?.message}`, toastConfig);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: FormCreateCampaign) => {
      onCreateCampaign(values);
    },
  });

  const getAllInstitutions = useCallback(async () => {
    const { data } = await listInstitution();
    const mapperInstitutions = data.map((institution: any) => ({
      value: institution.id,
      title: institution.title,
      address: {
        latitude: institution.address.latitude,
        longitude: institution.address.longitude,
      },
    }));
    setInstitutions(mapperInstitutions);
  }, []);

  useEffect(() => {
    const { address } = formik.values.institution;
    setCoordinates({ lat: address.latitude, lgn: address.longitude });
  }, [formik.values.institution]);

  useEffect(() => {
    getAllInstitutions();
  }, []);

  const handleChangeValues = (id: string, value: any) => {
    formik.setFieldValue(id, value);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <S.Container>
        <S.Content>
          <S.FormBox>
            <S.Box>
              <S.Title>Crie sua campanha de doação</S.Title>
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
                    <InputSelectCombo
                      id="bloodType"
                      name="bloodType"
                      placeholder="Tipo de Sangue"
                      options={bloodType}
                      inputIcon={<FiDroplet size={20} />}
                      values={[formik.values.bloodType]}
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
                        handleChangeValues(id, newValues);
                      }}
                    />
                    <InputText
                      icon={<FiCalendar size={20} />}
                      id="availableDate"
                      name="availableDate"
                      placeholder="Data de encerramento"
                      maxLength={10}
                      value={dateMask(formik.values.availableDate)}
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
                    <Button title="Criar" />
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
              center={[coordinates.lat, coordinates.lgn]}
              zoom={17}
              style={{ width: "100%", height: "100%" }}
              minZoom={7}
            >
              <Marker
                title={formik.values.institution.title}
                icon={happyMapIcon}
                position={[coordinates.lat, coordinates.lgn]}
              />
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
            </MapContainer>
          </S.Map>
        </S.Content>
      </S.Container>
    </>
  );
};
