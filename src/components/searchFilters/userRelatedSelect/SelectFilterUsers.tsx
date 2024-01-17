import { FC, memo, useEffect, useState } from "react";
import ReactSelect, {
  CSSObjectWithLabel,
  ControlProps,
  OptionProps,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../../Router/ROUTER";
import { Iuser } from "../../../@types/user";
import UserSelectTamplate from "./UsersSelectTamplate";
interface Props {
  data: Iuser[];
}
type OptionType = { value: Iuser; label: string };
const CustomOption = (
  props: OptionProps<{ value: Iuser; label: string }, false>
) => {
  return (
    <components.Option {...props}>
      <UserSelectTamplate user={props.data.value} />
    </components.Option>
  );
};
const SelectFilterUsers: FC<Props> = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [options, setOptions] = useState<OptionType[] | null>(null);
  const selectStyles: StylesConfig<{ value: Iuser; label: string }, false> = {
    control: (
      base: CSSObjectWithLabel,
      props: ControlProps<{ value: Iuser; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderColor: theme.palette.divider,
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: theme.palette.background.paper,
    }),
    option: (
      base: CSSObjectWithLabel,
      props: OptionProps<{ value: Iuser; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: props.isFocused
        ? theme.palette.action.hover
        : base.backgroundColor,
      color: props.isFocused ? theme.palette.text.primary : base.color,
    }),
  };

  useEffect(() => {
    const options = data.map((user) => ({
      value: user,
      label: user.name.firstName,
    }));
    setOptions(options);
  }, [data]);
  const handleSelectChange = (
    selectedOption: SingleValue<{ value: Iuser; label: string }>
  ) => {
    if (!selectedOption) return;
    navigate(`${ROUTER.PROFILE}/${selectedOption.value._id}`);
  };
  if (options) {
    return (
      <ReactSelect
        styles={selectStyles}
        components={{ Option: CustomOption }}
        options={options}
        onChange={handleSelectChange}
      />
    );
  } else return null;
};
export default memo(SelectFilterUsers);
