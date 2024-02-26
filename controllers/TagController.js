const Tag = require("../models/Tags");

class TagController{
    static async CreateTag(req, res) {
        const { price, name, details } = req.body;

        if (!name || !details || !price) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }
    
        const tag = new Tag({
            name: name,
            price: price,
            details: details
        });
    
        try {
            await tag.save();
            return res.status(201).send({ message: "Tag created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async GetAll(req, res) {
        try {
            const tags = await Tag.find();
    
            return res.status(200).send(tags);
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async UpdateTag(req, res) {
        const { id } = req.headers['id'];
        const { name, price, details } = req.body;
    
        if (!name || !details || !price) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }

        try {
            const tag = await Tag.findByIdAndUpdate({_id: id }, {
                price: price,
                name: name,
                details: details
            });
    
            if (!tag) {
                return res.status(404).send({ message: "Tag not found" });
            }
    
            return res.status(200).send({ message: "Tag updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async DeleteTag(req, res) {
        const { id } = req.headers['id'];
    
        try {
            const tag = await Tag.findByIdAndDelete(id);
    
            if (!tag) {
                return res.status(404).send({ message: "Tag not found" });
            }
    
            return res.status(200).send({ message: "Tag deleted successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
}

module.exports = TagController;