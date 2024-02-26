const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

class HotelController {
    static async Create(req, res) {
        const { description, rate, tags, contact, image, location, title } = req.body;

        if (!description || !image || !tags || !contact || !location || !title)
            return res.status(400).send({ message: "Mandatory information not provided" });

        const hotel = new Hotel({
            title: title,
            description: description,
            rate: rate,
            tags: tags,
            contact: contact,
            image: image,
            location: location
        });

        try {
            await hotel.save()
            return res.status(201).send({ message: "Hotel created successfully" });
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        };
    }

    static async GetAll(req, res) {
        try {
            var hotels = await Hotel.find();
            return res.status(200).send(hotels);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }

    static async GetRange(req, res) {
        const { start } = req.headers['start'];
        const { end } = req.headers['end'];
        
        if (!start || !end)
            return res.status(400).send({ message: "Mandatory information not provided" });

        try {
            var allhotels = await Hotel.find();
            var filteredHotels = allhotels.slice(start, end);
            return res.status(200).send(filteredHotels);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }
}

module.exports = HotelController;