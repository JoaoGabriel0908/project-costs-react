import styles from "./ProjectSelected.module.css";

// Usado para pegar o id do projeto
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layouts/Loading";
import Container from "../layouts/Container";
import ProjectForm from "../projects/ProjectForm";
import Message from "../layouts/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

import { parse, v4 as uuidv4 } from "uuid";

function ProjectSelected() {
    const { id } = useParams();

    const [services, setServices] = useState([]);
    const [project, setProject] = useState([]);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setshowServiceForm] = useState(false);
    // Trazendo projeto na tela para editar
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data);
                    setServices(data.services);
                })
                .catch((erro) => console.log(erro));
        }, 500);
    }, [id]);

    // Método para editar
    function editPost(project) {
        setMessage("");
        // budget validate
        if (project.budget < project.costs) {
            setMessage("O orçamento não pode ser menor que o custo do projeto");
            setType("error");
            return false;
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                // Voltando para editar
                setShowProjectForm(false);
                // Message
                setMessage("Projeto atualizado com sucesso!");
                setType("sucess");
            })
            .catch((erro) => console.log(erro));
    }
    function createService(project) {
        setMessage("");
        // Validação de Serviços
        // Pegando o ultimo serviço adicionado
        const lastService = project.services[project.services.length - 1];

        // Criando um id unico para o serviço
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        // Máximo valor validação
        if (newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return false;
        }

        // Adiciona o serviço no projeto atual
        project.cost = newCost;

        // Atualizar projeto
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((erro) => console.log(erro));
    }

    function removeService() {}

    // Método para clicar e buscar id
    function toogleProjectForm() {
        // Se tiver true ele fica falso e vice-versa

        // !showProjectForm Quando está na opção de editar
        setShowProjectForm(!showProjectForm);
    }

    // Método para clicar e buscar id
    function toogleServiceForm() {
        // Se tiver true ele fica falso e vice-versa

        // !showProjectForm Quando está na opção de editar
        setshowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {/* Se tiver algo em message... */}
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            {/* Botão para editar o projeto */}
                            <button
                                className={styles.btn}
                                onClick={toogleProjectForm}
                            >
                                {/* Se não tiver project form sendo exibido, edita */}
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span>{" "}
                                        {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de orçamento: </span> R$
                                        {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R$
                                        {project.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.services_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button
                                className={styles.btn}
                                onClick={toogleServiceForm}>
                                {/* Se não tiver project form sendo exibido, edita */}
                                {!showServiceForm
                                    ? "Adicionar serviço"
                                    : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviços"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => {
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />;
                                })}
                            {services.length === 0 && (
                                <p>Não há serviços cadastrados</p>
                            )}
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default ProjectSelected;
