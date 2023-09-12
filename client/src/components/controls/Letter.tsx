import styled from 'styled-components';
import { LetterObj } from '../../state';

interface LetterProps {
    letterObj: LetterObj
}

function Letter({ letterObj }: LetterProps) {
    return (
        <StyledLetter letterObj={letterObj}>
            {letterObj.letter}
        </StyledLetter>
    )
}

const yellow = '#f7da21';
const lightGray = '#dcdcdc';

const StyledLetter = styled.span<LetterProps>`
    color: ${props => props.letterObj.isCenterLetter ? yellow : props.letterObj.isValid ? "#242424" : 'gray' };
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
`;

export default Letter;