<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">
                <b style="color: #ffe1e1; font-size: 22px"
                  >"{{ programName }}"</b
                >
              </h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  class="btn btn-bitbucket d-none d-sm-inline-block"
                  @click="showModal2()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-table-import"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8"
                    />
                    <path d="M3 10h18" />
                    <path d="M10 3v18" />
                    <path d="M19 22v-6" />
                    <path d="M22 19l-3 -3l-3 3" />
                  </svg>
                  Import excel
                </a>
                <a
                  href="#"
                  class="btn btn-lime d-none d-sm-inline-block"
                  @click="getExcelFile()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-table-export"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"
                    />
                    <path d="M3 10h18" />
                    <path d="M10 3v18" />
                    <path d="M16 19h6" />
                    <path d="M19 16l3 3l-3 3" />
                  </svg>
                  Export excel
                </a>
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
                  Thêm môn học
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
                    <h5 class="modal-title">Thêm môn học</h5>
                    <button
                      @click="hideModal()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên môn học</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên môn học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Giảng viên</label>
                        <input
                          type="text"
                          v-model="lecturer"
                          class="form-control"
                          placeholder="Nhập giảng viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trợ giảng</label>
                        <input
                          type="text"
                          v-model="teachingAssistant"
                          class="form-control"
                          placeholder="Nhập trợ giảng"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian học - từ</label>
                        <input
                          type="date"
                          v-model="timeFrom"
                          class="form-control"
                          placeholder="Nhập Thời gian học - từ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Năm học</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập năm học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mã môn học</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="subjectCode"
                          placeholder="Nhập mã môn học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Điều tra đánh giá</label>
                        <select
                          v-model="review"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>Đánh giá</option>
                          <option value="Có">Có</option>
                          <option value="Không">Không</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian học - đến</label>
                        <input
                          type="date"
                          v-model="timeTo"
                          class="form-control"
                          placeholder="Nhập Thời gian học - đến"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="submitForm()" class="btn btn-primary ms-auto">
                      Tạo mới
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="displayModalTwo"
              class="modal modal-blur fade show"
              tabindex="-1"
              style="display: block"
              aria-modal="true"
            >
              <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Import dữ liệu</h5>
                    <button
                      @click="hideModal2()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="mb-3">
                      <a
                        href="#"
                        class="btn btn-green d-none d-sm-inline-block"
                        @click="downloadTemplate()"
                      >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-download"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
                          />
                          <path d="M7 11l5 5l5 -5" />
                          <path d="M12 4l0 12" />
                        </svg>
                        Tải file excel mẫu
                      </a>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Upload import file</label>
                      <input
                        type="file"
                        ref="importSubjectsDoc"
                        class="form-control"
                        @change="handleExcelChange()"
                        style="display: none"
                      />
                      <div class="card">
                        <button
                          @click="handleExcelUpload()"
                          class="btn btn-outline-primary w-100"
                        >
                          Choose File
                        </button>
                        <input
                          type="text"
                          class="form-control"
                          v-model="importSubjectsDocName"
                          disabled
                        />
                      </div>
                      <div v-if="importDocMessage != ''">
                        {{ importDocMessage }}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="importFile()" class="btn btn-primary ms-auto">
                      Import file
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
                  url="/api/get-all-subjects"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
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
                  </template>
                </v-server-table>
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
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">Tên môn học</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editSubject.name"
                              placeholder="Nhập tên văn bản liên kết đào tạo"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Giảng viên</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editSubject.lecturer"
                              placeholder="Nhập giảng viên"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Trợ giảng</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editSubject.teachingAssistant"
                              placeholder="Nhập trợ giảng"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Thời gian học - từ</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="editSubject.timeFrom"
                              placeholder="Nhập Thời gian học - từ"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">Năm học</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editSubject.year"
                              placeholder="Nhập năm học"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Mã môn học</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editSubject.subjectCode"
                              placeholder="Nhập mã môn học"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Điều tra đánh giá</label>
                            <select
                              v-model="editSubject.review"
                              class="form-select"
                              tabindex="-1"
                            >
                              <option value="" disabled selected>
                                Đánh giá
                              </option>
                              <option value="Có">Có</option>
                              <option value="Không">Không</option>
                            </select>
                          </div>
                          <div class="mb-3">
                            <label class="form-label"
                              >Thời gian học - đến</label
                            >
                            <input
                              type="date"
                              v-model="editSubject.timeTo"
                              class="form-control"
                              placeholder="Nhập Thời gian học - đến"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <a @click="onSubmit()" class="btn btn-primary ms-auto">
                          Chỉnh sửa
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
import router from "@/router";
export default {
  name: "ProgramManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "year",
        "subjectCode",
        "lecturer",
        "timeFrom",
        "timeTo",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          name: "Tên môn học",
          year: "Năm học",
          subjectCode: "Mã môn học",
          lecturer: "Giảng viên",
          timeFrom: "Thời gian học - từ",
          timeTo: "Thời gian học - đến",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      name: "",
      lecturer: "",
      teachingAssistant: "",
      timeFrom: "",
      timeTo: "",
      year: "",
      subjectCode: "",
      review: "",
      importSubjectsDoc: null,
      importSubjectsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      editSubject: {
        id: "",
        name: "",
        lecturer: "",
        teachingAssistant: "",
        timeFrom: "",
        timeTo: "",
        year: "",
        subjectCode: "",
        review: "",
      },
    };
  },
  mounted() {
    this.id = localStorage.getItem("progId");
    if (this.id == "" || this.id == null) {
      router.push("/init-program");
    }
    this.programName = localStorage.getItem("programName");
  },
  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
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
    showModal2() {
      this.displayModalTwo = true;
    },
    hideModal2() {
      this.displayModalTwo = false;
    },
    handleExcelUpload() {
      this.$refs.importSubjectsDoc.click();
    },
    handleExcelChange() {
      const file = this.$refs.importSubjectsDoc.files[0];
      console.log(file, "file handleExcelChange()");
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importSubjectsDoc = file;
      this.importSubjectsDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.importDocMessage = "";
      } else {
        this.importDocMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp, file phải có đuôi .xlsx";
      }
    },
    async submitForm() {
      try {
        const data = {
          programId: this.id,
          name: this.name,
          lecturer: this.lecturer,
          teachingAssistant: this.teachingAssistant,
          timeFrom: this.timeFrom,
          timeTo: this.timeTo,
          year: this.year,
          subjectCode: this.subjectCode,
          review: this.review,
        };
        console.log(data, "data submitForm() SubjectManagePage");
        const result = await instance.post("/api/create-subject", data);

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);

          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.name = "";
          this.lecturer = "";
          this.teachingAssistant = "";
          this.timeFrom = "";
          this.timeTo = "";
          this.year = "";
          this.subjectCode = "";
          this.review = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      let timeFrom = item.timeFrom;
      let timeTo = item.timeTo;
      let a_timeFrom = timeFrom.split("/");
      let a_timeTo = timeTo.split("/");
      timeFrom = a_timeFrom[2] + "-" + a_timeFrom[1] + "-" + a_timeFrom[0];
      timeTo = a_timeTo[2] + "-" + a_timeTo[1] + "-" + a_timeTo[0];
      this.editSubject.name = item.name;
      this.editSubject.lecturer = item.lecturer;
      this.editSubject.teachingAssistant = item.teachingAssistant;
      this.editSubject.timeFrom = timeFrom;
      this.editSubject.timeTo = timeTo;
      this.editSubject.year = item.year;
      this.editSubject.subjectCode = item.subjectCode;
      this.editSubject.review = item.review;
      this.editSubject.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        name: this.editSubject.name,
        lecturer: this.editSubject.lecturer,
        teachingAssistant: this.editSubject.teachingAssistant,
        timeFrom: this.editSubject.timeFrom,
        timeTo: this.editSubject.timeTo,
        year: this.editSubject.year,
        subjectCode: this.editSubject.subjectCode,
        review: this.editSubject.review,
      };
      try {
        const result = await instance.put(
          `/api/edit-subject/${this.editSubject.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);

          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Văn bản đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
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
            `/api/delete-subject/${item._id}`
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
    async getExcelFile() {
      try {
        const queryParams = { id: this.id };
        const result = await instance.get("/api/export-excel-subjects", {
          params: queryParams,
        });
        const excelFilePath = result.data.path;
        console.log(excelFilePath, "excelFilePath getExcelFile()");
        location.href = excelFilePath;
      } catch (error) {
        console.log(error, "/api/export-excel-subjects catch block error");
      }
    },
    async downloadTemplate() {
      try {
        const result = await instance.get("/api/get-subjects-template");
        const templateLink = result.data.path;
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(error, "/api/get-subjects-template catch block error");
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append("subjects-import-file", this.importSubjectsDoc);
        formData.append("programId", this.id);
        const result = await instance.post(
          "/api/import-subjects-data",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(result, "result importFile()");
        if (result.data.error === true) {
          this.toast.error(result.data.message);
        } else {
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.importSubjectsDoc = null;
          this.importSubjectsDocName = "";
          this.displayModalTwo = false;
        }
      } catch (error) {
        console.log(error, "/api/import-subjects-data catch block error");
      }
    },
  },
};
</script>

<style scoped></style>
