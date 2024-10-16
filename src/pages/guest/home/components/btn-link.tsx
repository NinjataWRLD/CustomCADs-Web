import { Link } from 'react-router-dom';
import styles from './btn-link.module.css'

interface BtnLinkProps {
    to: string
    text: string
}

function BtnLink({ to, text }: BtnLinkProps) {
    return (
        <Link to={to} className='relative inline-block hover:no-underline'>
                <div className={`${styles.button}`}>{text}</div>
                <div className={`${styles["button-gradient"]}`}></div>
        </Link>
    );
}

export default BtnLink;