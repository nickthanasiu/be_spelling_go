import styled from "styled-components";
import { useState } from "react";
import PuzzleSortSelect from "./PuzzleSortSelect";
import PuzzleGrid, { QueryParams, ValueOf } from "./PuzzleGrid";

const PuzzleMenu = () => {
    const [filterParams, setFilterParams] = useState<QueryParams>({});

    const updateQueryParams = (paramKey: keyof QueryParams, paramValue: ValueOf<QueryParams>) =>
        setFilterParams({ ...filterParams, [paramKey]: paramValue });

    return (
        <>
            <PuzzleSortSelect updateQueryParams={updateQueryParams} />
            <GridWrapper>
                <PuzzleGrid filterParams={filterParams} />
            </GridWrapper>
        </>
    );
};

export default PuzzleMenu;

const GridWrapper = styled.div`
    width: 100%;
    margin-top: 15px;
    min-height: 500px;
    display: flex;
    justify-content: center;
`;
