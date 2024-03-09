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
        {"Total amount: "}
        &nbsp;
        {product.totalPrice}
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
  const [products,setBasket] = useState<Product[]>([
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
        totalPrice: 35,
        quantity: 1,
    },
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
          product.totalPrice += product.price; // if quantity input ever is changed, product.price * quantity is added to totalPrice
      }

      setBasket(newProducts);
    }
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const totalPriceDiscounted = calculateTotalPrice();
  const totalPriceNoDiscount = products.reduce((acc, product) => acc + product.totalPrice, 0);

  const productBoxItems = products.map((product, index) => (
      products[index].quantity != 0 &&( // only render product if its in the basket
        <div id= "productBox">
            <p>
              <ProductItem key={product.id} product={product}/>
            </p>
            <div id = "quantityBox">
              <button className="decrease" onClick={() => handleQuantityChange(index, -1)} disabled={product.quantity <= 1}>
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
                <p>Total Price: {totalPriceDiscounted} &nbsp; {products[0].currency}</p>
                <p>Total Price before discount: {totalPriceNoDiscount} &nbsp; {products[0].currency}</p>
              </div>
      </>
  );
}

/*function CartItem({value, onIncrement, onDecrement, onRemove}:any) {
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

function menu(){
  return(
    <div id= "titleName">
      <h1>Fruit Bowlers</h1>
      <div id= "line"></div>
    </div>
  )
}


export default App
