import styled from "styled-components";
import { constants } from "../../styling/constants";

const BaseInputWrapper = styled.input`
  border: solid 1px ${constants.colors.BLACK};
  border-radius: 6px;
  color: ${constants.colors.BLACK};
  background: ${constants.colors.WHITE};
  font-size: 16px;
  padding: 4px 6px;
  outline: none;

  &:focus {
    border-color: ${constants.colors.BLUE};
  }
`;

export default function BaseInput({
  type = "text",
  value,
  setValue,
  placeholder,
}) {
  return (
    <BaseInputWrapper
      value={value}
      checked={value}
      onChange={(event) =>
        setValue(
          type === "checkbox" ? event.target.checked : event.target.value
        )
      }
      type={type}
      placeholder={placeholder}
    />
  );
}
