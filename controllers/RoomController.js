const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

class RoomController {
    static async Create(req, res) {
        const { capacity, doubleBed, singleBed, price, 
            rate, hotel, description, category, 
            image, available, title, tags, code  } = req.body;

        if (isNaN(capacity) || isNaN(doubleBed) || isNaN(singleBed) || isNaN(price) || isNaN(rate) || 
            !hotel || !description || !image || !code || !available || !category || !title)
            return res.status(400).send({ message: "Mandatory information not provided" });

        const queryHotel = await Hotel.findById(hotel);
        
        const room = new Room({
            title: title,
            tags: tags,
            code: code, 
            capacity: capacity,
            doubleBed: doubleBed,
            singleBed: singleBed,
            price: price,
            rate: rate,
            location: queryHotel.location,
            hotel: hotel,
            description: description,
            category: category,
            image: image,
            available: available
        });

        try {
            await room.save()
            try {
                await Hotel.findByIdAndUpdate(hotel, { "$push": { rooms: room } });
                
                let currentHotel = await Hotel.findById(hotel);
                var newStartingPrice = Math.min(...currentHotel.rooms.map(room => room.price));

                await Hotel.findByIdAndUpdate(hotel, { "$set": { startingPrice: newStartingPrice} });

            } catch (error) {
                return res.status(500).send({ error: error });    
            }
            return res.status(201).send({ message: "Room created successfully" });
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        };
    }

    static async GetAll(req, res) {
        try {
            var rooms = await Room.find();
            return res.status(200).send(rooms);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }

    static async GetRange(req, res) {
        const { start, end } = req.params;
        
        if (!start || !end)
            return res.status(400).send({ message: "Mandatory information not provided" });

        try {
            var allRooms = await Room.find();
            var filteredRoomss = allRooms.slice(start, end);
            return res.status(200).send(filteredRoomss);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }

    static async GetRoom(req, res) {
        const { code } = req.params;
        
        if (!code)
            return res.status(400).send({ message: "Mandatory information not provided" });

        try {
            var room = await Room.findOne({ 'code': code });
            return res.status(200).send(room);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }
}

module.exports = RoomController;