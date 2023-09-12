import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loadLocalStorageState } from "../utils/localStorage";
import { deriveTotalScoreFromWordsList } from "../state/score";
import { deriveRankingFromScore } from "../state/ranking";
import Hive from "./controls/Hive";
import { Button } from "./Button";

import { type PuzzleResponse } from "../shared/types";

interface Props {
    puzzle: PuzzleResponse;
}

const PuzzleCard = ({ puzzle }: Props) => {
    
    const { _id, date, centerLetter, letters, pangrams, words, rankings } = puzzle;

    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();
    
    const savedPuzzle = lookupPuzzleInLocalStorage(_id);

    let userStats = null;

    if (savedPuzzle) {

        const score = deriveTotalScoreFromWordsList(savedPuzzle.words, pangrams);
        const ranking = deriveRankingFromScore(score, rankings);

        userStats = { score, ranking };
    }

    const wordCount = pangrams.length + words.length;
    const genius = rankings.find((ranking: any) => ranking.name === 'Genius'); // Add type for rankings
    const queenBee = rankings.find((ranking: any) => ranking.name === 'Queen Bee');

    const playButtonText = savedPuzzle ? 'Continue' : 'Play';

    const toggleHovered = () => {
        setIsHovered(!isHovered);
    };

    const handlePlayButtonClick = () => {
        navigate(`/puzzles/${_id}`);
    };

    return (
        <StyledPuzzleCard onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                <b>
                    {formatDate(date)}
                </b>
            </div>
            <div>
                <div style={{ width: '100%' }}>
                    <div style={{ pointerEvents: 'none', width: '70%', margin: 'auto' }}>
                        <Hive centerLetter={centerLetter} letters={letters} />
                    </div>
                </div>
                            
                <div style={{ textAlign: 'left', fontSize: '14px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>

                    <div>

                        <div>
                            <span>Words: </span>
                            <span>{wordCount}</span>
                        </div>
                        <div>
                            <span>Genius: </span>
                            <span>{genius.threshold} pts</span>
                        </div>
                        <div>
                            <span>Queen Bee: </span>
                            <span>{queenBee.threshold} pts</span>
                        </div>
                    </div>

                    {userStats && (
                        <div>
                            <h3 style={{ margin: '0', fontSize: '14px', marginBottom: '5px', color: '#f7da21' }}>
                                Your stats:
                            </h3>
                            <div>
                                Score: {userStats.score}
                            </div>
                            <div>
                                Ranking: {userStats.ranking}
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>

            <HoverDisplay isHovered={isHovered}>
                <Button onClick={handlePlayButtonClick}>
                    {playButtonText}
                </Button>
            </HoverDisplay>

        </StyledPuzzleCard>
    );
};

export default PuzzleCard;


const HoverDisplay = styled.div<{ isHovered: boolean }>`
    display: ${({ isHovered }) => isHovered ? 'flex' : 'none' };
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: default;
`

const StyledPuzzleCard = styled.div`
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    min-width: 200px;
    position: relative;
`;

// Helpers

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const formatted = date.toLocaleString('en-US', { 
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC' 
    });

    return formatted;
}

function lookupPuzzleInLocalStorage(id: string) {
    const localStorageState = loadLocalStorageState();

    return localStorageState[id];
}