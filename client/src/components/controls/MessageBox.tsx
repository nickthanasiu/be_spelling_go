import styled, { css } from 'styled-components';
import { device } from '../../styles/device';
import { useRecoilValue } from 'recoil';
import { messageBoxAtom } from '../../state';
import PrevWordScore from './PrevWordScore';

function MessageBox() {
    const { visible, message, isError, isPangram } = useRecoilValue(messageBoxAtom);

    return (
        <StyledMessageBox>
            {visible && (
                <Message isError={isError} isPangram={isPangram}>
                    <span>{message}</span>
                    <PrevWordScore isError={isError} />
                </Message>
            )}
        </StyledMessageBox>
    );
}

const StyledMessageBox = styled.div`
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translate(-50%, 0);

    @media (min-width: ${device.desktop}) {
        top: -50px;
    }
`;

const Message = styled.div<{ isError: boolean; isPangram: boolean; }>`
    font-weight: 500;
    height: 30px;
    width: max-content;
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    position: relative;

    background-color: white;
    color: black;
    border: 1px solid lightgray;

    ${({ isError }) => isError && css`
        background-color: black;
        color: white;
        border: 1px solid black;
    `};

    ${({ isPangram }) => isPangram && css`
        background-color: #f7da21;
        color: black;
        border: 1px solid #f7da21;
    `}
`;

export default MessageBox;
