require('dotenv').config()
require('cookie-parser')

const API_KEY = process.env.SDK_API_KEY;
const SECRET = process.env.SDK_TOKEN;

const options = { 
 expiresIn: '120m', 
 algorithm: 'HS256' 
};
const payload = {
 apikey: API_KEY,
 permissions: [`allow_join`,`ask_join`,`allow_mod`], // `ask_join` || `allow_mod` 
 version: 2,
 roles: ['CRAWLER'],
};

const token = jwt.sign(payload, SECRET, options);
console.log(token);
