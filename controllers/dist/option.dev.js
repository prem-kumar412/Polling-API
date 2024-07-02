"use strict";

// importing required models
var Option = require('../models/option');

var Question = require('../models/question'); // delete option


module.exports["delete"] = function _callee(req, res) {
  var option, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Option.findOneAndRemove({
            _id: req.params.optionId
          }));

        case 3:
          option = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(Question.findOneAndUpdate({
            _id: option.questionRef
          }, {
            $pull: {
              options: option._id
            }
          }));

        case 6:
          result = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            message: "Option deleted successfully!"
          }));

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: "Internal Server Error",
            error: _context.t0
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // add vote to option


module.exports.addVote = function _callee2(req, res) {
  var option;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Option.findOneAndUpdate({
            _id: req.params.optionId
          }, {
            $inc: {
              votes: 1
            }
          }));

        case 3:
          option = _context2.sent;

          if (option) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "No option found."
          }));

        case 6:
          return _context2.abrupt("return", res.status(200).json({
            message: "Vote added!"
          }));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Internal Server Error",
            error: _context2.t0
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
//# sourceMappingURL=option.dev.js.map
