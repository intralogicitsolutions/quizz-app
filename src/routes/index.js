const initializeRoutes = (app) => {
    app.use("/auth", require("./auth.routes"));
};

module.exports = initializeRoutes;