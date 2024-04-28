export interface GiftCard   {
    "id": number;
    "name": string;
    "PIN": string;
    "initialCredit": number;
    "currency": string;
    "currentCredit": number;
}
export interface ErrorResponse {
    error: string;
}
export interface SuccessResponse {
    success: boolean;
    giftCard: GiftCard;
}
export type GiftCardPaymentResponse = ErrorResponse | SuccessResponse;

export async function giftCardPayment(name: string, PIN: string): Promise<GiftCardPaymentResponse> {
    const baseURL : string= 'https://raw.githubusercontent.com/ZeeDiazz/FruitBowlers/';
    const giftCardURL: string = baseURL + 'main/giftCards.json';

    try {
        const response: Response = await fetch(giftCardURL);

        if (!response.ok) {
            return { error: ("Failed to fetch gift card data")};
        }
        const giftCardsData: GiftCard[] = await response.json();
        const matchingGiftCard: GiftCard | undefined = giftCardsData.find(giftCard => giftCard.name === name && giftCard.PIN === PIN);

        if (!matchingGiftCard) {
            return { error: 'Invalid name or PIN' } as ErrorResponse;
        }

        return { success: true, giftCard: matchingGiftCard } as SuccessResponse;
    } catch (error) {
        console.error('Error fetching or processing gift card data:', error);
        return { error: 'Internal server error' } as ErrorResponse;
    }
}
