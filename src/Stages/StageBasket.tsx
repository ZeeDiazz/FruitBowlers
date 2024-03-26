import {calculateLocalTotalPrice,handleQuantityChange} from "../Components/price.ts";
import {handleUpgradeClick, hasUpgradeOption, UpgradeButton} from "../Components/upgrade.tsx"
//import productsData from '../../productsList.json';
//import upgradesData from '../../upgradesList.json';
import {useEffect, useState} from "react";
import {TotalBox} from "./StageTotal.tsx";
import '../assets/Styles/StageBacket.css'

export function stageBasket() {
    const [productsError, setProductsError] = useState(false);
    const [upgradesError, setUpgradesError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [products, setProducts] = useState<Product[]>([
        {
            id: 'test',
            name: 'test',
            price: 0,
            description:'test',
            currency: 'test',
            discountQuantity: 0,
            discountPercent: 0,
            upsellProductId: null,
            totalPrice: 0,
            quantity: 0,
        },

    ]);

    const [upgrades, setUpgrades] = useState<Product[]>([
        {
            id: 'test',
            name: 'test',
            price: 0,
            description:'test',
            currency: 'test',
            discountQuantity: 0,
            discountPercent: 0,
            upsellProductId: null,
            totalPrice: 0,
            quantity: 0,
        }
    ]);

    useEffect(() => {
        const url = 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/main/productsList.json';
        setIsLoading(true);
        getProduct(url)
            .then(products => {
                if(products.length === 0) {
                    setProductsError(true);
                }else {
                    setProducts(products);
                }
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        const url = 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/Fetch/upgradesList.json';
        getProduct(url)
            .then(upgrades => {
                if (upgrades.length === 0) {
                    setUpgradesError(true);
                } else{
                    setUpgrades(upgrades);

                }
            })
    }, []);

    const productBoxItems = products.map((product:Product, index:number) => (
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
                {isLoading ? <div className="error">Loading...</div> : productBoxItems}
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

async function getProduct(url: string): Promise<Product[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok, tried to access: ' + url);
        }
        const data = await response.json();
        return data as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}