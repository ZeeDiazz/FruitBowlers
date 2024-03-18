import {useState} from "react"
import './assets/Styles/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './Components/price.ts'
import stage2 from './Stages/StageDelivery.tsx'


function App() {



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
