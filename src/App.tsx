import './assets/Styles/large/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './assets/Styles/default/DefaultStyling.css'
import { header } from "./Components/header.tsx";
import {StageBasket} from "./Stages/StageBasket.tsx";
import {TotalBox} from "./Stages/StageTotal.tsx";
import {useBasketState} from "./Context/BasketContext.tsx";

export function App() {
    const {products} = useBasketState();
    return (
        <>
            <header>
                {header()}
            </header>
            <main>
                <StageBasket />
                <TotalBox products={products}/>
            </main>
        </>
    );
}

export default App
