import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { foundWordsListExpandedAtom } from '../../state/foundWords';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import HiveContainer from "./HiveContainer";
import HiveActions from "./HiveActions";

interface Props {
    letters: string[];
    centerLetter: string;
    answersListExpanded: boolean;
}

function Controls(props: Props) {


    return (
        <StyledControlsWrapper>
            <StyledControls expanded={props.answersListExpanded}>
                <MessageBox />
                <HiveInput />
                <HiveContainer {...props} />
                <HiveActions />
            </StyledControls> 
        </StyledControlsWrapper>
    );
}

const StyledControlsWrapper = styled.div`
    margin-top: 50px;
    padding-top: 10px;

    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledControls = styled.div<{ expanded: boolean}>`
    width: 80vw;
    max-width: 290px;
    z-index: 3;
    padding-bottom: 45px;

    opacity: ${props => props.expanded ? 0 : 1};

    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Controls;
