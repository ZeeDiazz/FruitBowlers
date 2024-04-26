import {
    calculateLocalTotalPrice,
    getTotalPriceDiscounted,
    getTotalQuantity,
    handleQuantityChange
} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
import {TotalBox} from "./StageTotal.tsx";
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import {fetchData, useFetch} from "../Components/useFetch.ts";
import { Link } from 'react-router-dom';
import {useContext, useEffect} from "react";
import {useBasketDispatch, useBasketState} from "./BasketContext.tsx";

export function StageBasket() {


    const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const productsUrl: string = base + 'main/productsList.json';
    const upgradesUrl: string = base + 'main/upgradesList.json';

    const { products, isProductsLoading, productsError } = useBasketState();
    const [upgrades, , isUpgradesLoading, upgradesError] = useFetch(upgradesUrl);


    const dispatch = useBasketDispatch();

    const fetchProduct = async (url: string) => {
        dispatch({ type: "fetchingProduct"} ); // Set isLoading to true before fetch

        try {
            const response = await fetch(url);
            const fetchedProducts = await response.json();
            dispatch({ type: "fetchedProduct", payload: { products: fetchedProducts } });
        } catch (error) {
            dispatch({ type: "productsError", payload: { failed: true } }); // Set error message
        }
    };
   /* const fetchUpgrade = async (url: string) => {
        dispatch({ type: "fetchingUpgrade"} ); // Set isLoading to true before fetch

        try {
            const response = await fetch(url);
            const fetchedProducts = await response.json();
            dispatch({ type: "fetchedUpgrades", payload: { upgrades: fetchedProducts } });
        } catch (error) {
            dispatch({ type: "upgradesError", payload: { upgrade: true } }); // Set error message
        }
    };*/

    useEffect(() => {
        fetchProduct(productsUrl);
    }, [productsUrl]);

    /*useEffect(() => {
        fetchUpgrade(upgradesUrl);
    }, [upgradesUrl]);*/


    const productBoxItems = products && products.map((product:Product, index:number) => (
        !productsError && product.quantity > 0 && (
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
                                    dispatch({type:"quantityChange",  payload:  { products: handleUpgradeClick(products, upgradeOption.moreExpensiveOption, product. quantity,index)}})
                                }
                            }}
                        />
                    }
                    <nav className={"productChangeNavigation"}>
                        <div>
                            <button className="decrease"
                                    data-testid="decrease-button"
                                    onClick={() =>  dispatch({ type: "quantityChange", payload: { products: handleQuantityChange(products, index, -1) } })}
                                    disabled={product.quantity <= 1}>
                                -
                            </button>
                            <span data-testid="quantity">{product.quantity}</span>
                            <button className="increase"
                                    data-testid="increase-button"
                                    onClick={() =>  dispatch({ type: "quantityChange", payload: { products: handleQuantityChange(products, index, +1) } })}
                                    >
                                +
                            </button>
                        </div>
                        <button className="remove"
                                data-testid="remove-button"
                                onClick={() =>  dispatch({ type: "quantityChange", payload: { products: handleQuantityChange(products, index, 0) } })}>
                            remove
                        </button>
                    </nav>
                </div>
            </div>
        )
    ));

    return (
        <>
            <Link to="/StageDelivery" >Continue</Link>

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
                    {isProductsLoading || isUpgradesLoading ? <div className="error">Loading...</div> : productBoxItems}                </div>
            </div>
            {isProductsLoading ?  <div className="error">Loading...</div> : <TotalBox products={products} />}
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
