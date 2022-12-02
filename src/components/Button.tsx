import styled from "@emotion/styled";

const Button = styled.button`
  background: #ffd650;
  border: none;
  padding: 0.2rem 1rem;
  border-radius: 10px;
  font-size: 1.3rem;

  &:hover {
    cursor: pointer;
  }

  &:hover,
  &:focus {
    color: initial;
  }
`;

export default Button;
