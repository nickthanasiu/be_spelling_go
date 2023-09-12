import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { PuzzleState } from '../../state';
import { deriveRankingFromScore } from '../../state/ranking';
import { deriveTotalScoreFromWordsList } from '../../state/score';
import { answersById } from '../../state/answers';

const Progress = (props: { puzzle: PuzzleState }) => {

    const { pangrams, rankings } = props.puzzle;
    const answers = useRecoilValue(answersById(props.puzzle._id));

    const score = deriveTotalScoreFromWordsList(answers, pangrams);
    const ranking = deriveRankingFromScore(score, rankings);

    return (
        <StyledProgress>
            <Ranking>
                {ranking}
            </Ranking>
            <ProgressBar ranking={ranking} score={score} />
        </StyledProgress>
    );
};

export default Progress;

const StyledProgress = styled.div`
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