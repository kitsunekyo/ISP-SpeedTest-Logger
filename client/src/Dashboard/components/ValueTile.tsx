import React from 'react';
import styled from 'styled-components';

import { color } from 'shared/utils/style';

const StyledValueTile = styled.div``;
const Title = styled.div``;
const Icon = styled.div`
    font-size: 0.75rem;
    color: ${color.textSecondary};
`;
const Value = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    white-space: nowrap;
`;

const Unit = styled.span`
    font-size: 0.75rem;
    color: ${color.textSecondary};
`;
type Props = {
    title: string;
    icon?: React.ReactNode;
    value: number | string;
    unit?: string;
};
const ValueTile = ({ title, icon, value, unit, ...otherProps }: Props) => {
    return (
        <StyledValueTile {...otherProps}>
            <Title>
                {title} {icon ? <Icon>{icon}</Icon> : null}
            </Title>
            <Value>
                {value} <Unit>{unit}</Unit>
            </Value>
        </StyledValueTile>
    );
};

export default ValueTile;
