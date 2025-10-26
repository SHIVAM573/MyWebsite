import ImageKit from 'imagekit';

// Initialize ImageKit client (ESM). If your project uses CommonJS, convert this file
// to use `const ImageKit = require('imagekit');` and `module.exports = imagekit;`.
var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;