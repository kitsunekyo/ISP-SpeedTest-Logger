import React, { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';

import { TOAST_DURATION } from './config';
import Toaster from './Toaster';
import ToasterContext from './Context';

const ToasterProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const sendToast = useCallback(
		(title, message) => {
			const id = nanoid();
			setToasts(toasts => [...toasts, { id, title, message }]);

			// autoremove
			setTimeout(() => {
				removeToast(id);
			}, TOAST_DURATION);
		},
		[setToasts]
	);

	const removeToast = useCallback(
		id => {
			setToasts(toasts => toasts.filter(t => t.id !== id));
		},
		[setToasts]
	);
	return (
		<ToasterContext.Provider value={{ toasts, sendToast, removeToast }}>
			<Toaster />
			{children}
		</ToasterContext.Provider>
	);
};

export default ToasterProvider;
