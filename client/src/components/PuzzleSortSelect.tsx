import styled from "styled-components";
import { QueryParams, ValueOf } from "./PuzzleGrid";

interface Props {
    updateQueryParams: (paramKey: keyof QueryParams, paramValue: ValueOf<QueryParams>) => void;
}

const PuzzleSortSelect = ({ updateQueryParams }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQueryParams("sort", e.target.value);
    };

    return (
        <StyledPuzzleSortSelect>
            <label htmlFor="sort-results">Sort by: </label>
            <select name="sort" id="sort-results" onChange={handleChange}>
                <option value="newest">Most Recent</option>
                <option value="oldest">Oldest</option>
                {/*
                    <option value="hardest">Difficulty (Most Points)</option>
                    <option value="easiest">Difficulty (Fewest points)</option>
                */}
            </select>
        </StyledPuzzleSortSelect>
    );
};

export default PuzzleSortSelect;

const StyledPuzzleSortSelect = styled.div`
    margin-top: 20px;
    align-self: flex-start;

    label {
        margin-right: 5px;
        font-weight: 500;
    }
`;