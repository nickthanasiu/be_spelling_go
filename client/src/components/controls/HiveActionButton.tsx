import React from 'react';
import styled from 'styled-components';
import { useBackspace } from '../../hooks/useBackspace';
import { useShuffleLetters } from '../../hooks/useShuffleLetters';
import { useSubmitWord } from '../../hooks/useSubmitWord';

interface HiveActionButtonProps {
    actionType: 'SUBMIT' | 'DELETE' | 'SHUFFLE';
    children?: string;
}

function HiveActionButton({ actionType, children }: HiveActionButtonProps) {
    const submit = useSubmitWord();
    const backspace = useBackspace();
    const shuffle = useShuffleLetters();

    const onClick: React.MouseEventHandler<HTMLElement> = () => {
        const clickAction = actionType === 'SUBMIT' ? submit
            : actionType === 'DELETE' ? backspace
            : shuffle;

        clickAction();
    };

    return (
        <StyledHiveActionButton onClick={onClick}>
            {children}
        </StyledHiveActionButton>
    );
}

const StyledHiveActionButton = styled.div`
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

export default HiveActionButton;