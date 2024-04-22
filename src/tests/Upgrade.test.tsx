import {describe, expect, it} from "vitest";
import * as upgrade from '../Components/upgrade.tsx'


const products: Product[] = [{
    "id": "apple-bag",
    "name": "Apples",
    "price": 25,
    "description": "There are 5 apples in one bag",
    "currency": "DKK",
    "discountQuantity": 2,
    "discountPercent": 10,
    "upsellProductId": "organic apple-bag",
    "totalPrice": 25,
    "quantity": 1
}]
const upgrades: Product[] = [{
    "id": "organic apple-bag",
    "name": "Apples",
    "price": 30,
    "description": "Organic apples from Denmark",
    "currency": "DKK",
    "discountQuantity": 0,
    "discountPercent": 0,
    "upsellProductId": null,
    "totalPrice": 30,
    "quantity": 0
}]
describe('Upgrade functions', () => {
    it('should handle upgrade properly by setting the new product with previous quantity and new total price', () => {
        const newProduct : Product= upgrades[0];
        const prevQuantity = products[0].quantity;
        const upgradedProduct = upgrade.handleUpgradeClick(products, newProduct,prevQuantity, 0);
        expect(upgradedProduct[0].quantity).toBe(prevQuantity);
        expect(upgradedProduct[0].totalPrice).toBe(30);
        expect(upgradedProduct[0].id).toBe('organic apple-bag');
        // TODO handle edge cases
    });
    it('should find a more expensive option if available', () => {
       const upsellId = products[0].upsellProductId;
       const upgradeOption = upgrade.findMoreExpensiveProduct(upsellId, upgrades);
       expect(upgradeOption?.id).toBe('organic apple-bag');
       // TODO handle edge cases
    });
    it('should find more expensive option return the pricedifference and the upgrade', () => {
        const upgradeOption = upgrade.hasUpgradeOption(products[0], upgrades);
        expect(upgradeOption.hasUpgrade).toBeTruthy;
        expect(upgradeOption.moreExpensiveOption?.id).toBe('organic apple-bag');
        expect(upgradeOption.priceDifference).toBe(5);
        // TODO handle edge cases
    });
});