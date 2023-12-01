<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí khung chương trình đào tạo</h2>
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
                  Thêm khung chương trình
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
                    <h5 class="modal-title">Thêm khung chương trình</h5>
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
                        <label class="form-label">Năm học/học kì</label>
                        <input
                          type="text"
                          v-model="year"
                          class="form-control"
                          placeholder="Nhập năm học/học kì"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Địa điểm đào tạo</label>
                        <input
                          type="text"
                          v-model="location"
                          class="form-control"
                          placeholder="Nhập địa điểm đào tạo"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Phân loại/Học phần</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="subjectType"
                          placeholder="Nhập phân loại/học phần"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số tín chỉ</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="creditsCount"
                          placeholder="Nhập số tín chỉ"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trường đào tạo</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="trainingUni"
                          placeholder="Nhập trường đào tạo"
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
                  url="/api/get-all-curriculums"
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
                        class="btn btn-dark w-50 px-1"
                      >
                        Xoá
                      </a>
                    </span>
                    <a
                      href="#"
                      class="btn btn-danger w-50 d-sm-inline-block px-1"
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
                                  >Tên môn học</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.name"
                                  placeholder="Nhập tên văn bản liên kết đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Năm học/học kì</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.year"
                                  placeholder="Nhập năm học/học kì"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Địa điểm đào tạo</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.location"
                                  placeholder="Nhập địa điểm đào tạo"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Phân loại/học phần</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.subjectType"
                                  placeholder="Nhập phân loại/học phần"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số tín chỉ</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.creditsCount"
                                  placeholder="Nhập số tín chỉ"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tên trường đào tạo</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.trainingUni"
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
        "name",
        "subjectType",
        "year",
        "location",
        "creditsCount",
        "trainingUni",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          name: "Họ tên người thực hiện",
          subjectType: "Phân loại/học phần",
          year: "Số điện thoại",
          creditsCount: "Đơn vị thực hiện",
          location: "Chức vụ",
          trainingUni: "Trường đào tạo",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      name: "",
      year: "",
      location: "",
      subjectType: "",
      creditsCount: "",
      trainingUni: "",

      displayModal: false,
      displayModalOne: false,

      editCurriculum: {
        id: "",
        name: "",
        year: "",
        location: "",
        subjectType: "",
        creditsCount: "",
        trainingUni: "",

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
        name: this.name,
        year: this.year,
        location: this.location,
        subjectType: this.subjectType,
        creditsCount: this.creditsCount,
        trainingUni: this.trainingUni,
      };

      try {
        const result = await axios.post("/api/create-curriculum", data);

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
          this.year = "";
          this.location = "";
          this.subjectType = "";
          this.creditsCount = "";
          this.trainingUni = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editCurriculum.name = item.name;
      this.editCurriculum.year = item.year;
      this.editCurriculum.location = item.location;
      this.editCurriculum.subjectType = item.subjectType;
      this.editCurriculum.creditsCount = item.creditsCount;
      this.editCurriculum.trainingUni = item.trainingUni;
      this.editCurriculum.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        name: this.editCurriculum.name,
        year: this.editCurriculum.year,
        location: this.editCurriculum.location,
        subjectType: this.editCurriculum.subjectType,
        creditsCount: this.editCurriculum.creditsCount,
        trainingUni: this.editCurriculum.trainingUni,
      };
      try {
        const result = await axios.put(
          `/api/edit-curriculum/${this.editCurriculum.id}`,
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
          const result = await axios.delete(`/api/delete-curriculum/${item._id}`);
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
