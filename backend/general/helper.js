const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function checkAccountExists(modal, username) {
    try {
        const account = await modal.findOne({ username: username });
        if (account) {
            return true
        } else {
            return false;
        }
    } catch (e) {
        throw e; // Re-throw the error to be caught by the calling code
    }
}
async function verifyLogin(model, username, password) {
    try {
        const account = await model.findOne({ username: username });
        if (!account) {
            throw new Error('Account not found');
        }
        const match = await bcrypt.compare(password, account.password);
        if (!match) {
            throw new Error('Invalid password');
        }
        return true;
    } catch (error) {
        console.error(error);
        return {error:error.message};
    }
}

async function verifyAuthToken(req, res,next) {
    try{
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
        // Split the Bearer token
        const token = authHeader.split(' ')[1];
        console.log("token --->",token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            else{
                req.username = decoded.username;
                console.log("decoded @@@",decoded)
                next()
            }
        });
    }catch(e){
        console.log("catch block",e)
        return e
    }
}

module.exports={checkAccountExists,verifyLogin,verifyAuthToken}