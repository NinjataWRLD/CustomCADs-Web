import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useOrderExisting } from '@/hooks/requests/orders';
import { useGetPublicKey } from '@/hooks/requests/payment';
import ErrorPage from '@/components/error-page';
import Spinner from '@/components/spinner';
import getStatusCode from '@/utils/get-status-code';
import CheckoutForm from './components/checkout';
import AnimatedPage from '@/components/animated-page';

function PurchasePage() {
    const { t: tPages } = useTranslation('pages');
    const { id } = useParams();
    const [pk, setPk] = useState();
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();

    const publicKeyQuery = useGetPublicKey();

    useEffect(() => {
        if (publicKeyQuery.data) {
            setPk(publicKeyQuery.data);
        }
    }, [publicKeyQuery.data]);

    useEffect(() => {
        if (pk) {
            setStripePromise(loadStripe(pk));
        }
    }, [pk]);

    const orderExistingMutation = useOrderExisting();
    const handlePurchase = async () => {
        try {
            await orderExistingMutation.mutateAsync({ id: Number(id) });
        } catch (e) {
            console.error(e);
        }
    };

    if (publicKeyQuery.isError) {
        const status = getStatusCode(publicKeyQuery.error);
        return <ErrorPage status={status} />;
    }

    return (
        <>
            <AnimatedPage>
                {!stripePromise ? <Spinner />
                    : <div className="min-h-96 flex place-content-center mt-8">
                        <div className="basis-full flex flex-wrap items-center gap-y-4">
                            <h1 className="basis-full text-4xl text-center text-indigo-900 font-bold">
                                {tPages('orders.purchase_title')}
                            </h1>
                            <div className="h-4/6 basis-full">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm id={Number(id)} onSubmit={handlePurchase} />
                                </Elements>
                            </div>
                        </div>
                    </div>}
            </AnimatedPage>
        </>
    );
}

export default PurchasePage;