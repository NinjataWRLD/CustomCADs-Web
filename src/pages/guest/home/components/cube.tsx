import styles from "./cube.module.css"

function Cube() {
    return (
        <>
            <aside className={`${styles.aside}`}>
                <div className={`${styles.cube}`}>
                    <div className={`${styles.top}`}></div>
                    <div className={`${styles.bottom}`}></div>
                    <div className={`${styles.left}`}></div>
                    <div className={`${styles.right}`}></div>
                    <div className={`${styles.front}`}></div>
                    <div className={`${styles.back}`}></div>
                </div>
                <div className={`${styles.shadow}`}></div>
            </aside>
        </>
    );
}

export default Cube;
