import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const Header = styled.header`
  justify-content: center;
  display: flex;

  & img {
    width: 20rem;
    max-width: 75vw;
    pointer-events: none;
  }
`;

const Root: React.FC = () => {
  return (
    <>
      <Header>
        <img
          src="/img/comboLogoMascote13.png"
          alt="Treze Anos de Bentotec, viva!"
        />
      </Header>
      <Outlet />
    </>
  );
};

export default Root;
