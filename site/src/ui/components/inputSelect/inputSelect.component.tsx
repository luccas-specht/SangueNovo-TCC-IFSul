import { ReactNode, useEffect, useCallback, useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";

import InputAdornment from "@material-ui/core/InputAdornment";

import { makeStyles } from "@material-ui/core/styles";

import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";

import { useTheme } from "../../../hooks";

import * as S from "./inputSelect.style";

type Props = {
  id: string;
  name: string;
  values?: any;
  options: any[];
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
  const { theme } = useTheme();

  const useStyles = makeStyles({
    listbox: {
      backgroundColor: `${theme.title === "light" ? "#f2f2f2" : "#232129"}`,
      padding: "none",
      maxHeight: "20vh",
      borderBottom: "none",
      outline: "none",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: `${theme.title === "light" ? "#666360" : "#f2f2f2"}`,
        borderRadius: "100px",
      },
    },
    option: {
      "&:hover, &:focus": {
        backgroundColor: `${
          theme.title === "light" ? "rgba(0, 0, 0, 0.04)" : "#f2f2f2"
        }`,
      },
    },
  });

  const classes = useStyles();
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
        id={id}
        options={options}
        multiple={isMultiple}
        getOptionLabel={(option: any) => option.title}
        renderOption={(option: any, { selected }) => (
          <>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
              style={{ color: "#898B8E" }}
            />
            <S.Text>{option?.title}</S.Text>
          </>
        )}
        renderInput={(params: any) => (
          <S.StyledTextField
            {...params}
            fullWidth
            variant="outlined"
            name={name}
            placeholder={placeholder}
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
        )}
        noOptionsText="Sem opções disponíveis."
        disablePortal={false}
        classes={{ listbox: classes.listbox, option: classes.option }}
        renderTags={() => null}
        onChange={(e: any, newValues: any) => handleChange(e, newValues)}
      />
    </>
  );
};
