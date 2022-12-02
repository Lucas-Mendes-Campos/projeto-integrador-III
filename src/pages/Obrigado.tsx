import styled from "@emotion/styled";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Project } from "../api";
import Button from "../components/Button";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  border-radius: 40px;
  max-width: 30rem;
  text-align: center;
`;

const Obrigado: React.FC = () => {
  const { state } = useLocation() as {
    state?: {
      project?: Project;
    };
  };

  if (!state?.project) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h1>Obrigado pelo voto!</h1>
      <h3>Obrigado por votar no projeto "{state.project.name}".</h3>
      <Link to="/">
        <Button>Voltar</Button>
      </Link>
    </Container>
  );
};

export default Obrigado;
