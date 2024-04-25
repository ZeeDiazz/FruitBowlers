import './assets/Styles/large/App.css'
import './Components/product.ts'
import './Components/upgrade.tsx'
import './assets/Styles/default/DefaultStyling.css'
import { header } from "./Components/header.tsx";
import { createContext } from 'react';
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
    comment:string,
    receiveEmails:boolean,
    Total:number,



}
export const FormContext = createContext(form);


export function App() {

    return (
        <>
            <header>
                {header()}
            </header>
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
