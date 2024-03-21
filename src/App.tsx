import './assets/Styles/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import {stageDelivery} from './Stages/StageDelivery.tsx'
import {stageBasket} from './Stages/StageBasket.tsx'
import {header} from "./Components/header.tsx";
import AccessPayment from "./Stages/StagePayment.tsx";

function App() {
    return (
        <>
            {header()}
            {stageBasket()}
            <div id="basket">
                {stageDelivery()}
            </div>
            <AccessPayment />

        </>
    );
}
export default App
