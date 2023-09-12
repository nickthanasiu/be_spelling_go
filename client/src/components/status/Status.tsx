import styled from 'styled-components';
import { device } from '../../styles/device';
import Progress from './Progress';
import WordList from './WordList';

function Status() {
    return (
        <StyledStatus>
            <Progress />
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