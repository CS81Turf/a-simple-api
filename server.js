import express from 'express';

const app = express();
const port = 2025;

const tvCharacters = [
    {
        id: 1,
        name: "Malcom Reynolds",
        show: "Firefly",
    },

    {
        id: 2,
        name: "Abed Nadir",
        show: "Community",
    },

    {
        id: 3,
        name: "Bob Belcher",
        show: "Bob's Burgers",
    },

    {
        id: 4,
        name: "Benjamin Sisko",
        show: "Star Trek: Deep Space Nine",
    },

    {
        id: 5,
        name: "Goku",
        show: "Dragonball",
    },

    {
        id: 6,
        name: "David Rossi",
        show: "Criminal Minds",
    },

    {
        id: 7,
        name: "Homer Simpson",
        show: "The Simpsons",
    },

    {
        id: 8,
        name: "Londo Mollari",
        show: "Babylon 5",
    },

    {
        id: 9,
        name: "Eddie Munson",
        show: "Stranger Things",
    },

    {
        id: 10,
        name: "Dwight Schrute",
        show: "The Office",
    },
];

function getAllCharacters() {
    return tvCharacters;
}

function getCharacterById(characterId) {
    const id = parseInt(characterId);
    const character = tvCharacters.find((character) => character.id === id);
    return character;
}

app.get("/api/characters/:id", (request, response) => {
    const character = getCharacterById(request.params.id);

    if (!character) {
        return response.status(404).json({
            data: "Character does not exist with that id.",
        });    
    }

    response.status(200).json({
        data: character,
    });
});

app.get("/api/characters", (request, response) => {
    const characters = getAllCharacters();
    response.status(200).json({
        data: characters,
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});