import '../assets/Styles/320px/SmallScreen.css'
import '../assets/Styles/default/DefaultStyling.css'
import '../assets/Styles/large/App.css'
import '../assets/Styles/default/DefaultStylingOrderCompleted.css'
import {header} from "../Components/header.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


export function OrderCompleted() {
    const navigate = useNavigate();
    const [navigating, setNavigating] = useState(true);
    useEffect(() => {
        setNavigating(false);
    }, []);
    const [loading, setLoading] = useState(true);

    //Refresh as we doesn't have a shoping page
    const refreshPage = () => {
        navigate(0);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // Clear timeout on component unmount
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`page ${navigating ? "navigating" : "navigated"}`}>
            <header>
                {header()}
            </header>
            <nav className={"OrderCompleted"}>
                <div id={"loader"} style={{display: loading ? "block" : "none"}}/>
                <div style={{display: loading ? "none" : "block"}}>
                    <img
                        src={`/images/Success.png`}
                        alt="OrderCompleted"
                        className="orderIcons"
                        id={"OrderCompletedImg"}
                    />
                </div>
                <h1 className="h3 font-weight-medium">Your order is completed!</h1>
                <p>
                    Thank you for your order! Your order is being processed and will be completed soon. You will
                    not receive an email confirmation when your order is completed.
                </p>
                {/*If we had a website, the user would be able to continue shopping*/}
                <button className={"NudgeButton"} onClick={() => refreshPage()}>Continue Shopping</button>
            </nav>
        </div>
    )
}
