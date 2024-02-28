const { type } = require("os");
const Ticket = require("../models/Ticket");
const { ObjectId } = require("bson");

class TicketController{
    static async CreateTicket(req, res) {
        const { price, roundTrip, seat, type, details, arrival, departure, title, arrivalDate, departureDate, tags } = req.body;

        if (!title || !details || !price || !arrival || !departure || !seat || !arrivalDate || !departureDate || !type) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }
    
        const ticket = new Ticket({
            price: price,
            seat: seat,
            type: type,
            details: details,
            arrival: arrival,
            departure: departure,
            seat: seat,
            roundTrip: roundTrip,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            tags: tags
        });
    
        try {
            await ticket.save();
            return res.status(201).send({ message: "Ticket created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async GetTicketsWithPagination(req, res) {
        const { page, limit } = req.params;
    
        try {
            const tickets = await Ticket.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Ticket.countDocuments();
    
            return res.status(200).json({
                tickets,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async GetTicketsWithPaginationAndTags(req, res) {
        const { page, limit, tags } = req.params;
        
        const tagArray = tags ? tags.split(" ") : [];

        try {
            let query = {};
            if (tagArray.length > 0) {
                query = { tags: { $in: tagArray } };
            }
    
            const tickets = await Ticket.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
    
            const count = await Ticket.countDocuments(query);

            return res.status(200).json({
                tickets,
                totalPages: Math.ceil(count / limit.replace(/[^0-9]/g,"")),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async UpdateTicket(req, res) {
        const { id } = req.params;
        const { price, seat, type, details, arrival, departure, title, arrivalDate, departureDate, tags } = req.body;
    
        if (!title || !details || !price || !arrival || !departure || !seat || !arrivalDate || !departureDate || !type) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }

        try {
            const ticket = await Ticket.findByIdAndUpdate({_id: id }, {
                price: price,
                seat: seat,
                type: type,
                title: title,
                details: details,
                arrival: arrival,
                departure: departure,
                seat: seat,
                arrivalDate: arrivalDate,
                departureDate: departureDate,
                tags: tags
            });
    
            if (!ticket) {
                return res.status(404).send({ message: "Ticket not found" });
            }
    
            return res.status(200).send({ message: "Ticket updated successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async DeleteTicket(req, res) {
        const { id } = req.params;
    
        try {
            const ticket = await Ticket.findByIdAndDelete(id);
    
            if (!ticket) {
                return res.status(404).send({ message: "Ticket not found" });
            }
    
            return res.status(200).send({ message: "Ticket deleted successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
}

module.exports = TicketController;