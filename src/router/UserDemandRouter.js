const express = require('express');
const UserDemandController = require('../controller/UserDemandController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const router = express.Router();
const userDemandController = new UserDemandController();

router.post('/create', AuthMiddleware.verify, (req, res) => userDemandController.createDemand(req, res));
router.get('/', AuthMiddleware.verify, (req, res) => userDemandController.getDemandsByUserId(req, res));
router.get('/one/:id', AuthMiddleware.verify, (req, res) => userDemandController.getDemandById(req, res));
router.delete('/drop', AuthMiddleware.verify, (req, res) => userDemandController.dropPendingDemands(req, res));
module.exports = router;
