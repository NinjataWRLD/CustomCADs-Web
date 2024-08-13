import AuthGuard from '@/routing/auth-guard';
import { GetCategories } from '@/requests/public/home';
import { GetOrder } from '@/requests/private/orders';
import UserOrdersPage from '@/private/orders/user-orders/orders';
import OrderDetailsPage from '@/private/orders/order-details/order-details';
import PurchasePage from '@/private/orders/purchase/purchase';
import CustomOrderPage from '@/private/orders/custom-order/custom-order';

export default {
    element: <AuthGuard auth="private" roles={['Client']} />,
    children: [
        {
            path: '/orders/:status',
            element: <UserOrdersPage />,
        },
        {
            path: '/orders/:status/:id',
            element: <OrderDetailsPage />,
            loader: async ({ params }) => {
                const { id } = params;
                try {
                    const categories = await GetCategories();
                    const orderRes = await GetOrder(id);

                    return { loadedCategories: categories.data, loadedOrder: orderRes.data };
                } catch (e) {
                    console.error(e);
                }
            }
        },
        {
            path: '/orders/custom',
            element: <CustomOrderPage />
        },
        {
            path: '/purchase/:id',
            element: <PurchasePage />
        },
    ]
};