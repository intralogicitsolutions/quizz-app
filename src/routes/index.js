const initializeRoutes = (app) => {
    app.use("/auth", require("./auth.routes"));
    app.use("/language", require("./language.routes"));
    app.use("/category", require("./category.routes"));
    app.use("/question", require("./question.routes"));
    app.use("/exam_detail", require("./exam_detail.routes"));
    app.use("/score_detail", require("./score_detail.routes"));
    app.use("/rank_detail", require("./rank_detail.routes"));
    app.use("/exam_result", require("./exam_result.routes"));
    app.use("/images", require("./image_upload.routes"));
};

module.exports = initializeRoutes;