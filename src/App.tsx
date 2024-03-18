import {useState} from "react"
import './App.css'
import './product.tsx'
import stage2 from './StageTwo.tsx'


interface UpgradeButtonProps {
    product: Product;
    upgrades: Product[];
    handleUpgradeClick: (index: number, amount: number) => void;
}

function App() {
  const [products,setProduct] = useState<Product[]>([
    { 
        id: "apple-bag",
        name: "Apples",
        price: 25,
        description: "There are 5 apples in one bag",
        currency: "DKK",
        discountQuantity: 2,
        discountPercent: 10,
        upsellProductId: null,
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
      upsellProductId: null,
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
    // Function to find the more expensive product with the same name
    const findMoreExpensiveProduct = (productName: string, upgrades: Product[]): Product | null => {
        const upgrade: Product | undefined = upgrades.find((product): boolean => product.name === productName);
        if (upgrade) {
            return upgrade;
        }
        return null;
    };
    //If there is a more expensive product with the same name in the product-list.
    const hasUpgradeOption = (product: Product, upgrades: Product[]): {
        moreExpensiveOption: Product | null;
        hasUpgrade: boolean, priceDifference: number
    } => {
        const upgrade: Product | null = findMoreExpensiveProduct(product.name, upgrades);
        if (upgrade !== null && upgrade.price > product.price) {
            const priceDifference: number = upgrade.price - product.price;  // does not take discount into account
            return { hasUpgrade: true, priceDifference: priceDifference, moreExpensiveOption: upgrade };
        }
        return { hasUpgrade: false, priceDifference: 0, moreExpensiveOption: null };
    };

    function handleUpgradeClick(newProduct: Product | null, index: number) {
        const quantity: number = products[index].quantity;
        const newProducts: Product[] = products.slice();
        if (newProduct) {
            newProducts[index] = newProduct;
            newProducts[index].quantity = quantity;
            newProducts[index].totalPrice = newProduct.price * quantity;
        }
        setProduct(newProducts);
    }

    const UpgradeButton: React.FC<UpgradeButtonProps> = ({ product, upgrades, handleUpgradeClick }) => {
        const { hasUpgrade, priceDifference } = hasUpgradeOption(product, upgrades);

        return (
            <>
                {hasUpgrade && (
                    <button
                        style={{ float: "left", marginRight: "10px" }}
                        onClick={() => handleUpgradeClick(products.indexOf(product), 1)}>
                        Organic available! Change for {priceDifference} DKK a piece?
                    </button>
                )}
            </>
        );
    };

    const productBoxItems = products.map((product, index) => (
        products[index].quantity != 0 &&(
        <div id= "productBox" key={product.id}>
            <ProductItem
                product={product}
                totalAmount = {calculateLocalTotalPrice(index)}
            />{/*
            the following two lines of code, displays if there is a local discount available or if a discount has been applied
            displays nothing if the item has no discount available
            */}
            {product.quantity < product.discountQuantity && <p>Buy {product.discountQuantity} for a discount</p>}
            {product.quantity >= product.discountQuantity && product.discountQuantity != 0 && <p>{product.discountPercent}% discount</p>}
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

    const totalQuantity: number = products.reduce((acc, product) => acc + product.quantity, 0);
    const totalPriceDiscounted: number = calculateTotalPrice();

    return (
        <>
            {menu()}
            <div id = "basket">
                <div className="title-container">
                    <img
                        src= {`/images/stage1-fat.png`}
                        alt= "Step 1"
                        className="stage1"
                    />
                    <h2>Basket</h2>
                </div>

                {productBoxItems}

            </div>
            <div id = "totalBox">
                <div id = "totalBoxText">
                    <h2>Total</h2>
                    <p>Total Quantity: {totalQuantity}</p>
                    {getDiscountMessage(totalPriceDiscounted)}
                    <p>Total Price: {totalPriceDiscounted} &nbsp; {products[0].currency}</p>
                </div>
            </div>

            <div id= "basket">
                {stage2()}

            </div>
        </>
    );
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
function getDiscountMessage(totalPriceDiscount: number): string {
    const remainingAmountForDiscount = 300 - totalPriceDiscount;
    if (totalPriceDiscount < 300) {
        return `Get 10% discount when buying for ${remainingAmountForDiscount} DKK more!`;
    } else {
        return 'You get 10% discount!';
    }
}
function menu(){
  return(
    <div id= "titleName">
      <img src="images/LOGO.png" alt="Fruit Bowlers" />
      <div id= "line"/>
    </div>
  )
}


export default App
