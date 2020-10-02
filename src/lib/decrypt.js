export default async (text, derivedKey) => {
    try {
        const string = atob(text);
        const uintArray = new Uint8Array([...string].map(char => char.charCodeAt(0)));
        const algorithm = {name: 'AES-GCM', iv: new TextEncoder().encode("Initialization Vector")}
        const decryptedData = await window.crypto.subtle.decrypt(algorithm, derivedKey, uintArray)

        const decodedText = new TextDecoder().decode(decryptedData)
        return decodedText
    } catch(e) {
        return `error decrypting message: ${e}`
    }
}