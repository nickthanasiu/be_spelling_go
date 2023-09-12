export type AddPuzzleRequest = {
    date: string,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
}

export type PuzzleResponse = {
    _id: string,
    date: string,
    centerLetter: string,
    letters: string[],
    pangrams: string[],
    words: string[],
    rankings: any,
};

export type PuzzleRankingLevel =
    'Beginner'
    | 'Good Start'
    | 'Moving Up'
    | 'Good'
    | 'Solid'
    | 'Nice'
    | 'Great'
    | 'Amazing'
    | 'Genius'
    | 'Queen Bee'
;

export type PuzzleRanking = { name: PuzzleRankingLevel, threshold: number };