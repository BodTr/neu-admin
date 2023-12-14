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

// curriculum inputs validate
function emptyCurriculumInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty curriculum inputs");
    const error = new Error("empty curriculum inputs");
    error.code = "EMPTY_CURRICULUM_INPUTS_ERROR";
    const { name, year, location, subjectType, creditsCount, trainingUni } = req.body;
    if (!name || !year || !location || !subjectType || !creditsCount || !trainingUni) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeCurriculumInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type curriculum inputs")
    const error = new Error('wrong type curriculum inputs')
    error.code = 'CURRICULUM_INPUTS_TYPE_ERROR'
    const { name, year, location, subjectType, creditsCount, trainingUni } = req.body
    if (typeof name !== 'string' || typeof year !== 'string' || typeof location !== 'string' || typeof subjectType !== 'string' || isNaN(creditsCount) || typeof trainingUni !== 'string') {
        throw error
    } else {
        console.log('process inputs type correct')
        next()
    }
}

// enrollment input validate
function emptyEnrollmentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty enrollment inputs");
    const error = new Error("empty enrollment inputs");
    error.code = "EMPTY_ENROLLMENT_INPUTS_ERROR";
    const { year, admissionCount, graduatedCount, tuitionSum, applicantsCount, dropoutCount, graduatedPercentage } = req.body;
    if (!year || !admissionCount || !graduatedCount || !tuitionSum || !applicantsCount || !dropoutCount || !graduatedPercentage) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeEnrollmentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type enrollment inputs")
    const error = new Error('wrong type enrollment inputs')
    error.code = 'ENROLLMENT_INPUTS_TYPE_ERROR'
    const { year, admissionCount, graduatedCount, tuitionSum, applicantsCount, dropoutCount, graduatedPercentage } = req.body
    if (isNaN(admissionCount) || isNaN(year) || isNaN(graduatedCount) || isNaN(tuitionSum) || isNaN(applicantsCount) || isNaN(dropoutCount) || typeof graduatedPercentage !== 'string') {
        throw error
    } else {
        console.log('process inputs type correct')
        next()
    }
}

// lecturer inputs validate
function emptyLecturerInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty lecturer inputs");
    const error = new Error("empty lecturer inputs");
    error.code = "EMPTY_LECTURER_INPUTS_ERROR";
    const { name, nationality, unit, birthyear, level, experience } = req.body;
    if (!name || !nationality || !unit || !birthyear || !level || !experience) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeLecturerInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type lecturer inputs")
    const error = new Error('wrong type lecturer inputs')
    error.code = 'LECTURER_INPUTS_TYPE_ERROR'
    const { name, nationality, unit, birthyear, level } = req.body
    if (typeof name !== 'string' || typeof nationality !== 'string' || typeof unit !== 'string' || typeof level !== 'string' || isNaN(birthyear)) {
        throw error
    } else {
        console.log('process inputs type correct')
        next()
    }
}

// unit input validate
function emptyUnitInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty unit inputs");
    const error = new Error("empty unit inputs");
    error.code = "EMPTY_UNIT_INPUTS_ERROR";
    const { unit } = req.body;
    if (!unit) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeUnitInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type unit inputs")
    const error = new Error('wrong type unit inputs')
    error.code = 'UNIT_INPUTS_TYPE_ERROR'
    const { unit } = req.body
    if (typeof unit !== 'string') {
        throw error
    } else {
        console.log('process inputs type correct')
        next()
    }
}

// subject inputs validate
function emptySubjectInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty subject inputs");
    const error = new Error("empty subject inputs");
    error.code = "EMPTY_SUBJECT_INPUTS_ERROR";
    const { name, lecturer, teachingAssistant, executionTime, year, creditsCount, note } = req.body;
    if (!name || !lecturer || !teachingAssistant || !executionTime || !year || !creditsCount || !note) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeSubjectInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type subject inputs")
    const error = new Error('wrong type subject inputs')
    error.code = 'SUBJECT_INPUTS_TYPE_ERROR'
    const { name, lecturer, teachingAssistant, executionTime, year, creditsCount, note } = req.body
    if (typeof name !== 'string' || typeof lecturer !== 'string' || typeof teachingAssistant !== 'string' || typeof executionTime !== 'string' || isNaN(year) || isNaN(creditsCount) || typeof note !== 'string') {
        throw error
    } else {
        console.log('process inputs type correct')
        next()
    }
}

// moumoa inputs validate
function emptyMoumoaInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty moumoa inputs");
    const error = new Error("empty moumoa inputs");
    error.code = "EMPTY_MOUMOA_INPUTS_ERROR";
    const { nation, partnerUni, docType, docDetail, signingTime, expireTime, note } = req.body;
    if (!nation || !partnerUni || !docType || !docDetail || !signingTime || !note || !expireTime) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeMoumoaInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type moumoa inputs")
    const error = new Error('wrong type moumoa inputs')
    error.code = 'MOUMOA_INPUTS_TYPE_ERROR'
    const { nation, docType, docDetail, partnerUni, signingTime, expireTime, note } = req.body
    if (typeof nation !== 'string' || typeof partnerUni !== 'string' || typeof signingTime !== 'string' || typeof expireTime !== 'string' || typeof docType !== 'string' || typeof docDetail !== 'string' || typeof note !== 'string') {
        throw error
    } else {
        console.log('moumoa inputs type correct')
        next()
    }
}

function emptyFileMoumoaInputValidation(req, res, next) {
    
    const error = new Error('Empty moumoa file input')
    error.code = 'EMPTY_MOUMOA_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty moumoa file inputs")
    if (!docFile) {
        throw error
    } else {
        console.log('moumoa file input filled')
        next()
    }
}

// HTQT inputs validate
function emptyHTQTInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty htqt inputs");
    const error = new Error("empty htqt inputs");
    error.code = "EMPTY_HTQT_INPUTS_ERROR";
    const { nation, partnerUni, funding, planDetail, signingTime, expireTime, note } = req.body;
    if (!nation || !partnerUni || !funding || !planDetail || !signingTime || !note || !expireTime) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeHTQTInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type htqt inputs")
    const error = new Error('wrong type htqt inputs')
    error.code = 'HTQT_INPUTS_TYPE_ERROR'
    const { nation, funding, planDetail, partnerUni, signingTime, expireTime, note } = req.body
    if (typeof nation !== 'string' || typeof partnerUni !== 'string' || typeof signingTime !== 'string' || typeof expireTime !== 'string' || typeof funding !== 'string' || typeof planDetail !== 'string' || typeof note !== 'string') {
        throw error
    } else {
        console.log('htqt inputs type correct')
        next()
    }
}

function emptyFileHTQTInputValidation(req, res, next) {
    
    const error = new Error('Empty htqt file input')
    error.code = 'EMPTY_HTQT_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty htqt file inputs")
    if (!docFile) {
        throw error
    } else {
        console.log('htqt file input filled')
        next()
    }
}

// exForeignStudent inputs validate
function emptyExForeignStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty exForeignStudent inputs");
    const error = new Error("empty exForeignStudent inputs");
    error.code = "EMPTY_EFS_INPUTS_ERROR";
    const { name, studentCode, position, educationLevel, receptionTime, receptionYear, birthday, sex, major, unit, receptionDecision, subject, result } = req.body;
    if (!name || !studentCode || !position || !educationLevel || !receptionTime || !receptionYear || !birthday || !sex || !major || !unit || !receptionDecision || !subject || !result) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeExForeignStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type exForeignStudent inputs")
    const error = new Error('wrong type exForeignStudent inputs')
    error.code = 'EFS_INPUTS_TYPE_ERROR'
    const { name, studentCode, position, educationLevel, receptionTime, receptionYear, birthday, sex, major, unit, receptionDecision, subject, result } = req.body
    if (typeof name !== 'string' || isNaN(studentCode) || typeof position !== 'string' || typeof educationLevel !== 'string' || typeof receptionTime !== 'string' || typeof receptionYear !== 'string' || typeof birthday !== 'string' || typeof sex !== 'string' || typeof major !== 'string' || typeof unit !== 'string' || typeof receptionDecision !== 'string' || typeof subject !== 'string' || typeof result !== 'string') {
        throw error
    } else {
        console.log('exForeignStudent inputs type correct')
        next()
    }
}

function emptyFileExForeignStudentInputValidation(req, res, next) {
    
    const error = new Error('Empty exForeignStudent file input')
    error.code = 'EMPTY_EFS_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty exForeignStudent file inputs")
    if (!docFile) {
        throw error
    } else {
        console.log('exForeignStudent file input filled')
        next()
    }
}

// exStudent inputs validate
function emptyExStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty exStudent inputs");
    const error = new Error("empty exStudent inputs");
    error.code = "EMPTY_ES_INPUTS_ERROR";
    const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, confirmedResult, exchangeDecision, convertedScore } = req.body;
    if (!name || !studentCode || !department || !academicYear || !exchangeTime || !exchangeYear || !birthday || !sex || !major || !receivingCountry || !partnerUni || !subject || !result || !confirmedResult || !exchangeDecision || !convertedScore) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeExStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type exStudent inputs")
    const error = new Error('wrong type exStudent inputs')
    error.code = 'ES_INPUTS_TYPE_ERROR'
    const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, confirmedResult, exchangeDecision, convertedScore } = req.body
    if (typeof name !== 'string' || isNaN(studentCode) || typeof department !== 'string' || typeof academicYear !== 'string' || typeof exchangeTime !== 'string' || typeof exchangeYear !== 'string' || typeof birthday !== 'string' || typeof sex !== 'string' || typeof major !== 'string' || typeof receivingCountry !== 'string' || typeof partnerUni !== 'string' || typeof subject !== 'string' || typeof result !== 'string' || typeof confirmedResult !== 'string' || typeof exchangeDecision !== 'string' || typeof convertedScore !== 'string') {
        throw error
    } else {
        console.log('exStudent inputs type correct')
        next()
    }
}

function emptyFileExStudentInputValidation(req, res, next) {
    
    const error = new Error('Empty exStudent file input')
    error.code = 'EMPTY_ES_FILE_INPUT_ERROR'
    const attachedExchangeDoc = req.files['attachedExchangeDoc']
    const attachedScoreDocArr = req.files['attachedScoreDoc']
    console.log(attachedExchangeDoc, attachedScoreDocArr, "middleware check empty exStudent file inputs")
    if (!attachedExchangeDoc || !attachedScoreDocArr) {
        throw error
    } else {
        console.log('exStudent file input filled')
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
  typeProcessInputsValidation,
  emptyCurriculumInputsValidation,
  typeCurriculumInputsValidation,
  emptyEnrollmentInputsValidation,
  typeEnrollmentInputsValidation,
  emptyLecturerInputsValidation,
  typeLecturerInputsValidation,
  emptyUnitInputsValidation,
  typeUnitInputsValidation,
  emptySubjectInputsValidation,
  typeSubjectInputsValidation,
  emptyMoumoaInputsValidation,
  typeMoumoaInputsValidation,
  emptyFileMoumoaInputValidation,
  emptyHTQTInputsValidation,
  typeHTQTInputsValidation,
  emptyFileHTQTInputValidation,
  emptyExForeignStudentInputsValidation,
  typeExForeignStudentInputsValidation,
  emptyFileExForeignStudentInputValidation,
  emptyExStudentInputsValidation,
  typeExStudentInputsValidation,
  emptyFileExStudentInputValidation
};
