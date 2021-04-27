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
  const [valuesFilter, setValuesFilter] = useState<any>({});
  const [structuresIds, setStructuresIds] = useState<number[]>([] as number[]);

  const handleChangeTitleCampaing = useCallback((event: any) => {
    setTitleCampaing(event.target.value);
  }, []);

  const handleChangeFilterValues = (id: any, values: ComboValue[]) => {
    if (id === "structure") {
      const test = values?.map((value) => value.value) as number[];
      setStructuresIds(test);
    }

    if (values.length) {
      const ids = values.map((value: ComboValue) => value.value);
      setValuesFilter({ ...valuesFilter, [id]: ids });
    }
  };

  const handleClear = useCallback(() => {
    setTitleCampaing("");
    setTypeBlood([]);
    setPriorityStatus([]);
    setInstitution([]);
    setDistance([]);
  }, []);

  return (
    <S.Container>
      <S.InputLimit>
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
      </S.InputLimit>
      <S.InputLimit>
        <InputSelectCombo
          isMultiple
          id="typeBlood"
          name="typeBlood"
          placeholder="Prioridade"
          values={valuesFilter}
          options={priorityStatus}
          inputIcon={<FiActivity size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputLimit>
      <S.InputLimit>
        <InputSelectCombo
          isMultiple
          id="typeBlood"
          name="typeBlood"
          placeholder="Distância"
          values={valuesFilter}
          options={distance}
          inputIcon={<FiMapPin size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputLimit>
      <S.InputLimit>
        <InputSelectCombo
          isMultiple
          id="typeBlood"
          name="typeBlood"
          placeholder="Instituição"
          values={valuesFilter}
          options={institution}
          inputIcon={<FiHome size={20} />}
          onChange={(id, values) => handleChangeFilterValues(id, values)}
        />
      </S.InputLimit>
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
          <Button title="Aplicar" type="submit" />
          <S.StyledButton onClick={handleClear}>Limpar filtros</S.StyledButton>
        </S.WrapperButton>
      </S.InputLimit>
    </S.Container>
  );
};
