import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';
import { Loader } from 'react-feather';

import { size, color, mixin } from 'shared/utils/style';

const defaultVariant = css`
    color: ${color.textPrimary};
    background: ${color.w2};
    &:not(:disabled) {
        &:hover {
            background: ${darken(0.05, color.w2)};
        }
    }
`;

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: 45px;
    vertical-align: middle;
    line-height: 1;
    padding: 0 1rem;
    white-space: nowrap;
    border-radius: ${size.radius};
    transition: all 0.1s ease-in-out;
    appearance: none;
    outline: none;
    border: 0;
    ${mixin.clickable}
    ${defaultVariant}

	&:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

const Text = styled.div`
    padding-left: ${(props) => (props.withPadding ? 5 : 0)}px;
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);
    }
`;

const StyledLoader = styled(Loader)`
    animation: ${rotate} 2s linear infinite;
`;

type ButtonProps = {
    onClick?: () => any,
    icon?: ReactNode,
    disabled?: boolean,
    isWorking?: boolean,
    children?: ReactNode,
};

const Button = ({
    onClick,
    icon,
    disabled,
    isWorking,
    children,
    ...otherProps
}: ButtonProps & React.ButtonHTMLAttributes) => {
    const handleClick = (e) => {
        if (typeof onClick !== 'function') return;

        if (!disabled && !isWorking) {
            onClick(e);
        }
    };

    return (
        <StyledButton onClick={handleClick} disabled={disabled || isWorking} {...otherProps}>
            {isWorking ? <StyledLoader size={14} /> : null}
            {!isWorking ? icon : null}
            {children ? <Text withPadding={isWorking || icon}>{children}</Text> : null}
        </StyledButton>
    );
};

export default Button;
