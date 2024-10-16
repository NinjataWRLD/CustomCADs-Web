import { Link } from 'react-router-dom';

interface FooterLinkProps {
    to: string
    text: string
}

function FooterLink({ to, text }: FooterLinkProps) {
    return (
        <span className="text-sm font-bold">
            <Link to={to} className="hover:italic hover:underline">{text}</Link>
        </span>
    );
}

export default FooterLink;