import { atom, selector } from "recoil";
import { totalScoreAtom } from "./score";
import { puzzleAtom } from "./puzzle";
import { PuzzleRankingLevel } from "../shared/types";

export const rankingSelector = selector<PuzzleRankingLevel>({
    key: 'rankingSelector',
    get: ({ get }) => {
        const totalScore = get(totalScoreAtom);
        const { rankings } = get(puzzleAtom);

        const ranking = deriveRankingFromScore(totalScore, rankings);

        return ranking;
    }
});

export const rankingAtom = atom({
    key: 'rankingAtom',
    default: rankingSelector
});

export function deriveRankingFromScore(score: number, rankings: any[]) {

    // Get index of the first ranking level beyond current score
    const nextRankingIndex = rankings.findIndex(ranking => score < ranking.threshold);

    // Get current ranking level by selecting the ranking at index just before above index
    const currentRankingIndex = nextRankingIndex - 1;

    return rankings[currentRankingIndex].name;
}