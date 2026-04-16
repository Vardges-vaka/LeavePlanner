import { Input_text } from "../../../../00_components/_components.index.js";

const InputText = () => {
  return (
    <>
      <Input_text
        label={{ text: "Default (Top Left)", position: "top-left" }}
        placeholder="Default input"
      />

      <Input_text
        label={{ text: "With Icons", position: "top-left" }}
        placeholder="Search..."
        icons={{
          isActive: true,
          leftIcon: { isActive: true, type: "lucid", content: "search" },
        }}
      />

      <Input_text
        label={{
          text: "Testing Missing Icon (Check Console!)",
          position: "top-left",
        }}
        placeholder="Invalid icon name given"
        icons={{
          isActive: true,
          leftIcon: { isActive: true, type: "lucid", content: "user" },
        }}
      />
    </>
  );
};

export default InputText;
