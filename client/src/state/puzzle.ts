import { atom, selector } from "recoil";
import ApiClient from "../api/client";
import { PuzzleState } from "./types";
import { PuzzleResponse } from '../shared/types';

export interface PuzzlesApiResponse {
    puzzles: PuzzleResponse[];
    nextCursor: string;
}

export const allPuzzlesSelector = selector({
    key: 'allPuzzlesSelector',
    get: async (): Promise<PuzzlesApiResponse> => {
        const response: PuzzlesApiResponse = await ApiClient.get('/puzzles');
        return response;
    }
})

export const allPuzzlesAtom = atom({
    key: 'allPuzzlesAtom',
    default: allPuzzlesSelector
})

export const puzzleAtom = atom({
    key: 'puzzleAtom',
    default: {} as PuzzleState
});

export const lettersSelector = selector<string[]>({
    key: 'lettersSelector',
    get: ({ get }) => {
        const puzzle = get(puzzleAtom);

        return puzzle.letters;
    }
});

export const lettersAtom = atom<string[]>({
    key: 'lettersAtom',
    default: lettersSelector
});

export const centerLetterSelector = selector({
    key: 'centerLetterSelector',
    get: ({ get }) => {
        const puzzle = get(puzzleAtom);

        return puzzle.centerLetter;
    }
});
