<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí TT chương trình liên kết</h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  class="btn btn-primary d-none d-sm-inline-block"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-report"
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
                  Thêm chương trình
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
              class="modal modal-blur fade"
              id="modal-report"
              tabindex="-1"
              style="display: none"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Thêm chương trình</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="mb-3">
                      <label class="form-label">Tên</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="name"
                        placeholder="Nhập tên chương trình"
                      />
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Ngôn ngữ</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="language"
                          placeholder="Nhập ngôn ngữ"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tên văn bằng</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="degreeName"
                          placeholder="Nhập tên văn bằng"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên thương hiệu</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="degreeType"
                          placeholder="Nhập tên thương hiệu"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nơi cấp</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="issuedBy"
                          placeholder="Nhập nơi cấp"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a
                      href="#"
                      class="btn btn-link link-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </a>
                    <a
                      @click="submitForm()"
                      class="btn btn-primary ms-auto"
                      data-bs-dismiss="modal"
                    >
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
                  url="/api/get-all-trans-programs"
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
                      class="modal modal-blur fade"
                      id="modal-report-one"
                      tabindex="-1"
                      style="display: none"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-xl" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Chỉnh sửa chương trình</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <div class="mb-3">
                              <label class="form-label">Tên</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="editProgram.name"
                                placeholder="Nhập tên chương trình"
                              />
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Ngôn ngữ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editProgram.language"
                                  placeholder="Nhập ngôn ngữ"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Tên văn bằng</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editProgram.degreeName"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tên thương hiệu</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editProgram.degreeType"
                                  placeholder="Nhập tên thương hiệu"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Nơi cấp</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editProgram.issuedBy"
                                  placeholder="Nhập nơi cấp"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <a
                              href="#"
                              class="btn btn-link link-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </a>
                            <a
                              @click="onSubmit()"
                              class="btn btn-primary ms-auto"
                              data-bs-dismiss="modal"
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
// const idArr = JSON.parse(localStorage.getItem("idArr"))
// let id = null
// if (idArr === null) {
//   id = 0
// } else {
//   id = idArr[1]
// }


export default {
  name: "ProgramManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: ["stt", "name", "language", "degreeType", "degreeName", "issuedBy", "tool"],
      options: {
        params: {
          id: this.$route.params.id
        },
        headings: {
          name: "Tên chương trình",
          year: "Năm",
          degreeType: "Tên thương hiệu",
          degreeName: "Tên văn bằng",
          issuedBy: "Cấp bởi",
          tool: "Thao tác"
        },
      },
      id: this.$route.params.id,
      name: "",
      language: "",
      degreeName: "",
      degreeType: "",
      issuedBy: "",

      editProgram: {
        id: "",
        name: "",
        language: "",
        degreeName: "",
        degreeType: "",
        issuedBy: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
    async submitForm() {
      const data = {
        programId: this.id,
        name: this.name,
        language: this.language,
        degreeName: this.degreeName,
        degreeType: this.degreeType,
        issuedBy: this.issuedBy

      };

      try {
        const result = await axios.post("/api/create-trans-program", data);

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
          location.reload();
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editProgram.name = item.name;
      this.editProgram.language = item.language;
      this.editProgram.degreeName = item.degreeName;
      this.editProgram.degreeType = item.degreeType;
      this.editProgram.issuedBy = item.issuedBy;
      this.editProgram.id = item._id;

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        name: this.editProgram.name,
        language: this.editProgram.language,
        degreeName: this.editProgram.degreeName,
        degreeType: this.editProgram.degreeType,
        issuedBy: this.editProgram.issuedBy
      };
      try {
        const result = await axios.put(
          `/api/edit-trans-program/${this.editProgram.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Chương trình đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa chương trình này?")) {
          const result = await axios.delete(`/api/delete-trans-program/${item._id}`);
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
