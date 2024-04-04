const Joi = require('joi');

const validateListingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string,
            filename: Joi.string
        }),
        category: Joi.string().required()
    }).required(),
   
});



const validateReviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
        
    }).required()
})

module.exports = {validateListingSchema,validateReviewSchema};