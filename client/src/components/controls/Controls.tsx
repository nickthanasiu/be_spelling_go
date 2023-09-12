
import styled from 'styled-components';
import MessageBox from "./MessageBox";
import HiveInput from "./HiveInput";
import Hive from "./Hive";

import { useInputState } from '../../hooks/useInputState';
import { useSubmitWord } from '../../hooks/useSubmitWord';
import { useState } from 'react';

interface Props {
    letters: string[];
    centerLetter: string;
    answersListExpanded: boolean;
}

function Controls({ centerLetter, letters, answersListExpanded }: Props) {
    const { input, setInput, updateInputState } = useInputState(centerLetter, letters);

    const [displayLetters, setDisplayLetters] = useState(letters);

    const submit = useSubmitWord();

    function backspace() {
        setInput([...input.slice(0, -1)]);
    }

    function shuffleLetters() {
        const shuffled = shuffleArray(letters);
        setDisplayLetters(shuffled);
    }

    return (
        <StyledControlsWrapper>
            <StyledControls expanded={answersListExpanded}>
                <MessageBox />

                <HiveInput 
                    input={input}
                    setInput={updateInputState}
                    backspace={backspace}
                    shuffle={shuffleLetters}
                />
                <Hive 
                    centerLetter={centerLetter}
                    letters={displayLetters}
                    setInput={updateInputState}
                />

                <HiveActions>
                    <HiveActionButton onClick={backspace}>
                        Delete
                    </HiveActionButton>
                    <HiveActionButton onClick={shuffleLetters}>
                        Shuffle
                    </HiveActionButton>
                    <HiveActionButton onClick={submit}>
                        Enter
                    </HiveActionButton>
                </HiveActions>
            </StyledControls> 
        </StyledControlsWrapper>
    );
}

export default Controls;

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

const HiveActions = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: nowrap;
`;

const HiveActionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    width: 33.333%;
    min-width: 100px;
    height: 30px;
    background-color: #e6e6e6;
    font-size: 1em;
    margin: 0 8px;
    color: #333;
    border-radius: 5px;
    letter-spacing: 0.01em;
    user-select: none;
    cursor: pointer;
`;


 // Taken from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 function shuffleArray(array: string[]): string[] {
    let currentIndex = array.length, randomIndex;

    // Copy array
    const _array = [...array];

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [_array[currentIndex], _array[randomIndex]] = [_array[randomIndex], _array[currentIndex]];
    }

    return _array;
}