"use strict";

var express = require('express');

var router = express.Router();

var optionController = require('../controllers/option'); // route for deleting specified option


router.post('/:optionId/delete', optionController["delete"]); // route for adding vote to a specified option

router.get('/:optionId/add_vote', optionController.addVote);
module.exports = router;
//# sourceMappingURL=option.dev.js.map
