import Filter from "../components/Filter";
import Card from "../components/Card";
import styled from "@emotion/styled";
import { ChangeEvent, useMemo, useState } from "react";
import { Option } from "react-dropdown";
import { useProjects } from "../hooks";

const SearchBar = styled.input`
  position: relative;
  overflow: hidden;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50px;
  box-sizing: border-box;
  color: #333;
  outline: none;
  padding-right: 3rem;
  padding-left: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const SearchAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 555px) {
    gap: 0.5rem;
    & > * {
      flex-grow: 1;
    }
  }
`;

const ProjectList = styled.div`
  justify-content: center;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  background: white;
  padding: 2rem 1rem;
  border-radius: 20px;
  margin-top: 2rem;
`;

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [option, setOption] = useState<Option | null>(null);
  const projects = useProjects();

  const filteredData = useMemo(() => {
    if (projects == null) {
      return null;
    }

    const format = (text: string) =>
      text
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();
    const search = format(searchText);

    return projects.filter(
      (x) =>
        (!Number(option?.value) || x.cat === Number(option?.value)) &&
        (format(x.name).includes(search) || search === x._id.toString())
    );
  }, [searchText, projects, option]);

  const searchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
  };

  return (
    <>
      <SearchAndFilter>
        <SearchBar
          placeholder="Procure o projeto aqui"
          onChange={searchChange}
        />
        <Filter onChange={setOption} />
      </SearchAndFilter>
      <ProjectList>
        {filteredData == null ? (
          <h1>Carregando...</h1>
        ) : filteredData.length === 0 ? (
          <h1>Nenhum projeto encontrado.</h1>
        ) : (
          filteredData.map((x) => <Card project={x} key={x._id} />)
        )}
      </ProjectList>
    </>
  );
};

export default Home;
