import React from 'react';
import styled from 'styled-components';

import { mixin, size } from 'shared/utils/style';

const StyledCard = styled.div`
    padding: 2rem 3rem;
    background: white;
    border-radius: ${size.radius};
    ${mixin.shadow}
`;

const Title = styled.h3`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.5rem;
`;

const Body = styled.div``;

const Card = ({ title = null, children, ...otherProps }) => {
    return (
        <StyledCard {...otherProps}>
            {title && <Title>{title}</Title>}
            <Body>{children}</Body>
        </StyledCard>
    );
};

export default Card;
