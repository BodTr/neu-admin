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
    console.log(isNaN(year) , "type input check")
    if (typeof name !== 'string' || isNaN(year)) {
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
    console.log(req.body, "middleware check empty decision inputs");
    const error = new Error("empty decision inputs");
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
    console.log(req.body, "middleware check type decision inputs")
    const error = new Error('wrong type decision inputs')
    error.code = 'DECISION_INPUTS_TYPE_ERROR'
    const { name, detail, number, signDate, expireIn } = req.body
    if (typeof name !== 'string' || typeof detail !== 'string' || typeof number !== 'string' || typeof signDate !== 'string' || typeof expireIn !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// document inputs validate
function emptyDocumentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty document inputs");
    const error = new Error("empty document inputs");
    error.code = "EMPTY_DOCUMENT_INPUTS_ERROR";
    const { name, content, effDate, expireIn } = req.body;
    if (!name || !content || !effDate || !expireIn) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeDocumentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type document inputs")
    const error = new Error('wrong type document inputs')
    error.code = 'DOCUMENT_INPUTS_TYPE_ERROR'
    const { name, content, effDate, expireIn } = req.body
    if (typeof name !== 'string' || typeof content !== 'string' || typeof effDate !== 'string' || typeof expireIn !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// partner inputs validate
function emptyPartnerInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty partner inputs");
    const error = new Error("empty partner inputs");
    error.code = "EMPTY_PARTNER_INPUTS_ERROR";
    const { name, test, testDetail, address, website } = req.body;
    if (!name || !test || !testDetail || !address || !website) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typePartnerInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type partner inputs")
    const error = new Error('wrong type partner inputs')
    error.code = 'PARTNER_INPUTS_TYPE_ERROR'
    const { name, test, testDetail, address, website } = req.body
    if (typeof name !== 'string' || typeof test !== 'string' || typeof address !== 'string' || typeof testDetail !== 'string' || typeof website !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// agency inputs validate
function emptyAgencyInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty agency inputs");
    const error = new Error("empty agency inputs");
    error.code = "EMPTY_AGENCY_INPUTS_ERROR";
    const { name, email, phoneNumber, unit, content, position } = req.body;
    if (!name || !email || !phoneNumber || !unit || !content || !position) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeAgencyInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type agency inputs")
    const error = new Error('wrong type agency inputs')
    error.code = 'AGENCY_INPUTS_TYPE_ERROR'
    const { name, email, phoneNumber, unit, content, position } = req.body
    if (typeof name !== 'string' || typeof email !== 'string' || typeof Number(phoneNumber) !== 'number' || typeof unit !== 'string' || typeof content !== 'string' ||  typeof position !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// goal inputs validate
function emptyGoalInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty goal inputs");
    const error = new Error("empty goal inputs");
    error.code = "EMPTY_GOAL_INPUTS_ERROR";
    const { programGoal, testDetail, goalFrom } = req.body;
    if (!programGoal || !testDetail || !goalFrom) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeGoalInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type goal inputs")
    const error = new Error('wrong type goal inputs')
    error.code = 'GOAL_INPUTS_TYPE_ERROR'
    const { programGoal, testDetail, goalFrom } = req.body
    if (typeof programGoal !== 'string' || typeof testDetail !== 'string' || typeof goalFrom !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// plan inputs validate
function emptyPlanlInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty plan inputs");
    const error = new Error("empty plan inputs");
    error.code = "EMPTY_PLAN_INPUTS_ERROR";
    const { certName, qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, report } = req.body;
    if (!certName || !qualifiedLecturer || !planStructure || !qualifiedStudent || !tuition || !infraCondition || !language || !ecoManage || !report ) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typePlanInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type plan inputs")
    const error = new Error('wrong type plan inputs')
    error.code = 'PLAN_INPUTS_TYPE_ERROR'
    const { certName, qualifiedLecturer, qualifiedStudent, planStructure, tuition, infraCondition, language, ecoManage, report } = req.body
    if (typeof certName !== 'string' || typeof qualifiedLecturer !== 'string' || typeof qualifiedStudent !== 'string' || typeof planStructure !== 'string' || typeof tuition !== 'string' || typeof infraCondition !== 'string' || typeof language !== 'string' || typeof ecoManage !== 'string' || typeof report !== 'string') {
        throw error
    } else {
        console.log('plan inputs type correct')
        next()
    }
}

// edu quality process inputs validate
function emptyProcessInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty process inputs");
    const error = new Error("empty process inputs");
    error.code = "EMPTY_PROCESS_INPUTS_ERROR";
    const { mechanism, detail, hasProcess } = req.body;
    if (!mechanism || !detail || !hasProcess ) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeProcessInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type process inputs")
    const error = new Error('wrong type process inputs')
    error.code = 'PROCESS_INPUTS_TYPE_ERROR'
    const { mechanism, detail, hasProcess } = req.body
    if (typeof mechanism !== 'string' || typeof detail !== 'string') {
        throw error
    } else {
        console.log('process inputs type correct')
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
  emptyDocumentInputsValidation,
  typeDocumentInputsValidation,
  emptyPartnerInputsValidation,
  typePartnerInputsValidation,
  emptyAgencyInputsValidation,
  typeAgencyInputsValidation,
  emptyGoalInputsValidation,
  typeGoalInputsValidation,
  emptyPlanlInputsValidation,
  typePlanInputsValidation,
  emptyProcessInputsValidation,
  typeProcessInputsValidation
};
