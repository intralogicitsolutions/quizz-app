const initializeRoutes = (app) => {
    app.use("/auth", require("./auth.routes"));
    app.use("/language", require("./language.routes"));
    app.use("/category", require("./category.routes"));
    app.use("/question", require("./question.routes"));
    app.use("/exam_detail", require("./exam_detail.routes"));
};

module.exports = initializeRoutes;