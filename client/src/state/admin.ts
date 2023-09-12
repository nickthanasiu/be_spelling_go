import { atom } from "recoil";
import { AddPuzzleFormState } from "./types";

export const addPuzzleFormAtom = atom<AddPuzzleFormState>({
    key: 'addPuzzleFormAtom',
    default: {
        date: '',
        centerLetter: '',
        letters: '',
        pangrams: '',
        words: '',
    }
});