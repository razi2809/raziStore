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
import { IProduct } from "../../../@types/product";
import ProductSelectTamplate from "./ProductSelectTamplate";
import { ISelected } from "../../../pages/businessRelatedPages/BusinessPage";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../../../Router/ROUTER";
interface Props {
  data: IProduct[];
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<ISelected | null>
  > | null;
}
type OptionType = { value: IProduct; label: string };
const CustomOption = (
  props: OptionProps<{ value: IProduct; label: string }, false>
) => {
  return (
    <components.Option {...props}>
      <ProductSelectTamplate product={props.data.value} />
    </components.Option>
  );
};
const SelectFilterProducts: FC<Props> = ({ data, setSelectedProduct }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [options, setOptions] = useState<OptionType[] | null>(null);
  const selectStyles: StylesConfig<{ value: IProduct; label: string }, false> =
    {
      control: (
        base: CSSObjectWithLabel,
        props: ControlProps<{ value: IProduct; label: string }, false>
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
        props: OptionProps<{ value: IProduct; label: string }, false>
      ) => ({
        ...base,
        backgroundColor: props.isFocused
          ? theme.palette.action.hover
          : base.backgroundColor,
        color: props.isFocused ? theme.palette.text.primary : base.color,
      }),
    };

  useEffect(() => {
    const options = data.map((product) => ({
      value: product,
      label: product.productName,
    }));
    setOptions(options);
  }, [data]);
  const handleSelectChange = (
    selectedOption: SingleValue<{ value: IProduct; label: string }>
  ) => {
    if (!selectedOption) return;
    if (!setSelectedProduct) {
      navigate(`${ROUTER.PRODUCT}/${selectedOption.value._id}`);
      return;
    }
    setSelectedProduct({
      category: selectedOption.value.categories[0],
      productId: selectedOption.value._id,
    });
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
export default memo(SelectFilterProducts);
