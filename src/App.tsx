import {useState} from "react"
import './assets/Styles/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './Components/price.ts'
import stage2 from './Stages/StageDelivery.tsx'


function App() {
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


    return (
        <>
            {menu()}
            {stageBasket()}
            {total()}

            <div id= "basket">
                {stage2()}

            </div>
        </>
    );
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
