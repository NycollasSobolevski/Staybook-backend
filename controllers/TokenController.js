const Token = require('../models/Token');
const User = require('../models/User');
var crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
require('dotenv').config();

class TokenController{
    static async CreateToken(req, res){
        const { userJwt } = req.body;

        if(!userJwt) 
            return res.status(400)
                .send({ message: "Jwt not provided" })
        
        const secret = process.env.SECRET;
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const tokenValidationTimer = 300000;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: password
            }
            });
        var user = jwt.verify(userJwt, secret);
        var currentUser = await User.findById(user.id);
        var tokenCode = (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString();
        var safeCode = await bcrypt.hash(tokenCode, 12)
        var mailOptions = {
            from: email,
            to: currentUser.email,
            subject: 'Confirmation code',
            text: tokenCode
        }
        const token = new Token({
            code: safeCode,
            expires: Date.now() + tokenValidationTimer,
            user: user.id 
        });
        
        try {
            await transporter.sendMail(mailOptions, function(error, info) {
                if(error)
                {
                    console.log(error)
                }
            });
            
        } catch (error) {
            return res.status(500).send({ message: "Error while trying to send email"});
        }

        try {
            await Token.deleteMany({ "user": user.id });
            await token.save();
            return res.status(201).send({ message: "Token created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }
    
    static async CompareToken(req, res){
        const secret = process.env.SECRET;
        const { code, userJwt } = req.body;

        if(!code || !userJwt) 
            return res.status(400)
                .send({ message: "Code or jwt not provided" })

        var verifiedUser = jwt.verify(userJwt, secret);
        var userToken = await Token.findOne({ "user": verifiedUser.id });

        try {
            if (await bcrypt.compare(code.toString(), userToken.code) && userToken.expires - Date.now() > 0)
            {
                await User.findByIdAndUpdate(verifiedUser.id, { validated: true });
                await Token.deleteMany({ "user": verifiedUser.id });
                return res.status(200)
                    .send({ message: "User validated successfully" })
            }
            return res.status(400)
                .send({ message: "Invalid code" })
        } catch (error) {
            res.status(500)
                .send({ message: error.toString() });
        }
    } 
}

module.exports = TokenController;