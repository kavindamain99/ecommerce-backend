exports.userSignUpValidator=(req,res,next) => {

    req.check('firstName','first name is requires').notEmpty();
    req.check('lastName','last name is requires').notEmpty();

    req.check('email','Email must be between 3 to 32 characters')
                                                .matches(/.+\@.+\..+/)
                                                .withMessage("Email Must Contain @")
                                                .isLength({
                                                    min:4,
                                                    max:32
                                                
                                                });
                            

                                              
    req.check('password','password is requeired').notEmpty();
    

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

next();
};