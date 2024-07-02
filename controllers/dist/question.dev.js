"use strict";

// import required models
var Question = require('../models/question');

var Option = require('../models/option'); // list all the questions


module.exports.listAll = function _callee(req, res) {
  var questions;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Question.find({}, 'title'));

        case 3:
          questions = _context.sent;
          res.status(200).json({
            questionsCount: questions.length,
            questions: questions
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Internal Server Error",
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // create a new question


module.exports.create = function _callee2(req, res) {
  var question;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // create question
          question = new Question({
            title: req.body.title
          }); // save question

          _context2.next = 4;
          return regeneratorRuntime.awrap(question.save());

        case 4:
          return _context2.abrupt("return", res.status(201).json({
            message: "Question has been created.",
            question: {
              _id: question._id,
              title: question.title
            }
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error",
            error: _context2.t0
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports.addOption = function _callee3(req, res) {
  var question, option;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Question.findById(req.params.questionId));

        case 3:
          question = _context3.sent;

          if (question) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Question not found!"
          }));

        case 6:
          // create a new option
          option = new Option({
            text: req.body.text,
            questionRef: req.params.questionId
          });
          option.link_to_vote = "http://localhost:4000/options/".concat(option._id, "/add_vote"); // save option

          _context3.next = 10;
          return regeneratorRuntime.awrap(option.save());

        case 10:
          // created option's reference is added in options array of question
          question.options.push(option); // new changes saved in question

          _context3.next = 13;
          return regeneratorRuntime.awrap(question.save());

        case 13:
          res.status(200).json({
            message: "Option created successfully!",
            optionCreated: true,
            option: {
              _id: option._id,
              text: option.text
            }
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          console.log('Error: ', _context3.t0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports["delete"] = function _callee4(req, res) {
  var question;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Question.deleteOne({
            _id: req.params.questionId
          }));

        case 3:
          question = _context4.sent;

          if (!(question.deletedCount == 0)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Question not found."
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Option.deleteMany({
            questionRef: req.params.questionId
          }));

        case 8:
          return _context4.abrupt("return", res.status(200).json({
            message: "Question has been deleted"
          }));

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Internal Server Error",
            error: _context4.t0
          }));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

module.exports.listQuestion = function _callee5(req, res) {
  var question;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Question.findById(req.params.questionId).populate({
            path: 'options',
            select: '_id text votes link_to_vote'
          }).exec());

        case 3:
          question = _context5.sent;

          if (question) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Question not found with this questionId"
          }));

        case 6:
          return _context5.abrupt("return", res.status(200).json({
            message: "Question fetched successfully!",
            data: question
          }));

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Internal Server Error",
            error: _context5.t0
          }));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
//# sourceMappingURL=question.dev.js.map
