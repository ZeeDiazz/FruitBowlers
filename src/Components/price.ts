import {useState, useEffect} from "react";
import './product.ts';
import productsData from '../../productsList.json';

const totalQuantity: number = products.reduce((acc, product) => acc + product.quantity, 0);
const totalPriceDiscounted: number = calculateTotalPrice();

const basket = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch your JSON file or directly import it as shown above
        // For demonstration purposes, I'm directly using the imported data
        setProducts(productsData);
    }, []);
function calculateLocalTotalPrice(index: number): number{
    if(products[index].quantity >= products[index].discountQuantity){
        return products[index].totalPrice * (1 - products[index].discountPercent / 100);
    }
    return products[index].totalPrice;
}
function calculateTotalPrice(){
    let totalPrice: number = 0;
    for (let i = 0; i < products.length; i++) {
        totalPrice += calculateLocalTotalPrice(i);
    }
    if(totalPrice < 300){
        return totalPrice;
    }else{
        return totalPrice * 0.9;
    }
}
function handleQuantityChange(index: number, newQuantity: number){
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

    setProduct(newProducts);
}
function getDiscountMessage(totalPriceDiscount: number): string {
    const remainingAmountForDiscount = 300 - totalPriceDiscount;
    if (totalPriceDiscount < 300) {
        return `Get 10% discount when buying for ${remainingAmountForDiscount} DKK more!`;
    } else {
        return 'You get 10% discount!';
    }
}
