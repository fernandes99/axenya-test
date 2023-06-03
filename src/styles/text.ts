import styled, { DefaultTheme } from "styled-components";

interface PropsText {
    category?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 's1' | 's2' | 's3' | 'm1' | 'm2' | 'b1' | 'b2';
    weight?: 'bolder' | 'bold' | 'medium' | 'regular' | 'light';
    color?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    align?: 'left' | 'center' | 'right';
    lineHeight?: string;
}

export const Text = styled.p<PropsText>`
    font-size: ${props => {
        if (!props?.category) return '16px';

        switch (props.category) {
            case 'h1': return '2rem'
            case 'h2': return '1.8rem'
            case 'h3': return '1.6rem'
            case 'b1': return '1.4rem'
            case 'b2': return '1.2rem'
            case 'm1': return '1rem'
            case 'm2': return '.9rem'
            case 's1': return '.8rem'
            case 's2': return '.7rem'
            case 's3': return '.6rem'
            default: return '16px'
        }
    }};
    color: ${props => props.color ? props.color : '#2D2D36'};
    font-weight: ${props => {
        if (!props?.weight) return '400';

        switch (props.weight) {
            case 'bolder': return '900'
            case 'bold': return '600'
            case 'medium': return '500'
            case 'regular': return '400'
            case 'light': return '300'
            default: return '400'
        }
    }};
    margin-bottom: ${props => props.mb ? props.mb : 0};
    margin-right: ${props => props.mr ? props.mr : 0};
    margin-top: ${props => props.mt ? props.mt : 0};
    margin-left: ${props => props.ml ? props.ml : 0};
    text-align: ${props => props.align ? props.align : 'left'};
    line-height: ${props => props.lineHeight ? props.lineHeight : '120%'};
`