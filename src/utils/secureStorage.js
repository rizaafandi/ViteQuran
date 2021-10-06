import SecureLS from 'secure-ls'

const secureStorage = new SecureLS({
    encodingType: 'RABBIT',
    isCompression: false
})

export default secureStorage