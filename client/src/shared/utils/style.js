import { css } from 'styled-components';

export const color = {
    primary: '#0747a6',
    cta: '#ff5630',

    k0: '#172b4d',
    k1: '#5e6c84',
    w0: '#fff',
    w1: '#f4f5f7',
    w2: '#eee',

    textPrimary: '#172b4d',
    textSecondary: '#5e6c84',

    backgroundLight: '#fafafa',

    borderLight: '#eee',
};

export const font = {
    size: '16px',
    family: 'Circular Std',
};

export const text = {
    colorPrimary: color.k0,
    colorSecondary: color.k1,
    font: 'Circular Std',
};

export const size = {
    base: '16px',
    radius: '7px',
    sidebar: '100px',
};

export const mixin = {
    clickable: css`
        cursor: pointer;
        user-select: none;
    `,
    shadow: css`
        box-shadow: 0 22px 45px 0 rgba(0, 0, 0, 0.11);
    `,
};
