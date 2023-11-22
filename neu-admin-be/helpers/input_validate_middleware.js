// program input validate
function emptyProgramInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty program inputs");
    const error = new Error("empty program inputs");
    error.code = "EMPTY_PROGRAM_INPUTS_ERROR";
    const { name, year } = req.body;
    if (!name || !year) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeProgramInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type program inputs")
    const error = new Error('wrong type program inputs')
    error.code = 'PROGRAM_INPUTS_TYPE_ERROR'
    const { name, year } = req.body
    if (typeof name !== 'string' || typeof Number(year) !== 'number') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// trans program input validate
function emptyTransProgramInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty program inputs");
    const error = new Error("empty program inputs");
    error.code = "EMPTY_TRANS_PROGRAM_INPUTS_ERROR";
    const { name, language, degreeType, degreeName, issuedBy } = req.body;
    if (!name || !language || !degreeName || !degreeType || !issuedBy) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeTransProgramInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type program inputs")
    const error = new Error('wrong type program inputs')
    error.code = 'TRANS_PROGRAM_INPUTS_TYPE_ERROR'
    const { name, language, degreeType, degreeName, issuedBy } = req.body
    if (typeof name !== 'string' || typeof language !== 'string' || typeof degreeType !== 'string' || typeof degreeName !== 'string' || typeof issuedBy !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// decision inputs validate
function emptyDecisionInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty program inputs");
    const error = new Error("empty program inputs");
    error.code = "EMPTY_DECISION_INPUTS_ERROR";
    const { name, detail, number, signDate, expireIn } = req.body;
    if (!name || !detail || !number || !signDate || !expireIn) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeDecisionInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type program inputs")
    const error = new Error('wrong type program inputs')
    error.code = 'DECISION_INPUTS_TYPE_ERROR'
    const { name, detail, number, signDate, expireIn } = req.body
    if (typeof name !== 'string' || typeof detail !== 'string' || typeof number !== 'string' || typeof signDate !== 'string' || typeof expireIn !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

module.exports = {
  emptyProgramInputsValidation,
  typeProgramInputsValidation,
  emptyTransProgramInputsValidation,
  typeTransProgramInputsValidation,
  emptyDecisionInputsValidation,
  typeDecisionInputsValidation,
};
