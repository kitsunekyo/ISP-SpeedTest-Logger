import { createGlobalStyle } from 'styled-components';

import { size, font, color } from 'shared/utils/style';

const BaseStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html,
    body,
    :root {
        height: 100%;
        min-height: 100%;
        margin: 0;
    }
    #root {
        min-height: 100%;
    }
    html {
        font-size: ${size.base};
    }
    body {
        -webkit-tap-highlight-color: transparent;
        font-family: ${font.family}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.5;
        color: ${color.textPrimary};
        background-color: ${color.w1};
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin: 0;
        font-weight: 500;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.25rem;
        font-weight: normal;
    }

    a,
    a:visited,
    a:focus {
        color: ${color.primary};

        &:hover {
            text-decoration: none;
        }
    }

    /* button {
        background: none;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        border-radius: ${size.radius};
        height: 35px;
        padding: 0 1rem;
        transition: all .1s;
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        vertical-align: middle;

        &:hover {
            background: ${color.w1}
        }
    } */

`;

export default BaseStyles;
