import styles from "../Footer/footer.module.css"

export default function footer(){
    return(
        <div className={styles.footer}>
            <a className={styles.download}>
                <div className={styles.left}>
                    <div className={styles.logo}></div>
                    <div className={styles.label}>
                        <p className={styles.name}>今日头条</p>
                    </div>
                </div>
                <div className={styles.open}>打开</div>
            </a>
        </div>
    )
}