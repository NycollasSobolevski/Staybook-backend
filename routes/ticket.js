const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');

router
    .post('/', TicketController.CreateTicket)
    .get('/:page&:limit', TicketController.GetTicketsWithPagination)
    .get('/filtered/:page&:limit&:tags', TicketController.GetTicketsWithPaginationAndTags)
    .patch('/:id', TicketController.UpdateTicket)
    .delete('/:id', TicketController.DeleteTicket)

module.exports = router;