import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import GameField from "../components/GameField";
import BigHeading from "../components/BigHeading";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import { Link } from "react-router-dom";
import { puzzleQueryById } from "../state/puzzle";

const PuzzlePage = () => {
    const { id } = useParams();

    const currentPuzzle = useRecoilValue(puzzleQueryById(id as string));

    const formattedDate =new Date(currentPuzzle.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <StyledPuzzlePage>
            <FadeOutFallback>
                <LoadingAnimation /* color="white" *//>
            </FadeOutFallback>
            <header>
                <BigHeading>
                    <Link to="/">
                        Be Spelling
                    </Link>
                    <span className="date">
                        {formattedDate}
                    </span>
                </BigHeading>
            </header>
            <GameField puzzle={currentPuzzle} />
        </StyledPuzzlePage>
    );
};

export default function PuzzlePageContainer() {
    return (
        <Suspense fallback={
            <StyledPuzzlePageFallback>
                <LoadingAnimation /*color="white"*/ />
            </StyledPuzzlePageFallback>
        }>

            <PuzzlePage />
        </Suspense>
    );
}


const StyledPuzzlePage = styled.div`
    position: relative;

    header {
        padding: 24px 82px;
        border-bottom: 1px solid #bfbfbf;
    }

    .date {
        font-size: 24px;
        font-weight: 300;
        font-family: sans-serif;
        margin-left: 16px;
    }

`;

const StyledPuzzlePageFallback = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f7da21;

    display: flex;
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        visibility: visible;
    }

    to {
        opacity: 0;
        visibility: hidden;
    }
`;

const FadeOutFallback = styled(StyledPuzzlePageFallback)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;

    animation: ${fadeOut} 1s;
    animation-fill-mode: forwards;
`;