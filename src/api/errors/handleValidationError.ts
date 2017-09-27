import { validationResult } from 'express-validator/check';

export let handleValidationError = (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.mapped() });
    } else {
        next();
    }
}