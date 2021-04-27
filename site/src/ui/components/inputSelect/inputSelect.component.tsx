import { ReactNode, useEffect, useCallback, useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";

import InputAdornment from "@material-ui/core/InputAdornment";

import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";

import { ComboValue } from "../../../models";

import * as S from "./inputSelect.style";

type Props = {
  id: string;
  name: string;
  values?: any;
  options: ComboValue[];
  inputIcon: ReactNode;
  placeholder: string;
  onChange(id: any, value: any): void;
  isMultiple?: boolean;
};

export const InputSelectCombo = ({
  id,
  placeholder,
  onChange,
  inputIcon,
  options,
  values,
  name,
  isMultiple = false,
}: Props) => {
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [lengthValues, setLengthValues] = useState<number>(0);

  const handleChange = useCallback(
    (e: any, newValues: any) => {
      setLengthValues(newValues.length);
      onChange(id, newValues);
    },
    [id, onChange]
  );

  useEffect(() => {
    if (!values) {
      setLengthValues(0);
      onChange(id, []);
    }
  }, [values, id, onChange]);

  return (
    <>
      <S.StyledAutocomplete
        fullWidth
        defaultChecked
        disableCloseOnSelect
        noOptionsText="Sem opções Disponíveis."
        id={id}
        options={options}
        multiple={isMultiple}
        getOptionLabel={(option: any) => option.title}
        renderOption={(option: any, { selected }) => (
          <>
            <Checkbox
              checked={selected}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ color: "#898B8E" }}
            />
            {option?.title}
          </>
        )}
        renderInput={(params: any) => (
          <>
            <S.StyledTextField
              {...params}
              name={name}
              placeholder={placeholder}
              variant="outlined"
              fullWidth
              style={{ fontSize: 5 }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">{inputIcon}</InputAdornment>
                ),
                endAdornment: isMultiple ? (
                  <S.ScoreInline>{lengthValues}</S.ScoreInline>
                ) : null,
              }}
            />
          </>
        )}
        renderTags={() => null}
        onChange={(e: any, newValues: any) => handleChange(e, newValues)}
      />
    </>
  );
};
