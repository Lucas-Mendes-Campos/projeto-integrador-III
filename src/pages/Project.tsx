import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import Button from "../components/Button";
import styled from "@emotion/styled";
import { useProjects } from "../hooks";
import VoteButton from "../components/VoteButton";

const BackButton = styled(Button.withComponent(Link))`
  padding: 1rem;

  &:focus,
  &:visited {
    color: unset;
  }
`;

const Image = styled.img`
  height: 25vw;
  aspect-ratio: 17 / 11;
  pointer-events: none;
`;

const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 950px) {
    flex-direction: column;

    ${Image} {
      height: unset;
      width: 100%;
      max-width: 40rem;
    }
  }
`;

const Title = styled.h1`
  @media screen and (max-width: 450px) {
    font-size: 6vw;
  }
`;

const Subtitle = styled.h3`
  margin-bottom: 0;
`;

const Paragraph = styled.p`
  margin-top: 0.2rem;
  white-space: pre-line;
  text-align: justify;
`;

const StyledVoteButton = styled(VoteButton)`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  flex: 0;
  height: fit-content;
  align-self: center;
`;

const SideContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Project: React.FC = () => {
  const { id } = useParams();
  const projects = useProjects();

  const data = useMemo(
    () => projects?.find((x) => x._id === Number(id)),
    [id, projects]
  );

  if (projects == null) {
    return <h1>Carregando...</h1>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <>
      <BackButton to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </BackButton>
      <Container>
        <Image src={`/img/projects/${data._id}.png`} />
        <div>
          <Title>
            #{data._id}: {data.name}
          </Title>
          <SideContainer>
            <div>
              <Subtitle>Participantes:</Subtitle>
              <Paragraph>{data.members?.join("\n")}</Paragraph>
            </div>
            <StyledVoteButton project={data}>Votar</StyledVoteButton>
          </SideContainer>
          <Subtitle>Resumo:</Subtitle>
          <Paragraph>{data.summary}</Paragraph>
        </div>
      </Container>
    </>
  );
};

export default Project;
