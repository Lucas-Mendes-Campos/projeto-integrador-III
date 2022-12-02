import styled from "@emotion/styled";
import { useRef } from "react";
import Reaptcha from "reaptcha";
import { Project } from "../api";
import Button from "./Button";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: #00000077;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
  border-radius: 30px;
  width: 50rem;
  max-width: 80vw;
  min-height: 30vh;
`;

const Title = styled.h1`
  margin-top: none;
`;

const StyledButton = styled(Button)`
  font-size: 1.5rem;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  ${StyledButton} {
    flex-grow: 0;
  }

  ${StyledButton} + ${StyledButton} {
    margin-left: 1rem;
  }
`;

interface VoteModalProps {
  project: Project;
  onClose?: () => void;
  onSuccess?: (response: string) => void;
}

const VoteModal: React.FC<VoteModalProps> = ({ project, ...props }) => {
  const recaptchaRef = useRef<Reaptcha>(null);

  const voteClick = () => {
    recaptchaRef.current?.execute();
  };

  return (
    <ModalContainer>
      <Reaptcha
        ref={recaptchaRef}
        sitekey={import.meta.env.VITE_APP_RECAPTCHA_SITEKEY}
        size="invisible"
        badge="bottomright"
        onVerify={props.onSuccess}
      />
      <ModalContent>
        <Title>Deseja votar no projeto "{project.name}"?</Title>
        <Buttons>
          <StyledButton onClick={props.onClose}>Cancelar</StyledButton>
          <StyledButton onClick={voteClick}>Votar</StyledButton>
        </Buttons>
      </ModalContent>
    </ModalContainer>
  );
};

export default VoteModal;
