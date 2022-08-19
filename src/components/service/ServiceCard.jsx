import styles from '../projects/Card.module.css'

function ServiceCard(id, name, cost, description, handleRemove) {
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total: </span> R${cost}
            </p>
            <p>{description}</p>
        </div>
    )
}

export default ServiceCard