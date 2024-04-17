//Frederik's todolist
//@TODO Visual representation of what happens with users input: Missing data / wrong syntax. Make room for it on the card
//@TODO TEST
//@TODO giftCards Loading
//@TODO Animation to ->
//@TODO Visual card that showcases users: giftCard-data, price, terms checkbox, swipe function
//@TODO Help page with giftCard info?
import {getTotalPriceDiscounted} from "./price.ts";

interface GiftCard   {
    "id": number;
    "name": string;
    "PIN": string;
    "initialCredit": number;
    "currency": string;
    "currentCredit": number;
}
interface ErrorResponse {
    error: string;
}
interface SuccessResponse {
    success: boolean;
    giftCard: GiftCard;
}
type GiftCardPaymentResponse = ErrorResponse | SuccessResponse;

export function giftCardPayment(name: string, PIN: string): Promise<GiftCardPaymentResponse> {
    const baseURL : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const giftCardURL: string = baseURL + 'main/giftCards.json';

    return fetch(giftCardURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch gift card data');
            }
            return response.json();
        })
        .then((giftCardsData: GiftCard[]) => {
            // Check if the provided username and PIN match any gift card
            const matchingGiftCard = giftCardsData.find(giftCard => giftCard.name === name && giftCard.PIN === PIN);

            if (!matchingGiftCard) {
                // If no matching gift card is found, return an Invalid Input error
                return { error: 'Invalid name or PIN' } as ErrorResponse;
            }

            // If a matching gift card is found, return the gift card data
            return { success: true, giftCard: matchingGiftCard } as SuccessResponse;
        })
        .catch(error => {
            // If there's an error during the process, return an Error response
            console.error('Error fetching or processing gift card data:', error);
            return { error: 'Internal server error' } as ErrorResponse;
        });
}
function HandleGiftCardRedemption () {


}

export function GiftCardPopUp () {
    const totalPrice: number = getTotalPriceDiscounted.defaultValue
    //const slider = document.getElementById("myRange");
    //const output = document.getElementById("demo");

    return (
        <div className={"WholeGiftCardPopUp"}>
            <nav>
                <h3>Your gift card is ready</h3>
                <p>There are DKK on your gift card</p>
                <p>Total price: </p>
                {totalPrice}
                <div>
                    <input type="checkbox" id={"acceptGiftCardTerms"} />

                    accept terms and use
                </div>
                {/*Depending on if the total amount to pay are higher or smaller than the amount the gift card*/}
                <p>Slide to confirm the purchase!</p>
                or
                <p>Slide to use the amount on the gift card</p>
                <div className="slidecontainer">
                    <input type="range" min="1" max="100" value="1" className="slider" id="myRange"/>
                </div>
            </nav>
        </div>
    )
}