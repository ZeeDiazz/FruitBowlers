import {useState } from "react"
import './App.css'
import './product.tsx'


function ProductItem({product}: ProductItemProps){
  return (
    <>
      {getImage(product)}
      <div id = "nameTag">
        {product.name}
      </div>
      &emsp;
      <div id = "priceTag">
        {product.price}
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
  const [products] = useState<Product[]>([
    { 
      id: "apple-bag",
      name: "Apple bag, 5 pieces",
      price: 20,
      description: "There are 5 apples in one bag",
      currency: "DKK",
      discountQuantity: 2,
      discountPercent: 10,
      upsellProductId: null
    },
    {
      id: "banana-bag",
      name: "Banana bag",
      price: 15,
      description: 'One eco banana is approximately 105g. There are 5 bananas in one bag',
      currency: 'DKK',
      discountQuantity: 5,
      discountPercent: 10,
      upsellProductId: null
    },
    {
      id: 'lemon-bag',
      name: 'Lemon bag, 6 pieces',
      price: 15,
      description: 'One eco lemon bag is approximately 500g.',
      currency: 'DKK',
      discountQuantity: 4,
      discountPercent: 10,
      upsellProductId: null
    },
    {
      id: 'strawberries',
      name: 'Strawberries',
      price: 35,
      description: '300g, organic, danish strawberries',
      currency: 'DKK',
      discountQuantity: 3,
      discountPercent: 15,
      upsellProductId: null
    },
    {
      id: 'non-organic strawberries',
      name: 'Strawberries',
      price: 25,
      description: '300g, non-organic, strawberries',
      currency: 'DKK',
      discountQuantity: 4,
      discountPercent: 10,
      upsellProductId: null
      }
  ]);
//We set the amount of each item to be 1 here. We should maybe connect it to a users fictional basket instead?
  const [basket, setBasket] =
      useState(Array(products.length).fill(1));
  function handleAmountChange(index: number, amount: number | null){
      const newBasket = basket.slice();
      if(amount === null){
          newBasket[index] = null;
      }else{
          newBasket[index] += amount
      }
      setBasket(newBasket);
      console.log(basket);
  }
  const calculateLocalTotalPrice = (index: number) => {
      return basket[index] * products[index].price;
  };
  const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (let i = 0; i < basket.length; i++) {
          totalPrice += calculateLocalTotalPrice(i);
      }
      return totalPrice;
  };

  const totalQuantity = basket.reduce((total, quantity) => total + quantity, 0);
  const totalPrice = calculateTotalPrice();

    function getDiscountMessage(): string {
        const remainingAmountForDiscount = 300 - totalPrice;

        if (totalPrice < 300) {
            return `Get 10% discount when buying for ${remainingAmountForDiscount} DKK more!`;
        } else {
            return 'You get 10% discount!';
        }
    }
    function handleUpgradeClick( oldProduct: Product, newProduct: Product | null) {
        const index = products.findIndex((product) => product.id === oldProduct.id);
        const currentAmount = basket[index];

        console.log(`Upgrade ${oldProduct.name} to ${newProduct?.name} at index ${index.valueOf()} with amount ${currentAmount}`);
        setBasket(prevBasket => {
            const newBasket = [...prevBasket];
            // Decrease the amount of the old product
            newBasket[index] = null;
            // Increase the amount of the new product
            if (newProduct) {
                const newProductIndex = products.findIndex((product) => product.id === newProduct.id);
                newBasket[newProductIndex] += currentAmount;
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
      basket[index] != null &&( // only render product if it's in the basket
        <div id= "productBox" key={product.id}>
            <ProductItem product={product}/>
            <div id= "adjustable">
                <UpgradeButton
                    product={product}
                    products={products}
                    handleUpgradeClick={() => handleUpgradeClick( product, hasUpgradeOption(product, products).moreExpensiveOption)}
                />

            <CartItem
                value={basket[index]}
                onDecrement={() => handleAmountChange(index, -1)}
                onIncrement={() => handleAmountChange(index, 1)}
                onRemove={() => handleAmountChange(index,null)}
            />
            </div>
        </div>
      )
  ));

  return (
      <>
          {/*Should move titleName another place*/}
          {menu()}
          <div id= "basket">
            <div className="title-container">
              <img
                  src= {`/images/stage1.png`}
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
                <p>Total Price: {totalPrice} &nbsp; {products[0].currency}</p>
                  {getDiscountMessage()}
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

function CartItem({value, onIncrement, onDecrement, onRemove}: any /* YES ANY, just for now*/) {
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
        x
      </button>
    </>
  );
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

function menu(){
  return(
    <div id= "titleName">
      <h1>Fruit Bowlers</h1>
      <div id= "line"></div>
    </div>
  )
}


export default App
