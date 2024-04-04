// program input validate
function emptyProgramInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty program inputs");
    const error = new Error("empty program inputs");
    error.code = "EMPTY_PROGRAM_INPUTS_ERROR";
    const { name, year, nation, parterUni, major, quota, level, expiry } = req.body;
    if (!name || !year || !nation || !parterUni || !major || !quota || !level || !expiry) {
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
    const { name, year, nation, parterUni, major, quota, level, expiry } = req.body
    
    if (typeof name !== 'string' || isNaN(year) || typeof nation !== 'string' || typeof parterUni !== 'string' || typeof major !== 'string' || isNaN(quota) || typeof level !== 'string' || typeof expiry !== 'string') {
        console.log("type input incorrect")
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
    const { name, degreeType, degreeName, issuedBy } = req.body;
    if (!name || !degreeName || !degreeType || !issuedBy) {
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
    const { name, degreeType, degreeName, issuedBy } = req.body
    if (typeof name !== 'string'  || typeof degreeType !== 'string' || typeof degreeName !== 'string' || typeof issuedBy !== 'string') {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// close_decision inputs validate
function emptyCloseDecisionInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty close_decision inputs");
    const error = new Error("empty decision inputs");
    error.code = "EMPTY_CLOSE_DECISION_INPUTS_ERROR";
    const { name, detail, number, signDate, expireIn } = req.body;
    if (!name || !detail || !number || !signDate || !expireIn) {
        console.log(error.code, 'CloseDecisionInputs middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeCloseDecisionInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type close_decision inputs")
    const error = new Error('wrong type decision inputs')
    error.code = 'CLOSE_DECISION_INPUTS_TYPE_ERROR'
    const { name, detail, number, signDate, expireIn } = req.body
    if (typeof name !== 'string' || typeof detail !== 'string' || typeof number !== 'string' || typeof signDate !== 'string' || typeof expireIn !== 'string') {
        throw error
    } else {
        console.log('close_decision inputs type correct')
        next()
    }
}

function emptyFileCloseDecisionInputValidation(req, res, next) {
    
    const error = new Error('Empty close_decision file input')
    error.code = 'EMPTY_CLOSE_DECISION_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty close_decision file input")
    if (!docFile) {
        throw error
    } else {
        console.log('close_decision file input filled')
        next()
    }
}

// decision input validate
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

function emptyFileDecisionInputValidation(req, res, next) {
    
    const error = new Error('Empty decision file input')
    error.code = 'EMPTY_DECISION_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty decision file input")
    if (!docFile) {
        throw error
    } else {
        console.log('decision file input filled')
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

function emptyFileDocumentInputValidation(req, res, next) {
    
    const error = new Error('Empty document file input')
    error.code = 'EMPTY_DOCUMENT_FILE_INPUT_ERROR'
    const docFile = req.file
    console.log(docFile, "middleware check empty document file input")
    if (!docFile) {
        throw error
    } else {
        console.log('document file input filled')
        next()
    }
}

// partner inputs validate
function emptyPartnerInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty partner inputs");
    const error = new Error("empty partner inputs");
    error.code = "EMPTY_PARTNER_INPUTS_ERROR";
    const { vn_name, en_name, address, internationalRanking, website, contacterName, contacterPosition, contacterEmail, contacterUnit, uniLeaderName, uniLeaderPosition, uniLeaderEmail, uniLeaderUnit, unitLeaderName, unitLeaderPosition, unitLeaderEmail, unitLeaderUnit, farName, farPosition, farEmail, farUnit, progManagerName, progManagerPosition, progManagerEmail, progManagerUnit } = req.body;
    if (!vn_name || !en_name || !website || !address || !internationalRanking || !contacterName || !contacterPosition || !contacterEmail || !contacterUnit || !uniLeaderName || !uniLeaderPosition || !uniLeaderEmail || !uniLeaderUnit || !unitLeaderName || !unitLeaderPosition || !unitLeaderEmail || !unitLeaderUnit || !farName || !farPosition || !farEmail || !farUnit || !progManagerName || !progManagerPosition || !progManagerEmail || !progManagerUnit) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

// function typePartnerInputsValidation(req, res, next) {
//     console.log(req.body, "middleware check type partner inputs")
//     const error = new Error('wrong type partner inputs')
//     error.code = 'PARTNER_INPUTS_TYPE_ERROR'
//     const { name, address, website } = req.body
//     if (typeof name !== 'string' || typeof address !== 'string' || typeof website !== 'string') {
//         throw error
//     } else {
//         console.log('program inputs type correct')
//         next()
//     }
// }

function emptyPartnerFileInputValidation(req, res, next) {
    console.log(req.files, "req.files emptyPartnerFileInputsValidation() middleware")
    const error = new Error('empty partner file input')
    error.code = 'EMPTY_PARTNER_FILE_INPUT_ERROR'
    const files = req.files
    if (!files) {
        throw error
    } else {
        console.log("partner files input filled")
        next()
    }
}

// agency inputs validate
function emptyAgencyInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty agency inputs");
    const error = new Error("empty agency inputs");
    error.code = "EMPTY_AGENCY_INPUTS_ERROR";
    const { unit, progLeaderName, progLeaderPosition, progLeaderPhoneNumber, progLeaderEmail, progLeaderUnit, progManagementName, progManagementPosition, progManagementPhoneNumber, progManagementEmail, progManagementUnit, coordinatorName, coordinatorPosition, coordinatorPhoneNumber, coordinatorEmail, coordinatorUnit } = req.body;
    if (!unit || !progLeaderName || !progLeaderPosition || !progLeaderPhoneNumber || !progLeaderEmail || !progLeaderUnit || !progManagementName || !progManagementPosition || !progManagementPhoneNumber || !progManagementEmail || !progManagementUnit || !coordinatorName || !coordinatorPosition || !coordinatorPhoneNumber || !coordinatorEmail || !coordinatorUnit) {
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
    const { progLeaderPhoneNumber, progManagementPhoneNumber, coordinatorPhoneNumber } = req.body
    if (isNaN(progLeaderPhoneNumber) || isNaN(progManagementPhoneNumber) || isNaN(coordinatorPhoneNumber)) {
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
    const { name, year, location, subjectType, creditsCount } = req.body;
    if (!name || !year || !location || !subjectType || !creditsCount) {
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
    const { name, year, location, subjectType, creditsCount } = req.body
    if (typeof name !== 'string' || typeof year !== 'string' || typeof location !== 'string' || typeof subjectType !== 'string' || isNaN(creditsCount)) {
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
    const { year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents } = req.body;
    if (!year || !enrollmentCount || !admissionCount || !transferStudents || !graduatedCount || !admittedStudents || !applicantsCount || !dropoutCount || !reservedStudents || !trainingStudents) {
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
    const { year, enrollmentCount, admissionCount, transferStudents, graduatedCount, admittedStudents, applicantsCount, dropoutCount, reservedStudents, trainingStudents } = req.body;

    if (isNaN(year) || isNaN(enrollmentCount) || isNaN(admissionCount) || isNaN(transferStudents) || isNaN(graduatedCount) || isNaN(admittedStudents) || isNaN(applicantsCount) || isNaN(dropoutCount) || isNaN(reservedStudents) || isNaN(trainingStudents)) {
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
    const { name, nationality, unit, birthyear, contractStatus, level, subject } = req.body;
    if (!name || !nationality || !unit || !birthyear || !contractStatus || !level || !subject) {
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
    const { birthyear } = req.body
    if (isNaN(birthyear)) {
        throw error
    } else {
        console.log('lecturer inputs type correct')
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
    const { name, lecturer, teachingAssistant, timeFrom, timeTo, year, subjectCode, review } = req.body;
    if (!name || !lecturer || !teachingAssistant || !timeFrom || !timeTo  || !year || !subjectCode || !review) {
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
    const { year } = req.body;
    if ( isNaN(year)) {
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
    const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, exchangeDecision, convertedScore, results } = req.body;
    const resultsArr = JSON.parse(results)
    if (!name || !birthday || !sex || !department || !academicYear || !major || !studentCode || !exchangeYear || !exchangeTime || !receivingCountry || !partnerUni || !subject || !result || !exchangeDecision || !convertedScore || resultsArr.length === 0) {
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
    const { name, birthday, sex, department, academicYear, major, studentCode, exchangeTime, exchangeYear, receivingCountry, partnerUni, subject, result, exchangeDecision, convertedScore } = req.body
    if (typeof name !== 'string' || typeof studentCode !== 'string' || typeof department !== 'string' || typeof academicYear !== 'string' || typeof exchangeTime !== 'string' || typeof exchangeYear !== 'string' || typeof birthday !== 'string' || typeof sex !== 'string' || typeof major !== 'string' || typeof receivingCountry !== 'string' || typeof partnerUni !== 'string' || typeof subject !== 'string' || typeof result !== 'string' || typeof exchangeDecision !== 'string' || typeof convertedScore !== 'string') {
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

// extendVisa inputs validate
function emptyExtendVisaInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty extendVisa inputs");
    const error = new Error("empty extendVisa inputs");
    error.code = "EMPTY_EV_INPUTS_ERROR";
    const { name, birthday, sex, nationality, visaCode, phoneNumber, purpose, job, studentCode, workPermit, visaType, address, visaBeginDay, visaEndDay } = req.body;
    if (!name || !birthday || !sex || !nationality || !visaCode || !phoneNumber || !purpose || !job || !studentCode || !workPermit || !visaType || !address || !visaBeginDay || !visaEndDay) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeExtendVisaInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type extendVisa inputs")
    const error = new Error('wrong type extendVisa inputs')
    error.code = 'EV_INPUTS_TYPE_ERROR'
    const { name, birthday, sex, nationality, visaCode, phoneNumber, purpose, job, studentCode, workPermit, visaType, address, visaBeginDay, visaEndDay } = req.body
    if (typeof name !== 'string' || typeof birthday !== 'string' || typeof sex !== 'string' || typeof nationality !== 'string' || typeof visaCode !== 'string' || isNaN(phoneNumber) || typeof purpose !== 'string' || typeof job !== 'string' || typeof studentCode !== 'string' || typeof workPermit !== 'string' || typeof visaType !== 'string' || typeof address !== 'string' || typeof visaBeginDay !== 'string' || typeof visaEndDay !== 'string') {
        throw error
    } else {
        console.log('extendVisa inputs type correct')
        next()
    }
}

function emptyFileExtendVisaInputValidation(req, res, next) {
    
    const error = new Error('Empty extendVisa file input')
    error.code = 'EMPTY_EV_FILE_INPUT_ERROR'
    const suggestUnit = req.files['suggestUnit']
    const decisionNumber = req.files['decisionNumber']
    const attachedFile = req.files['attachedFile']
    console.log(suggestUnit, decisionNumber, attachedFile, "middleware check empty extendVisa file inputs")
    if (!suggestUnit || !decisionNumber || !attachedFile) {
        throw error
    } else {
        console.log('extendVisa file input filled')
        next()
    }
}

// users inputs validate
function emptyUserInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty user inputs");
    const error = new Error("empty user inputs");
    error.code = "EMPTY_USER_INPUTS_ERROR";
    const { name, username, phoneNumber, permission } = req.body;
    if (!name || !username || !phoneNumber || !permission) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function emptyUserInputsValidation1(req, res, next) {
    console.log(req.body, "middleware check empty user inputs");
    const error = new Error("empty user inputs");
    error.code = "EMPTY_USER_INPUTS1_ERROR";
    const { name, username, phoneNumber } = req.body;
    if (!name || !username || !phoneNumber) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeUserInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type user inputs")
    const error = new Error('wrong type user inputs')
    error.code = 'USER_INPUTS_TYPE_ERROR'
    const { name, username, phoneNumber } = req.body
    if (typeof name !== 'string' || typeof username !== 'string' || isNaN(phoneNumber)) {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

function emptyUserPasswordInputValidation(req, res, next) {
    console.log(req.body, "middleware check empty user password input")
    const error = new Error('empty user change password input')
    error.code = 'EMPTY_USER_PASSWORD_INPUT_ERROR'
    const { editedPassword } = req.body
    if (!editedPassword) {
        throw error
    } else {
        console.log('program inputs type correct')
        next()
    }
}

// student inputs validate
function emptyStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check empty student inputs");
    const error = new Error("empty student inputs");
    error.code = "EMPTY_STUDENT_INPUTS_ERROR";
    const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses} = req.body;
    if (!name || !studentCode || !birthday || !sex || !nation || !schoolYear || !tempResidence || !dien || !major || !courseDuration || !monthCount || !bgdReceiveNumber || !bgdReceiveDate || !neuReceiveNumber || !neuReceiveDate) {
        console.log(error.code, 'middleware empty error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeStudentInputsValidation(req, res, next) {
    console.log(req.body, "middleware check type student inputs")
    const error = new Error('wrong type student inputs')
    error.code = 'STUDENT_INPUTS_TYPE_ERROR'
    const { name, studentCode, birthday, sex, nation, schoolYear, tempResidence, dien, major, courseDuration, monthCount, bgdReceiveNumber, bgdReceiveDate, neuReceiveNumber, neuReceiveDate, expenses, shp, kpck, nationalDayExpenses, tetVnExpenses, tetLaoCamExpenses, travelExpenses, initExpenses} = req.body;
    if (typeof name !== 'string' || typeof studentCode !== 'string' || typeof nation !== 'string' || typeof schoolYear !== 'string' || typeof tempResidence !== 'string' || typeof dien !== 'string' || typeof birthday !== 'string' || typeof sex !== 'string' || typeof major !== 'string' || typeof courseDuration !== 'string' || isNaN(monthCount) || isNaN(bgdReceiveNumber) || typeof bgdReceiveDate !== 'string' || isNaN(neuReceiveNumber) || typeof neuReceiveDate !== 'string' || isNaN(expenses)  || isNaN(shp) || isNaN(kpck) || isNaN(tetVnExpenses) || isNaN(tetLaoCamExpenses) || isNaN(travelExpenses) || isNaN(nationalDayExpenses) || isNaN(initExpenses)) {
        console.log(error.code, 'middleware type error')
        throw error
    } else {
        console.log('student inputs type correct')
        next()
    }
}

// program_commitment inputs validate
function emptyProgramCommitmentInputValidation(req, res, next) {
    console.log(req.body, "middleware check empty program commitment inputs");
    const error = new Error("empty program commitment inputs");
    error.code = "EMPTY_PROGRAM_COMMITMENT_INPUTS_ERROR";
    const { neuCommitment, responsibilityToStudents, partnerCommitment, riskManagement, minStudents, securityRegulation, intellectualPropertyRegulation } = req.body
    if (!neuCommitment || !responsibilityToStudents || !partnerCommitment || !riskManagement || !minStudents || !securityRegulation || !intellectualPropertyRegulation ) {
        console.log(error.code, 'middleware empty program commitment inputs error')
        throw error;
    } else {
        console.log('inputs filled')
        next()
    }
}

function typeProgramCommitmentInputValidation(req, res, next) {
    console.log(req.body, "middleware check type program commitment inputs")
    const { minStudents } = req.body
    const error = new Error('wrong type program commitment inputs')
    error.code = "PROGRAM_COMMITMENT_INPUTS_TYPE_ERROR"
    if ( isNaN(minStudents) ) {
        console.log(error.code, 'middleware program commitment inputs type error')
        throw error;
    } else {
        console.log('program commitment inputs type correct')
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
  emptyFileDecisionInputValidation,
  emptyDocumentInputsValidation,
  typeDocumentInputsValidation,
  emptyFileDocumentInputValidation,
  emptyPartnerInputsValidation,
  emptyPartnerFileInputValidation,
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
  emptyFileExStudentInputValidation,
  emptyExtendVisaInputsValidation,
  typeExtendVisaInputsValidation,
  emptyFileExtendVisaInputValidation,
  emptyUserInputsValidation,
  typeUserInputsValidation,
  emptyUserPasswordInputValidation,
  emptyCloseDecisionInputsValidation,
  typeCloseDecisionInputsValidation,
  emptyFileCloseDecisionInputValidation,
  emptyStudentInputsValidation,
  typeStudentInputsValidation,
  emptyUserInputsValidation1,
  emptyProgramCommitmentInputValidation,
  typeProgramCommitmentInputValidation
};
