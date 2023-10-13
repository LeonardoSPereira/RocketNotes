import { useState, useEffect } from "react";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";
import { FiPlus } from "react-icons/fi";
import { Header } from "../../components/Header";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {

    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleSelectTag(tagName) {
        if(tagName === "all") {
            return setSelectedTags([])
        }

        const alreadySelected = selectedTags.includes(tagName);

        if(alreadySelected) {
            const filteredTags = selectedTags.filter(tag => tag !== tagName);
            setSelectedTags(filteredTags)
        } else {
            setSelectedTags(prevState => [...prevState, tagName]);

        }

    }

    function handleDetails(id) {
        navigate(`/details/${id}`);
    }


    useEffect(() => {

        async function fetchTags() {

            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    useEffect(() => {
        
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`);
            setNotes(response.data);
        }

        fetchNotes();

    }, [ selectedTags, search ]);

    return(
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="Todos" 
                        $isactive={selectedTags.length === 0}
                        onClick={() => handleSelectTag("all")}
                    />
                </li>

                {
                    tags && 
                    tags.map(tag => (

                        <li key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleSelectTag(tag.name)}
                                $isactive={selectedTags.includes(tag.name)}

                            />
                        </li>

                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título"
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                        
                    
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota
            </NewNote>


        </Container>
    )
}