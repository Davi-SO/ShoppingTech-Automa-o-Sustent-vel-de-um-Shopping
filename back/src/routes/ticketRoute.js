const ticketController = require('../controllers/controller.ticket.js');
module.exports = (app) => {
    app.get('/tickets', ticketController.getAll);
    app.get('/tickets/:id', ticketController.getTicketById);
    app.delete('/ticket/del/:id', ticketController.delete);

}