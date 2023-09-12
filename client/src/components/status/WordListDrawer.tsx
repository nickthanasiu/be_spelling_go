import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { alphabetizedWordSelector } from '../../state';
import { device } from '../../styles/device';

interface Props {
    expanded: boolean;
}

function WordListDrawer({ expanded }: Props) {
    const alphabetizedWordList = useRecoilValue(alphabetizedWordSelector);

    return (
        <StyledWordListDrawer className="wordlist-drawer" expanded={expanded}>
            <Window>
                <ListWrapper>
                    <List>
                        {alphabetizedWordList.map(word => <li key={word}>{word}</li>)}
                    </List>
                </ListWrapper>
            </Window>
        </StyledWordListDrawer>
    );
}

const StyledWordListDrawer = styled.div<{ expanded: boolean }>`
    overflow: hidden;
    max-height: ${props => props.expanded ? 'calc(1vh * 68)' : '0'};
    transition: max-height 200ms ease;

    @media (min-width: ${device.desktop}) {
        max-height: none;
    }
`;

const Window = styled.div`
    position: relative;
    overflow: hidden;
    height: calc(1vh * 64);
`;

const ListWrapper = styled.div`
    position: relative;
    margin-left: 20px;
    display: flex;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 0;
`;

const List = styled.ul`
    display: block;
    width: 100%;
    flex-flow: column wrap;
    align-content: flex-start;
    height: calc(100% - 38px);
    padding: 20px 0 24px;

    /* @TODO :: This should be global */
    list-style: none;

    & > li {
        width: calc(50% - 20px);
        width: 50%;
        border-bottom: 1px solid lightgrey;
        margin: 0 20px 20px 0;
        padding-bottom: 5px;
    }
`;

export default WordListDrawer;