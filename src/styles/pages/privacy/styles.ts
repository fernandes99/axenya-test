import styled from "styled-components";

export const S = {
    Box: styled.div`
        padding: 120px 0;
        
        @media (max-width: ${props => props.theme.media.desktop}) {
            padding: 24px 8px;
        }
    `
}