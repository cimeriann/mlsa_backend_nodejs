import ApiError from "./errorHandler/apiError.js";

const notFound = (req, res, next) =>{
    next(new ApiError.notFound());
};

export default notFound;