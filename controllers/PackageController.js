const Package = require("../models/Package");

class PackageController{
    static async CreatePackage(req, res) {
        const { title, details, price, bought, ticket, booking, attractions, tags, images, relevantClients } = req.body;
    
        if (!title || !details || !price || !booking || !ticket) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }
    
        const package = new Package({
            title: title,
            details: details,
            price: price,
            bought: bought,
            ticket: ticket,
            booking: booking,
            attractions: attractions,
            tags: tags,
            images: images,
            relevantClients: relevantClients
        });
    
        try {
            await package.save();
            return res.status(201).send({ message: "Package created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetPackageById(req, res) {
        const { id } = req.params;
        try {
            const package = await Package.findById(id);
            if (!package) {
                return res.status(404).send({ message: "Package not found" });
            }
            return res.status(200).send(package);
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async GetPackagesWithPagination(req, res) {
        const { page = 1, limit = 15 } = req.query;
        try {
            const packages = await Package.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Package.countDocuments();
    
            return res.status(200).json({
                packages,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetPackagesWithPaginationAndTags(req, res) {
        const { page = 1, limit = 15, tags } = req.query;
        const tagArray = tags ? tags.split(",") : [];
    
        try {
            let query = {};
            if (tagArray.length > 0) {
                query = { tags: { $in: tagArray } };
            }
    
            const packages = await Package.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Package.countDocuments(query);
    
            return res.status(200).json({
                packages,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async UpdatePackage(req, res) {
        const { id } = req.params;
        const { title, details, price, bought, ticket, booking, attractions, tags, images, relevantClients } = req.body;
    
        try {
            const package = await Package.findByIdAndUpdate(id, {
                title: title,
                details: details,
                price: price,
                bought: bought,
                ticket: ticket,
                booking: booking,
                attractions: attractions,
                tags: tags,
                images: images,
                relevantClients: relevantClients
            });
    
            if (!package) {
                return res.status(404).send({ message: "Package not found" });
            }
    
            return res.status(200).send({ message: "Package updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async DeletePackage(req, res) {
        const { id } = req.params;
    
        try {
            const package = await Package.findByIdAndDelete(id);
    
            if (!package) {
                return res.status(404).send({ message: "Package not found" });
            }
    
            return res.status(200).send({ message: "Package deleted successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
}

module.exports = PackageController;