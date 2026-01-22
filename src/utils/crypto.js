// src/utils/crypto.js

// Generate AES-256-GCM key (once per session)
export async function generateKey() {
    return crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

// Encrypt file before upload
export async function encryptFile(file, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM standard
    const fileBuffer = await file.arrayBuffer();

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        fileBuffer
    );

    const encryptedBlob = new Blob(
        [new Uint8Array(encryptedBuffer)],
        { type: "application/octet-stream" }
    );

    return {
        encryptedBlob,
        iv: btoa(String.fromCharCode(...iv)), // Base64 IV
    };
}


// Decrypt file after download
export async function decryptFile(blob, key, ivBase64) {
    const iv = Uint8Array.from(
        atob(ivBase64),
        (c) => c.charCodeAt(0)
    );

    const encryptedBuffer = await blob.arrayBuffer();

    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedBuffer
    );

    return new Blob([decryptedBuffer]);
}
