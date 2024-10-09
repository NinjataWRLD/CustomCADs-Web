import { useEffect, useState } from 'react';
import ThreeJS from './three.js';
import ThreeJSCad, { emptyThreeJSCad } from './three.interface.js';
import { GetHomeCad } from '@/requests/public/home.js';

interface CadProps {
    cad?: ThreeJSCad
    isHomeCad?: boolean
}

function Cad({ cad, isHomeCad }: CadProps) {
    const [model, setModel] = useState<ThreeJSCad>(emptyThreeJSCad);

    useEffect(() => {
        if (cad) {
            setModel(cad);
        } else if (isHomeCad) {
            fetchHomeCad();
        }
    }, []);

    return (
        <div className="h-full rounded-3xl overflow-hidden bg-indigo-100 border-2 border-indigo-500 shadow-md shadow-indigo-700 hover:bg-indigo-200 active:bg-indigo-300">
            <ThreeJS cad={model} />
        </div>
    );

    async function fetchHomeCad() {
        try {
            const { data } = await GetHomeCad();
            setModel(data);
        } catch (error) {
            console.error(error);
        }
    }
}

export default Cad;