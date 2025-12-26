export const validateRequiredFields = (fields = []) => {
  return (req, res, next) => {
    const missingFields = [];

    for (const field of fields) {
      const value = req.body[field];

      if (
        !Object.prototype.hasOwnProperty.call(req.body, field) ||
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
        errors: missingFields.map((field) => ({
          field,
          message: `${field} is required`,
        })),
      });
    }

    next();
  };
};
