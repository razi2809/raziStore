import { FC, memo, useEffect, useState } from "react";
import { IBusiness } from "../../../@types/business";
import ReactSelect, {
  CSSObjectWithLabel,
  ControlProps,
  OptionProps,
  SingleValue,
  StylesConfig,
  components,
} from "react-select";
import { useTheme } from "@mui/material";
import BusinessSelectTamplate from "./BusinessSelectTamplate";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../../Router/ROUTER";
interface Props {
  data: IBusiness[];
}
type OptionType = { value: IBusiness; label: string };
const CustomOption = (
  props: OptionProps<{ value: IBusiness; label: string }, false>
) => {
  return (
    <components.Option {...props}>
      <BusinessSelectTamplate business={props.data.value} />
    </components.Option>
  );
};
const SelectFilterBusiness: FC<Props> = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [options, setOptions] = useState<OptionType[] | null>(null);
  const selectStyles: StylesConfig<{ value: IBusiness; label: string }, false> =
    {
      control: (
        base: CSSObjectWithLabel,
        props: ControlProps<{ value: IBusiness; label: string }, false>
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
        props: OptionProps<{ value: IBusiness; label: string }, false>
      ) => ({
        ...base,
        backgroundColor: props.isFocused
          ? theme.palette.action.hover
          : base.backgroundColor,
        color: props.isFocused ? theme.palette.text.primary : base.color,
      }),
    };

  useEffect(() => {
    const options = data.map((business) => ({
      value: business,
      label: business.businessName,
    }));
    setOptions(options);
  }, [data]);
  const handleSelectChange = (
    selectedOption: SingleValue<{ value: IBusiness; label: string }>
  ) => {
    if (!selectedOption) return;
    navigate(`${ROUTER.BUSINESS}/${selectedOption.value._id}`);
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
export default memo(SelectFilterBusiness);
