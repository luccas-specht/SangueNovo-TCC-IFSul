import {
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import {
  FiDroplet,
  FiActivity,
  BiSearch,
  FiHome,
  BiMap,
} from "react-icons/all";

import { InputText, InputSelectCombo, Button } from "../../../components";

import { bloodType, priorityCampaign, distance } from "../../../../constants";
import { useInstitution } from "../../../../hooks";

import * as S from "./filterCampaigns.style";

type ValuesToFilter = {
  title: string;
  institution: any;
  priorities: (string | number)[];
  bloodTypes: (string | number)[];
};

type Props = {
  setFilter: Dispatch<SetStateAction<any>>;
};

export const FilterCampaings = ({ setFilter }: Props) => {
  const { listInstitution } = useInstitution();
  const [institutions, setInstitutions] = useState([]);

  const [valuesFilter, setValuesFilter] = useState<ValuesToFilter>({
    title: "",
    institution: [],
    bloodTypes: [],
    priorities: [],
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
    getAllInstitutions();
  }, []);

  const handleClear = useCallback(() => {
    setValuesFilter({
      title: "",
      institution: [],
      priorities: [],
      bloodTypes: [],
    });
  }, []);

  const handleChangeValues = (id: string, newValues: any) => {
    if (id === "bloodTypes") {
      setValuesFilter({ ...valuesFilter, bloodTypes: newValues });
    }
    if (id === "priorities") {
      setValuesFilter({ ...valuesFilter, priorities: newValues });
    }
    if (id === "institution") {
      setValuesFilter({ ...valuesFilter, institution: newValues });
    }
    if (id === "title") {
      setValuesFilter({ ...valuesFilter, title: newValues });
    }
  };

  return (
    <S.Container>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="bloodTypes"
          name="bloodTypes"
          placeholder="Tipo de sangue"
          values={[valuesFilter.bloodTypes]}
          options={bloodType}
          inputIcon={<FiDroplet size={20} />}
          onChange={(id, newValues) => {
            handleChangeValues(id, newValues);
          }}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="priorities"
          name="priorities"
          placeholder="Prioridade"
          values={[valuesFilter.priorities]}
          options={priorityCampaign}
          inputIcon={<FiActivity size={20} />}
          onChange={(id, newValues) => {
            handleChangeValues(id, newValues);
          }}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="distance"
          name="distance"
          placeholder="Distância (Km)"
          values={[]}
          options={distance}
          inputIcon={<BiMap size={20} />}
          onChange={() => {}}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          id="institution"
          name="institution"
          placeholder="Instituição"
          values={[valuesFilter.institution]}
          options={institutions}
          inputIcon={<FiHome size={20} />}
          onChange={(id, newValues) => {
            handleChangeValues(id, newValues);
          }}
        />
      </S.InputSelectLimit>
      <S.InputLimit>
        <InputText
          id="title"
          name="title"
          placeholder="Buscar"
          value={valuesFilter.title}
          icon={<BiSearch size={20} />}
          onChange={(e: any) => {
            handleChangeValues("title", e.target.value);
          }}
        />
      </S.InputLimit>
      <S.InputLimit>
        <S.WrapperButton>
          <Button title="Aplicar" type="submit" />
          <S.StyledButton onClick={handleClear}>Limpar filtros</S.StyledButton>
        </S.WrapperButton>
      </S.InputLimit>
    </S.Container>
  );
};
