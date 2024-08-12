const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

require('dotenv').config();

async function main() {
    const uri = process.env.MONGO_URI;

    mongoose
        .connect(uri)
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.error("Connection failed", err);
        });

    const app = express();

    app.use(cors({origin: true, credentials: true}));
    app.use(bodyParser.json({limit: "400mb"}));
    app.use(bodyParser.urlencoded({limit: "400mb", extended: true}));

    app.use("/book", bookRoutes);
    app.use("/user", userRoutes);
    app.use("/order", orderRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main().catch(console.error);
