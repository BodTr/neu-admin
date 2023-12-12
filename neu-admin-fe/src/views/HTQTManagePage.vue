<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí các dự án HTQT</h2>
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
                        <label class="form-label">Thời gian kí kết</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="signingTime"
                          placeholder="Nhập thời gian kí kết"
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
                  url="/api/get-all-htqts"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedDoc="item">
                    <div class="btn-list">
                      <a
                        :href="item.row.attachedDocLink"
                        class="btn btn-success d-none d-sm-inline-block"
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
                        Xem văn bản
                      </a>
                      <a href="#" class="btn btn-primary d-sm-none btn-icon">
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
                    </div>
                  </template>
                  <template v-slot:tool="item">
                    <span class="d-sm-inline">
                      <a
                        href="#"
                        @click="remove(item.row)"
                        class="btn btn-danger w-50 px-1"
                      >
                        Xoá
                      </a>
                    </span>
                    <a
                      href="#"
                      class="btn btn-info w-50 d-sm-inline-block px-1"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-report-one"
                      @click="onEdit(item.row)"
                    >
                      Sửa
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
                                <label class="form-label"
                                  >Nội dung dự án</label
                                >
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
                                  >Thời gian kí kết</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editHTQT.signingTime"
                                  placeholder="Nhập thời gian kí kết"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số lượng học viên</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editHTQT.expireTime"
                                  placeholder="Nhập số lượng học viên"
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
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </v-server-table>
                {{ id }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
        params: {
          id: this.$route.params.id,
        },
        headings: {
          nation: "Quốc gia",
          partnerUni: "Trường đối tác",
          funding: "Nguồn kinh phí",
          signingTime: "Thời gian kí kết",
          planDetail: "Nội dung dự án",
          attachedDoc: "Văn bản đính kèm",
          expireTime: "Thời gian hết hạn",
          note: "Ghi chú",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
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

      displayModal: false,
      displayModalOne: false,

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
    async submitForm() {
      let formData = new FormData();
      formData.append("nation", this.nation);
      formData.append("funding", this.funding);
      formData.append("planDetail", this.planDetail);
      formData.append("partnerUni", this.partnerUni);
      formData.append("signingTime", this.signingTime);
      formData.append("expireTime", this.expireTime);
      formData.append("note", this.note);
      formData.append("programId", this.id);
      formData.append("attachedHTQTDoc", this.attachedDoc);

      try {
        const result = await axios.post("/api/create-htqt", formData, {
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
      this.editHTQT.nation = item.nation;
      this.editHTQT.funding = item.funding;
      this.editHTQT.planDetail = item.planDetail;
      this.editHTQT.attachedDocLink = item.attachedDocLink;
      this.editHTQT.attachedDocName = item.attachedDocName;
      this.editHTQT.partnerUni = item.partnerUni;
      this.editHTQT.signingTime = item.signingTime;
      this.editHTQT.expireTime = item.expireTime;
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
      formData.append("programId", this.id);
      formData.append("attachedDocName", this.editHTQT.attachedDocName);
      formData.append("attachedDocLink", this.editHTQT.attachedDocLink);
      formData.append("attachedHTQTDoc1", this.editHTQT.attachedDoc);

      try {
        const result = await axios.put(
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
          const result = await axios.delete(`/api/delete-htqt/${item._id}`);
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
