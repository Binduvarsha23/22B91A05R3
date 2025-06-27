const { nanoid } = require("nanoid");

const generateShortCode = () => nanoid(6);

module.exports = generateShortCode;
