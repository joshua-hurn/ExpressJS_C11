const express = require("express"),
    app = express(),
    path = require("path"),
    fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello from the web server side...");
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.post("/contact-form", (req, res) => {
    let credentials = {
        email: req.body.email,
        password: req.body.password
    }

    let data = JSON.stringify(credentials);

    fs.appendFile("./credentials.json", data, (err) => {
        if (err) throw err;
        console.log("write successful")
    });

    res.redirect("/formsubmissions");
});

app.get("/formsubmissions", (req, res) => {
    fs.readFile("./credentials.json", (err, data) => {
        res.type("text").send(data);
    });
});

app.listen(3000);
