import './assets/Styles/large/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './assets/Styles/default/DefaultStyling.css'
import {stageDelivery} from './Stages/StageDelivery.tsx'
import {stageBasket} from './Stages/StageBasket.tsx'
import {header} from "./Components/header.tsx";
import AccessPayment from "./Stages/StagePayment.tsx";

function App() {
    return (
        <>
            <header>
                {header()}
            </header>
            <body>
                {stageBasket()}

                {stageDelivery()}

                <AccessPayment />
            </body>
            <footer>

            </footer>
        </>
    );
}
export default App 
