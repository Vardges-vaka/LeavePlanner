import { Input_number } from "../../../../00_components/_components.index.js";

/*


InputUrl
InputTel


InputDate
InputSearch
InputRange
InputFile
InputCheckbox

*/
const InputNumber = () => {
  return (
    <>
      <Input_number label={{ text: "Age" }} placeholder="e.g. 25" />

      <Input_number
        label={{ text: "Price (with custom right icon)" }}
        placeholder="100"
        defaultValue="100"
        icons={{
          isActive: true,
          rightIcon: {
            isActive: true,
            type: "lucid",
            content: "DollarSign",
          },
        }}
      />

      <Input_number label={{ text: "Temperature" }} placeholder="0" size="l" />
    </>
  );
};

export default InputNumber;
