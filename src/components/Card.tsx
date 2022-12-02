import Button from "./Button";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Project, ProjectCategory } from "../api";
import VoteButton from "./VoteButton";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 26rem;
  width: 20rem;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 0px 19px -8px rgba(0, 0, 0, 0.75);
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 17/11;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  justify-content: space-between;
`;

const Title = styled.strong`
  font-size: 1.3rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Options = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
`;

const StyledLink = styled(Link)`
  flex-basis: 100%;
  ${Button} {
    width: 100%;
  }
`;

export interface CardProps {
  project: Project;
}

const Card: React.FC<CardProps> = ({ project }) => {
  const { _id, name, cat } = project;

  return (
    <>
      <CardContainer>
        <Image src={`/img/projects/${_id}.png`} alt="Preview do Projeto " />
        <Content>
          <Title>{name}</Title>
          <p>
            Número: {_id}
            <br />
            Categoria: {ProjectCategory[cat]}
          </p>
          <Options>
            <StyledLink to={`/p/${_id}`}>
              <Button>Ver mais</Button>
            </StyledLink>
            <VoteButton project={project}>Votar</VoteButton>
          </Options>
        </Content>
      </CardContainer>
    </>
  );
};

export default Card;
