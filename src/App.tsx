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

function App() {
    const [companyVATNumber, setCompanyVATNumber] = useState<string>('');
    const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);
    const isInvoiceEnabled = isValidVATNumber(companyVATNumber);
    interface Form {
        Name: string;
        LastName: string;
        Email: string;
        companyName?: string;
        VATnum?: string;
        Country: string;
        zipcode1: number;
        City: string;
        streetName: string;
        Landcode: string;
        Telephone: number;
    }
    const formDataList: Form = {

            Name: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            Country: "Denmark",
            zipcode1: 12345,
            City: "Copenhagen",
            streetName: "Main Street",
            Landcode: "+45",
            Telephone: 12345678
        }




    return (
        <>
            <header>
                {header()}
            </header>
            <main>
                <StageBasket setTotalDiscountedPrice={setTotalDiscountedPrice} />
                <StageDelivery setCompanyVATNumber={setCompanyVATNumber} companyVATNumber={companyVATNumber} formdata ={formDataList} />
                <ChoosePayment totalDiscountedPrice={totalDiscountedPrice} isInvoiceEnabled={isInvoiceEnabled} />
            </main>
        </>
    );
}

function isValidVATNumber(companyVATNumber: string) {
    return companyVATNumber.length === 8;
}
export default App
