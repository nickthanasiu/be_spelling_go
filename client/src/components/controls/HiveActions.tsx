import styled from 'styled-components';
import HiveActionButton from './HiveActionButton';

function HiveActions() {
    return (
        <StyledHiveActions>
            <HiveActionButton actionType="DELETE">
                Delete
            </HiveActionButton>
            <HiveActionButton actionType="SHUFFLE">
                Shuffle
            </HiveActionButton>
            <HiveActionButton actionType="SUBMIT">
                Enter
            </HiveActionButton>
        </StyledHiveActions>
    );
}

const StyledHiveActions = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: nowrap;
`;

export default HiveActions;