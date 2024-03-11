import {useState } from "react"
import './App.css'
import './product.tsx'


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
        name: "Apple bag, 5 pieces",
        price: 20,
        description: "There are 5 apples in one bag",
        currency: "DKK",
        discountQuantity: 2,
        discountPercent: 10,
        upsellProductId: null,
        totalPrice: 20,
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
        id: 'strawberries',
        name: 'Strawberries',
        price: 35,
        description: '300g, eco, danish strawberries',
        currency: 'DKK',
        discountQuantity: 3,
        discountPercent: 15,
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

  function calculateLocalTotalPrice(index: number){
      if(products[index].quantity >= products[index].discountQuantity){
          return products[index].totalPrice * (1 - products[index].discountPercent / 100);
      }
    return products[index].totalPrice;
  }
  function calculateTotalPrice(){
      let totalPrice = 0;
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
      const newProducts = products.slice();
      const product = newProducts[index];

      if (newQuantity === 0) {
          product.quantity = 0;
      } else {
          product.quantity += newQuantity;
          product.totalPrice += newQuantity * product.price; // if quantity input ever is changed, product.price * quantity is added to totalPrice
      }

      setProduct(newProducts);
    }
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const totalPriceDiscounted = calculateTotalPrice();


    function handleUpgradeClick( oldProduct: Product, newProduct: Product | null, index: number) {
        const quantity = products[index].quantity;
        console.log("quantity of old product: " + quantity);
        console.log(`Upgrade ${oldProduct.name} to ${newProduct?.name} at index ${index.valueOf()} with amount ${quantity}`);
        setProduct(prevBasket => {
            const newBasket = [...prevBasket];
            // Decrease the amount of the old product
            newBasket[index].quantity = 0;
            // Increase the amount of the new product
            if (newProduct) {
                const newProductIndex = products.findIndex((product) => product.id === newProduct.id);
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
            />
            {product.quantity < product.discountQuantity && <p>Buy {product.discountQuantity} for a discount</p>}
            {product.quantity >= product.discountQuantity && <p>{product.discountPercent}% discount</p>}
            <div id="quantityBox">
                <UpgradeButton
                    product={product}
                    products={products}
                    handleUpgradeClick={() => handleUpgradeClick(product, hasUpgradeOption(product, products).moreExpensiveOption, index)}
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
            {/*Should move titleName another place*/}
            {menu()}
            <div id="basket">
                <div className="title-container">
                    <img
                        src={`/images/stage1.png`}
                        className="stage1"
                    />
                    <h2>Basket</h2>
                </div>

                {productBoxItems}

            </div>
            {/* Display the total quantity */}
            {/* Should move TotalBox some place else*/}
              <div id = "totalBox">
                <h2>Total</h2>
                <p>Total Quantity: {totalQuantity}</p>
                  {getDiscountMessage(totalPriceDiscounted)}
                <p>Total Price: {totalPriceDiscounted} &nbsp; {products[0].currency}</p>
              </div>
      </>
  );
}

//If there is a more expensive product with the same name in the product-list.
const hasUpgradeOption = (product: Product, products: Product[]): {
    moreExpensiveOption: Product | null;
    hasUpgrade: boolean, priceDifference: number
} => {
    const moreExpensiveProduct = findMoreExpensiveProduct(product.name, products);

    if (moreExpensiveProduct !== null && moreExpensiveProduct.price > product.price) {
        const priceDifference = moreExpensiveProduct.price - product.price;
        return { hasUpgrade: true, priceDifference: priceDifference, moreExpensiveOption: moreExpensiveProduct };
    }
    return { hasUpgrade: false, priceDifference: 0, moreExpensiveOption: null };
};


// Function to find the more expensive product with the same name
const findMoreExpensiveProduct = (productName: string, products: Product[]): Product | null => {
    const productsWithSameName = products.filter(
        (product) => product.name === productName
    );
    if (productsWithSameName.length <= 1) {
        return null; // No more expensive alternative found
    }
    return productsWithSameName.reduce((moreExpensiveProduct, currentProduct) =>
        moreExpensiveProduct.price > currentProduct.price ? moreExpensiveProduct : currentProduct
    );
};

/*
function CartItem({value, onIncrement, onDecrement, onRemove}: any) {
    return (
        <>

        <button className="decrease" onClick={onDecrement} disabled={value <= 1}>
        -
      </button>
      <span>{value}</span>
      <button className="increase" onClick={onIncrement}>
        +
      </button>
      <button className="remove" onClick={onRemove}>
        %
      </button>
    </>
  );
}
*/


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
        return `Get 10% discount when buying for ${remainingAmountForDiscount} more!`;
    } else {
        return 'You get 10% discount!';
    }
}
function menu(){
  return(
    <div id= "titleName">
      <h1>Fruit Bowlers</h1>
      <div id= "line"></div>
    </div>
  )
}


export default App
