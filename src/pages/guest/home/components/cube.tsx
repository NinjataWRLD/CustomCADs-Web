import styles from "./cube.module.css"

function Cube() {
    return (
        <>
            <aside className={`${styles.aside}`}>
                <div className={`${styles.cube}`}>
                    <div className={`${styles.top}`}></div>
                    <div className={`${styles.bottom}`}></div>
                    <div className={`${styles.left}`}>
                        <img src="../../../../../public/custom-images/customcads.png" alt="" />
                    </div>
                    <div className={`${styles.right}`}>
                        <img src="../../../../../public/custom-images/customcads.png" alt="" />
                    </div>
                    <div className={`${styles.front}`}>
                        <img src="../../../../../public/custom-images/customcads.png" alt="" />
                    </div>
                    <div className={`${styles.back}`}>
                        <img src="../../../../../public/custom-images/customcads.png" alt="" />
                    </div>
                </div>
                <div className={`${styles.shadow}`}></div>
            </aside>
        </>
    );
}

export default Cube;
