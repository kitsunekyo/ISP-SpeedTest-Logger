import React, { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';

import { TOAST_DURATION } from './config';

type Toast = {
    id?: string;
    title: string;
    message?: string;
};

interface IToasterContext {
    toasts: Toast[];
    sendToast: (title: string, message?: string) => void;
    removeToast: (id: string) => void;
}

type ToasterProviderProps = {
    children: React.ReactNode;
};

export const ToasterContext = React.createContext<IToasterContext>({} as IToasterContext);

export const ToasterProvider = ({ children }: ToasterProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback(
        (id: string) => {
            setToasts((toasts) => toasts.filter((t) => t.id !== id));
        },
        [setToasts]
    );

    const sendToast = useCallback(
        (title: string, message?: string) => {
            const id = nanoid();
            setToasts((toasts) => [...toasts, { id, title, message }]);

            // autoremove
            setTimeout(() => {
                removeToast(id);
            }, TOAST_DURATION);
        },
        [setToasts, removeToast]
    );

    return (
        <ToasterContext.Provider value={{ toasts, sendToast, removeToast }}>
            {children}
        </ToasterContext.Provider>
    );
};
