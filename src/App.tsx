import {useState} from "react"
import './App.css'
import './product.tsx'
import stage2 from './StageTwo.tsx'


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
        totalPrice: 20,
        quantity: 1,
    },
    {
        id: "Organic apple-bag",
        name: "Apples",
        price: 30,
        description: "Organic apples from Denmark",
        currency: "DKK",
        discountQuantity: 0,
        discountPercent: 0,
        upsellProductId: null,
        totalPrice: 30,
        quantity: 0,
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
      }
  ]);

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
  const totalQuantity: number = products.reduce((acc, product) => acc + product.quantity, 0);
  const totalPriceDiscounted: number = calculateTotalPrice();


    function handleUpgradeClick(newProduct: Product | null, index: number) {
        const quantity: number = products[index].quantity;

        setProduct(prevBasket => {
            const newBasket: Product[] = [...prevBasket];
            // Decrease the amount of the old product
            newBasket[index].quantity = 0;
            // Increase the amount of the new product
            if (newProduct) {
                const newProductIndex: number = products.findIndex((product): boolean => product.id === newProduct.id);
                newBasket[newProductIndex].quantity = quantity;
                newBasket[newProductIndex].totalPrice = quantity * newProduct.price;
            }
            return newBasket;
        });
    }

    interface UpgradeButtonProps {
        product: Product;
        products: Product[];
        handleUpgradeClick: (index: number, amount: number) => void;
    }

    const UpgradeButton: React.FC<UpgradeButtonProps> = ({ product, products, handleUpgradeClick }) => {
        const { hasUpgrade, priceDifference } = hasUpgradeOption(product, products);

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
                    products={products}
                    handleUpgradeClick={() => handleUpgradeClick(hasUpgradeOption(product, products).moreExpensiveOption, index)}
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

//If there is a more expensive product with the same name in the product-list.
const hasUpgradeOption = (product: Product, products: Product[]): {
    moreExpensiveOption: Product | null;
    hasUpgrade: boolean, priceDifference: number
} => {
    const moreExpensiveProduct: Product | null = findMoreExpensiveProduct(product.name, products);

    if (moreExpensiveProduct !== null && moreExpensiveProduct.price > product.price) {
        const priceDifference: number = moreExpensiveProduct.price - product.price;
        return { hasUpgrade: true, priceDifference: priceDifference, moreExpensiveOption: moreExpensiveProduct };
    }
    return { hasUpgrade: false, priceDifference: 0, moreExpensiveOption: null };
};


// Function to find the more expensive product with the same name
const findMoreExpensiveProduct = (productName: string, products: Product[]): Product | null => {
    const productsWithSameName: Product[] = products.filter(
        (product): boolean => product.name === productName
    );
    if (productsWithSameName.length <= 1) {
        return null; // No more expensive alternative found
    }
    return productsWithSameName.reduce((moreExpensiveProduct, currentProduct) =>
        moreExpensiveProduct.price > currentProduct.price ? moreExpensiveProduct : currentProduct
    );
};

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
    console.log("price given to the function " + totalPriceDiscount);
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
