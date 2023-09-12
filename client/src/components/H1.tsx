import styled from "styled-components";
import { device } from "../styles/device";

const StyledH1 = styled.h1`
    font-family: 'Merriweather', serif;
    font-weight: 900;
    font-size: 37px;
    margin: 0;
    vertical-align: baseline;
    
    a {
        text-decoration: none;
        color: inherit;
    }

    @media (min-width: ${device.desktop}) {
        font-size: 42px;
    }
`;

export default StyledH1;
