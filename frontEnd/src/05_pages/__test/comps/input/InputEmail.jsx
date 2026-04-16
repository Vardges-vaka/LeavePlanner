import { Input_email } from "../../../../00_components/_components.index.js";

const InputEmail = () => {
  return (
    <>
      <Input_email
        label={{ text: "Email Address" }}
        placeholder="john@example.com"
      />

      <Input_email
        label={{ text: "Work Email" }}
        placeholder="jane@company.com"
        validation="success"
      />
    </>
  );
};

export default InputEmail;
