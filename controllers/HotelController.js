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

    static async GetHotelsWithPaginationAndTags(req, res) {
        const { page } = req.headers['page'];
        const { limit } = req.headers['limit'];
        const { tags } = req.body;
        
        const tagArray = tags ? tags.split(",") : [];
    
        try {
            let query = {};
            if (tagArray.length > 0) {
                query = {
                    $or: [
                        { location: { $in: tagArray } },
                        { tags: { $in: tagArray } }
                    ]
                };
            }
    
            const packs = await Package.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Package.countDocuments(query);
    
            return res.status(200).json({
                packs,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetRange(req, res) {
        const { page } = req.headers['page'];
        const { limit } = req.headers['limit'];
        
        if (!page || !limit)
            return res.status(400).send({ message: "Mandatory information not provided" });

        try {
            var filteredHotels = await Hotel.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            return res.status(200).send(filteredHotels);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }
}

module.exports = HotelController;