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
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [telefoneNumber, setTelefoneNumber] = useState<string>('');
    const [cityName, setCityName] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');

    const [totalDiscountedPrice, setTotalDiscountedPrice] = useState<number>(0);
    const isInvoiceEnabled = isValidVATNumber(companyVATNumber);

    return (
        <>
            <header>
                {header()}
            </header>
            <main>
                <StageBasket/>
                <StageDelivery setCompanyVATNumber={setCompanyVATNumber} companyVATNumber={companyVATNumber}
                    setFirstName={setFirstName} firstName={firstName}
                    setLastName={setLastName} lastName={lastName}
                    setEmail={setEmail} email={email}
                    setZipcode={setZipcode} zipcode={zipcode}
                    setStreetName={setStreetName} streetName={streetName}
                    setTelefoneNumber={setTelefoneNumber} telefoneNumber={telefoneNumber}
                    setCityName={setCityName} cityName={cityName}
                    setCompanyName={setCompanyName} companyName={companyName}
                    />
                <ChoosePayment totalDiscountedPrice={totalDiscountedPrice} isInvoiceEnabled={isInvoiceEnabled} />
                {stageTermsNConditions()}
            </main>
        </>
    );
}

function isValidVATNumber(companyVATNumber: string) : boolean{
    return companyVATNumber.length === 8;
}
export default App
