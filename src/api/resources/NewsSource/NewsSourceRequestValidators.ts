import { check, body, query, param, validationResult } from 'express-validator/check';

export let listValidator = [
    query('limit').exists()
];

export let readValidator = [
    param('id').isUUID()
];

export let updateValidator = [
    param('id').exists().trim(),
    body([''])
];

export let createValidator = [
    body('websiteUrl').exists().isURL()
];

export let deleteValidator = [
    param('id').exists().isUUID()
];