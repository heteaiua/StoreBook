const Joi = require('joi');

const validateUserSchema = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        rePassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match'
        }),
        age: Joi.number().integer().min(1).max(100).required(),
        address: Joi.string().min(1).max(255).required(),
        phoneNumber: Joi.string().pattern(/^\d{10,15}$/).required(),
        role: Joi.string().valid('admin', 'user'),
        favoriteBooks: Joi.array().items(Joi.string().hex().length(24))
    })
    return schema.validate(user);
}
module.exports = validateUserSchema;