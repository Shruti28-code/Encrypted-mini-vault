import { createContext, useContext, useEffect, useState } from "react";
import { generateKey } from "../utils/crypto";

const EncryptionContext = createContext(null);

export const EncryptionProvider = ({ children }) => {
    const [encryptionKey, setEncryptionKey] = useState(null);

    useEffect(() => {
        const initKey = async () => {
            const key = await generateKey();
            setEncryptionKey(key);
        };

        initKey();
    }, []);

    return (
        <EncryptionContext.Provider value={{ encryptionKey }}>
            {children}
        </EncryptionContext.Provider>
    );
};

export const useEncryption = () => useContext(EncryptionContext);
