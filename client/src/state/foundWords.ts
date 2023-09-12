import { atom, selector } from 'recoil';
import { puzzleAtom } from './puzzle';
import { loadLocalStorageStateSlice } from '../utils/localStorage';


export const foundWordsSelector = selector<string[]>({
    key: 'foundWordsSelector',
    get: ({ get }) => {

        const { _id } = get(puzzleAtom);

        const wordsFromStorage = loadLocalStorageStateSlice("words", _id) as string[]; // @TODO :: probably a better way of handling the type here

        return wordsFromStorage || [];
    }
});

export const foundWordsAtom = atom({
    key: 'foundWordsAtom',
    default: foundWordsSelector
});

export const wordListPreviewSelector = selector({
    key: 'wordListPreviewSelector',
    get: ({ get }) => {

        const foundWords = get(foundWordsAtom);
        
        return [...foundWords].reverse();
    }
});

export const alphabetizedWordSelector = selector({
    key: 'alphabetizedWordSelector',
    get: ({ get }) => {

        const foundWords = get(foundWordsAtom);

        return [...foundWords].sort((a, b) => a.localeCompare(b));
    }
});

export const foundWordsListExpandedAtom = atom({
    key: 'foundWordsListExpanded',
    default: false
});