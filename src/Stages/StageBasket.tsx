import {calculateLocalTotalPrice,handleQuantityChange} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
//import productsData from '../../productsList.json';
//import upgradesData from '../../upgradesList.json';
//import {useEffect, useState} from "react";
import {TotalBox} from "./StageTotal.tsx";
import '../assets/Styles/StageBacket.css'
import {useFetch} from "../Components/useFetch.ts";
import {useEffect} from "react";

export function StageBasket() {
    const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const productsUrl: string = base + 'main/productsList.json';
    const upgradesUrl: string = base + 'Fetch/upgradesList.json';

    const [products, setProducts, productsLoading, productsError] = useFetch(productsUrl);
    const [upgrades, setUpgrades, upgradesLoading, upgradesError] = useFetch(upgradesUrl);

    const productBoxItems = products && products.map((product:Product, index:number) => (
        !productsError && (
            <div id="productBox" key={product.id}>
                <ProductItem
                    product={product}
                    totalAmount={calculateLocalTotalPrice(products,index)}
                />{/*
            the following two lines of code, displays if there is a local discount available or if a discount has been applied
            displays nothing if the item has no discount available
            */}
                {product.quantity < product.discountQuantity  && <p>Buy {product.discountQuantity} for a discount</p>}
                {product.quantity >= product.discountQuantity && product.discountQuantity != 0 &&
                    <p>{product.discountPercent}% discount</p>}
                <div id="quantityBox">
                    {!upgradesError &&
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
                    }
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
                {productsError && <p>Error fetching products</p>}
                {productsLoading || upgradesLoading ? <div className="error">Loading...</div> : productBoxItems}
            </div>
            {productsLoading ?  <div className="error">Loading...</div> : <TotalBox products={products} />}
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
