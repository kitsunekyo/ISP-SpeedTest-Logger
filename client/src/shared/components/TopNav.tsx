import React from 'react';
import styled from 'styled-components';

import { color, mixin } from 'shared/utils/style';
import { useAuth } from 'Auth/AuthProvider';
import Button from './Button';

const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    height: 50px;
    flex-shrink: 0;
    background-color: ${color.w0};
    position: relative;
    padding: 0 2rem;
    justify-content: flex-end;
    ${mixin.shadow};
`;

const UserInfo = styled.span`
    display: inline-block;
    margin-right: 1rem;
`;

export const TopNav: React.FC = () => {
    const { authState, logout } = useAuth();

    return (
        <Wrapper>
            {authState.userInfo && <UserInfo>hey, {authState.userInfo.email}</UserInfo>}
            <Button onClick={logout}>Logout</Button>
        </Wrapper>
    );
};
