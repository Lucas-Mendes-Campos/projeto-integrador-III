import { ClassNames } from "@emotion/react";
import styled from "@emotion/styled";
import Dropdown, { ReactDropdownProps } from "react-dropdown";
import "react-dropdown/style.css";

const options = [
  { value: "0", label: "Selecione uma categoria" },
  { value: "1", label: "Social e Saúde" },
  { value: "2", label: "Indústria" },
  { value: "3", label: "Tecnologia da Informação" },
  { value: "4", label: "Ciências e Arte" },
];

const StyledDropdown = styled(Dropdown)`
  width: 16rem;
`;

const ControlStyle = `
  border-radius: 50px;
`;

const OptionsStyle = `
  margin-top: 0.1rem;
  border-radius: 15px;
`;

interface FilterProps {
  onChange?: ReactDropdownProps["onChange"];
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  return (
    <ClassNames>
      {({ css }) => (
        <StyledDropdown
          controlClassName={css(ControlStyle)}
          menuClassName={css(OptionsStyle)}
          options={options}
          onChange={onChange}
          value={options[0]}
        />
      )}
    </ClassNames>
  );
};

export default Filter;
