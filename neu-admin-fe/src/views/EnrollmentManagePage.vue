<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí tuyển sinh</h2>
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
                        <label class="form-label">Năm học</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập năm học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số học viên nhập học</label>
                        <input
                          type="number"
                          v-model="admissionCount"
                          class="form-control"
                          placeholder="Nhập số học viên nhập học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số học viên tốt nghiệp</label>
                        <input
                          type="number"
                          v-model="graduatedCount"
                          class="form-control"
                          placeholder="Nhập số học viên tốt nghiệp"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tổng thu học phí</label>
                        <input
                          type="number"
                          v-model="tuitionSum"
                          class="form-control"
                          placeholder="Nhập tổng thu học phí(triệu đồng)"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Số học viên dự thi/tham gia xét tuyển</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="applicantsCount"
                          placeholder="Nhập số học viên dự thi/tham gia xét tuyển"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số học viên thôi học</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="dropoutCount"
                          placeholder="Nhập số học viên thôi học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tỉ lệ tốt nghiệp</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="graduatedPercentage"
                          placeholder="Nhập tỉ lệ tốt nghiệp"
                        />
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
                  url="/api/get-all-enrollments"
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
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Năm học</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.year"
                                  placeholder="Nhập năm học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số học viên nhập học</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.admissionCount"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số học viên tốt nghiệp</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.graduatedCount"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tổng thu học phí</label
                                >
                                <input
                                  type="number"
                                  v-model="editEnroll.tuitionSum"
                                  class="form-control"
                                  placeholder="Nhập tổng thu học phí(triệu đồng)"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số học viên dự thi/tham gia xét tuyển</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.applicantsCount"
                                  placeholder="Nhập số học viên dự thi/tham gia xét tuyển"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số học viên thôi học</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.dropoutCount"
                                  placeholder="Nhập số học viên thôi học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tỉ lệ tốt nghiệp</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editEnroll.graduatedPercentage"
                                  placeholder="Nhập nội dung phụ trách"
                                />
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
        "year",
        "applicantsCount",
        "admissionCount",
        "dropoutCount",
        "tuitionSum",
        "graduatedPercentage",
        "graduatedCount",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          year: "Năm học",
          applicantsCount: "Số học viên dự thi/tham gia xét tuyển",
          admissionCount: "Số học viên nhập học",
          dropoutCount: "Số học viên thôi học",
          graduatedPercentage: "Tỉ lệ tốt nghiệp",
          graduatedCount: "Số học viên tốt nghiệp",
          tuitionSum: "Tổng thu học phí(tr.Đồng)",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      year: "",
      admissionCount: "",
      graduatedCount: "",
      tuitionSum: "",
      applicantsCount: "",
      dropoutCount: "",
      graduatedPercentage: "",
      displayModal: false,
      displayModalOne: false,

      editEnroll: {
        id: "",
        year: "",
        admissionCount: "",
        graduatedCount: "",
        tuitionSum: "",
        applicantsCount: "",
        dropoutCount: "",
        graduatedPercentage: "",
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
        year: this.year,
        admissionCount: this.admissionCount,
        graduatedCount: this.graduatedCount,
        tuitionSum: this.tuitionSum,
        applicantsCount: this.applicantsCount,
        dropoutCount: this.dropoutCount,
        graduatedPercentage: this.graduatedPercentage,
      };

      try {
        const result = await axios.post("/api/create-enrollment", data);

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
          this.year = "";
          this.admissionCount = "";
          this.graduatedCount = "";
          this.tuitionSum = "";
          this.applicantsCount = "";
          this.dropoutCount = "";
          this.graduatedPercentage = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editEnroll.year = item.year;
      this.editEnroll.admissionCount = item.admissionCount;
      this.editEnroll.graduatedCount = item.graduatedCount;
      this.editEnroll.tuitionSum = item.tuitionSum
      this.editEnroll.applicantsCount = item.applicantsCount;
      this.editEnroll.dropoutCount = item.dropoutCount;
      this.editEnroll.graduatedPercentage = item.graduatedPercentage;
      this.editEnroll.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        year: this.editEnroll.year,
        admissionCount: this.editEnroll.admissionCount,
        graduatedCount: this.editEnroll.graduatedCount,
        tuitionSum: this.editEnroll.tuitionSum,
        applicantsCount: this.editEnroll.applicantsCount,
        dropoutCount: this.editEnroll.dropoutCount,
        graduatedPercentage: this.editEnroll.graduatedPercentage,
      };
      try {
        const result = await axios.put(
          `/api/edit-enrollment/${this.editEnroll.id}`,
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
          const result = await axios.delete(`/api/delete-enrollment/${item._id}`);
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
