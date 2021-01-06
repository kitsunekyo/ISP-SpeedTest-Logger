import React from "react";

export default React.createContext({
    toasts: [],
    sendToast: () => {},
    removeToast: () => {},
});
