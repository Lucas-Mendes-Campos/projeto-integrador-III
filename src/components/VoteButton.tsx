import { AxiosError } from "axios";
import { ButtonHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project, vote } from "../api";
import Button from "./Button";
import VoteModal from "./VoteModal";

interface VoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  project: Project;
}

const VoteButton: React.FC<VoteButtonProps> = ({ project, ...props }) => {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();

  if (Number(import.meta.env.VITE_APP_VOTING_END)) {
    return <></>;
  }

  const onModalClose = () => {
    setModalActive(false);
  };

  const onModalSuccess = (code: string) => {
    setModalActive(false);

    vote(project._id, code)
      .then(() => {
        navigate("/obrigado", {
          state: { project },
        });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          let message;

          switch (error.response?.status) {
            case 400:
              message = "Dados inválidos.";
              break;
            case 404:
              message = "Projeto não encontrado.";
              break;
            case 422:
              message = "Validação de voto falhou.";
              break;
            default:
              message = "Erro inesperado.";
              break;
          }
          alert("Erro ao enviar voto: " + message);
        }
      });
  };

  const onButtonClick = () => {
    setModalActive(true);
  };

  return (
    <>
      {modalActive && (
        <VoteModal
          project={project}
          onClose={onModalClose}
          onSuccess={onModalSuccess}
        />
      )}
      <Button {...props} onClick={onButtonClick}>
        Votar
      </Button>
    </>
  );
};

export default VoteButton;
