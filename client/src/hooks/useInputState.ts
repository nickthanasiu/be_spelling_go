import { useState } from "react";
import { type LetterObj } from "../state";

export function useInputState(centerLetter: string, letters: string[]) {
    const [input, setInput] = useState<LetterObj[]>([]);

    function updateInputState(letter: string) {

        // Make sure letter is capitalized before comparing, as letters stored in db are capitalized
        letter = letter.toUpperCase();

        const isCenterLetter = letter === centerLetter;
        const isInLettersList = letters.includes(letter);

        const letterObj = {
            letter,
            isCenterLetter,
            isValid: isCenterLetter || isInLettersList,
        };

        setInput([...input, letterObj]);
    }

    return { input, setInput, updateInputState };
}