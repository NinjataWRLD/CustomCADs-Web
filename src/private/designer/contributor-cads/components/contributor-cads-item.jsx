import Cad from '@/components/cad'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ContributorCadItem({ item, onValidate, onReport }) {
    const { t } = useTranslation();

    const handleValidate = () => {
        if (confirm(t('body.unvalidatedCads.Confirm Validate'))) {
            onValidate();
        }
    };

    const handleReport = () => {
        if (confirm(t('body.unvalidatedCads.Confirm Report'))) {
            onReport();
        }
    };

    return (
        <li className="flex flex-wrap gap-y-4 bg-indigo-200 rounded-xl border border-indigo-700 shadow-2xl shadow-indigo-800 px-6 py-6 basis-3/12 ">
            <h3 className="basis-full text-center text-indigo-950 text-xl font-extrabold">{item.name}</h3>
            <div className="h-80 w-80 flex justify-center">
                <div className="w-full h-full bg-indigo-100 rounded-xl border-2 border-indigo-300 shadow-lg shadow-indigo-400">
                    <Cad cad={item} />
                </div>
            </div>
            <div className="w-full flex justify-around font-bold">
                <button onClick={handleValidate}
                    className="basis-5/12 bg-indigo-700 text-center text-indigo-50 py-2 rounded-md hover:opacity-70 border"
                >
                    {t('body.unvalidatedCads.Validate')}
                </button>
                <button onClick={handleReport}
                    className="basis-5/12 bg-indigo-50 py-2 rounded-md hover:text-indigo-50 hover:bg-red-500 border border-indigo-700"
                >
                    {t('body.unvalidatedCads.Report')}
                </button>
            </div>
            <p className="basis-full text-center text-lg text-indigo-900 font-semibold">
                {t('body.unvalidatedCads.Uploaded by')} '{item.creatorName}'
            </p>
        </li>
    );
}

export default ContributorCadItem;