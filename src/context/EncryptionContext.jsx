
import { createContext, useState } from "react";

/** Context */
export const EncryptionContext = createContext(null);

/** Provider */
export function EncryptionProvider({ children }) {
    const [encryptionKey, setEncryptionKey] = useState(null);

    return (
        <EncryptionContext.Provider
            value={{ encryptionKey, setEncryptionKey }}
        >
            {children}
        </EncryptionContext.Provider>
    );
}


