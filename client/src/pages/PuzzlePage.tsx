import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/device";
import { puzzleAtom, foundWordsAtom } from "../state";
import ApiClient from "../api/client";
import GameField from "../components/GameField";
import LoadingAnimation from "../components/loading/LoadingAnimation";
import H1 from "../components/H1";
import { Link } from "react-router-dom";

const PuzzlePage = () => {
    const { id } = useParams();

    const [puzzle, setPuzzle] = useRecoilState(puzzleAtom);
    const [loaded, setLoaded] = useState(false);
    const clearFoundWordsList = useResetRecoilState(foundWordsAtom);

    useEffect(() => {
        async function getPuzzleById() {
            const response = await ApiClient.get<any>(`/puzzles/${id}`);
            setPuzzle(response);
            setLoaded(true);
        }

        getPuzzleById();

        return () => {
            // Reset foundWords atom when leaving puzzle page
            clearFoundWordsList();
        };
    }, [id]);

    const formattedDate =new Date(puzzle.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <div>
            <StyledHeader>
                <H1>
                    <Link to="/">
                        Be Spelling
                    </Link>
                    <DateSpan>
                        {puzzle?.date && formattedDate}
                    </DateSpan>
                </H1>
            </StyledHeader>
            {!loaded ? <LoadingAnimation /> : <GameField />}
        </div>
    );
};

export default PuzzlePage;

const StyledHeader = styled.header`
    border-bottom: 1px solid #bfbfbf;
    padding: 24px 24px;

    
    @media (min-width: ${device.desktop}) {
        padding: 24px 82px;
        
    }
`;

const DateSpan = styled.span`
    font-weight: 300;
    font-family: sans-serif;

    font-size: 24px;
    display: block;
    margin-left: 2px;

    @media (min-width: ${device.desktop}) {
        font-size: 28px;
        display: inline;
        margin-left: 16px;
    }
`;
