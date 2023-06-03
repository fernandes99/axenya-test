import styled from "styled-components";

export const Layout = styled.div<{ overflow?: string, fullWidth?: boolean }>`
    width: ${props => props.fullWidth? '100%' : '1200px'};
    margin: 0 auto;
    overflow: ${props => props.overflow || 'unset'};

    @media (max-width: ${props => props.theme.media.desktop}) {
        width: 100%;
        padding: 32px;
    }

    @media (max-width: ${props => props.theme.media.laptop}) {
        padding: 24px;
    }

    @media (max-width: ${props => props.theme.media.mobile}) {
        padding: 16px;
    }
`

export const Row = styled.div<{ gap?: string, width?: string }>`
    display: flex;
    flex-direction: row;
    gap: ${props => props.gap ? `${props.gap}` : '0px'};
    width: ${props => props.width ? `${props.width}` : '100%'}; 

    @media (max-width: ${props => props.theme.media.desktop}) {
        flex-direction: column;
        width: 100%;
    }
`

export const Col = styled.div<{ count?: number, width?: string }>`
    display: flex;
    flex-direction: column;
    flex: ${props => props.count ? `${props.count}` : '1'};
    width: ${props => props.width ? `${props.width}` : '100%'}; 

    @media (max-width: ${props => props.theme.media.desktop}) {
        flex: 1;
        width: 100%;
    }
`

export const Flex = styled.div<{ gap?: string, direction?: string, align?: string, justify?: string }>`
    display: flex;
    gap: ${props => props.gap ? props.gap : '0px'};
    flex-direction: ${props => props.direction ? props.direction : 'row'};
    align-items: ${props => props.align ? props.align : 'flex-start'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
`

export const Box = styled.div`
    display: inline-block;
`