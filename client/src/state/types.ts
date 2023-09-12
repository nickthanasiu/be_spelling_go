import { PuzzleRanking } from '../shared/types';

export type AddPuzzleFormState = {
    date: string,
    centerLetter: string,
    letters: string,
    pangrams: string,
    words: string,
}

export type LetterObj = {
    letter: string;
    isValid: boolean;
    isCenterLetter: boolean;
}


export type InvalidWordMessage = "Missing center letter" | "Not in word list" | "Already found";
export type InvalidInputMessage = "Too short" | "Bad letters";

export type ErrorMessage = InvalidInputMessage | InvalidWordMessage;
export type SuccessMessage = "Pangram!" | "Good!" | "Nice!" | "Awesome!";

export type MessageBoxMessage = ErrorMessage | SuccessMessage | '';

export type MessageBoxAtom = {
    visible: boolean;
    message: MessageBoxMessage;
    isError: boolean;
    isPangram: boolean;
}

export type PuzzleState = {
    _id: string;
    date: string;
    centerLetter: string;
    letters: string[];
    pangrams: string[];
    words: string[];
    rankings: PuzzleRanking[];
};

