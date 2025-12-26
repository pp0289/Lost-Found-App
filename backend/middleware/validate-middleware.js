const {z, ZodError} = require('zod');

const validate = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  }
  catch (err) {
    if (err instanceof ZodError) {
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.issues[0].message;
      // return res.status(400).json({ msg: errorMessages });

      const error = {
        status,
        message,
        extraDetails
      };
      console.log(error);
      next(error);
      

    }
  }
};

module.exports =  validate;