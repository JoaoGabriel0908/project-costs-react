import styles from '../projects/ProjectForm.module.css'
import {useState} from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState([])

    function submit(evento) {
        evento.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(evento) {
        setService({...service, [evento.target.name]: evento.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input
                type='number'
                text='Custo do Serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <Input
                type='text'
                text='Descrição do Serviço'
                name='description'
                placeholder='Insira o serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm