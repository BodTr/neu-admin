<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý các dự án HTQT</h2>
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
                        <label class="form-label">Quốc gia</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nation"
                          placeholder="Nhập quốc gia"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nguồn kinh phí</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="funding"
                          placeholder="Nhập nguồn kinh phí"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nội dung dự án</label>
                        <textarea
                          v-model="planDetail"
                          class="form-control"
                          row="5"
                          placeholder="Nhập nội dung dự án"
                        ></textarea>
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
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên trường đối tác</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="partnerUni"
                          placeholder="Nhập tên trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian ký kết</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="signingTime"
                          placeholder="Nhập Thời gian ký kết"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian hết hạn</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="expireTime"
                          placeholder="Nhập thời gian hết hạn"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ghi chú</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="note"
                          placeholder="Nhập ghi chú"
                        ></textarea>
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
                        ref="importHtqtsDoc"
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
                          v-model="importHtqtsDocName"
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
                  url="/api/get-all-htqts"
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
                      v-if="item.row.attachedDocLink !== ''"
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
                            <h5 class="modal-title">Chỉnh sửa</h5>
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
                                <label class="form-label">Quốc gia</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editHTQT.nation"
                                  placeholder="Nhập quốc gia"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Nguồn kinh phí</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editHTQT.funding"
                                  placeholder="Nhập quốc gia"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Nội dung dự án</label>
                                <textarea
                                  v-model="editHTQT.planDetail"
                                  class="form-control"
                                  row="5"
                                  placeholder="Nhập nội dung dự án"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Văn bản đính kèm</label
                                >
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
                                    v-model="editHTQT.attachedDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editHTQT.message != ''">
                                  {{ editHTQT.message }}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Phân loại/học phần</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editHTQT.partnerUni"
                                  placeholder="Nhập phân loại/học phần"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian ký kết</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editHTQT.signingTime"
                                  placeholder="Nhập Thời gian ký kết"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian hết hạn</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editHTQT.expireTime"
                                  placeholder="Nhập thời gian hết hạn"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ghi chú</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editHTQT.note"
                                  placeholder="Nhập ghi chú"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <a
                              @click="onSubmit()"
                              class="btn btn-primary ms-auto"
                            >
                              Chỉnh sửa
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
  name: "ProgramManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "nation",
        "partnerUni",
        "funding",
        "planDetail",
        "attachedDoc",
        "signingTime",
        "expireTime",
        "note",
        "tool",
      ],
      options: {
        headings: {
          nation: "Quốc gia",
          partnerUni: "Trường đối tác",
          funding: "Nguồn kinh phí",
          signingTime: "Thời gian ký kết",
          planDetail: "Nội dung dự án",
          attachedDoc: "Văn bản đính kèm",
          expireTime: "Thời gian hết hạn",
          note: "Ghi chú",
          tool: "Thao tác",
        },
      },
      nation: "",
      funding: "",
      planDetail: "",
      attachedDoc: null,
      attachedDocName: "",
      partnerUni: "",
      signingTime: "",
      expireTime: "",
      note: "",
      message: "",
      importHtqtsDoc: null,
      importHtqtsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      editHTQT: {
        id: "",
        nation: "",
        funding: "",
        planDetail: "",
        attachedDoc: null,
        attachedDocName: "",
        attachedDocLink: "",
        partnerUni: "",
        signingTime: "",
        expireTime: "",
        note: "",
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
      this.editHTQT.attachedDoc = file;
      this.editHTQT.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editHTQT.message = "";
      } else {
        this.editHTQT.message =
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
    showModal2() {
      this.displayModalTwo = true;
    },
    hideModal2() {
      this.displayModalTwo = false;
    },
    handleExcelUpload() {
      this.$refs.importHtqtsDoc.click();
    },
    handleExcelChange() {
      const file = this.$refs.importHtqtsDoc.files[0]
      console.log(file, "file handleExcelChange()")
      const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importHtqtsDoc = file;
      this.importHtqtsDocName = file.name
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.importDocMessage = "";
      } else {
        this.importDocMessage = tooLarge && allowedTypes.includes(file.type) ? `File quá nặng, giới hạn kích thước là ${MAX_SIZE / (1024 * 1024)}Mb` : "Định dạng file không phù hợp, file phải có đuôi .xlsx"
      }
    },
    async submitForm() {
      let formData = new FormData();
      formData.append("nation", this.nation);
      formData.append("funding", this.funding);
      formData.append("planDetail", this.planDetail);
      formData.append("partnerUni", this.partnerUni);
      formData.append("signingTime", this.signingTime);
      formData.append("expireTime", this.expireTime);
      formData.append("note", this.note);
      formData.append("attachedHTQTDoc", this.attachedDoc);

      try {
        const result = await instance.post("/api/create-htqt", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
          this.nation = "";
          this.funding = "";
          this.planDetail = "";
          this.attachedDoc = "";
          this.partnerUni = "";
          this.signingTime = "";
          this.expireTime = "";
          this.note = "";
          this.attachedDoc = null;
          this.attachedDocName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      let signingTime = item.signingTime;
      let expireTime = item.expireTime;
      let a_signingTime = signingTime.split("/");
      let a_expireTime = expireTime.split("/");
      signingTime =
        a_signingTime[2] + "-" + a_signingTime[1] + "-" + a_signingTime[0];
      expireTime =
        a_expireTime[2] + "-" + a_expireTime[1] + "-" + a_expireTime[0];
      this.editHTQT.nation = item.nation;
      this.editHTQT.funding = item.funding;
      this.editHTQT.planDetail = item.planDetail;
      this.editHTQT.attachedDocLink = item.attachedDocLink;
      this.editHTQT.attachedDocName = item.attachedDocName;
      this.editHTQT.partnerUni = item.partnerUni;
      this.editHTQT.signingTime = signingTime;
      this.editHTQT.expireTime = expireTime;
      this.editHTQT.note = item.note;
      this.editHTQT.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("nation", this.editHTQT.nation);
      formData.append("funding", this.editHTQT.funding);
      formData.append("planDetail", this.editHTQT.planDetail);
      formData.append("partnerUni", this.editHTQT.partnerUni);
      formData.append("signingTime", this.editHTQT.signingTime);
      formData.append("expireTime", this.editHTQT.expireTime);
      formData.append("note", this.editHTQT.note);
      formData.append("attachedDocName", this.editHTQT.attachedDocName);
      formData.append("attachedDocLink", this.editHTQT.attachedDocLink);
      formData.append("attachedHTQTDoc1", this.editHTQT.attachedDoc);

      try {
        const result = await instance.put(
          `/api/edit-htqt/${this.editHTQT.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
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
          this.editHTQT.attachedDoc = null;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa văn bản này?")) {
          const result = await instance.delete(`/api/delete-htqt/${item._id}`);
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
        const result = await instance.get("/api/export-excel-htqts");
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
        const result = await instance.get("/api/get-htqts-template")
        const templateLink = result.data.path
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(
          error,
          "/api/get-htqts-template catch block error"
        );
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append("htqts-import-file", this.importHtqtsDoc)
        formData.append("programId", this.id)
        const result = await instance.post("/api/import-htqts-data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        console.log(result, "result importFile()")
        if (result.data.error === true) {
          this.toast.error(result.data.message);
        } else {
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.importHtqtsDoc = null;
          this.importHtqtsDocName = ""
          this.displayModalTwo = false
        }

      } catch (error) {
        console.log(error, "/api/import-htqts-data catch block error");
      }
    },
  },
};
</script>

<style scoped></style>
