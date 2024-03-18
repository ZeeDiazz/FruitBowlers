import './assets/Styles/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import stage2 from './Stages/StageDelivery.tsx'
import  {stageBasket} from './Stages/StageBasket.tsx'

function App() {

    return (
        <>
            {menu()}
            {stageBasket()}
            <div id="basket">
                {stage2()}
            </div>

        </>
    );
}

function menu() {
    return (
        <div id="titleName">
        <img src="images/LOGO.png" alt="Fruit Bowlers" />
      <div id= "line"/>
    </div>
  )
}


export default App
