import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { X as CloseIcon } from 'react-feather';

import Button from 'shared/components/Button';
import { color, size } from 'shared/utils/style';
import { TOAST_DURATION } from './config';
import { ToasterContext } from './index';

const growAnimation = keyframes`
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
`;

const Overlay = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 1000;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const Toasts = styled.div`
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-right: 1rem;
    padding-top: 1rem;
`;

const Toast = styled.article`
    background: white;
    box-shadow: 0 22px 45px 0 rgba(0, 0, 0, 0.11);
    pointer-events: all;
    overflow: hidden;
    border-radius: ${size.radius};

    :not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Title = styled.h3`
    font-size: 0.95rem;
    line-height: 1;
    margin: 0;
    :not(:last-child) {
        margin: 0 0 0.5em;
    }
`;

const Body = styled.div`
    display: flex;
    align-items: stretch;
    position: relative;
`;

const Content = styled.div`
    font-size: 0.95rem;
    padding: 1rem;

    p {
        margin: 0;
    }
`;

const ProgressBarWrapper = styled.div`
    height: 5px;
    background: ${color.w2};
    width: 100%;
`;

const ProgressBar = styled.div`
    height: 100%;
    background: ${color.primary};
    animation-name: ${growAnimation};
    animation-duration: ${TOAST_DURATION}ms;
    animation-fill-mode: both;
    animation-timing-function: linear;
`;

const CloseButton = styled(Button)`
    line-height: 1;
    height: auto;
    border-radius: 0;
    margin-left: auto;
`;

const Toaster = () => {
    const { toasts, removeToast } = useContext(ToasterContext);

    return (
        <Overlay>
            <Toasts>
                {toasts.map((toast) => (
                    <Toast key={toast.id}>
                        <ProgressBarWrapper>
                            <ProgressBar />
                        </ProgressBarWrapper>
                        <Body>
                            <Content>
                                {toast.title && <Title>{toast.title}</Title>}
                                {toast.message && <p>{toast.message}</p>}
                            </Content>
                            <CloseButton onClick={() => removeToast(toast.id)}>
                                <CloseIcon size={14} />
                            </CloseButton>
                        </Body>
                    </Toast>
                ))}
            </Toasts>
        </Overlay>
    );
};

export default Toaster;
