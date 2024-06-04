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
                        <label class="form-label"
                          >Khung chương trình theo đề án</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập khung chương trình"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Năm học/học kỳ</label>
                        <input
                          type="text"
                          v-model="year"
                          class="form-control"
                          placeholder="Nhập năm học/học kỳ"
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
                        <label class="form-label"
                          >Giảng dạy theo giáo trình của bên nào</label
                        >
                        <select
                          v-model="subjectType"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn giáo trình
                          </option>
                          <option value="NEU">NEU</option>
                          <option value="Đối tác">Đối tác</option>
                        </select>
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
                            <h5 class="modal-title">Chỉnh sửa khung chương trình</h5>
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
                                  >Khung chương trình theo đề án</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.name"
                                  placeholder="Nhập khung chương trình"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Năm học/học kỳ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.year"
                                  placeholder="Nhập năm học/học kỳ"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Địa điểm đào tạo</label
                                >
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
                                <label class="form-label"
                                  >Giảng dạy theo giáo trình của bên nào</label
                                >
                                <select
                                  v-model="editCurriculum.subjectType"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn giáo trình
                                  </option>
                                  <option value="NEU">NEU</option>
                                  <option value="Đối tác">Đối tác</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số tín chỉ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editCurriculum.creditsCount"
                                  placeholder="Nhập số tín chỉ"
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
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "CurriculumManagePage",

  data() {
    return {
      columns: [
        "stt",
        "name",
        "subjectType",
        "year",
        "location",
        "creditsCount",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          name: "Khung chương trình theo đề án",
          subjectType: "Giáo trình",
          year: "Năm học/học kỳ",
          creditsCount: "Số tín chỉ",
          location: "Địa điểm đào tạo",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      name: "",
      year: "",
      location: "",
      subjectType: "",
      creditsCount: "",

      displayModal: false,
      displayModalOne: false,

      editCurriculum: {
        id: "",
        name: "",
        year: "",
        location: "",
        subjectType: "",
        creditsCount: "",
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
    async submitForm() {
      const data = {
        programId: this.id,
        name: this.name,
        year: this.year,
        location: this.location,
        subjectType: this.subjectType,
        creditsCount: this.creditsCount,
      };

      try {
        const result = await instance.post("/api/create-curriculum", data);

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
      this.editCurriculum.id = item._id;
      this.showModal1();
    },

    async onSubmit() {

      try {
        const data = {
          name: this.editCurriculum.name,
          year: this.editCurriculum.year,
          location: this.editCurriculum.location,
          subjectType: this.editCurriculum.subjectType,
          creditsCount: this.editCurriculum.creditsCount,
        };
        const result = await instance.put(
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
          const result = await instance.delete(
            `/api/delete-curriculum/${item._id}`
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
        const result = await instance.get('/api/export-excel-curriculums', { params: queryParams })
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
