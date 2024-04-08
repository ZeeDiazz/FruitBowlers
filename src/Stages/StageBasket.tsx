import {calculateLocalTotalPrice,handleQuantityChange} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
//import productsData from '../../productsList.json';
//import upgradesData from '../../upgradesList.json';
import {useState} from "react";
import {TotalBox} from "./StageTotal.tsx";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/StageBacket.css'
import {useFetch} from "../Components/useFetch.ts";
import {useEffect} from "react";

interface StageBasketProps {
    setTotalDiscountedPrice: React.Dispatch<React.SetStateAction<number>>
}

export function StageBasket() {
    const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const productsUrl: string = base + 'main/productsList.json';
    const upgradesUrl: string = base + 'main/upgradesList.json';

    const [products, setProducts, productsLoading, productsError] = useFetch(productsUrl);
    const [upgrades, setUpgrades, upgradesLoading, upgradesError] = useFetch(upgradesUrl);

    const productBoxItems = products && products.map((product:Product, index:number) => (
        !productsError && (
            <div className={"wholeProduct"} key={product.id}>
                <div className={"productStyling"}>
                    <ProductItem
                        product={product}
                        totalAmount={calculateLocalTotalPrice(products,index)}
                    />
                    {/*
            the following two lines of code, displays if there is a local discount available or if a discount has been applied
            displays nothing if the item has no discount available
            */}
                    {product.quantity < product.discountQuantity && <p>Buy {product.discountQuantity} for a discount</p>}
                    {product.quantity >= product.discountQuantity && product.discountQuantity != 0 &&
                        <p>{product.discountPercent}% discount</p>}
                </div>

                <div id="quantityBox">
                    {!upgradesError &&
                        <UpgradeButton
                            product={product}
                            upgrades={upgrades}
                            onUpgradeClick = {() => {
                                const upgradeOption = hasUpgradeOption(product, upgrades);
                                if (upgradeOption.hasUpgrade && upgradeOption.moreExpensiveOption) {
                                    setProducts(handleUpgradeClick(products, upgradeOption.moreExpensiveOption, product.quantity, index));
                                }
                            }}
                        />
                    }
                    <nav className={"productChangeNavigation"}>
                        <div>
                            <button className="decrease"
                                    onClick={() => setProducts(handleQuantityChange(products, index, -1))}
                                    disabled={product.quantity <= 1}>
                                -
                            </button>
                            <span>{product.quantity}</span>
                            <button className="increase"
                                    onClick={() => setProducts(handleQuantityChange(products, index, +1))}>
                                +
                            </button>
                        </div>
                        <button className="remove"
                                onClick={() => setProducts(handleQuantityChange(products, index, 0))}>
                            remove
                        </button>
                    </nav>
                </div>
            </div>
        )
    ));
    return (
        <>
            <div className="stageBoxes">
                <div className="title-container">
                    <img
                        src={`/images/stage1-fat.png`}
                        alt="product overview"
                        className="stageIcons"
                    />
                    <h2>Basket</h2>
                </div>
                <div id="productBox">
                    {productsError && <p>Error fetching products</p>}
                    {productsLoading || upgradesLoading ? <div className="error">Loading...</div> : productBoxItems}                </div>
            </div>
            {productsLoading ?  <div className="error">Loading...</div> : <TotalBox products={products} />}
        </>
    )
}
function ProductItem({product, totalAmount}: ProductItemProps){
    return (
        <div>
            <div className={"ProductInfo"}>
                <div>
                    {getImage(product)}
                    <div id="nameTag">
                        {product.name}
                    </div>
                </div>
                {/*&emsp;*/}
                <div id="priceTag">
                    {"Total amount: "}
                    {/*&nbsp;*/}
                    {totalAmount}
                    &nbsp;
                    {product.currency}
                </div>
            </div>
            <div className={"productDescriptionBox"}>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

function getImage(product: Product) {
    return (
        <>
            <img
                src={`/images/${product.id}.png`}
                alt={product.id}
                className="productImg"
            />
        </>
    )
}

