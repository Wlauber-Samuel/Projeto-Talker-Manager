const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    if (!email || !regex.test(email)) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    next();
}

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'O campo "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = {
    validateEmail,
    validatePassword,
};