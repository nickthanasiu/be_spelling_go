import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { inputTouchedAtom } from '../../state';

interface Props {
    setInput: any;
    letter: string;
    isCenter?: boolean;
}
const HiveCell = ({ letter, isCenter, setInput }: Props) => {
    
    const [inputTouched, setInputTouched] = useRecoilState(inputTouchedAtom);
    
    const onClick = ({ target }: React.MouseEvent<SVGSVGElement>) => {
      
        const polygon = target as HTMLElement;
        const textElement = polygon.nextElementSibling as SVGTextElement;
        const text = textElement.textContent as string;

        setInput(text);
        
        if (!inputTouched) {
            setInputTouched(true);
        }
    };

    return (
        <StyledSvg viewBox='0 0 120 103.92304845413263' onClick={onClick}>
            <StyledPolygon 
                points='0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263'
                stroke='#fff'
                strokeWidth='7.5'
                isCenter={isCenter}
            />
            <StyledText x='50%' y='50%' dy='0.35em'>
                {letter}
            </StyledText>
        </StyledSvg>
    );
}

const StyledSvg = styled.svg<{ onClick: React.MouseEventHandler<SVGSVGElement> }>`
    position: absolute;
    top: calc(100% / 3);
    left: 30%;
    width: 40%;
    height: calc(100% / 3);

    &:nth-child(1) {
        transform: translate(0, 0);
    }

    &:nth-child(2) {
        transform: translate(-75%, -50%);
    }

    &:nth-child(3) {
        transform: translate(0, -100%);
    }

    &:nth-child(4) {
        transform: translate(75%, -50%);
    }

    &:nth-child(5) {
        transform: translate(75%, 50%);
    }

    &:nth-child(6) {
        transform: translate(0, 100%);
    }

    &:nth-child(7) {
        transform: translate(-75%, 50%);
    }
`;

const StyledPolygon = styled.polygon<{ isCenter?: boolean }>`
    cursor: pointer;
    fill: ${props => props.isCenter ? '#f7da21' : '#e6e6e6'};
    transition: all 100ms;
`;

const StyledText = styled.text`
    font-weight: 700;
    font-size: 1.875em;
    text-anchor: middle;
    text-transform: uppercase;
    pointer-events: none;
`;

export default HiveCell;