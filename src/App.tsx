import './assets/Styles/large/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './assets/Styles/default/DefaultStyling.css'
import { header } from "./Components/header.tsx";
import {Context, createContext} from 'react';
import { Outlet } from "react-router-dom";

interface formInterface {
    Name: string;
    LastName: string;
    Email: string;
    companyName?: string;
    VATnum?: string;
    zipcode1: number;
    City: string;
    streetName: string;
    Telephone: number;
}

const form: formInterface = {

    Name: "Zayd",
    LastName: "Doe",
    Email: "zayd.doe@example.com",
    zipcode1: 12345,
    City: "Copenhagen",
    streetName: "Main Street",
    Telephone: 12345678
}
interface priceInterface{
    totalPrice:number,
    totalQuantity:number
}

const totalPrisData:priceInterface = {
    totalPrice: 0,
    totalQuantity:0
}

interface DataInterface{
    forms: formInterface,
    totalPriceDatas: priceInterface
}

const data: DataInterface = {
    forms: form,
    totalPriceDatas: totalPrisData
}

export const DataContext: Context<DataInterface>  = createContext(data);


export function App() {

    return (
        <>
            <header>
                {header()}
            </header>
            <main>
                <DataContext.Provider value={data}>
                    <div id="detail">
                        <Outlet />
                    </div>
                </DataContext.Provider>

            </main>
        </>
    );
}


export default App
