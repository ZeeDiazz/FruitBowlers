import './assets/Styles/large/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './assets/Styles/default/DefaultStyling.css'
import { StageDelivery } from './Stages/StageDelivery.tsx'
import { StageBasket } from './Stages/StageBasket.tsx'
import { header } from "./Components/header.tsx";
import ChoosePayment from "./Stages/StagePayment.tsx";
import {stageTermsNConditions} from "./Stages/StageTermsNConditions.tsx";
import { useState } from 'react'
import { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
interface dataInterface {
    form:formInterface;


}

export const FormContext = createContext(form);





export function App() {



    return (
        <>
            <header>
                {header()}
            </header>
            <Link to="/StageDelivery">Continue</Link>
            <main>
                <FormContext.Provider value={form}>
                    <div id="detail">
                        <Outlet />
                    </div>
                </FormContext.Provider>

            </main>
        </>
    );
}


export default App
