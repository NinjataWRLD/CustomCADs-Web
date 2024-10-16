import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUncheckedCad } from '@/hooks/requests/designer';
import { PatchCadStatus } from '@/requests/private/designer';
import ErrorPage from '@/components/error-page';
import ThreeJS from '@/components/cads/three';
import getStatusCode from '@/utils/get-status-code';
import UncheckedCadDetailsCad, { emptyUncheckedCadDetailsCad } from './unchecked-cad-details.interface';
import AnimatedPage from '@/components/animated-page';

function UncheckedCadDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [prevId, setPrevId] = useState<number>(0);
    const [cad, setCad] = useState<UncheckedCadDetailsCad>(emptyUncheckedCadDetailsCad);
    const [nextId, setNextId] = useState<number>(0);

    const uncheckedCadQuery = useGetUncheckedCad(Number(id));
    useEffect(() => {
        if (uncheckedCadQuery.data) {
            const { prevId, nextId, ...cad } = uncheckedCadQuery.data;
            setPrevId(prevId);
            setCad(cad);
            setNextId(nextId);
        }
    }, [uncheckedCadQuery.data]);

    if (uncheckedCadQuery.isError) {
        const status = getStatusCode(uncheckedCadQuery.error);
        return <ErrorPage status={status} />
    }

    const handlePatch = async (status: string) => {
        try {
            await PatchCadStatus(cad.id, status);
            navigate('/designer/cads/unchecked');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <AnimatedPage>
                <div className="mt-2 h-[60vh] flex flex-col justify-between">
                    <div className="basis-[80%] w-full self-center flex justify-around items-center">
                        <button onClick={() => navigate(`/designer/cads/unchecked/${prevId}`)} disabled={!prevId} className={prevId ? "" : "opacity-50"}>
                            <FontAwesomeIcon icon="circle-chevron-left" className="text-5xl text-indigo-800" />
                        </button>
                        <div className="h-full basis-1/2 rounded-3xl overflow-hidden">
                            <ThreeJS cad={cad} />
                        </div>
                        <button onClick={() => navigate(`/designer/cads/unchecked/${nextId}`)} disabled={!nextId} className={nextId ? "" : "opacity-50"}>
                            <FontAwesomeIcon icon="circle-chevron-right" className="text-5xl text-indigo-800" />
                        </button>
                    </div>
                    <div className="basis-[5%] flex justify-evenly">
                        <button
                            onClick={() => handlePatch('Validated')}
                            className="bg-green-500 px-12 py-2 text-indigo-50 rounded-lg border-2 border-green-700 hover:opacity-80 active:bg-green-600"
                        >
                            <FontAwesomeIcon icon="check" className="text-2xl" />
                        </button>
                        <button
                            onClick={() => handlePatch('Reported')}
                            className="bg-red-500 px-12 py-2 text-indigo-50 rounded-lg border-2 border-red-700 hover:opacity-80 active:bg-red-600"
                        >
                            <FontAwesomeIcon icon="flag" className="text-2xl" />
                        </button>
                    </div>
                </div>
                <div className="basis-[5%] flex justify-evenly">
                    <button
                        onClick={() => handlePatch('Validate')}
                        className="bg-green-500 px-12 py-2 text-indigo-50 rounded-lg border-2 border-green-700 hover:opacity-80 active:bg-green-600"
                    >
                        <FontAwesomeIcon icon="check" className="text-2xl" />
                    </button>
                    <button
                        onClick={() => handlePatch('Report')}
                        className="bg-red-500 px-12 py-2 text-indigo-50 rounded-lg border-2 border-red-700 hover:opacity-80 active:bg-red-600"
                    >
                        <FontAwesomeIcon icon="flag" className="text-2xl" />
                    </button>
                </div>
            </AnimatedPage>
        </>
    );
}

export default UncheckedCadDetails;