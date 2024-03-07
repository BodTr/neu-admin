<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">
                Quản lý sinh viên nước ngoài đến trao đổi
              </h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  class="btn btn-primary d-none d-sm-inline-block"
                  @click="showModal()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                  </svg>
                  Thêm sinh viên
                </a>
                <a
                  href="#"
                  class="btn btn-primary d-sm-none btn-icon"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-report"
                  aria-label="Create new report"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 5l0 14"></path>
                    <path d="M5 12l14 0"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div
              v-if="displayModal"
              class="modal modal-blur fade show"
              id="modal-report"
              tabindex="-1"
              style="display: block"
              aria-modal="true"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Thêm sinh viên</h5>
                    <button
                      @click="hideModal()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Họ và tên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập họ và tên sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày sinh</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="birthday"
                          placeholder="Nhập ngày sinh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Giới tính</label>
                        <select v-model="sex" class="form-select" tabindex="-1">
                          <option value="" disabled selected>
                            Chọn giới tính
                          </option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <select
                          v-model="position"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn chức vụ
                          </option>
                          <option value="Giảng viên">Giảng viên</option>
                          <option value="Sinh viên">Sinh viên</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Bậc học (Trường đối tác)</label
                        >
                        <select
                          v-model="educationLevel"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn bậc học
                          </option>
                          <option value="Thạc sỹ">Thạc sỹ</option>
                          <option value="Tiến sỹ">Tiến sỹ</option>
                          <option value="Sau tiến sỹ">Sau tiến sỹ</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Chuyên ngành (Trường đối tác)</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="major"
                          placeholder="Nhập chuyên ngành"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Mã sinh viên (NEU)</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="studentCode"
                          placeholder="Nhập mã sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị tiếp nhận (NEU)</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="unit"
                          placeholder="Nhập đơn vị tiếp nhận"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Quyết định tiếp nhận (NEU)</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="receptionDecision"
                          placeholder="Nhập quyết định tiếp nhận"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Môn học (NEU)</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="subject"
                          placeholder="Nhập môn học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Kết quả học tập (NEU)</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="result"
                          placeholder="Nhập kết quả học tập"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Thời gian tiếp nhận</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="receptionTime"
                          placeholder="Nhập thời gian tiếp nhận"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Năm học tiếp nhận</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="receptionYear"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Văn bản đính kèm</label>
                        <input
                          type="file"
                          ref="attachedDoc"
                          class="form-control"
                          @change="handlePdfChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handlePdfUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="attachedDocName"
                            disabled
                          />
                        </div>
                        <div v-if="message != ''">{{ message }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="submitForm()" class="btn btn-primary ms-auto">
                      Create
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-deck row-cards">
            <div class="col-12">
              <div class="card">
                <v-server-table
                  class="table table-vcenter table-mobile-md card-table"
                  url="/api/get-all-ex-f-students"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedDoc="item">
                    {{ item.row.attachedDocName }}
                  </template>
                  <template v-slot:tool="item">
                    <span class="d-sm-inline">
                      <a
                        href="#"
                        @click="remove(item.row)"
                        class="btn btn-danger btn-icon"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-trash"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path
                            d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                          />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </a>
                    </span>
                    <a
                      href="#"
                      class="btn btn-info btn-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-report-one"
                      @click="onEdit(item.row)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-edit"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"
                        />
                        <path
                          d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"
                        />
                        <path d="M16 5l3 3" />
                      </svg>
                    </a>
                    <a
                      :href="item.row.attachedDocLink"
                      class="btn btn-success btn-icon"
                    >
                      <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-files"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                        <path
                          d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z"
                        />
                        <path
                          d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"
                        />
                      </svg>
                    </a>
                    <div
                      v-if="displayModalOne"
                      class="modal modal-blur fade show"
                      id="modal-report-one"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                    >
                      <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Chỉnh sửa văn bản</h5>
                            <button
                              @click="hideModal1()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Họ và tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.name"
                                  placeholder="Nhập họ và tên sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày sinh</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExForeignStudent.birthday"
                                  placeholder="Nhập ngày sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Giới tính</label>
                                <select
                                  v-model="editExForeignStudent.sex"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn giới tính
                                  </option>
                                  <option value="Nam">Nam</option>
                                  <option value="Nữ">Nữ</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <select
                                  v-model="editExForeignStudent.position"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn chức vụ
                                  </option>
                                  <option value="Giảng viên">Giảng viên</option>
                                  <option value="Sinh viên">Sinh viên</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Bậc học (Trường đối tác)</label
                                >
                                <select
                                  v-model="editExForeignStudent.educationLevel"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn bậc học
                                  </option>
                                  <option value="Thạc sỹ">Thạc sỹ</option>
                                  <option value="Tiến sỹ">Tiến sỹ</option>
                                  <option value="Sau tiến sỹ">
                                    Sau tiến sỹ
                                  </option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Chuyên ngành (Trường đối tác)</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.major"
                                  placeholder="Nhập chuyên ngành"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Mã sinh viên (NEU)</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editExForeignStudent.studentCode"
                                  placeholder="Nhập mã sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Đơn vị tiếp nhận (NEU)</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.unit"
                                  placeholder="Nhập đơn vị tiếp nhận"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quyết định tiếp nhận (NEU)</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="
                                    editExForeignStudent.receptionDecision
                                  "
                                  placeholder="Nhập quyết định tiếp nhận"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Môn học (NEU)</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.subject"
                                  placeholder="Nhập môn học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Kết quả học tập (NEU)</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.result"
                                  placeholder="Nhập kết quả học tập"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian tiếp nhận</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExForeignStudent.receptionTime"
                                  placeholder="Nhập thời gian tiếp nhận"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Năm học tiếp nhận</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExForeignStudent.receptionYear"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Văn bản đính kèm</label
                                >
                                <input
                                  type="file"
                                  ref="attachedDoc1"
                                  class="form-control"
                                  @change="handlePdfChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handlePdfUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExForeignStudent.attachedDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="message != ''">{{ message }}</div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <a
                              @click="onSubmit()"
                              class="btn btn-primary ms-auto"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </v-server-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../instance";
// import { ref } from 'vue'
import VerticalNavbar from "../components/VerticalNavbar.vue";
import { useToast } from "vue-toastification";

export default {
  name: "ExchangeForeignStudentManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "studentCode",
        "position",
        "educationLevel",
        "major",
        "unit",
        "subject",
        "attachedDoc",
        "tool",
      ],
      options: {
        headings: {
          name: "Tên văn bằng và chứng chỉ",
          studentCode: "MSSV (NEU)",
          position: "Chức vụ",
          educationLevel: "Bậc học (Trường đối tác)",
          major: "Chuyên ngành (Trường đối tác)",
          unit: "Đơn vị tiếp nhận (NEU)",
          subject: "Môn học (NEU)",
          attachedDoc: "Văn bản đính kèm",
          tool: "Thao tác",
        },
      },
      name: "",
      studentCode: "",
      position: "",
      educationLevel: "",
      receptionTime: "",
      receptionYear: "",
      birthday: "",
      sex: "",
      major: "",
      unit: "",
      receptionDecision: "",
      subject: "",
      result: "",
      attachedDoc: null,
      attachedDocName: "",
      message: "",

      displayModal: false,
      displayModalOne: false,

      editExForeignStudent: {
        id: "",
        name: "",
        studentCode: "",
        position: "",
        educationLevel: "",
        receptionTime: "",
        receptionYear: "",
        birthday: "",
        sex: "",
        major: "",
        unit: "",
        receptionDecision: "",
        subject: "",
        result: "",
        attachedDoc: null,
        attachedDocName: "",
        attachedDocLink: "",
        message: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
    handlePdfUpload() {
      this.$refs.attachedDoc.click();
    },
    handlePdfUpload1() {
      this.$refs.attachedDoc1.click();
    },
    handlePdfChange() {
      const file = this.$refs.attachedDoc.files[0];
      console.log(file, "handlePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.attachedDoc = file;
      this.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.message = "";
      } else {
        this.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handlePdfChange1() {
      const file = this.$refs.attachedDoc1.files[0];
      console.log(file, "handlePdfChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExForeignStudent.attachedDoc = file;
      this.editExForeignStudent.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExForeignStudent.message = "";
      } else {
        this.editExForeignStudent.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
    },
    showModal1() {
      this.displayModalOne = true;
    },
    hideModal1() {
      this.displayModalOne = false;
    },
    async submitForm() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("studentCode", this.studentCode);
      formData.append("position", this.position);
      formData.append("educationLevel", this.educationLevel);
      formData.append("receptionTime", this.receptionTime);
      formData.append("receptionYear", this.receptionYear);
      formData.append("birthday", this.birthday);
      formData.append("sex", this.sex);
      formData.append("major", this.major);
      formData.append("unit", this.unit);
      formData.append("receptionDecision", this.receptionDecision);
      formData.append("subject", this.subject);
      formData.append("result", this.result);
      formData.append("attachedExFStuDoc", this.attachedDoc);

      try {
        console.log(this.attachedDoc, "attachedExFStuDoc formData") 
        const result = await instance.post("/api/create-ex-f-student", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.name = "";
          this.position = "";
          this.studentCode = "";
          this.receptionTime = "";
          this.receptionYear = "";
          this.educationLevel = "";
          this.birthday = "";
          this.sex = "";
          this.major = "";
          this.unit = "";
          this.receptionDecision = "";
          this.subject = "";
          this.result = "";
          this.attachedDoc = null;
          this.attachedDocName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editExForeignStudent.name = item.name;
      this.editExForeignStudent.position = item.position;
      this.editExForeignStudent.studentCode = item.studentCode;
      this.editExForeignStudent.receptionTime = item.receptionTime;
      this.editExForeignStudent.receptionYear = item.receptionYear;
      this.editExForeignStudent.educationLevel = item.educationLevel;
      this.editExForeignStudent.birthday = item.birthday;
      this.editExForeignStudent.sex = item.sex;
      this.editExForeignStudent.major = item.major;
      this.editExForeignStudent.subject = item.subject;
      this.editExForeignStudent.result = item.result;
      this.editExForeignStudent.unit = item.unit;
      this.editExForeignStudent.receptionDecision = item.receptionDecision;
      this.editExForeignStudent.attachedDocName = item.attachedDocName;
      this.editExForeignStudent.attachedDocLink = item.attachedDocLink;
      this.editExForeignStudent.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("name", this.editExForeignStudent.name);
      formData.append("studentCode", this.editExForeignStudent.studentCode);
      formData.append("position", this.editExForeignStudent.position);
      formData.append("educationLevel", this.editExForeignStudent.educationLevel);
      formData.append("receptionTime", this.editExForeignStudent.receptionTime);
      formData.append("receptionYear", this.editExForeignStudent.receptionYear);
      formData.append("birthday", this.editExForeignStudent.birthday);
      formData.append("sex", this.editExForeignStudent.sex);
      formData.append("major", this.editExForeignStudent.major);
      formData.append("unit", this.editExForeignStudent.unit);
      formData.append("receptionDecision", this.editExForeignStudent.receptionDecision);
      formData.append("subject", this.editExForeignStudent.subject);
      formData.append("result", this.editExForeignStudent.result);
      formData.append("attachedExFStuDoc1",this.editExForeignStudent.attachedDoc);
      formData.append("attachedDocName",this.editExForeignStudent.attachedDocName);
      formData.append("attachedDocLink",this.editExForeignStudent.attachedDocLink);
      try {
        const result = await instance.put(
          `/api/edit-ex-f-student/${this.editExForeignStudent.id}`,
          formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Văn bản đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
          this.editExForeignStudent.attachedDoc = null;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa văn bản này?")) {
          const result = await instance.delete(
            `/api/delete-ex-f-student/${item._id}`
          );
          console.log(result);
          // alert(result.data.message)
          this.toast.warning(result.data.message);
          this.$refs.table.refresh();
        }
      } catch (error) {
        console.log(error, "delete api catch block error");
      }
    },
  },
};
</script>

<style scoped></style>