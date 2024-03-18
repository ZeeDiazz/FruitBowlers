interface UpgradeButtonProps {
    product: Product;
    upgrades: Product[];
    handleUpgradeClick: (index: number, amount: number) => void;
}

const findMoreExpensiveProduct = (upsellProductId: string | null, upgrades: Product[]): Product | null => {
    const upgrade: Product | undefined = upgrades.find((upgrade) => upsellProductId === upgrade.id);
    if (upgrade) {
        return upgrade;
    }
    return null;
};
//If there is a more expensive product with the same name in the product-list.
export const hasUpgradeOption = (product: Product, upgrades: Product[]): {
    moreExpensiveOption: Product | null;
    hasUpgrade: boolean, priceDifference: number
} => {
    if(product.upsellProductId != null){
        const upgrade: Product | null = findMoreExpensiveProduct(product.upsellProductId, upgrades);
        if (upgrade !== null && upgrade.price > product.price) {
            const priceDifference: number = upgrade.price - product.price;  // does not take discount into account
            return { hasUpgrade: true, priceDifference: priceDifference, moreExpensiveOption: upgrade };
        }
    }
    return { hasUpgrade: false, priceDifference: 0, moreExpensiveOption: null };
};

export function handleUpgradeClick(products:Product[], newProduct: Product | null, index: number): Product[] {
    const quantity: number = products[index].quantity;
    const newProducts: Product[] = products.slice();
    if (newProduct) {
        newProducts[index] = newProduct;
        newProducts[index].quantity = quantity;
        newProducts[index].totalPrice = newProduct.price * quantity;
    }
    return newProducts;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({ product, upgrades, handleUpgradeClick }) => {
    const { hasUpgrade, priceDifference } = hasUpgradeOption(product, upgrades);

    return (
        <>
            {hasUpgrade && (
                <button
                    style={{ float: "left", marginRight: "10px" }}
                    onClick={() => handleUpgradeClick(upgrades.indexOf(product), 1)}>
                    Organic available! Change for {priceDifference} DKK a piece?
                </button>
            )}
        </>
    );
};