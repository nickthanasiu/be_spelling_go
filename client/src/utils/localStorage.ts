
export type LocalStorageState = {
    [key: string]: LocalStoragePuzzleState
};

export type LocalStoragePuzzleState = {
    words: string[];
    score: number;
}

const BE_SPELLING_LOCAL_STORAGE_KEY = process.env.NODE_ENV === 'development' ? "be_spelling__DEV" : "be_spelling";


export function loadLocalStorageStateSlice(key: keyof LocalStoragePuzzleState, puzzleId: string) {

    const localStorageState = loadLocalStorageState();

    const selectedPuzzleState = localStorageState[puzzleId];

    if (!selectedPuzzleState) return;
    
    return selectedPuzzleState[key];

}


export function loadLocalStorageState(): LocalStorageState {

    let localStorageState = window.localStorage.getItem(BE_SPELLING_LOCAL_STORAGE_KEY);

    if (!localStorageState) {

        // If localStorage item BE_SPELLING_LOCAL_STORAGE_KEY doesn't exist, create it

        localStorageState = JSON.stringify({});

        window.localStorage.setItem(BE_SPELLING_LOCAL_STORAGE_KEY, localStorageState);
    }

    return JSON.parse(localStorageState);
}

export function saveToLocalStorageState(nextState: LocalStorageState) {

    const stringifiedState = JSON.stringify(nextState);

    window.localStorage.setItem(BE_SPELLING_LOCAL_STORAGE_KEY, stringifiedState);
}
