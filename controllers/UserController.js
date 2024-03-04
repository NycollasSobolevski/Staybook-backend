const User = require("../models/User");
const jwt = require('jsonwebtoken');

class UserController{
    static async Notify(req, res) {
        const { notification, userJwt } = req.body;
    
        const secret = process.env.SECRET;

        if(!userJwt) 
            return res.status(400)
                .send({ message: "Jwt not provided" })
                        
        if(!userJwt || !notification) 
            return res.status(400)
            .send({ message: "One or more elements were not provided" })
            
        var verifiedUser = jwt.verify(userJwt, secret);

        try {
            const user = await User.findById(verifiedUser.id);

            let newNotification = user.notification.concat(JSON.parse(notification))
            let unic = a => [...new Set(a)];

            newNotification = unic(newNotification);

            await User.findByIdAndUpdate(id, {
                notification: newNotification
            });
    
            return res.status(200).send({ message: "Notifications updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async Purchase(req, res) {
        const { packages, userJwt } = req.body;
        const secret = process.env.SECRET;

        if(!userJwt) 
            return res.status(400)
                .send({ message: "Jwt not provided" })
                
        if(!userJwt || !packages) 
            return res.status(400)
                .send({ message: "One or more elements were not provided" })

        var verifiedUser = jwt.verify(userJwt, secret);

        try {
            const user = await User.findById(verifiedUser.id);

            let updatedPurchases = user.purchases.concat(packages)
            let unic = a => [...new Set(a)];

            updatedPurchases = unic(updatedPurchases);

            await User.findByIdAndUpdate(verifiedUser.id, {
                purchases: updatedPurchases
            });
    
            return res.status(200).send({ message: "Purchases updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    }

    static async UpdateUser(req, res) {
        const { userJwt } = req.params;
        const { favorites, interests, purchases, notifications } = req.body;
        const secret = process.env.SECRET;

        if(!userJwt) 
            return res.status(400)
                .send({ message: "Jwt not provided" })
                
        if(!userJwt || !favorites || !interests || !purchases || !notifications) 
            return res.status(400)
                .send({ message: "One or more elements were not provided" })

        var verifiedUser = userJwt.verify(userJwt, secret);
        
        try {
            const user = await User.findByIdAndUpdate(verifiedUser.id, {
                favorites: favorites,
                interests: interests,
                purchases: purchases,
                notifications: notifications
            });
    
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
    
            return res.status(200).send({ message: "User updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetUser(req, res) {
        const { userJwt } = req.params;
        const secret = process.env.SECRET;

        if(!userJwt) 
            return res.status(400)
                .send({ message: "Jwt not provided" })

        var verifiedUser = jwt.verify(userJwt, secret);

        try {
            var user = await User.findById(verifiedUser.id);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }
}

module.exports = UserController;