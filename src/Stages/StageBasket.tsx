import {calculateLocalTotalPrice,handleQuantityChange} from "../Components/price.ts";
import productsData from '../productsList.json';
import upgradesData from '../upgradesList.json';
import {useState} from "react";



const [products, setProducts] = useState(productsData); // make type specific
const upgrades: Product[] = upgradesData;
export const productBoxItems = products.map((product, index) => (
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
                    handleUpgradeClick={() => handleUpgradeClick(hasUpgradeOption(product, upgrades).moreExpensiveOption, index)}
                />

                <button className="decrease" onClick={() => handleQuantityChange(index, -1)}
                        disabled={product.quantity <= 1}>
                    -
                </button>
                <span>{product.quantity}</span>
                <button className="increase" onClick={() => handleQuantityChange(index, 1)}>
                    +
                </button>
                <button className="remove" onClick={() => handleQuantityChange(index, 0)}>
                    remove
                </button>
            </div>
        </div>
    )
));

function stageBasket() {


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

