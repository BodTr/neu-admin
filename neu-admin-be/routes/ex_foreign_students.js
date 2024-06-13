const express = require("express");
const router = express.Router();
const ExForeignStudentSchema = require("../models/ex_foreign_student");
const ExcelJs = require("exceljs");
const {
  emptyExForeignStudentInputsValidation,
  typeExForeignStudentInputsValidation,
  emptyFileExForeignStudentInputValidation,
} = require("../helpers/input_validate_middleware");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { initexForeignStudentDocMiddleware } = require("../helpers/init_doc");
const { upload } = require("../helpers/multer_middleware");
const { authenticateAccessToken } = require("../helpers/jwt_services");
const { uploadToServer } = require('../helpers/multer_middleware')
const ObjectId = require("mongodb").ObjectId;

const config = {
  version: "latest",
  region: "ap-southeast-1",
  endpoint: "https://s3.ap-southeast-1.amazonaws.com",
  credentials: {
    accessKeyId: "AKIAJWV2UWBGOU7M53TA",
    secretAccessKey: "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",
  },
};

const s3 = new S3Client(config);

router.use(authenticateAccessToken);
router.get("/api/get-all-ex-f-students", async (req, res) => {
  try {
    let { page, limit, query } = req.query;
    let skip = (parseInt(page) - 1) * parseInt(limit);
    const students = await ExForeignStudentSchema.find({
      name: { $regex: query },
    })
      .lean()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    let count = await ExForeignStudentSchema.estimatedDocumentCount();
    let stt = 0;
    const aStudents = students.map((doc) => {
      stt++;
      // let birthday = doc.birthday
      // let receptionTime = doc.receptionTime
      // let a_birthday = birthday.split("-")
      // let a_receptionTime = receptionTime.split("-")
      // doc.birthday = a_birthday[2] + "/" + a_birthday[1] + "/" + a_birthday[0]
      // doc.receptionTime = a_receptionTime[2] + "/" + a_receptionTime[1] + "/" + a_receptionTime[0]
      // const id = doc._id.toString()
      return {
        ...doc,
        stt: stt,
      };
    });
    console.log(aStudents, "aStudents");
    res.json({ data: aStudents, count: count, error: false });
  } catch (error) {
    console.log(error, "get programs api catch block error");
    res.json({ error: true, message: "something went wrong" });
  }
});

router.post(
  "/api/create-ex-f-student",
  initexForeignStudentDocMiddleware,
  upload.single("attachedExFStuDoc"),
  async (req, res, next) => {
    try {
      const {
        name,
        studentCode,
        position,
        educationLevel,
        receptionTime,
        receptionYear,
        birthday,
        sex,
        major,
        unit,
        receptionDecision,
        results,
      } = req.body;
      console.log(req.body, "req.body post api");
      console.log(req.payload, "req.payload post api");
      console.log(req.file, "req.file post api");
      const resultsArr = JSON.parse(results);
      const studentId = req.payload;
      const attachedDoc = req.file;
      console.log(attachedDoc, "attachedDoc, post api");
      let attachedDocLink = "";
      let attachedDocName = "";
      if (!attachedDoc) {
        attachedDocLink = "";
        attachedDocName = "";
      } else {
        attachedDocLink = attachedDoc.location;
        attachedDocName = attachedDoc.originalname;
      }
      const newStudent = {
        name: name,
        studentCode: studentCode,
        position: position,
        educationLevel: educationLevel,
        receptionTime: receptionTime,
        birthday: birthday,
        sex: sex,
        receptionYear: receptionYear,
        major: major,
        unit: unit,
        receptionDecision: receptionDecision,
        results: resultsArr,
        attachedDocLink: attachedDocLink,
        attachedDocName: attachedDocName,
      };
      const storingStudent = await ExForeignStudentSchema.findOneAndUpdate(
        { _id: studentId },
        newStudent,
        { new: true }
      );
      console.log(storingStudent, "storingStudent");
      res.json({ error: false, message: "Lưu thành công" });
    } catch (error) {
      console.log(error, "post api catch block error");
      // res.json({ error: true, message: "something went wrong" })
      next(error);
    }
  }
);

router.put(
  "/api/edit-ex-f-student/:id",
  upload.single("attachedExFStuDoc1"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        studentCode,
        position,
        educationLevel,
        receptionTime,
        receptionYear,
        birthday,
        sex,
        major,
        unit,
        receptionDecision,
        results,
        attachedDocLink,
        attachedDocName,
      } = req.body;
      const attachedDoc1 = req.file;
      const resultArr = JSON.parse(results);
      console.log(req.file, "req.file put api");
      console.log(req.body, "req.body put api");
      let newAttachedDocLink = "";
      if (attachedDoc1) {
        if (attachedDocLink === "") {
          console.log("ko có link ảnh cũ edit-ex-f-student api");
        } else {
          const oldFileKey = attachedDocLink.replace(
            "https://acvnapps.s3.ap-southeast-1.amazonaws.com/",
            ""
          );
          console.log(oldFileKey, "oldFileKey put api");
          const newDeleteCommand = new DeleteObjectCommand({
            Bucket: "acvnapps",
            Key: `${oldFileKey}`,
          });
          const result = await s3.send(newDeleteCommand);
          console.log(result, ":::result, newDeleteCommand put api:::");
        }
        newAttachedDocLink = attachedDoc1.location;
      } else {
        newAttachedDocLink = attachedDocLink;
      }

      console.log(id, "::put api id::");
      const updatingStudent = {
        name: name,
        studentCode: studentCode,
        position: position,
        educationLevel: educationLevel,
        receptionTime: receptionTime,
        receptionYear: receptionYear,
        birthday: birthday,
        sex: sex,
        major: major,
        unit: unit,
        receptionDecision: receptionDecision,
        results: resultArr,
        attachedDocLink: newAttachedDocLink,
        attachedDocName: attachedDocName,
      };
      console.log(req.body, "put api req.body");
      const updatedStudent = await ExForeignStudentSchema.findOneAndUpdate(
        { _id: id },
        updatingStudent,
        { new: true }
      );
      console.log(updatedStudent, "updatedStudent");
      res.json({ error: false, message: "Thông tin sinh viên sửa thành công" });
    } catch (error) {
      console.log(error, "put catch block error");
      res.json({ error: true, message: "something went wrong!" });
      // next(error)
    }
  }
);

router.delete("/api/delete-ex-f-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "::id delete api::");
    const delStudent = await ExForeignStudentSchema.findOne({ _id: id });
    const attachedDocLink = delStudent.attachedDocLink;
    if (attachedDocLink === "") {
      console.log("ko có link ảnh cũ delete-ex-f-student api");
    } else {
      const delStudentKey = delStudent.attachedDocLink.replace(
        "https://acvnapps.s3.ap-southeast-1.amazonaws.com/",
        ""
      );
      console.log(delStudentKey, "delStudentKey delete api");
      const newDeleteCommand = new DeleteObjectCommand({
        Bucket: "acvnapps",
        Key: `${delStudentKey}`,
      });
      const result = await s3.send(newDeleteCommand);
      console.log(result, ":::result, delete api:::");
    }

    const deletingStudent = await ExForeignStudentSchema.findOneAndDelete({
      _id: id,
    });
    console.log(deletingStudent, "deletingStudent");
    res.json({ error: false, message: "Xóa thành công thông tin học sinh" });
  } catch (error) {
    console.log(error, "delete catch block error");
    res.json({ error: true, message: "something went wrong!" });
  }
});

router.get("/api/export-excel-exfstudents", async (req, res) => {
  try {
    const { id } = req.query; // id: program id
    const exfstudents = await ExForeignStudentSchema.find().lean();
    let stt = 0;
    const aExfstudents = exfstudents.map((doc) => {
      stt++;
      return {
        ...doc,
        stt: stt,
      };
    });

    let exfstudentDocsArrayLengthArray = [];
    aExfstudents.forEach((student) => {
      let exfstudentArrayLength = student.results.length;
      exfstudentDocsArrayLengthArray.push(exfstudentArrayLength);
    });

    console.log(
      exfstudentDocsArrayLengthArray,
      "exfstudentDocsArrayLengthArray /api/export-excel-exfstudents"
    );

    const maxValue = Math.max(...exfstudentDocsArrayLengthArray);
    console.log(maxValue, "maxValue /api/export-excel-exfstudents");
    let pushCol = [];
    for (let i = 0; i < maxValue; i++) {
      pushCol.push(
        {
          header: `TÊN MÔN HỌC ${i + 1}`,
          key: `subjectName${i + 1}`,
          width: 60,
        },
        {
          header: `ĐƠN VỊ ĐÀO TẠO ${i + 1}`,
          key: `trainingUnit${i + 1}`,
          width: 50,
        },
        {
          header: `KẾT QUẢ ${i + 1}`,
          key: `point${i + 1}`,
          width: 30,
        }
      );
    }
    console.log(pushCol, "pushCol /api/export-excel-exfstudents");
    const constCol = [
      { header: "STT", key: "stt", width: 10 },
      { header: "HỌ VÀ TÊN", key: "name", width: 50 },
      { header: "MSSV (NEU)", key: "studentCode", width: 30 }, //attachedDocName
      { header: "NGÀY SINH", key: "birthday", width: 40 },
      { header: "GIỚI TÍNH", key: "sex", width: 30 },
      { header: "ĐƠN VỊ TIẾP NHẬN (NEU)", key: "unit", width: 30 },
      {
        header: "QUYẾT ĐỊNH TIẾP NHẬN (NEU)",
        key: "receptionDecision",
        width: 30,
      },
      // {header: "ĐƠN VỊ TIẾP NHẬN (NEU)", key:"unit", width: 30},
      { header: "CHỨC VỤ", key: "position", width: 30 },
      { header: "BẬC HỌC (TRƯỜNG ĐỐI TÁC)", key: "educationLevel", width: 30 },
      { header: "CHUYÊN NGÀNH (TRƯỜNG ĐỐI TÁC)", key: "major", width: 30 },
      { header: "THỜI GIAN TIẾP NHẬN", key: "receptionTime", width: 30 },
      { header: "NĂM HỌC TIẾP NHẬN", key: "receptionYear", width: 30 },
      { header: "TÊN VĂN BẢN ĐÍNH KÈM", key: "attachedDocName", width: 30 },
      { header: "LINK VĂN BẢN ĐÍNH KÈM", key: "attachedDocLink", width: 50 },
    ];

    let workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet("exfstudents");
    sheet.columns = constCol.concat(pushCol);
    console.log(aExfstudents, "aExfstudents /api/export-excel-exfstudents 3");
    aExfstudents.map((exfstudent) => {
      const resultsArr = exfstudent.results;
      console.log(resultsArr, "resultsArr 2 /api/export-excel-exfstudents");
      let addObj = {};
      if (resultsArr.length === 0) {
        console.log("resultsArr.length === 0");
        addObj = {};
      } else {
        console.log(resultsArr, "resultsArr 3 /api/export-excel-exfstudents");
        addObj = resultsArr.reduce((acc, result, i) => {
          acc[`subjectName${i + 1}`] = result.subjectName;
          acc[`trainingUnit${i + 1}`] = result.trainingUnit;
          acc[`point${i + 1}`] = result.point;
          return acc;
        }, {});
        console.log(addObj, "addObj /api/export-excel-exfstudents 1");
      }

      console.log(addObj, "addObj /api/export-excel-exfstudents");
      const constObj = {
        stt: exfstudent.stt,
        name: exfstudent.name,
        studentCode: exfstudent.studentCode,
        birthday: exfstudent.birthday,
        sex: exfstudent.sex,
        unit: exfstudent.unit,
        receptionDecision: exfstudent.receptionDecision,
        position: exfstudent.position,
        educationLevel: exfstudent.educationLevel,
        major: exfstudent.major,
        receptionTime: exfstudent.receptionTime,
        receptionYear: exfstudent.receptionYear,
        attachedDocName: exfstudent.attachedDocName,
        attachedDocLink: exfstudent.attachedDocLink,
      };
      const finalObj = { ...constObj, ...addObj };
      sheet.addRow(finalObj);
    });
    await workbook.xlsx.writeFile(
      `public/Sinh viên nước ngoài đến trao đổi.xlsx`
    );
    const excelFilePath =
      process.env.CND_EXCELFILE + `Sinh viên nước ngoài đến trao đổi.xlsx`;
    res.json({
      error: false,
      path: excelFilePath,
    });
  } catch (error) {
    console.log(error, "/api/export-excel-exfstudents catch block error");
    res.json({
      error: true,
      message: "something went wrong!",
    });
  }
});

router.get("/api/get-exfstudents-template", async (req, res) => {
  try {
    const templateFilePath =
      process.env.CND_EXCELFILE +
      "import-template/template-sinh-vien-nuoc-ngoai-den-trao-doi.xlsx";
    res.json({
      error: false,
      path: templateFilePath,
    });
  } catch (error) {
    console.log(error, "/api/get-exfstudents-template catch block error");
    res.json({
      error: true,
      message: "something went wrong!",
    });
  }
});

router.post(
  "/api/import-exfstudents-data",
  uploadToServer.single("exfstudents-import-file"),
  async (req, res) => {
    try {
      console.log(req.file, "req.file /api/import-exfstudents-data");
      const file = req.file;
      const filePath = file.path; // .replace("public\\", "public/")
      let workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(`${filePath}`);

      let importExfstudentsArr = [];
      const sheet = workbook.getWorksheet(workbook._name);
      sheet.eachRow((row, rowNumber) => {
        // console.log(row.values, "row.values")
        console.log("Row " + rowNumber + " = " + JSON.stringify(row.values)); // JSON.stringify()
        if (rowNumber > 1) {
          importExfstudentsArr.push({
            name: row.values[2],
            studentCode: row.values[3],
            birthday: row.values[4],
            sex: row.values[5],
            unit: row.values[6],
            receptionDecision: row.values[7],
            position: row.values[8],
            educationLevel: row.values[9],
            major: row.values[10],
            receptionTime: row.values[11],
            receptionYear: row.values[12],

          });
        }
      });
      console.log(
        importExfstudentsArr,
        "importExfstudentsArr /api/import-exfstudents-data"
      );
      const savedImportExfstudents = await ExForeignStudentSchema.insertMany(
        importExfstudentsArr
      );

      console.log(
        savedImportExfstudents,
        "savedImportExfstudents /api/import-exfstudents-data"
      );
      res.json({
        error: false,
        message: "import data thành công",
      });
    } catch (error) {
      console.log(error, "/api/import-exfstudents-data catch block error");
      res.json({
        error: true,
        message: "something went wrong!",
      });
    }
  }
);

router.use("/api/create-ex-f-student", async (error, req, res, next) => {
  try {
    console.log(error, "error handle post api midddleware");
    const studentId = req.payload;
    const docFile = req.file;
    const delInitStudent = await ExForeignStudentSchema.deleteOne({
      _id: studentId,
    });
    console.log(delInitStudent, "deleted delInitStudent");
    if (!docFile) {
      next(error);
    } else {
      console.log("POST api error!! So, delete images just uploaded");
      const fileKey = docFile.Key;
      const newDeleteCommand = new DeleteObjectCommand({
        Bucket: "acvnapps",
        Key: `${fileKey}`,
      });
      const result = await s3.send(newDeleteCommand);
      console.log(result, "::: s3 file deleted result, post api:::");
      next(error);
    }
  } catch (error) {
    console.log(error, "post error handling middleware catch block error");
    res.json({ error: true, message: "something went wrong" }); // nếu có lỗi gì xảy ra ở try block owr treen thì lỗi đc xử lí ở đây
  }
});

router.use("/api/edit-ex-f-student/:id", async (error, req, res, next) => {
  try {
    console.log(error, "error handle put api middleware");
    const { id } = req.params;
    const docFile = req.file;
    if (!docFile) {
      next(error);
    } else {
      const fileKey = docFile.Key;
      const newDeleteCommand = new DeleteObjectCommand({
        Bucket: "acvnapps",
        Key: `${fileKey}`,
      });
      const result = await s3.send(newDeleteCommand);
      console.log(result, ":::result, post api:::");
      next(error);
    }
  } catch (error) {
    console.log(error, "put error handling middleware catch block error");
    res.json({ error: true, message: "something went wrong" });
  }
});

router.use((error, req, res, next) => {
  // hàm này cần đủ cả 4 params error, req, res, next
  if (error) {
    console.log(error, "custom error handler");

    // if (error.code === "EMPTY_EFS_FILE_INPUT_ERROR") {
    //     console.log(error.code, "empty file input error")
    //     return res.json({ error: true, message: "Hãy điền đẩy đủ form" })
    // }
  }
});

module.exports = router;
