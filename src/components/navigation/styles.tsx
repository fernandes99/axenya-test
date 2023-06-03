import styled from "styled-components";
import theme from "../../styles/theme";

export const Nav = styled.nav<{ light?: boolean }>`
    position: absolute;
    right: 20%;
    top: 20vh;
    z-index: 99;

    ul {
        position: relative;
    }

    @media (max-width: ${theme.media.desktop}) {
        top: 0;
        right: 0;
        height: 100vh;
        width: 75vw;
        background-color: #fff;
        z-index: 100;
        padding: 32px;
    }
`

export const NavItem = styled.li<{ actived?: boolean }>`
    display: flex;
    justify-content: flex-end;

    a {
        font-size: 18px;
        padding: 8px 12px;
        color: #fff;
        text-decoration: none;
        transition: all .3s;
        border-radius: 4px;
        font-weight: ${props => props.actived ? "bold" : "400"};

        &:hover {
            background-color: #00000050;
        }
    }

    @media (max-width: ${theme.media.desktop}) {
        justify-content: flex-start;
        width: 100%;

        a {
            color: #000;
        }
    }
`

export const Border = styled.div<{ light?: boolean }>`
    width: 2px;
    height: 100%;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    position: absolute;
    top: 8px;
    right: -16px;
    border-radius: 2px;
    opacity: .7;
    
    @media (max-width: ${theme.media.desktop}) {
        display: none;
    }
`

export const Backdrop = styled.div<{ light?: boolean }>`
    display: none;

    @media (max-width: ${theme.media.desktop}) {
        display: block;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: #000000aa;
    }
`

export const Button = styled.button<{ light?: boolean }>`
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    background-color: transparent;
    border: 1px solid ${props => props.light ? '#ffffff7a' : 'transparent'};
    font-size: 32px;
    color: ${props => props.light ? '#ffffffdd' : '#000'};
    opacity: ${props => props.light ? '1' : '.5'};
    z-index: 1;
`