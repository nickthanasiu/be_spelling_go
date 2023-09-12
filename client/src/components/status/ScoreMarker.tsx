import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { totalScoreAtom } from '../../state';
import { PuzzleRankingLevel } from '../../shared/types';
import { rankingSelector } from '../../state';


const ScoreMarker = () => {
    
    const userScore = useRecoilValue(totalScoreAtom);
    const ranking = useRecoilValue(rankingSelector);

    const calculatePosition = (ranking: PuzzleRankingLevel) => {
        switch (ranking) {
            case 'Good Start':
                return 1/8;
            case 'Moving Up':
                return 2/8;
            case 'Good':
                return 3/8;
            case 'Solid':
                return 4/8;
            case 'Nice':
                return 5/8;
            case 'Great': 
                return 6/8;
            case 'Amazing':
                return 7/8;
            case 'Genius':
            case 'Queen Bee':
                return 8/8;
            default:
                return 0;
        }
    };

    return (
        <StyledScoreMarker leftPosition={calculatePosition(ranking)}>
            <span>{userScore}</span>
        </StyledScoreMarker>
    );
};

export default ScoreMarker;

const StyledScoreMarker = styled.div<{ leftPosition: number }>`
    width: 30px;
    height: 30px;
    position: absolute;
    transform: translate(-50%, 0);
    
    left: ${({ leftPosition }) => leftPosition * 100}%;
    
    span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        font-size: 12px;
        border-radius: 50%;
        background: #f7da21;
        color: #000;
        font-weight: 500;
    }
`;