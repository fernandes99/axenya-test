import styled from "styled-components"

export const TopNav = styled.nav`
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 12px 0;
    background-color: ${props => props.theme.colors.primary};
`

export const TopNavContent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a:first-child {
        height: 48px;
    }

    a:last-child {
        text-decoration: unset;
        color: #fff;
        padding: 13px 24px;
        border: 2px solid #3c3c3c;
        transition: all .3s;
        border-radius: 6px;

        &:hover {
            background-color: white;
            color: #000;
        }
    }

    li {
        display: flex;
    }
`