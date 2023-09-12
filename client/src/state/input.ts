import { atom, selector } from 'recoil';
import { LetterObj } from './types';


export const inputAtom = atom<LetterObj[]>({
    key: 'inputAtom',
    default: [] as LetterObj[]
});

export const inputWordSelector = selector({
    key: 'inputWordSelector',
    get: ({ get }) => {
        const inputState = get(inputAtom);

        const lettersArray = inputState.map((letterObj, i) => {
            const { letter } = letterObj;

            // First letter of word should be capitalized. Since letters in state are already capitalized, leave the first letter as is.
            // The rest should be set to lowercase
            return i > 0 ? letter.toLowerCase() : letter;
        });

        return lettersArray.join('');
    }
});

export const inputTouchedAtom = atom<boolean>({
    key: 'inputTouchedAtom',
    default: false
});