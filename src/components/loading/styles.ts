import styled from "styled-components";

export const Box = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #000000b8;
    z-index: 999999999;

    span, svg {
        font-size: 22px;
        color: white;
        animation: loading01 1.4s infinite alternate;
    }

    span:after {
        content: ' .';
        animation: dots 1s steps(5, end) infinite;
    }

    svg {
        height: 80px;
        margin-bottom: 16px;

        * {
            fill: white;
        }
    }

    @keyframes loading01 {
        0% {
            opacity: 1;
        }
        100% {
            opacity: .5;
        }
    }

    @keyframes dots {
        0%, 20% {
            color: rgba(0,0,0,0);
            text-shadow:
                .25em 0 0 rgba(0,0,0,0),
                .5em 0 0 rgba(0,0,0,0);
        }
        40% {
            color: white;
            text-shadow:
                .25em 0 0 rgba(0,0,0,0),
                .5em 0 0 rgba(0,0,0,0);
        }
        60% {
            text-shadow:
                .25em 0 0 white,
                .5em 0 0 rgba(0,0,0,0);
        }
        80%, 100% {
            text-shadow:
                .25em 0 0 white,
                .5em 0 0 white;
        }
    }

`