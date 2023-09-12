import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { device } from '../styles/device';
import Controls from './controls/Controls';
import { PuzzleState } from '../state';
import ScoreMarker from './status/ScoreMarker';
import { deriveTotalScoreFromWordsList } from '../state/score';
import { deriveRankingFromScore } from '../state/ranking';
import { answersById } from '../state/answers';
import WordListDrawer from './status/WordListDrawer';
import WordListHeading from './status/WordListHeading';

interface Props {
    puzzle: PuzzleState;
}

function GameField({ puzzle }: Props) {
    const { _id: puzzleId, letters, centerLetter, pangrams, rankings } = puzzle;

    const answers = useRecoilValue(answersById(puzzleId));
    const [answersListExpanded, setAnswersListExpanded] = useState(false);
    const score = deriveTotalScoreFromWordsList(answers, pangrams);
    const ranking = deriveRankingFromScore(score, rankings);

    return (
        <StyledGameField>
            <Status>
                <Progress>
                    <Ranking>
                        {ranking}
                    </Ranking>

                    <StyledProgressBar>
                        <Line>
                            {[...Array(9)].map((_, i) => <Dot key={i} />)}
                        </Line>
                        <ScoreMarker ranking={ranking} score={score} />
                    </StyledProgressBar>
                </Progress>
                <WordList>
                    <WordListHeading expanded={answersListExpanded} setExpanded={setAnswersListExpanded} />
                    <WordListDrawer expanded={answersListExpanded} />
                </WordList>
            </Status>

            <Controls 
                letters={letters}
                centerLetter={centerLetter}
                answersListExpanded={answersListExpanded}
            />
        </StyledGameField>
    )
}

export default GameField;

const StyledGameField = styled.div`

    @media (min-width: ${device.desktop}) {
        height: 100%;
        width: 100%;
        max-width: 1080px;
        margin: 0 auto;

        display: flex;
        flex-direction: row-reverse;
        flex-grow: 1;
    }
`;

const Status = styled.div`
    @media (min-width: ${device.desktop}) {
        width: 50%;
    }
`;

const Progress = styled.div`
    margin: 24px 12px;
    padding-right: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Ranking = styled.div`
    min-width: 80px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const StyledProgressBar = styled.div`
    margin-left: 12px;
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const Line = styled.div`
    position: relative;
    background: lightgrey;
    height: 1px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Dot = styled.span`
    position: relative;

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: -4px;
        top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: lightgrey;
    }

    &:last-child:after {
        border-radius: 0;
    }

`;

const WordList = styled.div`
    border-radius: 6px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin: 12px;

    li {
        max-width: 200px;
        padding-right: 7px;
        text-transform: capitalize;
    }
`;