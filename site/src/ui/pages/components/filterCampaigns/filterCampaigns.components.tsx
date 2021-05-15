import {
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { FiDroplet, FiActivity, BiSearch, FiHome } from "react-icons/all";

import { ComboValue } from "../../../../models";

import { InputText, InputSelectCombo, Button } from "../../../components";

import { bloodType, priorityCampaign } from "../../../../constants";
import { useListInstitution } from "../../../../hooks";

import * as S from "./filterCampaigns.style";

type ValuesToFilter = {
  titleCampaing: string | null;
  typeBlood: any[];
  priorityStatus: any[];
  institution: any[];
};

type Id = "typeBlood" | "priorityStatus" | "distance" | "institution";

type Props = {
  setFilter: Dispatch<SetStateAction<any>>;
};

export const FilterCampaings = ({ setFilter }: Props) => {
  const { listInstitution } = useListInstitution();
  const [titleCampaing, setTitleCampaing] = useState<string>("");

  const [institution, setInstitution] = useState<Array<ComboValue>>([]);
  const [valuesFilter, setValuesFilter] = useState<ValuesToFilter>({
    titleCampaing: "",
    typeBlood: [],
    priorityStatus: [],
    institution: [],
  });

  const getInstitution = async () => {
    const list: any = [];
    const { data } = await listInstitution();
    data?.map((e: any) => {
      const TransformedInstitution = {
        value: e?.id,
        title: e?.razao_social,
      };
      list.push(TransformedInstitution);
    });
    setInstitution(list);
  };

  useEffect(() => {
    getInstitution();
  }, []);

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
    });
  }, []);

  return (
    <S.Container>
      {/* <S.InputSelectLimit>
        <InputSelectCombo
          isMultiple
          id="typeBlood"
          name="typeBlood"
          placeholder="Tipo de sangue"
          values={valuesFilter}
          options={bloodType}
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
          options={priorityCampaign}
          inputIcon={<FiActivity size={20} />}
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
          <Button title="Aplicar" type="submit" />
          <S.StyledButton onClick={handleClear}>Limpar filtros</S.StyledButton>
        </S.WrapperButton>
      </S.InputLimit> */}
    </S.Container>
  );
};
