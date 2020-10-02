export default async (publicKeyJwk, privateKeyJwk) => {
    console.log("deriving key")

    console.log({publicKeyJwk, privateKeyJwk})

    const publicKey = await window.crypto.subtle.importKey(
        "jwk", 
        {...publicKeyJwk, key_ops: []},
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        true, 
        []
    )

    const privateKey = await window.crypto.subtle.importKey(
        "jwk", 
        privateKeyJwk, 
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        true, 
        ["deriveKey", "deriveBits"]
    )

    return await window.crypto.subtle.deriveKey(
        { name: "ECDH", public: publicKey }, 
        privateKey,
        { name: "AES-GCM", length: 256 },
        true,
        ['encrypt', 'decrypt']
    )
}