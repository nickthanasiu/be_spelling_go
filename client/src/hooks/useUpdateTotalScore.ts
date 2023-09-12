import { useRecoilState, useRecoilValue } from "recoil";
import { totalScoreAtom, puzzleAtom } from "../state";
import usePersistPuzzleState from "./usePersistPuzzleState";


const useUpdateTotalScore = () => {

    const [totalScore, setTotalScore] = useRecoilState(totalScoreAtom);
    const { _id: puzzleId } = useRecoilValue(puzzleAtom);
    const persistPuzzleState = usePersistPuzzleState(puzzleId);

    return (scoreToAdd: number) => {

        const updatedScore = totalScore + scoreToAdd;

        setTotalScore(updatedScore);
        persistPuzzleState("score", updatedScore);
    };
};

export default useUpdateTotalScore