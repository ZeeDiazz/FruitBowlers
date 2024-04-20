//Frederik's todolist
//@TODO Visual representation of what happens with users input: Missing data / wrong syntax. Make room for it on the card
//@TODO TEST
//@TODO giftCards Loading
//@TODO Animation to ->
//@TODO Visual card that showcases users: giftCard-data, price, terms checkbox, swipe function

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
    //renderPopUp: (giftCard: GiftCard) => JSX.Element;
    success: boolean;
    giftCard: GiftCard;
}

type GiftCardPaymentResponse = ErrorResponse | SuccessResponse;

// eslint-disable-next-line react-refresh/only-export-components
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

