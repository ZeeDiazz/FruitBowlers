interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    currency: string;
    discountQuantity: number;
    discountPercent: number;
    upsellProductId: number | null;
    totalPrice: number;
    quantity: number;
}

interface ProductItemProps {
    product : Product;
    totalAmount: number;
}