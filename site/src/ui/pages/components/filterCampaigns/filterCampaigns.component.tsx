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

import {
  BLOOD_TYPE_TO_FILTER,
  DISTANCE,
  PRIORITY_CAMPAIGN,
} from "../../../../constants";
import { useInstitution } from "../../../../hooks";

import * as S from "./filterCampaigns.style";

type ValuesToFilter = {
  title: string;
  institution: any;
  priority: string;
  bloodType: string;
};

type Props = {
  setFilter: Dispatch<SetStateAction<any>>;
};

export const FilterCampaings = ({ setFilter }: Props) => {
  const { listInstitution } = useInstitution();

  const [query, setQuery] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [valuesFilter, setValuesFilter] = useState<ValuesToFilter>({
    title: "",
    institution: "",
    bloodType: "",
    priority: "",
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
      institution: "",
      bloodType: "",
      priority: "",
    });
    setFilter(undefined);
  }, []);

  const handleChangeValues = (id: string, newValues: any) => {
    if (id === "bloodTypes") {
      setValuesFilter({ ...valuesFilter, bloodType: newValues?.value });
    }
    if (id === "priorities") {
      setValuesFilter({ ...valuesFilter, priority: newValues?.value });
    }
    if (id === "institution") {
      setValuesFilter({ ...valuesFilter, institution: newValues?.value });
    }
    if (id === "title") {
      setValuesFilter({ ...valuesFilter, title: newValues });
    }
  };

  const buildQuery = useCallback(() => {
    let query = "";
    if (!!valuesFilter.title) {
      query = query + `&title=${valuesFilter.title}`;
    }
    if (!!valuesFilter.institution) {
      query = query + `&institutionId=${valuesFilter.institution}`;
    }
    if (!!valuesFilter.bloodType) {
      query = query + `&bloodType=${valuesFilter.bloodType}`;
    }
    if (!!valuesFilter.priority) {
      query = query + `&priority=${valuesFilter.priority}`;
    }
    setQuery(query);
  }, [valuesFilter]);

  useEffect(() => {
    buildQuery();
  }, [valuesFilter]);

  const handleApplyFilters = () => setFilter(query);

  return (
    <S.Container>
      <S.InputSelectLimit>
        <InputSelectCombo
          id="bloodTypes"
          name="bloodTypes"
          placeholder="Tipo de sangue"
          values={[valuesFilter.bloodType]}
          options={BLOOD_TYPE_TO_FILTER}
          inputIcon={<FiDroplet size={20} color="#BF0404" />}
          onChange={(id, newValues) => {
            handleChangeValues(id, newValues);
          }}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          id="priorities"
          name="priorities"
          placeholder="Urgência"
          values={[valuesFilter.priority]}
          options={PRIORITY_CAMPAIGN}
          inputIcon={<FiActivity size={20} color="#42aeff" />}
          onChange={(id, newValues) => {
            handleChangeValues(id, newValues);
          }}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          id="distance"
          name="distance"
          placeholder="Distância (Km)"
          values={[]}
          options={DISTANCE}
          inputIcon={<BiMap size={20} color="#F9AF42" />}
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
          inputIcon={<FiHome size={20} color="#3F51B5" />}
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
          <Button title="Aplicar" type="submit" onClick={handleApplyFilters} />
          <S.StyledButton onClick={handleClear} type="reset">
            Limpar filtros
          </S.StyledButton>
        </S.WrapperButton>
      </S.InputLimit>
    </S.Container>
  );
};
