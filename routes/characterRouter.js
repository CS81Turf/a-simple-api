import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const characterRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const charactersFilePath = path.join(
    __dirname,
    "..",
    "data",
    "characters.json"
);

async function getAllCharacters() {
    try {
        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);

        return characters;
    } catch (error) {
        console.error("error", error.message);
    }
}

async function getCharacterById(characterId) {
    try {
        const id = parseInt(characterId);

        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);
        const character = characters.find((character) => character.id === id);

        return character;
    } catch (error) {
        console.error("error", error.message);
    }
}

async function createCharacter(requestBody) {
    try {
        const characterData = await fs.readFile(charactersFilePath);
        const characters = JSON.parse(characterData);

        const newCharacter = {
            id: characters.length + 1,
            name: requestBody.name,
            show: requestBody.show,
        };

        if (!newCharacter.name || !newCharacter.show) {
            return undefined;
        }

        characters.push(newCharacter);

        await fs.writeFile(charactersFilePath, JSON.stringify(characters));

        return newCharacter;
    } catch (error) {
        console.error(error.message);
    }
}

characterRouter.get("/", async (request, response) => {
    const characters = await getAllCharacters();
    response.status(200).json({
        data: characters,
    });
});

characterRouter.get("/:id", async (request, response) => {
    const character = await getCharacterById(request.params.id);

    if (!character) {
        return response.status(404).json({
            data: "Character does not exist with that id",
        });
    }

    response.status(200).json({
        data: character,
    });
});

characterRouter.post("/", async (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({
                data: "Bad Request. Missing required information",
            });
        }

        const newCharacter = await createCharacter(request.body);

        if (!newCharacter) {
            return response.status(400).json({
                data: "Bad Request. Missing required information",
            });
        }

        response.status(201).json({
            data: newCharacter,
        });
    } catch (error) {
        console.error(error.message);
    }
});

export default characterRouter;