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
        const { page, limit } = req.headers
        const { tags } = req.body;

        const tagArray = tags.length < 1 ? [""] : tags;
        
        if (!tags)
            return res.status(400).send({ message: "Information not provided" });

        try {
            let query = {};
            if (tagArray.length > 0) {
                query = {
                    $or: [
                        { 'location.City': { $in: tagArray } },
                        { 'location.Country': { $in: tagArray } },
                        { 'location.Address': { $in: tagArray } },
                        { 'location.State': { $in: tagArray } },
                        { 'tags.name': { $in: tagArray } }
                    ]
                };
            }
            
            const hotels = await Hotel.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Hotel.countDocuments(query);
    
            return res.status(200).json({
                hotels,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: error });
        }
    }

    static async GetRange(req, res) {
        const { page, limit } = req.headers

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