import styled, { keyframes } from 'styled-components';

interface Props {
  size?: number;
}

// Copied from: https://loading.io/css/
const LoadingAnimation = (props: Props) => {
    return (
        <StyledLoadingAnimation {...props}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </StyledLoadingAnimation>
    );
}

export default LoadingAnimation;

const ellipsis1 = keyframes`
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
`;
  
const ellipsis2 = keyframes`
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
`;

const ellipsis3 = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
`;


const StyledLoadingAnimation = styled.div<Props>`
    position: relative;
    margin: auto;
    width: ${(props) => `${props.size || 80}px`};
    height: ${(props) => `${props.size || 80}px`};

    div {
        position: absolute;
        width: 16%;
        height: 16%;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        background: lightgray;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);

        &:nth-child(1) {
            left: 8px;
            animation: ${ellipsis1} 0.6s infinite;
        }

        &:nth-child(2) {
            left: 8px;
            animation: ${ellipsis2} 0.6s infinite;
        }

        &:nth-child(3) {
            left: 32px;
            animation: ${ellipsis2} 0.6s infinite;
        }

        &:nth-child(4) {
            left: 56px;
            animation: ${ellipsis3} 0.6s infinite;
        }
    }
`;

