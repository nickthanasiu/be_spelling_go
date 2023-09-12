import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { wordListPreviewSelector } from '../../state';
import { device } from '../../styles/device';

interface Props {
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>
}

function WordListHeading({ expanded, setExpanded }: Props) {
    const placeholder = <li style={{ color: 'gray' }}>Your words...</li>;
    const wordListPreview = useRecoilValue(wordListPreviewSelector);
    const wordCount = wordListPreview.length;
    const previewContent = !wordCount ? placeholder : wordListPreview.map((word) => <li key={word}>{word}</li>);

    return (
        <StyledWordListHeading onClick={() => setExpanded(!expanded)}>
            <div className="wordlist-heading-container">
                <WordCount expanded={expanded}>
                    You have found {wordCount} word{wordCount !== 1 ? 's' : ''}
                </WordCount>
                <PreviewWrapper expanded={expanded}>
                    <ul>
                        {previewContent}
                    </ul>
                </PreviewWrapper>
                <Toggle expanded={expanded}>
                    <span className="toggle-icon"></span>
                </Toggle>
            </div>
        </StyledWordListHeading>
    );
}

const StyledWordListHeading = styled.div`
    position: relative;
    overflow: hidden;
    height: 45px;
    line-height: 45px;

    @media (min-width: ${device.desktop}) {
        pointer-events: none;
    }
`;

interface IExpandedProps {
    expanded: boolean;
}

const WordCount = styled.div<IExpandedProps>`
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 20px;
    position: relative;
    transition: all 270ms ease;

    top: -45px;
    opacity: 0;
    
    ${({ expanded }) => expanded && css`
        top: 0;
        opacity: 1;
    `}

    @media (min-width: ${device.desktop}) {
        top: 0;
        opacity: 1;
    }
`;

const PreviewWrapper = styled.div<IExpandedProps>`
    padding: 0 20px;
    position: relative;
    transition: all 270ms ease;
    
    top: -60px;

    ${({ expanded }) => expanded && css`
        top: 0;
        opacity: 0;
    `}

    @media (min-width: ${device.desktop}) {
        top: 0;
        opacity: 0;
    }

    & > ul {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        list-style: none;
        padding: 0;
        display: flex;
    }
`;

const Toggle = styled.div<IExpandedProps>`
    width: 45px;
    height: 45px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 0px 20px 5px #fff;

    @media (min-width: ${device.desktop}) {
        display: none;
    }

    .toggle-icon {
        border: solid #242424;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 4px;
        margin-top: --4px;
        
        transition: transform .5s;
        transform: ${({ expanded }) => 
            expanded ? 'rotate(225deg)' : 'rotate(45deg)'};
    }
`;

export default WordListHeading;