import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

// ProjectData caso ja tenha dados no formulário(Edição)
function ProjectForm({handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || [])

    // Este hook renderiza apenas uma vez na tela
    useEffect(() => {
        // Consumindo(Request) api criada na extensão (db.json)
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            // Caso de um erro na request
            .catch((erro) => console.log(erro));
    }, []);

    const submit = (evento) => {
        // Não enviará o evento quando passar para outro input no formulário
        evento.preventDefault()
        // console.log(project)
        // Executa o método passado como props passando o projeto como argumento
        handleSubmit(project)
    }

    // Método para alterar um input
    // Definindo os dados do projeto na funcao setProject
    function handleChange(evento) {
        // Independente do input que alterá, ele irá altera os inputs de text
        setProject({...project, [evento.target.name]: evento.target.value})
    }

    function handleCategory(evento) {
        // Independente do input que alterá, ele irá altera os inputs de text
        setProject({
            ...project, 
            category: {
            // Pegando o Id do Projeto do banco
            id: evento.target.value,
            // Colocando o id selecionado nas option pelo nome
            name: evento.target.options[evento.target.selectedIndex].text,
        },})
        console.log(project)
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            {/* Trazendo o componente Input com as props criadas  */}
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do Projeto"
                // Alterando o nome pelo método
                handleOnChange={handleChange}
                value={project.name ? project.name:''}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget:''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                // Passando as categorias para a propriedade option do componente select
                options={categories}
                handleOnChange={handleCategory}
                // Se tiver um projeto com categoria ele passa o id dele, se não passa nada
                value={project.category ? project.category.id: ''}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjectForm;
