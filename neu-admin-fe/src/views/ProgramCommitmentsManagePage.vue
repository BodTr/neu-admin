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
                  @click="showModal()"
                  href="#"
                  class="btn btn-primary d-none d-sm-inline-block"
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
                  Thêm mới
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
                    <h5 class="modal-title">Thêm mới</h5>
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
                        <label class="form-label">Trách nhiệm của NEU</label>
                        <textarea
                          class="form-control"
                          rows="2"
                          v-model="neuCommitment"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Trách nhiệm với học viên</label
                        >
                        <textarea
                          class="form-control"
                          rows="2"
                          v-model="responsibilityToStudents"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Trách nhiệm của trường đối tác</label
                        >
                        <textarea
                          class="form-control"
                          rows="2"
                          v-model="partnerCommitment"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Quản lý rủi ro chấm dứt liên kết</label
                        >
                        <textarea
                          class="form-control"
                          rows="2"
                          v-model="riskManagement"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                    </div>
                    <h3>Các cam kết với đối tác</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Số lượng học viên tối thiểu</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Nhập số lượng học viên tối thiểu"
                          v-model="minStudents"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Quy định về bảo mật</label>
                        <textarea
                          class="form-control"
                          rows="2"
                          v-model="securityRegulation"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Quy định về sở hữu trí tuệ</label
                      >
                      <textarea
                        class="form-control"
                        rows="2"
                        v-model="intellectualPropertyRegulation"
                        placeholder="Nhập nội dung"
                      ></textarea>
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
                        ref="importProgramCommitmentsDoc"
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
                          v-model="importProgramCommitmentsDocName"
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
                  url="/api/get-all-commitments"
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
                        <h5 class="modal-title">Chỉnh sửa qui trình</h5>
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
                            <label class="form-label"
                              >Trách nhiệm của NEU</label
                            >
                            <textarea
                              class="form-control"
                              rows="2"
                              v-model="editProgramCommitment.neuCommitment"
                              placeholder="Nhập nội dung"
                            ></textarea>
                          </div>
                          <div class="mb-3">
                            <label class="form-label"
                              >Trách nhiệm với học viên</label
                            >
                            <textarea
                              class="form-control"
                              rows="2"
                              v-model="
                                editProgramCommitment.responsibilityToStudents
                              "
                              placeholder="Nhập nội dung"
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label"
                              >Trách nhiệm của trường đối tác</label
                            >
                            <textarea
                              class="form-control"
                              rows="2"
                              v-model="editProgramCommitment.partnerCommitment"
                              placeholder="Nhập nội dung"
                            ></textarea>
                          </div>
                          <div class="mb-3">
                            <label class="form-label"
                              >Quản lý rủi ro chấm dứt liên kết</label
                            >
                            <textarea
                              class="form-control"
                              rows="2"
                              v-model="editProgramCommitment.riskManagement"
                              placeholder="Nhập nội dung"
                            ></textarea>
                          </div>
                        </div>
                        <h3>Các cam kết với đối tác</h3>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label"
                              >Số lượng học viên tối thiểu</label
                            >
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Nhập số lượng học viên tối thiểu"
                              v-model="editProgramCommitment.minStudents"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label"
                              >Quy định về bảo mật</label
                            >
                            <textarea
                              class="form-control"
                              rows="2"
                              v-model="editProgramCommitment.securityRegulation"
                              placeholder="Nhập nội dung"
                            ></textarea>
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Quy định về sở hữu trí tuệ</label
                          >
                          <textarea
                            class="form-control"
                            rows="2"
                            v-model="
                              editProgramCommitment.intellectualPropertyRegulation
                            "
                            placeholder="Nhập nội dung"
                          ></textarea>
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
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "ProgramCommitmentManagePage",

  data() {
    return {
      columns: [
        "stt",
        "neuCommitment",
        "partnerCommitment",
        "minStudents",
        "securityRegulation",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          neuCommitment: "Trách nhiệm của NEU",
          partnerCommitment: "Trách nhiệm của trường đối tác",
          minStudents: "Số lượng học viên tối thiểu",
          securityRegulation: "Quy định về bảo mật",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      neuCommitment: "",
      responsibilityToStudents: "",
      partnerCommitment: "",
      riskManagement: "",
      minStudents: "",
      securityRegulation: "",
      intellectualPropertyRegulation: "",
      importProgramCommitmentsDoc: null,
      importProgramCommitmentsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,

      editProgramCommitment: {
        id: "",
        neuCommitment: "",
        responsibilityToStudents: "",
        partnerCommitment: "",
        riskManagement: "",
        minStudents: "",
        securityRegulation: "",
        intellectualPropertyRegulation: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.id = localStorage.getItem("progId");
    if (this.id == "" || this.id == null) {
      router.push("/init-program");
    }
    this.programName = localStorage.getItem("programName");
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
      this.$refs.importProgramCommitmentsDoc.click();
    },
    handleExcelChange() {
      const file = this.$refs.importProgramCommitmentsDoc.files[0];
      console.log(file, "file handleExcelChange()");
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importProgramCommitmentsDoc = file;
      this.importProgramCommitmentsDocName = file.name;
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
      console.log(this.id, "post api program id");
      const data = {
        programId: this.id,
        neuCommitment: this.neuCommitment,
        responsibilityToStudents: this.responsibilityToStudents,
        partnerCommitment: this.partnerCommitment,
        riskManagement: this.riskManagement,
        minStudents: this.minStudents,
        securityRegulation: this.securityRegulation,
        intellectualPropertyRegulation: this.intellectualPropertyRegulation,
      };

      try {
        const result = await instance.post("/api/create-commitment", data);

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
          this.neuCommitment = "";
          this.responsibilityToStudents = "";
          this.partnerCommitment = "";
          this.riskManagement = "";
          this.minStudents = "";
          this.securityRegulation = "";
          this.intellectualPropertyRegulation = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editProgramCommitment.neuCommitment = item.neuCommitment;
      this.editProgramCommitment.responsibilityToStudents =
        item.responsibilityToStudents;
      this.editProgramCommitment.partnerCommitment = item.partnerCommitment;
      this.editProgramCommitment.riskManagement = item.riskManagement;
      this.editProgramCommitment.minStudents = item.minStudents;
      this.editProgramCommitment.securityRegulation = item.securityRegulation;
      this.editProgramCommitment.intellectualPropertyRegulation =
        item.intellectualPropertyRegulation;

      this.editProgramCommitment.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        neuCommitment: this.editProgramCommitment.neuCommitment,
        responsibilityToStudents:
          this.editProgramCommitment.responsibilityToStudents,
        partnerCommitment: this.editProgramCommitment.partnerCommitment,
        riskManagement: this.editProgramCommitment.riskManagement,
        minStudents: this.editProgramCommitment.minStudents,
        securityRegulation: this.editProgramCommitment.securityRegulation,
        intellectualPropertyRegulation:
          this.editProgramCommitment.intellectualPropertyRegulation,
      };
      try {
        const result = await instance.put(
          `/api/edit-commitment/${this.editProgramCommitment.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success(result.data.message);
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
        if (confirm("Xóa quy trình này?")) {
          const result = await instance.delete(
            `/api/delete-commitment/${item._id}`
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
        const result = await instance.get("/api/export-excel-commitments", {
          params: queryParams,
        });
        const excelFilePath = result.data.path;
        console.log(excelFilePath, "excelFilePath getExcelFile()");
        location.href = excelFilePath;
      } catch (error) {
        console.log(
          error,
          "/api/export-excel-trans-programs catch block error"
        );
      }
    },
    async downloadTemplate() {
      try {
        const result = await instance.get(
          "/api/get-program-commitments-template"
        );
        const templateLink = result.data.path;
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(
          error,
          "/api/get-close-decisions-template catch block error"
        );
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append(
          "program-commitments-import-file",
          this.importProgramCommitmentsDoc
        );
        formData.append("programId", this.id);
        const result = await instance.post(
          "/api/import-program-commitments-data",
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
          this.importProgramCommitmentsDoc = null;
          this.importProgramCommitmentsDocName = "";
          this.displayModalTwo = false;
        }
      } catch (error) {
        console.log(
          error,
          "/api/import-program-commitments-data catch block error"
        );
      }
    },
  },
};
</script>

<style scoped></style>
