import { KeyboardEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { LetterObj, inputTouchedAtom } from '../../state';
import { useKeyPressListener } from '../../hooks/useKeyPressListener';
import { useSubmitWord } from '../../hooks/useSubmitWord';
import { isCharacterLetter } from '../../utils/isCharacterLetter';
import Letter from './Letter';

interface Props {
    input: LetterObj[];
    setInput: any;
    backspace: any;
    shuffle: any;
}

function HiveInput({ input, setInput, backspace, shuffle }: Props) {

    const [inputTouched, setInputTouched]=  useRecoilState(inputTouchedAtom);
    const hasContent = input.length > 0;

    const submit = useSubmitWord();

    const keyPressHandler = ({ key }: KeyboardEvent<Window>) => {
        /*
            Keys to listen for

            * Spacebar (shuffle letters)
            * Backspace
            * Enter (Submit word)
            * Letters
        */

        if (key === ' ' || key === 'Spacebar') {

            shuffle();
            return;

        } else if (key === 'Backspace') {

            backspace();
            return;

        } else if (key === 'Enter') {
            submit();
            return;

        } else if (isCharacterLetter(key)) {
            
            setInput(key);

            if (!inputTouched) {
                setInputTouched(true);
            }
        }
    };

    useKeyPressListener(keyPressHandler);


    // @TODO :: Handle input too long. Show error message 'Too long' once input hits 20
    // Also, font should start getting smaller @ 15 characters

    return (
        <StyledInput className='hive-input'>
            
            <InputContent className="hive-input-content" hasContent={hasContent}>
                {!inputTouched && <InputPlaceholder>Type or click</InputPlaceholder>}
                {input.map((letterObj, i) => (
                    <Letter key={i} letterObj={letterObj} />
                ))}
            </InputContent>
        </StyledInput>
    );
}

const StyledInput = styled.div`
    width: 290px;
    height: 40px;
    border: none;
    display: flex;
    justify-content: center;
`;

const cursorBlinkAnimation = keyframes`
    0% { opacity: 0 }
`;

const InputContent = styled.span<{ hasContent: boolean }>`
    height: 100%;
    display: inline-block;
    position: relative;
    transform: translateY(0%);
    min-width: 1px;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        width: 2px;
        height: 100%;
        background: #f7da21;
        animation-name: ${cursorBlinkAnimation};
        animation-duration: 1000ms;
        animation-iteration-count: infinite;

        ${(props) => props.hasContent && css`
            right: -4px;
        `};
    }
`;

const InputPlaceholder = styled.span`
    color: lightgrey;
    font-size: 32px;
    font-weight: 500;
`;

export default HiveInput;