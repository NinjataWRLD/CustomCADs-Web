import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';

interface SidebarBtnProps {
    icon: IconProp
    text?: string | null
    orderReversed?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function SidebarBtn({ icon, text, orderReversed, onClick }: SidebarBtnProps) {
    return (
        <button onClick={onClick} className="">
            <div className={`flex ${orderReversed && 'flex-row-reverse'} w-[100%] justify-center items-end px-4 py-3 text-green-400 active:text-indigo-700`}>
                <FontAwesomeIcon icon={icon} className="text-4xl" />
            </div>
        </button>
    );
}

export default SidebarBtn;