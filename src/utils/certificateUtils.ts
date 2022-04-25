import forge from 'node-forge'
import _ from 'lodash'

export const convertCertifcateToJWK = (certificate = '') => {
  if (!_.isEmpty(certificate)) {
    const forgedCertificate = forge.pki.certificateFromPem(certificate)
    const publicKey = forgedCertificate.publicKey as any
    const rsaPublicKey = forge.pki.publicKeyToRSAPublicKey(publicKey)
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
    return sdJwk
  }

  return ''
}

export const downloadJSON = (jsonToDownload: Object) => {
  if (!_.isEmpty(jsonToDownload)) {
    const json = JSON.stringify(jsonToDownload)
    const blob = new Blob([json], { type: 'application/json' })
    const url = window.URL.createObjectURL(new Blob([json]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${'download'}.${'json'}`)
    document.body.appendChild(link)
    link.click()

    // Clean up and remove the link
    link?.parentNode?.removeChild(link)
  }
}
