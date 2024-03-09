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
      description: '300g, eco, danish strawberries',
      currency: 'DKK',
      discountQuantity: 3,
      discountPercent: 15,
      upsellProductId: null
    },
  ]);

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

  const productBoxItems = products.map((product, index) => (
      basket[index] != null &&( // only render product if its in the basket
        <div id= "productBox" key={product.id}>
            <ProductItem product={product}/>
            <div id= "adjustable">
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
              </div>
      </>
  );
}

function CartItem({value, onIncrement, onDecrement, onRemove}:any /* YES ANY, just for now*/) {
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
