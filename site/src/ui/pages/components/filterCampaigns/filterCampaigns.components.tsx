import { useCallback, useState, Dispatch, SetStateAction } from "react";

import {
  FiDroplet,
  FiActivity,
  BiSearch,
  FiHome,
  FiMapPin,
} from "react-icons/all";

import { ComboValue } from "../../../../models";

import { InputText, InputSelectCombo, Button } from "../../../components";

import {
  distanceInitial,
  priorityStatusInitial,
  typeBloodInitial,
} from "./mockFilters";

import * as S from "./filterCampaigns.style";

type ValuesToFilter = {
  titleCampaing: string | null;
  typeBlood: any[];
  priorityStatus: any[];
  institution: any[];
  distance: any[];
};

type Id = "typeBlood" | "priorityStatus" | "distance" | "institution";

type Props = {
  setFilter: Dispatch<SetStateAction<any>>;
};

export const FilterCampaings = ({ setFilter }: Props) => {
  const [titleCampaing, setTitleCampaing] = useState<string>("");
  const [typeBlood, setTypeBlood] = useState<Array<ComboValue>>(
    typeBloodInitial
  );
  const [priorityStatus, setPriorityStatus] = useState<Array<ComboValue>>(
    priorityStatusInitial
  );
  const [distance, setDistance] = useState<Array<ComboValue>>(distanceInitial);

  const [institution, setInstitution] = useState<Array<ComboValue>>([]);
  const [valuesFilter, setValuesFilter] = useState<ValuesToFilter>({
    titleCampaing: "",
    typeBlood: [],
    priorityStatus: [],
    institution: [],
    distance: [],
  });

  const handleChangeTitleCampaing = useCallback(
    (event) => {
      setTitleCampaing(event.target.value);
      setValuesFilter({ ...valuesFilter, titleCampaing: event.target.value });
    },
    [valuesFilter]
  );

  const handleChangeFilterValues = (id: Id, values: ComboValue[]) => {
    if (id === "typeBlood")
      setValuesFilter({ ...valuesFilter, typeBlood: values });
    if (id === "distance")
      setValuesFilter({ ...valuesFilter, distance: values });
    if (id === "priorityStatus")
      setValuesFilter({ ...valuesFilter, priorityStatus: values });
    if (id === "institution")
      setValuesFilter({ ...valuesFilter, institution: values });
  };

  const handleClear = useCallback(() => {
    setTitleCampaing("");
    setValuesFilter({
      titleCampaing: "",
      typeBlood: [],
      priorityStatus: [],
      institution: [],
      distance: [],
    });
  }, []);

  return (
    <S.Container>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="typeBlood"
          name="typeBlood"
          placeholder="Tipo de sangue"
          values={valuesFilter}
          options={typeBlood}
          inputIcon={<FiDroplet size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="priorityStatus"
          name="priorityStatus"
          placeholder="Prioridade"
          values={valuesFilter}
          options={priorityStatus}
          inputIcon={<FiActivity size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="distance"
          name="distance"
          placeholder="Distância"
          values={valuesFilter}
          options={distance}
          inputIcon={<FiMapPin size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputSelectLimit>
      <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="institution"
          name="institution"
          placeholder="Instituição"
          values={valuesFilter}
          options={institution}
          inputIcon={<FiHome size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputSelectLimit>
      <S.InputLimit>
        <InputText
          id="title"
          name="title"
          placeholder="Buscar"
          value={titleCampaing}
          icon={<BiSearch size={20} />}
          onChange={handleChangeTitleCampaing}
        />
      </S.InputLimit>
      <S.InputLimit>
        <S.WrapperButton>
          <div>
            <Button title="Aplicar" type="submit" />
            <S.StyledButton onClick={handleClear}>
              Limpar filtros
            </S.StyledButton>
          </div>
        </S.WrapperButton>
      </S.InputLimit>
    </S.Container>
  );
};
