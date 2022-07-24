import joi from "joi";

export const newTestSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().integer().positive().required(),
    teacherId: joi.number().integer().positive().required(),
    disciplineId: joi.number().integer().positive().required()
});