const jwt = require('jsonwebtoken');
const GenerateToken =(phone)=>{
    
    return jwt.sign({ phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
}
module.exports = GenerateToken;