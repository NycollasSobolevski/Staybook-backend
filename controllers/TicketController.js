const Ticket = require("../models/Ticket");

class TicketController{
    static async CreateTicket(req, res) {
        const { price, seat, type, details, arrival, departure, title, roundTrip, arrivalDate, departureDate, tags } = req.body;

        if (!title || !details || !price || !arrival || !departure || !seat || !roundTrip || !arrivalDate || !departureDate || !type) {
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

    static async GetTicketById(req, res) {
        const { id } = req.params;
        try {
            const ticket = await Ticket.findById(id);
            if (!ticket) {
                return res.status(404).send({ message: "Ticket not found" });
            }
            return res.status(200).send(ticket);
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }
    
    static async GetTicketsWithPagination(req, res) {
        const { page = 1, limit = 15 } = req.query;
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
        const { page = 1, limit = 15, tags } = req.query;
        const tagArray = tags ? tags.split(",") : [];
    
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
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async UpdateTicket(req, res) {
        const { id } = req.params;
        const { price, seat, type, details, arrival, departure, title, roundTrip, arrivalDate, departureDate, tags } = req.body;
    
        if (!title || !details || !price || !arrival || !departure || !seat || !roundTrip || !arrivalDate || !departureDate || !type) {
            return res.status(400).send({ message: "One or more elements were not provided" });
        }

        try {
            const ticket = await Ticket.findByIdAndUpdate(id, {
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