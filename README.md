# Polling-APT
Polling aPI For coding ninja test 
Task I m Working upon

You need to create an API where anyone can create questions with options and also add votes to it
    - Authentication/User identity is not needed, this is going to be a completely open application, however
if you want to and think there’s extra time, you can create authentication
- Features
    - Create a question (you can add as many questions as you want)
    - Add options to a question
    - Add a vote to an option of question
    - Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
    - Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
    - View a question with it’s options and all the votes given to it
 
    - ## Requirements

- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [Postman](https://www.postman.com/downloads/) or use any other api testing tool

## Getting Started

- Clone the repository

```
git clone <repo url> <project_name>
```

- Install dependencies

```
npm install
```

- Open "config/mongoose.js" and add MongoDB URI, local or Atlas

- Build and run the project

```
npm start
```

- Navigate to `http://localhost:4000/`

## Endpoints

- /questions/create (To create a question)
- /questions/:questionId/options/create (To add options to a specific question)
- /questions/:questionId/delete (To delete a question)
- /options/:optionId/delete (To delete an option)
- /options/:optionsId/add_vote (To increment the count of votes)
- /questions/:questionId (To view a question and it’s options)
- /questions/ (To list down all the questions)
