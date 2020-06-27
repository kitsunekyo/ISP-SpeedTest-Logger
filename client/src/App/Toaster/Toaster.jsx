import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { X as CloseIcon } from 'react-feather';

import ToasterContext from './Context';

import Button from 'shared/components/Button';
import { color, size } from 'shared/utils/style';

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
	box-shadow: 1px 1px 3px rgba(33, 33, 33, 0.3);
	pointer-events: all;
	overflow: hidden;
	border-radius: ${size.radius};

	:not(:last-child) {
		margin-bottom: 0.5rem;
	}
`;

const ToastHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem;
`;

const ToastBody = styled.div`
	padding: 0 0.5rem 0.5rem;
	font-size: 0.95rem;
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
	animation-duration: 3s;
	animation-fill-mode: both;
	animation-timing-function: linear;
`;

const CloseButton = styled(Button)`
	font-size: 0.5rem;
	line-height: 1;
	height: 20px;
	margin-left: auto;
`;

const Title = styled.h3`
	font-size: 0.95rem;
	line-height: 1;
	margin: 0;
`;

const Toaster = () => {
	const { toasts, removeToast } = useContext(ToasterContext);

	return (
		<Overlay>
			<Toasts>
				{toasts.map(toast => (
					<Toast key={toast.id}>
						<ProgressBarWrapper>
							<ProgressBar />
						</ProgressBarWrapper>
						<ToastHeader>
							<Title>{toast.title}</Title>
							<CloseButton onClick={() => removeToast(toast.id)}>
								<CloseIcon size={10} />
							</CloseButton>
						</ToastHeader>
						<ToastBody>{toast.message}</ToastBody>
					</Toast>
				))}
			</Toasts>
		</Overlay>
	);
};

export default Toaster;
