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

type ProductItemProps = {
    product : Product;
    totalAmount: number;
}