<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý môn học</h2>
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
                  Thêm môn học
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
                    <h5 class="modal-title">Thêm môn học</h5>
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
                        <label class="form-label">Giảng viên</label>
                        <input
                          type="text"
                          v-model="lecturer"
                          class="form-control"
                          placeholder="Nhập giảng viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trợ giảng</label>
                        <input
                          type="text"
                          v-model="teachingAssistant"
                          class="form-control"
                          placeholder="Nhập trợ giảng"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian thực hiện</label>
                        <input
                          type="text"
                          v-model="executionTime"
                          class="form-control"
                          placeholder="Nhập thời gian thực hiện"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Năm học</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập phân loại/học phần"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số tín chỉ</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="creditsCount"
                          placeholder="Nhập số tín chỉ giảng dạy"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số lượng học viên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="studentsCount"
                          placeholder="Nhập số lượng học viên"
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
                  url="/api/get-all-subjects"
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
                                <label class="form-label">Tên môn học</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.name"
                                  placeholder="Nhập tên văn bản liên kết đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Giảng viên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.lecturer"
                                  placeholder="Nhập giảng viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Trợ giảng</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.teachingAssistant"
                                  placeholder="Nhập trợ giảng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian thực hiện</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.executionTime"
                                  placeholder="Nhập thời gian thực hiện"
                                />
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
                                  v-model="editSubject.year"
                                  placeholder="Nhập phân loại/học phần"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số tín chỉ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.creditsCount"
                                  placeholder="Nhập số tín chỉ giảng dạy"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số lượng học viên</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editSubject.studentsCount"
                                  placeholder="Nhập số lượng học viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ghi chú</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editSubject.note"
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
        "year",
        "lecturer",
        "teachingAssistant",
        "executionTime",
        "creditsCount",
        "studentsCount",
        "note",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          name: "Họ tên người thực hiện",
          year: "Phân loại/học phần",
          lecturer: "Số điện thoại",
          creditsCount: "Đơn vị thực hiện",
          teachingAssistant: "Chức vụ",
          executionTime: "Thời gian thực hiện",
          studentsCount: "Trường đào tạo",
          note: "Ghi chú",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      name: "",
      lecturer: "",
      teachingAssistant: "",
      executionTime: "",
      year: "",
      creditsCount: "",
      studentsCount: "",
      note: "",

      displayModal: false,
      displayModalOne: false,

      editSubject: {
        id: "",
        name: "",
        lecturer: "",
        teachingAssistant: "",
        executionTime: "",
        year: "",
        creditsCount: "",
        studentsCount: "",
        note: "",
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
        lecturer: this.lecturer,
        teachingAssistant: this.teachingAssistant,
        executionTime: this.executionTime,
        year: this.year,
        creditsCount: this.creditsCount,
        studentsCount: this.studentsCount,
        note: this.note,
      };

      try {
        const result = await instance.post("/api/create-subject", data);

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
          this.name = "";
          this.lecturer = "";
          this.teachingAssistant = "";
          this.executionTime = "";
          this.year = "";
          this.creditsCount = "";
          this.studentsCount = "";
          this.note = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editSubject.name = item.name;
      this.editSubject.lecturer = item.lecturer;
      this.editSubject.teachingAssistant = item.teachingAssistant;
      this.editSubject.executionTime = item.executionTime;
      this.editSubject.year = item.year;
      this.editSubject.creditsCount = item.creditsCount;
      this.editSubject.studentsCount = item.studentsCount;
      this.editSubject.note = item.note;
      this.editSubject.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        name: this.editSubject.name,
        lecturer: this.editSubject.lecturer,
        teachingAssistant: this.editSubject.teachingAssistant,
        executionTime: this.editSubject.executionTime,
        year: this.editSubject.year,
        creditsCount: this.editSubject.creditsCount,
        studentsCount: this.editSubject.studentsCount,
        note: this.editSubject.note,
      };
      try {
        const result = await instance.put(
          `/api/edit-subject/${this.editSubject.id}`,
          data
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
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa văn bản này?")) {
          const result = await instance.delete(`/api/delete-subject/${item._id}`);
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