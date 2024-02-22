const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

router
    .post('/', TicketController.CreateTicket)
    .get('/', TicketController.GetTicketById)
    .get('/pagination', TicketController.GetTicketsWithPagination)
    .get('/filteredPagination', TicketController.GetTicketsWithPaginationAndTags)
    .patch('/', TicketController.UpdateTicket)
    .delete('/', TicketController.DeleteTicket)

module.exports = router;