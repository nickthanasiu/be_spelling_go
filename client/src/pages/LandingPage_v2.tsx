import styled from 'styled-components';
import H1 from '../components/H1';
import PuzzleMenu from '../components/PuzzleMenu';

export default function LandingPage_v2() {
    return (
        <StyledLandingPage>
            <ContentContainer>
                <H1>Be Spelling</H1>
                <h2>
                    Archive of old
                    <a href='https://www.nytimes.com/puzzles/spelling-bee' target="_blank" rel="noopener noreferrer">
                        &nbsp;NYT Spelling Bee&nbsp;
                    </a>
                    puzzles, so you can revisit favorites or play those you missed.
                </h2>
                <PuzzleMenu />
            </ContentContainer>
        </StyledLandingPage>
    );
}

const StyledLandingPage = styled.div`
    display: flex;
    justify-content: center;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 800px;
    height: fit-content;
    margin-top: 100px;
    padding: 15px;
    padding-bottom: 50px;

    h1, h2 {
        text-align: left;
    }

    h1 {
        font-family: 'Merriweather', serif;
        font-weight: 900;
        font-size: 40px;
        margin: 0;
        
    }
    h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 15px 0 25px;
        a {
            text-decoration: none;
            color: inherit;
        }
    }
`;
