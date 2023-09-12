import { useCallback } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { centerLetterSelector, inputAtom, lettersSelector, type LetterObj } from "../state";


export const useUpdateInputState = () => {

    const letters = useRecoilValue(lettersSelector);
    const centerLetter = useRecoilValue(centerLetterSelector);
    const setInputState = useSetRecoilState(inputAtom);

    const updateInputState = useCallback((letter: string) => {

        // Create letterObj from character value
        //const letterObj = createLetterObj(val);
        // Make sure letter is capitalized before comparing, as letters stored in db are capitalized
        letter = letter.toUpperCase();

        const isCenterLetter = letter === centerLetter;
        const isInLettersList = letters.includes(letter);

        const letterObj = {
            letter,
            isCenterLetter,
            isValid: isCenterLetter || isInLettersList
        };

        // Set new state
        setInputState(prevState => [...prevState, letterObj]);
    }, []);

    return updateInputState;
};