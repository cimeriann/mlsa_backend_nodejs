import ApiError from "./apiError.js";
import { errorResponse } from "../../utils/appError.js";

const errorHandler = (error, req, res, next)=>{
    let message = "Request failed, try again later";
    let errorCode = 500;
    if (error instanceof ApiError){
        message = error.message;
        code = error.code;
    }else if(error instanceof Error){
        message = "Probably a mongoose error";
        code = 412;
    }

    errorResponse(res, errorCode, message);
}

export default errorHandler;