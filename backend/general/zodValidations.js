const z = require('zod');

const userSignUpValidationSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).nonempty('Password is required.'),
    firstName: z.string().max(50).trim().nonempty('First name is required.'),
    lastName: z.string().max(50).trim().nonempty('Last name is required.'),
  });

const userSignInValidationSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).nonempty('Password is required.'),
  });
  
const userUpdateValidationSchema = z.object({
   
    firstName: z.string().max(50).trim().nonempty('First name is required.'),
    lastName: z.string().max(50).trim().nonempty('Last name is required.'),
  });


module.exports = {userSignUpValidationSchema,userSignInValidationSchema,userUpdateValidationSchema}
