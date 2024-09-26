export const successResponse = (res, statusCode, message, data) => {
  res.status(statusCode).send({
    staus: "success",
    message: message,
    data,
  });
};

export const errorResponse = (res, statusCode, error) => {
  res.status(statusCode).send({
    status: "error",
    error,
  });
};
