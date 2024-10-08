import { MouseEventHandler } from "react";

interface PageNumProps {
    num: number
    isCurrent: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}

function PageNum({ num, isCurrent, onClick }: PageNumProps) {
    return (
        <button onClick={onClick}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 
            ${isCurrent
                ? `text-indigo-50 z-10 bg-indigo-600`
                : `text-indigo-900 ring-1 ring-inset ring-indigo-600  hover:bg-indigo-200 active:bg-indigo-300`}`
            }
        >
            {num}
        </button>
    );
}

export default PageNum;