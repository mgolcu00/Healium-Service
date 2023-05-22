
const express = require('express');
const DietController = require('../controller/DietController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const router = express.Router();
const dietController = new DietController();

router.get('/', AuthMiddleware.verify, (req, res) => dietController.getUserDiets(req, res));
router.get('/:id', AuthMiddleware.verify, (req, res) => dietController.getDietById(req, res));
router.get('/:id/detail', AuthMiddleware.verify, (req, res) => dietController.getDietDetailedById(req, res));

module.exports = router;