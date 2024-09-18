const initializeRoutes = (app) => {
    app.use("/auth", require("./auth.routes"));
    app.use("/common", require("./common.routes"));
};

module.exports = initializeRoutes;