import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler } from 'react';

interface SidebarBtnProps {
    icon: IconProp;
    text?: string | null;
    orderReversed?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function SidebarBtn({ icon, text, orderReversed, onClick }: SidebarBtnProps) {
    return (
        <button onClick={onClick} className="relative">
            <div className={`flex ${orderReversed ? 'flex-row-reverse' : ''} w-full justify-center items-end px-4 py-3`}>
                <div className="relative group">
                    <FontAwesomeIcon
                        icon={icon}
                        className="text-4xl text-green-400 transition-colors duration-300 group-hover:text-green-700 group-active:text-green-900"
                    />
                    {text && (
                        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {text}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

export default SidebarBtn;
