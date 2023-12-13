<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí nội dung đề án</h2>
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
                        <label class="form-label">Tên văn bằng</label>
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="certName"
                          placeholder="Nhập tên văn bằng chứng chỉ"
                        ></textarea>
                      </div>
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
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Hình thức giảng dạy</label>
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="planStructure"
                          placeholder="Nhập hình thức đào tạo"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Kinh phí đào tạo</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="tuition"
                        />
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
                        <label class="form-label">Quản lí tài chính</label>
                        <textarea
                          v-model="ecoManage"
                          row="1"
                          class="form-control"
                          placeholder="Quản lí tài chính"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thực hiện báo cáo</label>
                        <textarea
                          v-model="report"
                          row="1"
                          class="form-control"
                          placeholder="Thực hiện báo cáo"
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
                                <label class="form-label">Tên văn bằng</label>
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editPlan.certName"
                                  placeholder="Nhập tên văn bằng chứng chỉ"
                                ></textarea>
                              </div>
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
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Hình thức giảng dạy</label
                                >
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editPlan.planStructure"
                                  placeholder="Nhập hình thức đào tạo"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Kinh phí đào tạo</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editPlan.tuition"
                                />
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
                                <label class="form-label"
                                  >Quản lí tài chính</label
                                >
                                <textarea
                                  v-model="editPlan.ecoManage"
                                  row="1"
                                  class="form-control"
                                  placeholder="Quản lí tài chính"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thực hiện báo cáo</label
                                >
                                <textarea
                                  v-model="editPlan.report"
                                  row="1"
                                  class="form-control"
                                  placeholder="Thực hiện báo cáo"
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
  certName: "ProgramManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "certName",
        "planStructure",
        "language",
        "qualifiedLecturer",
        "qualifiedStudent",
        "tuition",
        "ecoManage",
        "infraCondition",
        "report",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          certName: "Tên văn bằng và chứng chỉ",
          planStructure: "Hình thức đào tạo",
          language: "Ngôn ngữ giảng dạy",
          qualifiedLecturer: "Điều kiện về giảng viên",
          qualifiedStudent: "Điều kiện tuyển sinh",
          tuition: "Kinh phí đào tạo",
          ecoManage: "Quản lí tài chính",
          infraCondition: "Điều kiện cơ sở vật chất",
          report: "Thực hiện báo cáo",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      certName: "",
      qualifiedLecturer: "",
      qualifiedStudent: "",
      planStructure: "",
      tuition: "",
      infraCondition: "",
      language: "",
      ecoManage: "",
      report: "",
      displayModal: false,
      displayModalOne: false,

      editPlan: {
        id: "",
        certName: "",
        qualifiedLecturer: "",
        qualifiedStudent: "",
        planStructure: "",
        tuition: "",
        infraCondition: "",
        language: "",
        ecoManage: "",
        report: "",
      },
    };
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
    async submitForm() {
      const data = {
        programId: this.id,
        certName: this.certName,
        qualifiedLecturer: this.qualifiedLecturer,
        qualifiedStudent: this.qualifiedStudent,
        planStructure: this.planStructure,
        tuition: this.tuition,
        infraCondition: this.infraCondition,
        language: this.language,
        ecoManage: this.ecoManage,
        report: this.report
      };

      try {
        const result = await axios.post("/api/create-plan", data);

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
          this.certName = "";
          this.qualifiedLecturer = "";
          this.qualifiedStudent = "";
          this.planStructure = "";
          this.tuition = "";
          this.infraCondition = "";
          this.language = "";
          this.ecoManage = "";
          this.report = "";

        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editPlan.certName = item.certName;
      this.editPlan.qualifiedLecturer = item.qualifiedLecturer;
      this.editPlan.qualifiedStudent = item.qualifiedStudent;
      this.editPlan.planStructure = item.planStructure;
      this.editPlan.tuition = item.tuition;
      this.editPlan.infraCondition = item.infraCondition;
      this.editPlan.language = item.language;
      this.editPlan.ecoManage = item.ecoManage;
      this.editPlan.report = item.report
      this.editPlan.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        certName: this.editPlan.certName,
        qualifiedLecturer: this.editPlan.qualifiedLecturer,
        qualifiedStudent: this.editPlan.qualifiedStudent,
        planStructure: this.editPlan.planStructure,
        tuition: this.editPlan.tuition,
        infraCondition: this.editPlan.infraCondition,
        language: this.editPlan.language,
        ecoManage: this.editPlan.ecoManage,
        report: this.editPlan.report
      };
      try {
        const result = await axios.put(
          `/api/edit-plan/${this.editPlan.id}`,
          data
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
          const result = await axios.delete(`/api/delete-plan/${item._id}`);
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
