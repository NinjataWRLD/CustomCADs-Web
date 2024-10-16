import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { usePurchase } from '@/hooks/requests/payment';
import ErrorPage from '@/components/error-page';
import getStatusCode from '@/utils/get-status-code';

interface CheckoutFormProps {
    id: number
    onSubmit: Function
}

function CheckoutForm({ id, onSubmit }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const purchaseMutation = usePurchase();
    const { t: tPages } = useTranslation('pages');

    const [awaitingState, processingState, successState, errorState] = ['awaiting', 'processing', 'success', 'error'];
    const [status, setStatus] = useState(awaitingState);
    const [error, setError] = useState<string>('');

    let btnMesg = tPages('orders.purchase');
    useEffect(() => {
        switch (status) {
            case awaitingState:
            case errorState:
                btnMesg = tPages('orders.purchase');
                break;

            case processingState:
                btnMesg = tPages('orders.processing');
                break;

            case successState:
                btnMesg = tPages('orders.paid');
                break;
        }
    }, [status]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(processingState);

        if (!elements || !stripe) {
            return;
        }
        const card = elements.getElement(CardElement);


        if (!card) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: card });

        if (error) {
            setStatus(errorState);
            setError(error.message ?? '');
            return;
        }

        const dto = { id: id, paymentMethodId: paymentMethod.id };
        const { data, status } = await purchaseMutation.mutateAsync(dto);

        if (status === 400) {
            setStatus(errorState);

            if (data.clientSecret) {
                const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);

                if (confirmError) {
                    setError(confirmError.message ?? '');
                    return;
                }
            } else {
                setError(data);
            }
        }

        await onSubmit(paymentMethod.id);
        setStatus(successState);
    };
    if (purchaseMutation.isError) {
        const status = getStatusCode(purchaseMutation.error);
        return <ErrorPage status={status} />;
    }

    return (
        <div className="bg-indigo-100 max-w-lg h-full mx-auto py-6 px-10 border-2 border-indigo-700 rounded-lg shadow-lg shadow-indigo-500">
            <form onSubmit={handleSubmit} className="h-full">
                <div className="h-full flex flex-wrap place-content-between">
                    <div className="basis-full p-3 border border-indigo-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200">
                        <CardElement />
                    </div>
                    <div className="basis-full flex flex-col items-center justify-end gap-y-2">
                        {status === errorState &&
                            <span className="text-center text-red-500 font-bold">{error}</span>
                        }
                        {status === successState &&
                            <span className="text-indigo-500 text-xl font-bold">
                                <span>{tPages('orders.check_out')} </span>
                                <Link to="/client/orders/finished" className="text-center text-indigo-600 hover:text-indigo-600 font-extrabold">
                                    {tPages('orders.here')}!
                                </Link>
                            </span>
                        }
                        <button
                            type="submit"
                            disabled={!stripe || status === processingState || status === successState}
                            className="min-w-[50%] bg-indigo-500 text-xl text-indigo-50 font-bold py-3 rounded-lg disabled:bg-indigo-900 disabled:cursor-not-allowed"
                        >
                            {btnMesg}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;