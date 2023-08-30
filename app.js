const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

const server = http.createServer(app);

app.set("view engine", "ejs"); //This line sets the view engine to "pug". The view engine is responsible for rendering dynamic templates into HTML. By setting it to "pug," you're telling Express to use the Pug template engine for rendering views.
app.set("views", "views"); //This line sets the directory where your template files (Pug templates) are located. The second argument, "views," is the path to the directory where your template files are stored. This directory path is relative to the root of your application.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render("404.pug", {pageTitle: "Page Not Found"});
});

server.listen(3000);