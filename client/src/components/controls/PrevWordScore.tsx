import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { prevWordScoreAtom } from '../../state';

interface Props {
    isError: boolean;
}

const PrevWordScore = ({ isError }: Props) => {
    
    const prevWordScore = useRecoilValue(prevWordScoreAtom);

    return (
        <>
            {!isError && (
                <StyledPrevWordScore>
                    <span>+{prevWordScore}</span>
                </StyledPrevWordScore>
            )}
        </>
    );
}

export default PrevWordScore;

const StyledPrevWordScore = styled.div`
    font-weight: bold;
    color: #f7da21;
    position: absolute;
    left: 110%;
`;