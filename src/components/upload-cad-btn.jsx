import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FileInput({ id, icon, file, type="file", accept, name, onInput }) {
    return (
        <div className="flex flex-wrap items-center gap-x-2 h-full">
            <label htmlFor={id} className="flex gap-x-4 bg-indigo-200 rounded-xl py-3 px-4 border-2 border-indigo-500 shadow-md shadow-indigo-700">
                <FontAwesomeIcon icon={icon} className="text-3xl text-indigo-800" />
                <div className={`${file ? 'text-indigo-800 font-bold flex items-center' : 'hidden'}`}>
                    <span>{file && file.name}</span>
                </div>
            </label>
            <input
                type={type}
                accept={accept}
                id={id}
                name={name}
                onInput={onInput}
                hidden
            />
        </div>
    );
}

export default FileInput;