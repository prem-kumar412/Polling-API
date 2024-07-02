"use strict";

var mongoose = require('mongoose');

var Option = require('../models/option');

var Question = require('../models/question'); // Controller function to create an option for a given question


module.exports.create = function _callee(req, res) {
  var question, option;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Question.findById(req.params.id));

        case 2:
          question = _context.sent;

          if (!question) {
            _context.next = 21;
            break;
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(Option.create({
            text: req.body.text
          }));

        case 7:
          option = _context.sent;
          // Set the link for the vote for the option
          option.link_to_vote = "http://localhost:4000/options/".concat(option._id, "/add_vote");
          option.save(); // Push the option to the question's options array

          question.options.push(option._id);
          question.save(); // Return the created option

          return _context.abrupt("return", res.json(option));

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));

        case 19:
          _context.next = 22;
          break;

        case 21:
          return _context.abrupt("return", res.status(404).json({
            error: 'Cannot find question'
          }));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 15]]);
}; // Controller function to delete an option


module.exports["delete"] = function _callee2(req, res) {
  var option, question;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Option.findById(req.params.id));

        case 3:
          option = _context2.sent;

          if (!option) {
            _context2.next = 20;
            break;
          }

          if (!(option.votes < 1)) {
            _context2.next = 17;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(Question.findOne({
            options: {
              $elemMatch: {
                $eq: req.params.id
              }
            }
          }));

        case 8:
          question = _context2.sent;

          if (!question) {
            _context2.next = 15;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(Option.findByIdAndDelete(req.params.id));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(Question.updateOne({
            _id: question._id
          }, {
            $pull: {
              options: {
                $in: req.params.id
              }
            }
          }));

        case 14:
          return _context2.abrupt("return", res.json({
            message: "Option deleted successfully",
            data: option
          }));

        case 15:
          _context2.next = 18;
          break;

        case 17:
          return _context2.abrupt("return", res.status(403).json({
            error: 'Option votes are given, cannot delete it'
          }));

        case 18:
          _context2.next = 21;
          break;

        case 20:
          return _context2.abrupt("return", res.status(404).json({
            error: 'Cannot find option'
          }));

        case 21:
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));

        case 27:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
}; // Controller function to add a vote to an option


module.exports.addVote = function _callee3(req, res) {
  var option;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Option.findById(req.params.id));

        case 3:
          option = _context3.sent;

          if (!option) {
            _context3.next = 10;
            break;
          }

          // Increment the votes count for the option and save it
          option.votes += 1;
          option.save();
          return _context3.abrupt("return", res.json({
            message: "Vote added to option",
            data: option
          }));

        case 10:
          return _context3.abrupt("return", res.status(404).json({
            error: 'Option not found'
          }));

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            error: 'Internal server error'
          }));

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};
//# sourceMappingURL=option_controller.dev.js.map
