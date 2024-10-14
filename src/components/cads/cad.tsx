import { useEffect, useState } from 'react';
import ThreeJS from './three.js';
import ThreeJSCad, { emptyThreeJSCad } from './three.interface.js';
import { useGetHomeCad } from '@/hooks/requests/home.js';

interface CadProps {
    cad?: ThreeJSCad
    isHomeCad?: boolean
}

function Cad({ cad, isHomeCad }: CadProps) {
    const [model, setModel] = useState<ThreeJSCad>(emptyThreeJSCad);

    const homeCadQuery = useGetHomeCad(isHomeCad);
    useEffect(() => {
        if (cad) {
            setModel(cad);
        } else if (isHomeCad) {
            if (homeCadQuery.data) {
                setModel(homeCadQuery.data);
            }
        } else {
            console.error('Cad source not provided.');
        }
    }, []);

    return (
        <div className="h-full rounded-3xl overflow-hidden bg-indigo-100 border-2 border-indigo-500 shadow-md shadow-indigo-700 hover:bg-indigo-200 active:bg-indigo-300">
            <ThreeJS cad={model} />
        </div>
    );
}

export default Cad;