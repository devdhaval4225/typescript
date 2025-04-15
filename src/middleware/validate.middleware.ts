import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from '@hapi/joi';

const validateBody = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req["body"]);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            res.status(422).json({ error: message }); // 422 Unprocessable Entity
        }
    };
};

export default validateBody;