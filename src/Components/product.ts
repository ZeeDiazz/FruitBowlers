interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
    discountQuantity: number;
    discountPercent: number;
    upsellProductId: string | null;
    totalPrice: number;
    quantity: number;
}
interface ProductState {
    data: Record<string, Product>;
    loading: boolean;
    error: boolean;
}
type ProductAction =
    | { type: "loaded"; payload: ProductState["data"] }
    | { type: "failed"; payload: string };

function productReducer(state: ProductState, action: ProductAction) {
    switch (action.type) {
        case "loaded":
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false,
            };
        case "failed":
            return {
                ...state,
                data: {},
                loading: false,
                error: true,
            };
    }
}

type ProductItemProps = {
    product : Product;
    totalAmount: number;
}