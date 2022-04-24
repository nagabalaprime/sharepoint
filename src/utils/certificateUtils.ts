import forge from 'node-forge'

export const convertCertifcateToJWK = (certificate = '') => {
  if (certificate != null || certificate !='') {
    console.log('cerficate', certificate)
    const forgedCertificate = forge.pki.certificateFromPem(certificate)
    const publicKey = forgedCertificate.publicKey as any
    const rsaPublicKey = forge.pki.publicKeyToRSAPublicKey(publicKey)
    console.log('rsaPublicKey', rsaPublicKey)
    const encoded = forge.asn1
      .toDer(forge.pki.certificateToAsn1(forgedCertificate))
      .getBytes()

    const x5t = forge.md.sha1
      .create()
      .update(encoded)
      .digest()
      .data.toString()

    const x5t256 = forge.md.sha256
      .create()
      .update(encoded)
      .digest()
      .data.toString()

    const sdJwk = {
      kid: '',
      kty: 'RSA',
      key_ops: ['verify', 'encrypt', 'wrapKey'],
      n: btoa(forge.util.hexToBytes(publicKey.n.toString(16))),
      e: btoa(forge.util.hexToBytes(publicKey.e.toString(16))),
      x5c: [btoa(encoded)],
      use: '',
      x5t: btoa(x5t),
      x5t256: btoa(x5t256),
      alg: 'RSA-OAEP-256'
    }

    console.log('sdjwk', sdJwk);
    return sdJwk;
  }

  return '';
}
