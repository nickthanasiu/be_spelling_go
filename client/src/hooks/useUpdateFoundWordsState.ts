import { useRecoilValue, useRecoilState } from "recoil";
import { foundWordsAtom, puzzleAtom } from "../state";
import usePersistPuzzleState from "./usePersistPuzzleState";


const useUpdateFoundWordsState = () => {

    const [foundWordsList, setFoundWordsList] = useRecoilState(foundWordsAtom);
    const { _id: puzzleId } = useRecoilValue(puzzleAtom);
    const persistPuzzleState = usePersistPuzzleState(puzzleId);

    return (wordToAdd: string) => {

        const nextFoundWordsState = [...foundWordsList, wordToAdd];

        setFoundWordsList(nextFoundWordsState);

        persistPuzzleState("words", nextFoundWordsState);
    };
};

export default useUpdateFoundWordsState;