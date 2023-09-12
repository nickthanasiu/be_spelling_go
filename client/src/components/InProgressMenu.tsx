import styled from "styled-components";
import PuzzleMenu from "./PuzzleMenu";
import { type PuzzleResponse } from "../shared/types";

interface Props {
    puzzles: PuzzleResponse[];
}

const InProgressMenu = ({ puzzles }: Props) => {

    
    return (
        <StyledInProgressMenu>
            <h2>Want to continue?</h2>

            <PuzzleMenu />
        </StyledInProgressMenu>
    );
};

export default InProgressMenu;

const StyledInProgressMenu = styled.div`
    width: 100%;
    
    h2 {
        color: #f7da21;
        text-align: left;
    }
`;