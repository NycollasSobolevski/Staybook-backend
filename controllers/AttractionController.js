const Attraction = require("../models/Attraction");

class AttractionController{
    static async CreateAttraction(req, res){
        const { name, price, details, image, attractionLocal, tags, relevantClients } = req.body;

        if(!name || !price || !details || !attractionLocal) 
            return res.status(400)
                .send({ message: "One or more elements were not provided" })

		const attraction = new Attraction({
            name: name,
            price: price,
            details: details,
            image: image,
            attractionLocal: attractionLocal,
            tags: tags,
            relevantClients: relevantClients
        });

        try {
            await attraction.save();
            return res.status(201).send({ message: "Attraction created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }

    static async GetAttraction(req, res) {
        const id = req.headers['id'];

        if (!id)
            return res.status(400).send({ message: "Mandatory information not provided" });

        try {
            var attraction = await Attraction.findOne({ '_id': id });
            return res.status(200).send(attraction);
        } catch (error) {
            return res.status(500).send({ error: "Failed" });
        }
    }

    static async DeleteAttraction(req, res) {
        const id = req.headers['id'];
    
        try {
            const attraction = await Attraction.findByIdAndDelete(id);
    
            if (!attraction) {
                return res.status(404).send({ message: "Attraction not found" });
            }
    
            return res.status(200).send({ message: "Attraction deleted successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async UpdateAttraction(req, res) {
        const id = req.headers['id'];
        const { name, price, details, image, attractionLocal, tags, relevantClients } = req.body;
    
        try {
            const attraction = await Attraction.findByIdAndUpdate(id, {
                name: name,
                price: price,
                details: details,
                image: image,
                attractionLocal: attractionLocal,
                tags: tags,
                relevantClients: relevantClients
            });
    
            if (!attraction) {
                return res.status(404).send({ message: "Attraction not found" });
            }
    
            return res.status(200).send({ message: "Attraction updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
}

module.exports = AttractionController;