import {  type LetterObj, type InvalidInputMessage } from "../state";

interface IValidateInput {
    isValid: boolean;
    errorMessage: InvalidInputMessage | "";
}

export const validateInput = (input: LetterObj[]): IValidateInput => {
    const hasEnoughLetters = input.length >= 4;
    const allValidLetters = input.every(letter => letter.isValid);

    return {
        isValid: hasEnoughLetters && allValidLetters,
        errorMessage: !hasEnoughLetters ? "Too short" : !allValidLetters ? "Bad letters" : "",
    };
};