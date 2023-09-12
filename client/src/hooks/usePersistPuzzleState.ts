import { type LocalStoragePuzzleState, loadLocalStorageState, saveToLocalStorageState } from "../utils/localStorage";


const usePersistPuzzleState = (puzzleId: string) => {

    return (
        propertyToUpdate: keyof LocalStoragePuzzleState, 
        updatedState: string[] | number // @TODO :: Update to allow for extending LocalStoragePuzzleState
    ) => {

        const localStorageState = loadLocalStorageState();

        const puzzleState = localStorageState[puzzleId] || {};

        const nextPuzzleState = {
            ...puzzleState,
            [propertyToUpdate]: updatedState
        };
       
        const nextLocalStorageState = {
            ...localStorageState,
            [puzzleId]: nextPuzzleState
        };

        saveToLocalStorageState(nextLocalStorageState);
    };
};

export default usePersistPuzzleState;