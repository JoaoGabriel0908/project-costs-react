import React from "react";
import LinkButton from "../layouts/LinkButton";
import styles from './Home.module.css'
import Image from '../../img/budget.png'

function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={Image} alt="Costs"/>
        </section>
    )
}

export default Home