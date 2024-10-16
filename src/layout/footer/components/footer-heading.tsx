import { Link } from 'react-router-dom';

function FooterHeading() {
    return (
        <header className="text-lg font-bold">
            &copy; 2023-{new Date().getFullYear()} - {' '}
            <span className="font-extrabold">CustomCADs</span>
        </header>
    );
}

export default FooterHeading;