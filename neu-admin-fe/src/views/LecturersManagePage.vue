<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý giảng viên</h2>
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
                  Thêm giảng viên
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
                    <h5 class="modal-title">Thêm giảng viên</h5>
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
                        <label class="form-label">Họ tên giảng viên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập họ tên giảng viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Quốc tịch</label>
                        <input
                          type="text"
                          v-model="nationality"
                          class="form-control"
                          placeholder="Nhập quốc tịch"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị công tác</label>
                        <input
                          type="text"
                          v-model="unit"
                          class="form-control"
                          placeholder="Nhập chức vụ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Năm sinh</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="birthyear"
                          placeholder="Nhập năm sinh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trình độ</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="level"
                          placeholder="Nhập trình độ"
                        />
                      </div>
                      <div class="mb-3">
                        <div style="margin-top: 3rem; margin-left: 3rem">
                          <label class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              value="Mới"
                              v-model="experience"
                            />
                            <span class="form-check-label">Mới</span>
                          </label>
                          <label
                            class="form-check form-check-inline"
                            style="margin-left: 3rem"
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              value="Thâm niên"
                              v-model="experience"
                            />
                            <span class="form-check-label">Thâm niên</span>
                          </label>
                        </div>
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
                  url="/api/get-all-lecturers"
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
                                <label class="form-label"
                                  >Họ tên giảng viên</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editLecturer.name"
                                  placeholder="Nhập họ tên giảng viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Quốc tịch</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editLecturer.nationality"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editLecturer.unit"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Năm sinh</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editLecturer.birthyear"
                                  placeholder="Nhập năm sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Trình độ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editLecturer.level"
                                  placeholder="Nhập trình độ"
                                />
                              </div>
                              <div class="mb-3">
                                <div
                                  style="margin-top: 3rem; margin-left: 3rem"
                                >
                                  <label class="form-check form-check-inline">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      value="Mới"
                                      v-model="editLecturer.experience"
                                    />
                                    <span class="form-check-label">Mới</span>
                                  </label>
                                  <label
                                    class="form-check form-check-inline"
                                    style="margin-left: 3rem"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      value="Thâm niên"
                                      v-model="editLecturer.experience"
                                    />
                                    <span class="form-check-label"
                                      >Thâm niên</span
                                    >
                                  </label>
                                </div>
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
        "name",
        "birthyear",
        "nationality",
        "unit",
        "level",
        "experience",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },

        headings: {
          name: "Họ tên người thực hiện",
          birthyear: "Năm sinh",
          nationality: "Quốc tịch",
          unit: "Đơn vị công tác",
          experience: "Kinh nghiệm",
          level: "Chức vụ",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      name: "",
      nationality: "",
      unit: "",
      birthyear: "",
      level: "",
      experience: "",
      displayModal: false,
      displayModalOne: false,

      editLecturer: {
        id: "",
        name: "",
        nationality: "",
        unit: "",
        birthyear: "",
        level: "",
        experience: "",
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
        nationality: this.nationality,
        unit: this.unit,
        birthyear: this.birthyear,
        level: this.level,
        experience: this.experience,
      };

      try {
        const result = await instance.post("/api/create-lecturer", data);

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
          this.nationality = "";
          this.unit = "";
          this.birthyear = "";
          this.level = "";
          this.experience = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editLecturer.name = item.name;
      this.editLecturer.nationality = item.nationality;
      this.editLecturer.unit = item.unit;
      this.editLecturer.birthyear = item.birthyear;
      this.editLecturer.level = item.level;
      this.editLecturer.experience = item.experience;
      this.editLecturer.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        name: this.editLecturer.name,
        nationality: this.editLecturer.nationality,
        unit: this.editLecturer.unit,
        birthyear: this.editLecturer.birthyear,
        level: this.editLecturer.level,
        experience: this.editLecturer.experience,
      };
      try {
        const result = await instance.put(
          `/api/edit-lecturer/${this.editLecturer.id}`,
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
        if (confirm("Xóa văn bản này?")) {
          const result = await instance.delete(`/api/delete-lecturer/${item._id}`);
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