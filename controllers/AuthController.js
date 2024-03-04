const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

class AuthController{
    static async Register(req, res){
        const { username, email, password, notifications } = req.body;

        const passwordHash = await bcrypt.hash(password, 12)

        if(!username || !email || !password) 
            return res.status(400)
                .send({ message: "Name, email or password not provided" })

		const user = new User({
            username: username,
            email: email,
            password: passwordHash,
            validated: false,
            notifications: notifications
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

    static async Login(req, res){
        const { userLogin, password } = req.body;
        
        if(!userLogin || !password) 
            return res.status(400)
                .send({ message: "User or password not provided" })

        try {
            let user = await User.findOne({ email: userLogin })

            if (!user)
                user = await User.findOne({ username: userLogin })

            if(!user)
                return res.status(400).send({ message: "Invalid user" })
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
    static async Test(req, res){
        return res.status(200).send({ message: "Batata" })
    } 
}

module.exports = AuthController;