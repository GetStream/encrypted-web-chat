export default async callback => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256",
        },
        true, 
        ["deriveKey", "deriveBits"] 
    )

    const publicKeyJwk = await window.crypto.subtle.exportKey(
        "jwk", 
        keyPair.publicKey
    )

    const privateKeyJwk = await window.crypto.subtle.exportKey(
        "jwk", 
        keyPair.privateKey
    )

    console.log({publicKeyJwk, privateKeyJwk})

    callback({publicKeyJwk, privateKeyJwk})
}