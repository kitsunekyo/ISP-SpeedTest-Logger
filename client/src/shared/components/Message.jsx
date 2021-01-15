import React from 'react';
import styled from 'styled-components';

import { color } from 'shared/utils/style';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

const Title = styled.h1`
    display: flex;
    align-items: center;
    vertical-align: middle;

    > svg {
        margin-left: 0.5rem;
    }
`;
const Details = styled.p`
    color: ${color.textSecondary};
`;

const Message = ({ title, icon = null, details = null }) => {
    return (
        <Wrapper>
            <Title>
                {title} {icon}
            </Title>
            {details && <Details>{details}</Details>}
        </Wrapper>
    );
};

export default Message;
