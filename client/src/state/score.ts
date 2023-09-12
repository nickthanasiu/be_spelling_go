import { atom, selector } from 'recoil';
import { foundWordsAtom } from './foundWords';
import { puzzleAtom } from './puzzle';

export const totalScoreSelector = selector({
    key: 'totalScoreSelector',
    get: ({ get }) => {

        // Score should be derived from foundWords list

        const foundWords = get(foundWordsAtom);
        const { pangrams } = get(puzzleAtom);

        const totalScore = deriveTotalScoreFromWordsList(foundWords, pangrams);
  
        return totalScore;
    }
});

export const totalScoreAtom = atom({
    key: 'totalScoreAtom',
    default: totalScoreSelector
});

export const prevWordScoreAtom = atom({
    key: 'prevWordScoreAtom',
    default: 1
});


// Helpers

function calculateScore(wordLength: number, isPangram: boolean = false) {
    const score = isPangram ? wordLength + 7
        : wordLength > 4 ? wordLength
        : 1;

    return score;
}

export function deriveTotalScoreFromWordsList(foundWords: string[], pangrams: string[]) {

       const score = foundWords
            .map((word) => {

                const isPangram = pangrams.includes(word);
                const score = calculateScore(word.length, isPangram);

                return score;
            })
            .reduce((prev, curr) => prev + curr, 0);

        return score;
}