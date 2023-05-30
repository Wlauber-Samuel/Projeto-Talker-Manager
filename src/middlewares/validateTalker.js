// Validações de dados do token
const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16 || typeof authorization !== 'string') {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

// Validações de dados do name
const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

// Validações de dados do age
const validateAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    next(); 
};

// Regex para validar o watchedAt
const regexWatchedAt = /^\d{2}\/\d{2}\/\d{4}$/;

// Validações de dados do watchedAt
const validateWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!regexWatchedAt.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

// Validações de dados do talk
const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

// Diminui complexidade do validateRate
const validRate = (rate) => {
    if (rate < 1 || rate > 5) {
        return false;
    }
    return true;
};

// Validações de dados do rate
const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate && rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(rate) || !validRate(rate)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = {
    validateToken,
    validateName,
    validateAge,
    validateWatchedAt,
    validateTalk,
    validateRate,
};
