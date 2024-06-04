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
                  class="btn btn-lime d-none d-sm-inline-block"
                  @click="getExcelFile()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-table-export"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" /><path d="M3 10h18" /><path d="M10 3v18" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /></svg>
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
                  Thêm văn bản
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
                    <h5 class="modal-title">Thêm văn bản</h5>
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
                        <label class="form-label">Tên văn bản liên kết</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên văn bản liên kết Đào tạo"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày bắt đầu hiệu lực</label>
                        <input
                          type="date"
                          v-model="effDate"
                          class="form-control"
                          placeholder="Nhập ngày bắt đầu hiệu lực"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Văn bản đính kèm</label>
                        <input
                          type="file"
                          ref="documentFile"
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
                        <label class="form-label">Nội dung</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="content"
                          placeholder="Nhập nội dung"
                        ></textarea>
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
                  url="/api/get-all-documents"
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
                                <label class="form-label"
                                  >Tên văn bản liên kết</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editDoc.name"
                                  placeholder="Nhập tên văn bản liên kết đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Ngày có hiệu lực</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editDoc.effDate"
                                  placeholder="Nhập ngày có hiệu lực"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Văn bản đính kèm</label
                                >
                                <input
                                  type="file"
                                  class="form-control"
                                  ref="documentFile1"
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
                                    v-model="editDoc.attachedDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editDoc.message != ''">
                                  {{ editDoc.message }}
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Nội dung</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editDoc.content"
                                  placeholder="Nhập nội dung"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời hạn hiệu lực</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editDoc.expireIn"
                                  placeholder="Nhập thời hạn hiệu lực"
                                />
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
import router from '@/router';
export default {
  name: "ProgramManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: ["stt", "name", "content","attachedDocName", "effDate", "expireIn", "tool"],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          name: "Tên văn bản Liên Kết Đào Tạo",
          content: "Nội dung",
          attachedDocName: "Đính kèm văn bản",
          effDate: "Ngày có hiệu lực",
          expireIn: "Thời hạn hiệu lực",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      name: "",
      effDate: "",
      content: "",
      expireIn: "",
      displayModal: false,
      displayModalOne: false,
      attachedDoc: null,
      attachedDocName: "",
      message: "",
      editDoc: {
        id: "",
        name: "",
        effDate: "",
        content: "",
        expireIn: "",
        attachedDocName: "",
        attachedDocLink: "",
        attachedDoc: null,
        message: ""
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.id = localStorage.getItem("progId")
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
    handlePdfUpload() {
      this.$refs.documentFile.click();
    },
    handlePdfUpload1() {
      this.$refs.documentFile1.click();
    },
    handlePdfChange() {
      const file = this.$refs.documentFile.files[0];
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
      const file = this.$refs.documentFile1.files[0];
      console.log(file, "handlePdfChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editDoc.attachedDoc = file;
      this.editDoc.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editDoc.message = "";
      } else {
        this.editDoc.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    async submitForm() {
      let formData = new FormData();
      formData.append("programId", this.id);
      formData.append("name", this.name);
      formData.append("effDate", this.effDate);
      formData.append("content", this.content);
      formData.append("expireIn", this.expireIn);
      formData.append("documentFile", this.attachedDoc);

      try {
        const result = await instance.post("/api/create-document", formData, {
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
          this.effDate = "";
          this.content = "";
          this.expireIn = "";
          this.attachedDoc = null;
          this.attachedDocName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      let effDate = item.effDate
      let a_effDate = effDate.split("/")
      effDate = a_effDate[2] + "-" + a_effDate[1] + "-" + a_effDate[0]
      this.editDoc.name = item.name;
      this.editDoc.effDate = effDate;
      this.editDoc.content = item.content;
      this.editDoc.expireIn = item.expireIn;
      this.editDoc.attachedDocLink = item.attachedDocLink;
      this.editDoc.attachedDocName = item.attachedDocName;
      this.editDoc.id = item._id;
      this.editDoc.attachedDoc = null;
      this.showModal1();
    },

    async onSubmit() {

      let formData = new FormData();
      formData.append("name", this.editDoc.name);
      formData.append("effDate", this.editDoc.effDate);
      formData.append("content", this.editDoc.content);
      formData.append("expireIn", this.editDoc.expireIn);
      formData.append("documentFile1", this.editDoc.attachedDoc);
      formData.append("attachedDocLink", this.editDoc.attachedDocLink);
      formData.append("attachedDocName", this.editDoc.attachedDocName);
      try {
        const result = await instance.put(
          `/api/edit-document/${this.editDoc.id}`,
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
          // location.reload()
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
            `/api/delete-document/${item._id}`
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
        const queryParams = { id: this.id }
        const result = await instance.get('/api/export-excel-documents', { params: queryParams })
        const excelFilePath = result.data.path
        console.log(excelFilePath, "excelFilePath getExcelFile()")
        location.href = excelFilePath
      } catch (error) {
        console.log(error, "/api/export-excel-trans-programs catch block error")
      }
    },
  },
};
</script>

<style scoped></style>
