module.exports = (app) => {
    app.get("/", (req, res) => {
        console.log("Come request", req);
        res.send({"message": "Hello World!"});
    });
};