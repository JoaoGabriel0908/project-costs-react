import styles from './Message.module.css'
import { useState, useEffect } from 'react';

// Passando o tipo(Erro, Correto) e mensagem
function Message({ type, msg }) {
    const [visible, setVisible] = useState(false);

    // Se a mensagem existe, ele irá renderizar na tela apenas uma vez
    useEffect(() => {
        if (!msg) {
            setVisible(false);
            return;
        }
            setVisible(true);

        // Depois de 3s ele irá tirar a mensagem
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg]);

    return (
        <>
            {/* Quando visible tiver ativado, aparecerá a mensagem */}
            {visible && (
                // Classe dinâmica,quando o tipo é diferente definimos uma classe
                <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
            )}
        </>
    );
}

export default Message;
