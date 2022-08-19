import styles from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ""}
            >
                <option>Selecione uma opção</option>
                {/* Fazendo um loop com o map
                passando cada option uma categoria */}
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export default Select;
