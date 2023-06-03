import styled from "styled-components";

export const Box = styled.div<{ orientation: "left" | "right"}>`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 4px;

    div {
        position: absolute;
        height: 100%;
        right: ${props => props.orientation === "right" ? "0px" : "unset"};
        left: ${props => props.orientation === "left" ? "0px" : "unset"};
    }

    div:first-child {
        background-color: #C5E0EB;
        width: 45vw;
    }

    div:nth-child(2n) {
        background-color: #2AB1B4;
        width: 30vw;
    }

    div:last-child {
        background-color: #1B90B3;
        width: 15vw;
    }
`