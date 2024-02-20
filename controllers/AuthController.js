const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

class AuthController{
    static async register(req, res){
        const { username, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 12)

        if(!username || !email || !password) 
            return res.status(400)
                .send({ message: "Name, email or password not provided" })

		const user = new User({
            username: username,
            email: email,
            password: passwordHash,
            validated: false
        });

        if (await User.findOne({ "email": email }).Count > 0)
            return res.status(400)
                .send({ message: "Email already in use" })

        if (await User.findOne({ "username": username }).Count > 0)
            return res.status(400)
                .send({ message: "Username already in use" })

        try {
            await user.save();
            return res.status(201).send({ message: "User created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }

    static async login(req, res){
        const { email, password } = req.body;
        console.log(email + password)
        if(!email || !password) 
            return res.status(400)
                .send({ message: "Email or password not provided" })

        try {
            const user = await User.findOne({ email })
            if(!user)
                return res.status(400).send({ message: "Invalid Email" })
            if(!await bcrypt.compare(password, user.password)){
                return res.status(400).send({ message: "Invalid password" })
            }
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    id: user._id
                },
                secret,
                {
                    expiresIn: '2 days'
                }
            );
            return res.status(200).send({ token: token, valid: user.validated })
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    } 
}

module.exports = AuthController;