export default function PuzzleMenuContainer() {
    return <></>;
}

/*import { useState } from "react";
import { loadLocalStorageState } from "../utils/localStorage";
import PuzzleMenu from "./PuzzleMenu";
import InProgressMenu from "./InProgressMenu";
import { Button } from "./Button";

import { type PuzzleResponse } from "../../../server/shared/types";
import { PuzzlesApiResponse } from "../state/puzzle";

interface Props {
    puzzlesApiData: PuzzlesApiResponse;
}

const PuzzleMenuContainer = ({ puzzlesApiData }: Props) => {

    const puzzles = puzzlesApiData.data;
    const pagination = puzzlesApiData.pagination;

    console.log('PAGINATION ', pagination);
    
    const [showNewPuzzles, setShowNewPuzzles] = useState(false);

    const { clientHasPuzzlesInProgress, inProgressPuzzleIds } = checkForInProgressPuzzles();

    const puzzleMenu = (
        <PuzzleMenu />
    );

    if (!clientHasPuzzlesInProgress) {
        return puzzleMenu;
    }


    const inProgressPuzzles = puzzles.filter((puzzle) => {

        return inProgressPuzzleIds.includes(puzzle._id);
    });

    const untouchedPuzzles = puzzles.filter((puzzle) => {
        return !inProgressPuzzleIds.includes(puzzle._id);
    });

    const tryNewButton = (
        <Button onClick={() => setShowNewPuzzles(true)}>
            Try a new puzzle
        </Button>
    );

    const newMenuContainer = (
        <>
            <h2 style={{ color: '#f7da21' }}>Pick a new puzzle</h2>
            {puzzleMenu}
        </>
    );

    return (
        <>
            <InProgressMenu puzzles={inProgressPuzzles} />

            <div style={{ width: '100%', marginTop: '50px' }}>
                {!showNewPuzzles ? tryNewButton : newMenuContainer}
            </div>
            
        </>
    );
};

export default PuzzleMenuContainer;


// Helpers

function checkForInProgressPuzzles() {

    const localStorageState = loadLocalStorageState();
    const inProgressPuzzleIds = Object.keys(localStorageState);

    return {
        clientHasPuzzlesInProgress: inProgressPuzzleIds.length > 0,
        inProgressPuzzleIds,
    }
}
*/