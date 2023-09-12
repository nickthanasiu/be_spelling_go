import styled from 'styled-components';
import { device } from '../styles/device';
import Status from './status/Status';
import Controls from './controls/Controls';

function GameField() {
    return (
        <StyledGameField>
            <Status />
            <Controls />
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