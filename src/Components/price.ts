export function calculateLocalTotalPrice(products: Product[], index: number): number {
    if (products[index].quantity >= products[index].discountQuantity) {
        return products[index].totalPrice * (1 - products[index].discountPercent / 100);
    }
    return products[index].totalPrice;
}

export function calculateTotalPrice(products: Product[]): string {
    let totalPrice: number = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += calculateLocalTotalPrice(products, i);
    }
    if (totalPrice < 300) {
        return totalPrice.toFixed(2);
    } else {
        return (totalPrice * 0.9).toFixed(2);
    }
}

export function getTotalQuantity(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.quantity, 0);
}

export function getTotalPriceDiscounted(products: Product[]): string {
    const totalPriceDiscounted: string = calculateTotalPrice(products);
    return totalPriceDiscounted.toString();
}

export function handleQuantityChange(products: Product[], index: number, newQuantity: number): Product[] {
    const newProducts: Product[] = products.slice();
    const product: Product = newProducts[index];
    /*changing a products quantity should change the total price automaically
    * right now they are don't --> not coupled by a function for example
    * */
    if (newQuantity === 0) {
        product.quantity = 0;
        product.totalPrice = 0;
    } else {
        product.quantity += newQuantity;
        product.totalPrice += newQuantity * product.price;
    }
    return newProducts; //when using this function, remember to set the state with the new products
}

export function getDiscountMessage(totalPriceDiscount: string): string {
    const remainingAmountForDiscount = 300 - Number(totalPriceDiscount);
    if (Number(totalPriceDiscount) < 300) {
        return `Get 10% discount when buying for ${remainingAmountForDiscount.toFixed(2)} DKK more!`;
    } else {
        return 'You get 10% discount!';
    }
}
