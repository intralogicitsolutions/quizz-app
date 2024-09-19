const initializeRoutes = (app) => {
    app.use("/auth", require("./auth.routes"));
    app.use("/language", require("./language.routes"));
    app.use("/category", require("./category.routes"));
};

module.exports = initializeRoutes;