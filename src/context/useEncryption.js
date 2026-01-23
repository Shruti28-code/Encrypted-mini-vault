import { useContext } from "react";
import { EncryptionContext } from "./EncryptionContext";

export function useEncryption() {
    const context = useContext(EncryptionContext);

    if (!context) {
        throw new Error(
            "useEncryption must be used inside EncryptionProvider"
        );
    }

    return context;
}
