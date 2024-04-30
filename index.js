import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

readData();

app.get("/", (req, res) => {
    res.send("Welcome to my first API with  NodeJs");
});

app.get("/Bijouterie", (req, res) => {
    const data = readData();
    res.json(data.Bijouterie);
});
app.get("/Bijouterie/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const Bijouteries = data.Bijouterie.find((Bijouteries) => Bijouteries.id === id);
    res.json(Bijouteries);
});

app.post("/Bijouterie", (req, res) => {
    const data = readData();
    const body = req.body;
    const newBijouteries = {
        id: data.Bijouterie.length + 1,
        ...body,
    };

    data.Bijouterie.push(newBijouteries);
    writeData(data);
    res.json(newBijouteries);
});

app.put("/Bijouterie/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const BijouterieIndex = data.Bijouterie.findIndex((Bijouteries) => Bijouteries.id === id);
    data.BijouterieIndex[BijouteriesIndex] = {
        ...data.Bijouterie[BijouterieIndex],
        ...body,
    },
    writeData(data);
    res.json({ message: "Articulo agregado"});
});

app.delete("/Bijouterie/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const BijouterieIndex = data.Bijouterie.findIndex((Bijouteries) => Bijouteries.id === id);
    data.Bijouterie.splice(BijouteriesIndex, 1);
    writeData(data);
    res.json({ message: "Articulo Borrado"});
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});