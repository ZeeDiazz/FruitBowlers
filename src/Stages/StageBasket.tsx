import {
    calculateLocalTotalPrice, getTotalQuantity,
    handleQuantityChange
} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
import '../assets/Styles/large/StageBasket.css'
import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/320px/SmallScreenBasket.css'
import '../assets/Styles/default/DefaultStyling.css'
import {useFetch} from "../Components/useFetch.ts";
import {useNavigate} from 'react-router-dom';
import {useEffect, useRef} from "react";
import {useBasketDispatch, useBasketState} from "../Context/BasketContext.tsx";

export function StageBasket() {
    const base : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const productsUrl: string = base + 'main/productsList.json';
    const upgradesUrl: string = base + 'main/upgradesList.json';

    const { products, isProductsLoading, productsError } = useBasketState();
    const [upgrades, isUpgradesLoading, upgradesError] = useFetch(upgradesUrl);
    const navigate = useNavigate();

    const dispatch = useBasketDispatch();
    const hasFetchedProducts = useRef(false); // Flag to track fetch status

    const fetchProduct = async (url: string) => {
        dispatch({ type: "fetchingProduct"} ); // Set isLoading to true before fetch

        try {
            const response = await fetch(url);
            const fetchedProducts = await response.json();
            if (!response.ok) {
                throw new Error('Network response was not ok, tried to access: ' + url);
            }
            dispatch({ type: "fetchedProduct", payload: { products: fetchedProducts } });
        } catch (error) {
            dispatch({ type: "productsError", payload: { failed: true } }); // Set error message
        }
    };

    useEffect(() => {
        if (!hasFetchedProducts.current && !products.length) {
            // Only fetch if products are empty and haven't been fetched yet
            dispatch({ type: "fetchingProduct" }); // Set isLoading to true before fetch
            fetchProduct(productsUrl)
                .then(() => (hasFetchedProducts.current = true)) // Mark fetch completed
                .catch(() =>
                    dispatch({ type: "productsError", payload: { failed: true } })
                );
        }
    }, [products, productsUrl, dispatch]);

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
                    {/*product.quantity >= product.discountQuantity && product.discountQuantity != 0  &&
                        <p>{product.discountPercent}% discount</p>*/}
                </div>

                <div id="quantityBox">
                    {!upgradesError &&
                        <UpgradeButton
                            product={product}
                            upgrades={upgrades}
                            onUpgradeClick = {() => {
                                const upgradeOption = hasUpgradeOption(product, upgrades);
                                if (upgradeOption.hasUpgrade && upgradeOption.moreExpensiveOption) {
                                    dispatch({type:"upgradeProduct",  payload:  { upgrade: handleUpgradeClick(products, upgradeOption.moreExpensiveOption, product. quantity,index)}})
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
                    {isProductsLoading || isUpgradesLoading ? <div className="error">Loading...</div> : productBoxItems}
                    {getTotalQuantity(products) === 0 && <p> Basket is empty </p>}
                    {getTotalQuantity(products) != 0 ? <button className={"NudgeButton"} onClick={() => navigate('/Delivery')}>Continue</button> : <p>Reload page to restore basket </p>}
                </div>
            </div>
            {/*isProductsLoading ?  <div className="error">Loading...</div> : <TotalBox products={products} />*/}
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

                    {/*{/*Before the discount is applied
                    <span>
                        {product.quantity < product.discountQuantity  && totalAmount}
                    </span>*/}

                    {/*After the discount is applied*/}
                    {product.quantity >= product.discountQuantity && product.discountQuantity !== 0 ?
                        (
                            //After the discount is applied
                            <div className="Discounted">
                                <span id="originalprice">{product.totalPrice}</span>
                                <span className="total-amount">{totalAmount}</span>
                            </div>
                        ) :
                        (
                            //Before the discount is applied
                            <span>
                                {totalAmount}
                            </span>
                        )
                    }
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