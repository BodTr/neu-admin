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
                  Thêm đề án
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
                    <h5 class="modal-title">Thêm đề án</h5>
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
                        <label class="form-label">Điều kiện giảng viên</label>
                        <textarea
                          v-model="qualifiedLecturer"
                          row="1"
                          class="form-control"
                          placeholder="Nhập điều kiện giảng viên"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Điều kiện tuyển sinh</label>
                        <textarea
                          v-model="qualifiedStudent"
                          row="1"
                          class="form-control"
                          placeholder="Nhập điều kiện tuyển sinh"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Quy mô và địa điểm đào tạo</label
                        >
                        <textarea
                          v-model="ecoManage"
                          row="1"
                          class="form-control"
                          placeholder="Quy mô và địa điểm đào tạo"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label"
                          >Hình thức liên kết đào tạo</label
                        >
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="planStructure"
                          placeholder="Nhập hình thức liên kết đào tạo"
                        ></textarea>
                      </div>

                      <div class="mb-3">
                        <label class="form-label"
                          >Điều kiện cơ sở vật chất, thiết bị</label
                        >
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="infraCondition"
                          placeholder="Nhập nội dung phụ trách"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Ngôn ngữ giảng dạy</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="language"
                          placeholder="Nhập ngôn ngữ giảng dạy"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Học phí</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nhập học phí"
                          v-model="tuition"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Văn bằng chứng chỉ</label>
                        <input
                          type="file"
                          ref="planDoc"
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
                  url="/api/get-all-plans"
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
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Điều kiện giảng viên</label
                                >
                                <textarea
                                  v-model="editPlan.qualifiedLecturer"
                                  row="1"
                                  class="form-control"
                                  placeholder="Nhập điều kiện giảng viên"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Điều kiện tuyển sinh</label
                                >
                                <textarea
                                  v-model="editPlan.qualifiedStudent"
                                  row="1"
                                  class="form-control"
                                  placeholder="Nhập điều kiện tuyển sinh"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quy mô và địa điểm đào tạo</label
                                >
                                <textarea
                                  v-model="editPlan.ecoManage"
                                  row="1"
                                  class="form-control"
                                  placeholder="Quy mô và địa điểm đào tạo"
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Hình thức liên kết đào tạo</label
                                >
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editPlan.planStructure"
                                  placeholder="Nhập hình thức liên kết đào tạo"
                                ></textarea>
                              </div>

                              <div class="mb-3">
                                <label class="form-label"
                                  >Điều kiện cơ sở vật chất, thiết bị</label
                                >
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editPlan.infraCondition"
                                  placeholder="Nhập nội dung phụ trách"
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Ngôn ngữ giảng dạy</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editPlan.language"
                                  placeholder="Nhập ngôn ngữ giảng dạy"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Học phí</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Nhập học phí"
                                  v-model="editPlan.tuition"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Văn bằng chứng chỉ</label
                                >
                                <input
                                  type="file"
                                  ref="planDoc1"
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
                                    v-model="editPlan.attachedDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editPlan.message != ''">
                                  {{ editPlan.message }}
                                </div>
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
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "PlanManagePage",

  data() {
    return {
      columns: [
        "stt",
        "planStructure",
        "language",
        "qualifiedLecturer",
        "qualifiedStudent",
        "tuition",
        "ecoManage",
        "infraCondition",
        "attachedDocName",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          planStructure: "Hình thức liên kết đào tạo",
          language: "Ngôn ngữ giảng dạy",
          qualifiedLecturer: "Điều kiện về giảng viên",
          qualifiedStudent: "Điều kiện tuyển sinh",
          tuition: "Học phí",
          ecoManage: "Quy mô và địa điểm đào tạo",
          infraCondition: "Điều kiện cơ sở vật chất",
          attachedDocName: "Văn bằng chứng chỉ",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      qualifiedLecturer: "",
      qualifiedStudent: "",
      planStructure: "",
      tuition: "",
      infraCondition: "",
      language: "",
      ecoManage: "",
      planDoc: null,
      message: "",
      attachedDocName: "",
      displayModal: false,
      displayModalOne: false,

      editPlan: {
        id: "",
        qualifiedLecturer: "",
        qualifiedStudent: "",
        planStructure: "",
        tuition: "",
        infraCondition: "",
        language: "",
        ecoManage: "",
        planDoc: null,
        message: "",
        attachedDocName: "",
        attachedDocLink: "",
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
    handlePdfUpload() {
      this.$refs.planDoc.click();
    },
    handlePdfUpload1() {
      this.$refs.planDoc1.click();
    },
    handlePdfChange() {
      const file = this.$refs.planDoc.files[0];
      console.log(file, "handlePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.planDoc = file;
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
      const file = this.$refs.planDoc1.files[0];
      console.log(file, "handlePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editPlan.planDoc = file;
      this.editPlan.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editPlan.message = "";
      } else {
        this.editPlan.message =
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
      formData.append("qualifiedLecturer", this.qualifiedLecturer);
      formData.append("qualifiedStudent", this.qualifiedStudent);
      formData.append("planStructure", this.planStructure);
      formData.append("tuition", this.tuition);
      formData.append("infraCondition", this.infraCondition);
      formData.append("language", this.language);
      formData.append("ecoManage", this.ecoManage);
      formData.append("planDoc", this.planDoc);
      try {
        const result = await instance.post("/api/create-plan", formData, {
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
          this.qualifiedLecturer = "";
          this.qualifiedStudent = "";
          this.planStructure = "";
          this.tuition = "";
          this.infraCondition = "";
          this.language = "";
          this.ecoManage = "";
          this.planDoc = null;
          this.attachedDocName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editPlan.qualifiedLecturer = item.qualifiedLecturer;
      this.editPlan.qualifiedStudent = item.qualifiedStudent;
      this.editPlan.planStructure = item.planStructure;
      this.editPlan.tuition = item.tuition;
      this.editPlan.infraCondition = item.infraCondition;
      this.editPlan.language = item.language;
      this.editPlan.ecoManage = item.ecoManage;
      this.editPlan.planDoc = null;
      this.editPlan.attachedDocName = item.attachedDocName;
      this.editPlan.attachedDocLink = item.attachedDocLink;
      this.editPlan.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("qualifiedLecturer", this.editPlan.qualifiedLecturer);
      formData.append("qualifiedStudent", this.editPlan.qualifiedStudent);
      formData.append("planStructure", this.editPlan.planStructure);
      formData.append("tuition", this.editPlan.tuition);
      formData.append("infraCondition", this.editPlan.infraCondition);
      formData.append("language", this.editPlan.language);
      formData.append("ecoManage", this.editPlan.ecoManage);
      formData.append("planDoc1", this.editPlan.planDoc);
      formData.append("attachedDocName", this.editPlan.attachedDocName);
      formData.append("attachedDocLink", this.editPlan.attachedDocLink);

      try {
        const result = await instance.put(
          `/api/edit-plan/${this.editPlan.id}`,
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
          const result = await instance.delete(`/api/delete-plan/${item._id}`);
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
