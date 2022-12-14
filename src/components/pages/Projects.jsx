import { useLocation } from "react-router-dom";
import Message from "../layouts/Message";
import styles from "./Projects.module.css";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import Card from "../projects/Card";
import { useState, useEffect } from "react";
import Loading from "../layouts/Loading";
import ServiceForm from "../service/ServiceForm";

function Projects() {
    // Estados para salvar os projetos
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('')

    // Retorna o objeto quando alguma condição realizar
    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch((error) => console.log(error));
        }, 500);
    }, []);

    // Deletando um projeto
    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })  .then(resp=> resp.json())
        // Função anonima para excluir e mostrar a mensagem na tela
            .then(() => {
                // Percorrendo o array de projetos filtrando apenas o id desejado
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage("Projeto Removido com Sucesso")
            })
            .catch(erro => console.log(erro))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projetos" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <Card
                            // Entrando em cada um dos objetos do projeto
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                    {/* Quando não estiver false ele estará aparecendo o loader */}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 &&(
                    <p>Não há projetos Cadastrado</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;
