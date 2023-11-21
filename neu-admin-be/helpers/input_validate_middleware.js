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

module.exports = {
  emptyProgramInputsValidation,
  typeProgramInputsValidation
};
