<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý TT chương trình liên kết</h2>
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
                    <h5 class="modal-title">Thêm chương trình</h5>
                    <button
                      @click="hideModal()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="mb-3">
                      <label class="form-label">Tên tiếng việt</label>
                      <textarea
                        class="form-control"
                        row="1"
                        v-model="name"
                        placeholder="Nhập tên chương trình"
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Tên tiếng anh</label>
                      <textarea
                        class="form-control"
                        row="1"
                        v-model="name_en"
                        placeholder="Nhập tên chương trình"
                      ></textarea>
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
                      
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên văn bằng</label>
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="degreeName"
                          placeholder="Nhập tên văn bằng"
                        ></textarea>
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
                            <h5 class="modal-title">Chỉnh sửa chương trình</h5>
                            <button
                              @click="hideModal1()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <div class="mb-3">
                              <label class="form-label">Tên tiếng việt</label>
                              <textarea
                                class="form-control"
                                row="1"
                                v-model="editProgram.name"
                                placeholder="Nhập tên chương trình"
                              ></textarea>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Tên tiếng anh</label>
                              <textarea
                                class="form-control"
                                row="1"
                                v-model="editProgram.name_en"
                                placeholder="Nhập tên chương trình"
                              ></textarea>
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
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Tên văn bằng</label>
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editProgram.degreeName"
                                  placeholder="Nhập tên văn bằng"
                                ></textarea>
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
      columns: [
        "stt",
        "name",
        "name_en",
        "degreeType",
        "degreeName",
        "issuedBy",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          name: "Tên chương trình tiếng việt",
          name_en: "Tên chương trình tiếng anh",
          year: "Năm",
          degreeType: "Tên thương hiệu",
          degreeName: "Tên văn bằng",
          issuedBy: "Cấp bởi",
          tool: "Thao tác",
        },
      },
      id: "",
      name: "",
      degreeName: "",
      degreeType: "",
      issuedBy: "",
      displayModal: false,
      displayModalOne: false,

      editProgram: {
        id: "",
        name: "",
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
  mounted() {
    this.id = localStorage.getItem("progId")
  },
  methods: {
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
      console.log(this.displayModal, "this.displayModal")
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
        degreeName: this.degreeName,
        degreeType: this.degreeType,
        issuedBy: this.issuedBy,
      };

      try {
        const result = await instance.post("/api/create-trans-program", data);

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
          this.degreeName = "";
          this.degreeType = "";
          this.issuedBy = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editProgram.name = item.name;
      this.editProgram.name_en = item.name_en;
      this.editProgram.degreeName = item.degreeName;
      this.editProgram.degreeType = item.degreeType;
      this.editProgram.issuedBy = item.issuedBy;
      this.editProgram.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        
        name: this.editProgram.name,
        degreeName: this.editProgram.degreeName,
        degreeType: this.editProgram.degreeType,
        issuedBy: this.editProgram.issuedBy,
      };
      try {
        const result = await instance.put(
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
          this.displayModalOne = false;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa chương trình này?")) {
          const result = await instance.delete(
            `/api/delete-trans-program/${item._id}`
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
  },
};
</script>

<style scoped></style>