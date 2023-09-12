import { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../styles/device";
import ApiClient from '../api/client';
import { PuzzlesApiResponse } from "../state/puzzle";
import LoadingAnimation from "./loading/LoadingAnimation";
import PuzzleCard from "./PuzzleCard";
import LoadMoreButton from "./LoadMoreButton";

interface Props {
    filterParams: QueryParams; 
};

const PuzzleGrid = ({ filterParams }: Props) => {

    const { isLoading, isError, data, loadMore } = usePuzzleQuery(filterParams);

    if (!data || isLoading) { // @TODO: Replace loading animation with skeleton grid: ;
        return (
            <LoadingAnimation />
        );
    }

    if (isError) {
        return (
            <p>There was a problem loading puzzles. Please refresh page to try again</p>
        );
    }


    const { puzzles, nextCursor } = data;

    return (
        <Container>
            <Grid>
                {puzzles.map(puzzle => <PuzzleCard key={puzzle._id} puzzle={puzzle} />)}
            </Grid>

            {nextCursor && (
                <ButtonWrapper>
                    <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
                </ButtonWrapper>
            )}
        </Container>
    );
};

export default PuzzleGrid;

const Container = styled.div`
    width: 100%;
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 25px;
    column-gap: 10px;
    margin-top: 25px;

    @media (min-width: ${device.desktop}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;


type SortOption = "newest" | "oldest" | "hardest" | "easiest";

export interface QueryParams {
    sort?: SortOption;
    cursor?: string;
};

export type ValueOf<T> = T[keyof T];

function usePuzzleQuery(filterParams: QueryParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<PuzzlesApiResponse>();

    const BASE_URL = '/puzzles';

    const buildQueryString = (additionalParams?: QueryParams): string =>
        Object
            .entries({ ...filterParams, ...additionalParams })
            .reduce((queryString, entry: [string, string]) => {
                const queryParam = entry[0] + "=" + entry[1];
                const operator = queryString === BASE_URL ? '?' : '&';
                return queryString + operator + queryParam;
            }, BASE_URL);

    const queryString = buildQueryString(filterParams);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            try {
                const puzzles = await ApiClient.get<PuzzlesApiResponse>(queryString);

                setData(puzzles);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, [filterParams]);

    const loadMore = async () => {

        if (!data?.nextCursor) return;
        
        const nextCursor = data.nextCursor;
        const queryString = buildQueryString({ cursor: nextCursor });

        const response = await ApiClient.get<PuzzlesApiResponse>(queryString);

        setData({
            puzzles: [...data.puzzles, ...response.puzzles],
            nextCursor: response.nextCursor
        });
    };


    return { isLoading, isError, data, loadMore };
}