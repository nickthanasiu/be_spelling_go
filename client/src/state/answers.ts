import { atom, selector, selectorFamily } from 'recoil';

export interface GamesState {
    [key: string]: {
        answers: string[]
    }
};

export const persistedGamesSelector = selector<GamesState>({
    key: 'persistedGamesSelector',
    get: () => {
        const savedGamesState = localStorage.getItem('be_spelling');
        
        if (savedGamesState) {
            return JSON.parse(savedGamesState);
        }

        return {};
    },
});

export const gamesAtom = atom<GamesState>({
    key: 'gamesAtom',
    default: persistedGamesSelector
});


export const answersById = selectorFamily({
    key: 'answersById',
    get: (puzzleId: string) => ({ get }) => {
        const games = get(gamesAtom);
        const answers = games[puzzleId]?.answers;

        return answers || [];
    },
    set: (puzzleId: string) => ({ set }, newAnswer) => {
        set(gamesAtom, (prevGamesState) => {
            
            const prevGame = prevGamesState[puzzleId];
            const prevGameAnswers = prevGame?.answers || [];

            const nextGamesState = {
                ...prevGamesState,
                [puzzleId]: {
                    answers: [...prevGameAnswers, ...newAnswer as string[]]
                }
            };

            // Persist games state
            window.localStorage.setItem('be_spelling', JSON.stringify(nextGamesState));

            return nextGamesState;
        });
    }
});