import styled from 'styled-components';
import { device } from '../../styles/device';
import Progress from './Progress';
import WordList from './WordList';
import { PuzzleState } from '../../state';

interface Props {
    puzzle: PuzzleState;
}

function Status(props: Props) {
    return (
        <StyledStatus>
            <Progress {...props} />
            <WordList />
        </StyledStatus>
    );
}

const StyledStatus = styled.div`
    @media (min-width: ${device.desktop}) {
        width: 50%;
    }
`;

export default Status;