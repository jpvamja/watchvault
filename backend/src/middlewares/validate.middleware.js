export const validateRequiredFields = (fields = []) => {
    return (req, res, next) => {
        const missingFields = [];

        for (const field of fields) {
            if (
                !req.body.hasOwnProperty(field) ||
                req.body[field] === undefined ||
                req.body[field] === null ||
                req.body[field] === ""
            ) {
                missingFields.push(field);
            };
        };

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failled",
                errors: missingFields.map(field => ({
                    field,
                    message: `${field} is required`,
                })),
            });
        };

        next();
    };
};