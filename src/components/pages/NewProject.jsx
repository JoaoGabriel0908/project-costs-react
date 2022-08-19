import React from "react";
import styles from './NewProject.module.css'
import ProjectForm from "../projects/ProjectForm";
import {useNavigate} from 'react-router-dom'

function NewProject() {
    // Hook que permite redireciona o usuário para editar ou criar
    const navigate = useNavigate()

    // Método para a criação de post
    function createPost(project){
        // Inicializando costs e serviços
        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            // Mandando os dados do projeto para o corpo da API
            body: JSON.stringify(project)
    })  .then(resp => resp.json())
        .then((data) => {
            console.log(data)
            // Redirecionando
            navigate('/projects', {message: 'Projeto criado com sucesso!'})
        })
        .catch(erro => console.log(erro))
}

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject