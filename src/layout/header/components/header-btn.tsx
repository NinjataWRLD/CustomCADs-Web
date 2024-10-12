import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';

interface HeaderBtnProps {
    icon: IconProp;
    text?: string | null;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function HeaderBtn({ icon, text, onClick }: HeaderBtnProps) {
    return (
        <button
            onClick={onClick}
            className="text-white bg-opacity-10 mr-3 rounded-full scale-125 flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-opacity-0 active:bg-opacity-40 transition duration-200 ease-in-out relative hover:scale-110"
        >
            <span className="flex items-center ">
                {text}
                <span className='mx-1'></span>
                <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
            </span>
        </button>
    );
}

export default HeaderBtn;
