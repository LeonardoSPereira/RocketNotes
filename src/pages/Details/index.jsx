import { useState, useEffect } from "react";
import { Container, Links, Content } from "./styles";
import { Tag } from "../../components/Tag";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  function handleNavigate() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente excluir esta nota?");

    if(confirm) {
      await api.delete(`/notes/${params.id}`, { withCredentials: true });
      navigate(-1);
    }
  }

  useEffect(() => {

    async function fetchDetails() {
      const response = await api.get(`/notes/${params.id}`, { withCredentials: true });
      setData(response.data);
    }

    fetchDetails();
  }, []);
  
  return (
    <Container>
      <Header />

      {
        data && 
        <main>
        <Content>

          <ButtonText 
            title="Excluir nota"
            onClick={handleRemove}
          />

          <h1>
            {data.title}
          </h1>

          <p>
            {data.description}
          </p>

          {
            data.links &&
            <Section title="Links úteis">
              <Links>
                {
                  data.links.map(link => (
                    
                    <li key={String(link.id)}>

                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.url}
                      </a>

                    </li>
                  ))
                }
              </Links>
            </Section>
          }

          {
            data.tags &&
            <Section title="Marcadores">
            {
              data.tags.map(tag => (
                <Tag
                  key={String(tag.id)}
                  title={tag.name} 
                />

              ))
            }
            

            </Section>
          }

          <Button 
            title="Voltar"
            onClick={handleNavigate}
          />

        </Content>
        </main>
      }

    </Container>
  );
}