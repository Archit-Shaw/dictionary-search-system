# Dictionary Search & Auto-Suggestion System

## About the Project

This project is a simple Dictionary Search and Auto-Suggestion System developed as part of the assignment. The main goal was to build a system that can efficiently store words, search for exact matches, and provide prefix-based suggestions similar to search engines.

The application supports the following operations:

* Add a new word to the dictionary
* Search whether a word exists
* Track how many times a word has been searched
* Provide auto-suggestions based on a prefix
* Return suggestions ordered by frequency and alphabetical order

The project is built using Node.js and Express, and all data is stored in memory.

---

## Data Structures Used

### Trie (Prefix Tree)

A Trie is used to store all words and perform prefix-based searches efficiently.

Instead of checking every word in the dictionary, the Trie allows direct traversal using the given prefix, making suggestion retrieval much faster.

### Map

A JavaScript Map is used to store the frequency of each word.

Example:

```javascript
apple -> 5
application -> 8
apply -> 3
```

Using a Map provides fast lookups and updates whenever a word is searched.

---

## Approach

### Adding a Word

When a user adds a word:

* The input is converted to lowercase.
* The system checks whether the word already exists.
* If the word is already present, a message is returned.
* Otherwise, the word is inserted into the Trie and added to the frequency store.

### Searching a Word

When a word is searched:

* The system checks whether the word exists.
* If found, the response is `FOUND`.
* The frequency of that word is increased by 1.
* If the word does not exist, the response is `NOT FOUND`.

### Generating Suggestions

For suggestions:

* The Trie is traversed using the given prefix.
* All matching words are collected.
* Results are sorted by:

  1. Higher frequency first
  2. Alphabetical order when frequencies are equal
* Only the top `k` results are returned.

---

## API Endpoints

### Add Word

**POST**

```http
/api/words
```

Request Body:

```json
{
  "word": "developer"
}
```

---

### Search Word

**GET**

```http
/api/search/:word
```

Example:

```http
/api/search/apple
```

---

### Get Suggestions

**GET**

```http
/api/suggest?prefix=app&k=5
```

Example Response:

```json
{
  "suggestions": [
    {
      "word": "application",
      "frequency": 8
    },
    {
      "word": "apple",
      "frequency": 5
    }
  ]
}
```

---

## Project Structure

```text
dictionary-search-system
│
├── src
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── models
│   └── data
│
├── public
├── server.js
├── package.json
└── README.md
```

---

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm start
```

or

```bash
node server.js
```

The application will run on:

```text
http://localhost:3000
```

---

## Testing the Application

### Using the Browser

Open:

```text
http://localhost:3000
```

The UI allows you to:

* Add new words
* Search existing words
* View auto-suggestions while typing

### Using Postman

#### Add Word

```http
POST /api/words
```

#### Search Word

```http
GET /api/search/developer
```

#### Get Suggestions

```http
GET /api/suggest?prefix=dev&k=5
```

---

## Assumptions

* Data is stored in memory and will be reset whenever the server restarts.
* All words are stored in lowercase format.
* Frequency is increased only when a successful search occurs.
* Adding a word does not increase its frequency.
* Suggestions are returned according to the rules mentioned in the assignment.

---

## Complexity Analysis

| Operation        | Time Complexity |
| ---------------- | --------------- |
| Add Word         | O(L)            |
| Search Word      | O(1)            |
| Update Frequency | O(1)            |
| Get Suggestions  | O(P + N)        |

Where:

* L = Length of the word
* P = Length of the prefix
* N = Number of matching words

---

## Future Enhancements

If this project were extended further, the following improvements could be added:

* Database integration (MongoDB/MySQL)
* Persistent storage
* Search history tracking
* Authentication and user management
* Caching frequently searched words
* Advanced ranking strategies for suggestions
