import {calculateLocalTotalPrice,handleQuantityChange} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
//import productsData from '../../productsList.json';
//import upgradesData from '../../upgradesList.json';
import {useState} from "react";
import {TotalBox} from "./StageTotal.tsx";
import '../assets/Styles/StageBacket.css'
import '../assets/Styles/SmallScreen.css'

export function stageBasket() {
    const [products,setProducts] = useState<Product[]>([
        {
            id: "apple-bag",
            name: "Apples",
            price: 25,
            description: "There are 5 apples in one bag",
            currency: "DKK",
            discountQuantity: 2,
            discountPercent: 10,
            upsellProductId: 'organic apple-bag',
            totalPrice: 25,
            quantity: 1,
        },
        {
            id: "banana-bag",
            name: "Banana bag",
            price: 15,
            description: 'One eco banana is approximately 105g. There are 5 bananas in one bag',
            currency: 'DKK',
            discountQuantity: 5,
            discountPercent: 10,
            upsellProductId: null,
            totalPrice: 75,
            quantity: 5,
        },
        {
            id: 'lemon-bag',
            name: 'Lemon bag, 6 pieces',
            price: 15,
            description: 'One eco lemon bag is approximately 500g.',
            currency: 'DKK',
            discountQuantity: 4,
            discountPercent: 10,
            upsellProductId: null,
            totalPrice: 30,
            quantity: 2,
        },
        {
            id: 'non-organic strawberries',
            name: 'Strawberries',
            price: 25,
            description: '300g, non-organic, strawberries',
            currency: 'DKK',
            discountQuantity: 4,
            discountPercent: 10,
            upsellProductId: 'strawberries',
            totalPrice: 25,
            quantity: 1,
        }]);
        const upgrades: Product[] = [
        {
            id: 'strawberries',
            name: 'Strawberries',
            price: 35,
            description: '300g, eco, danish strawberries',
            currency: 'DKK',
            discountQuantity: 0,
            discountPercent: 0,
            upsellProductId: null,
            totalPrice: 0,
            quantity: 0,
        },
        {
            id: "organic apple-bag",
            name: "Apples",
            price: 30,
            description: "Organic apples from Denmark",
            currency: "DKK",
            discountQuantity: 0,
            discountPercent: 0,
            upsellProductId: null,
            totalPrice: 30,
            quantity: 0,
        },];

    const productBoxItems = products.map((product:Product, index:number) => (
        products[index].quantity != 0 && (
            <div id="productBox" key={product.id}>
                <ProductItem
                    product={product}
                    totalAmount={calculateLocalTotalPrice(products,index)}
                />{/*
            the following two lines of code, displays if there is a local discount available or if a discount has been applied
            displays nothing if the item has no discount available
            */}
                {product.quantity < product.discountQuantity && <p>Buy {product.discountQuantity} for a discount</p>}
                {product.quantity >= product.discountQuantity && product.discountQuantity != 0 &&
                    <p>{product.discountPercent}% discount</p>}
                <div id="quantityBox">
                    <UpgradeButton
                        product={product}
                        upgrades={upgrades}
                        handleUpgradeClick={(index) => {
                            const upgradeOption = hasUpgradeOption(product, upgrades);
                            if (upgradeOption.hasUpgrade && upgradeOption.moreExpensiveOption) {
                                setProducts(handleUpgradeClick(products, upgradeOption.moreExpensiveOption, index));
                            }
                        }}
                    />
                    <button className="decrease" onClick={() => setProducts(handleQuantityChange(products,index,-1))}
                            disabled={product.quantity <= 1}>
                        -
                    </button>
                    <span>{product.quantity}</span>
                    <button className="increase" onClick={() => setProducts(handleQuantityChange(products,index,+1))}>
                        +
                    </button>
                    <button className="remove" onClick={() => setProducts(handleQuantityChange(products,index,0))}>
                        remove
                    </button>
                </div>
            </div>
        )
    ));
    return (
        <>
            <div id="basket">
                <div className="title-container">
                    <img
                        src={`/images/stage1-fat.png`}
                        alt="Step 1"
                        className="stage1"
                    />
                    <h2>Basket</h2>
                </div>
                {productBoxItems}

            </div>
            {TotalBox(products)}
        </>
    )
}
function ProductItem({product, totalAmount}: ProductItemProps){
    return (
        <>
            {getImage(product)}
            <div id = "nameTag">
                {product.name}
            </div>
            &emsp;
            <div id = "priceTag">
                {"Total amount: "}
                &nbsp;
                {totalAmount}
                &nbsp;
                {product.currency}
            </div>
            <div id = "desc">
                <p>{product.description}</p>
            </div>
        </>
    )
}
function getImage(product : Product){
    return (
        <>
            <img
                src= {`/images/${product.id}.png`}
                alt= {product.id}
                className="img"
            />
        </>
    )
}

