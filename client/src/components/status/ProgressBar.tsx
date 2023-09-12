import styled from 'styled-components';
import ScoreMarker from './ScoreMarker';
import { PuzzleRankingLevel } from '../../shared/types';

const ProgressBar = (props: { ranking: PuzzleRankingLevel, score: number }) => {
    return (
        <StyledProgressBar>
            <Line>
                {[...Array(9)].map((el, i) => <Dot key={i} />)}
            </Line>
            <ScoreMarker {...props} />
        </StyledProgressBar>
    );
};

export default ProgressBar;

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