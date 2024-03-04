const { isValidObjectId } = require("mongoose");
const Package = require("../models/Package");
const mongoose = require('mongoose');

class PackageController{
    static async CreatePackage(req, res) {
        const { title, details, price, bought, ticket, booking, attractions, tags, images, relevantClients } = req.body;
    
        if (!title || !details || !price || !ticket) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }
    
        const pack = new Package({
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
            await pack.save();
            return res.status(201).send({ message: "Package created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetPackageById(req, res) {
        const { id } = req.params;
    
        try {
            const pack = await Package.findById(id);
    
            console.log(pack);
    
            if (!pack) {
                return res.status(404).send({ message: "Package not found" });
            }
    
            return res.status(200).send(pack);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async GetPackagesWithPagination(req, res) {
        const { page, limit } = req.params;

        try {
            const packs = await Package.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Package.countDocuments();
    
            return res.status(200).json({
                packs,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetPackagesWithPaginationAndTags(req, res) {
        const { page, limit, tags } = req.params;
        
        const tagArray = tags ? tags.split(",") : [];
    
        try {
            let query = {};
            if (tagArray.length > 0) {
                query = { tags: { $in: tagArray } };
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

    static async UpdatePackage(req, res) {
        const { id } = req.params;
        const { title, details, price, bought, ticket, booking, attractions, tags, images, relevantClients } = req.body;
    
        try {
            const pack = await Package.findByIdAndUpdate(id, {
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
    
            if (!pack) {
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
            const pack = await Package.findByIdAndDelete(id);
    
            if (!pack) {
                return res.status(404).send({ message: "Package not found" });
            }
    
            return res.status(200).send({ message: "Package deleted successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
}

module.exports = PackageController;