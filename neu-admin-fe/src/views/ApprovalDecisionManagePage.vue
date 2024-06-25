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
                  Thêm quyết định
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
                    <h5 class="modal-title">Thêm quyết định</h5>
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
                        <label class="form-label">Tên quyết định</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày kí</label>
                        <input
                          type="date"
                          v-model="signDate"
                          class="form-control"
                          placeholder="Nhập ngày kí date"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Số quyết định</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="number"
                          placeholder="Nhập số quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời hạn hiệu lực</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="expireIn"
                          placeholder="Nhập thời hạn hiệu lực"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời hạn hết hiệu lực</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="expireInLL"
                          placeholder="Nhập thời hạn hết hiệu lực"
                        />
                      </div>
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
                    <div class="mb-3">
                      <label class="form-label">Nội dung quyết định</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        v-model="detail"
                        placeholder="Nhập nội dung quyết định"
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
                        ref="importDecisionsDoc"
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
                          v-model="importDecisionsDocName"
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
                  url="/api/get-all-decisions"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedDocName="item">
                    <a :href="item.row.attachedDocLink">
                      {{ item.row.attachedDocName }}
                    </a>
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
                        <h5 class="modal-title">Chỉnh sửa quyết định</h5>
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
                            <label class="form-label">Tên quyết định</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editDecision.name"
                              placeholder="Nhập tên quyết định"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Ngày kí</label>
                            <input
                              type="date"
                              v-model="editDecision.signDate"
                              class="form-control"
                              placeholder="Nhập ngày kí date"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label class="form-label">Số quyết định</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editDecision.number"
                              placeholder="Nhập số quyết định"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Thời hạn hiệu lực</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="editDecision.expireIn"
                              placeholder="Nhập thời hạn hiệu lực"
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label"
                              >Thời hạn hết hiệu lực</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              v-model="editDecision.expireInLL"
                              placeholder="Nhập thời hạn hết hiệu lực"
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Văn bản đính kèm</label>
                          <input
                            type="file"
                            class="form-control"
                            ref="attachedDoc1"
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
                              v-model="editDecision.attachedDocName"
                              disabled
                            />
                          </div>
                          <div v-if="editDecision.message != ''">
                            {{ editDecision.message }}
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Nội dung quyết định</label>
                          <textarea
                            class="form-control"
                            rows="5"
                            v-model="editDecision.detail"
                            placeholder="Nhập nội dung quyết định"
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
// import { ref } from 'vue'
import instance from "../instance";
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
        "detail",
        "number",
        "attachedDocName",
        "signDate",
        "expireIn",
        "expireInLL",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          name: "Tên quyết định",
          detail: "Nội dung quyết định",
          number: "Quyết định số",
          attachedDocName: "Văn bản đính kèm",
          signDate: "Ngày kí",
          expireIn: "Thời hạn hiệu lực",
          expireInLL: "Thời hạn hết hiệu lực",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      name: "",
      detail: "",
      number: "",
      signDate: "",
      expireIn: "",
      expireInLL: "",
      importDecisionsDoc: null,
      importDecisionsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      attachedDoc: null,
      attachedDocName: "",
      message: "",

      editDecision: {
        id: "",
        name: "",
        detail: "",
        number: "",
        signDate: "",
        expireIn: "",
        expireInLL: "",
        attachedDocName: "",
        attachedDocLink: "",
        attachedDoc: null,
        message: "",
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
    handlePdfUpload() {
      this.$refs.attachedDoc.click();
    },
    handlePdfUpload1() {
      this.$refs.attachedDoc1.click();
    },
    handleExcelUpload() {
      this.$refs.importDecisionsDoc.click();
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
      this.editDecision.attachedDoc = file;
      this.editDecision.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editDecision.message = "";
      } else {
        this.editDecision.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleExcelChange() {
      const file = this.$refs.importDecisionsDoc.files[0];
      console.log(file, "file handleExcelChange()");
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importDecisionsDoc = file;
      this.importDecisionsDocName = file.name;
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
    async submitForm() {
      try {
        console.log(this.id, "post api program id");

        let formData = new FormData();
        formData.append("programId", this.id);
        formData.append("name", this.name);
        formData.append("detail", this.detail);
        formData.append("number", this.number);
        formData.append("signDate", this.signDate);
        formData.append("expireIn", this.expireIn);
        formData.append("expireInLL", this.expireInLL);
        formData.append("approvalDecisionDoc", this.attachedDoc);

        const result = await instance.post("/api/create-decision", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
          this.detail = "";
          this.number = "";
          this.signDate = "";
          this.expireIn = "";
          this.expireInLL = "";
          this.attachedDocName = "";
          this.attachedDoc = null;
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      let signDate = item.signDate;
      let a_signDate = signDate.split("/");
      signDate = a_signDate[2] + "-" + a_signDate[1] + "-" + a_signDate[0];
      this.editDecision.name = item.name;
      this.editDecision.detail = item.detail;
      this.editDecision.number = item.number;
      this.editDecision.signDate = signDate;
      this.editDecision.expireIn = item.expireIn;
      this.editDecision.expireInLL = item.expireInLL;
      this.editDecision.attachedDocLink = item.attachedDocLink;
      this.editDecision.attachedDocName = item.attachedDocName;
      this.editDecision.id = item._id;
      this.editDecision.attachedDoc = null;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      try {
        console.log(this.id, "this.id onSubmit()");
        let formData = new FormData();
        formData.append("name", this.editDecision.name);
        formData.append("detail", this.editDecision.detail);
        formData.append("number", this.editDecision.number);
        formData.append("signDate", this.editDecision.signDate);
        formData.append("expireIn", this.editDecision.expireIn);
        formData.append("expireInLL", this.editDecision.expireInLL);
        formData.append("attachedDocLink", this.editDecision.attachedDocLink);
        formData.append("attachedDocName", this.editDecision.attachedDocName);
        formData.append("programId", this.id);
        formData.append("approvalDecisionDoc1", this.editDecision.attachedDoc); // cần đặt file cuối cùng để multer phía be load hết data của req
        const result = await instance.put(
          `/api/edit-decision/${this.editDecision.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // const result = await instance.post("/api/create-decision", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });

        // try {
        //   const result = await instance.put(
        //     `/api/edit-decision/${this.editDecision.id}`,
        //     data
        //   );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Quyết định đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      try {
        console.log(item);
        if (confirm("Xóa quyết định này?")) {
          const result = await instance.delete(
            `/api/delete-decision/${item._id}`
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
        const result = await instance.get("/api/export-excel-decisions", {
          params: queryParams,
        });
        const excelFilePath = result.data.path;
        console.log(excelFilePath, "excelFilePath getExcelFile()");
        location.href = excelFilePath;
      } catch (error) {
        console.log(error, "/api/export-excel-decisions catch block error");
      }
    },
    async downloadTemplate() {
      try {
        const result = await instance.get("/api/get-decisions-template");
        const templateLink = result.data.path;
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(error, "/api/get-decisions-template catch block error");
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append("decisions-import-file", this.importDecisionsDoc);
        formData.append("programId", this.id);
        const result = await instance.post(
          "/api/import-decisions-data",
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
          this.importDecisionsDoc = null;
          this.importDecisionsDocName = "";
          this.displayModalTwo = false;
        }
      } catch (error) {
        console.log(error, "/api/import-decisions-data catch block error");
      }
    },
  },
};
</script>

<style scoped></style>
