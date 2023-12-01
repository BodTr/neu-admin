<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí chất lượng đào tạo</h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  @click="showModal()"
                  href="#"
                  class="btn btn-primary d-none d-sm-inline-block"
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
                  Thêm qui trình quản lí
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
                    <h5 class="modal-title">Thêm qui trình quản lí</h5>
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
                        <label class="form-label">Cơ chế</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="mechanism"
                          placeholder="Nhập cơ chế"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3" style="margin-left: 2rem ;">
                        <label class="form-check"></label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="hasProcess"
                            value="Có qui trình"
                          />
                          <span class="form-check-label">Có qui trình</span>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Nội dung </label>
                      <textarea
                        class="form-control"
                        rows="5"
                        v-model="detail"
                        placeholder="Nhập nội dung"
                      ></textarea>
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
                  url="/api/get-all-processes"
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
                            <h5 class="modal-title">Chỉnh sửa qui trình</h5>
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
                                <label class="form-label">Cơ chế</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editEduQuality.mechanism"
                                  placeholder="Nhập cơ chế"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="editEduQuality.hasProcess"
                                    value="Có qui trình"
                                  />
                                  <span class="form-check-label"
                                    >Có qui trình</span
                                  >
                                </label>
                              </div>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Nội dung</label>
                              <textarea
                                class="form-control"
                                rows="5"
                                v-model="editEduQuality.detail"
                                placeholder="Nhập nội dung"
                              ></textarea>
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
      columns: ["stt", "mechanism", "hasProcess", "detail", "tool"],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          mechanism: "Cơ chế",
          hasProcess: "Quy trình",
          detail: "Nội dung",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      mechanism: "",
      hasProcess: "",
      detail: "",
      displayModal: false,
      displayModalOne: false,

      editEduQuality: {
        id: "",
        mechanism: "",
        hasProcess: "",
        detail: "",
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
      console.log(this.id, "post api program id");
      const data = {
        programId: this.id,
        mechanism: this.mechanism,
        detail: this.detail,
        hasProcess: this.hasProcess,
      };

      try {
        const result = await axios.post("/api/create-process", data);

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
          this.mechanism = "";
          this.detail = "";
          this.hasProcess = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editEduQuality.mechanism = item.mechanism;
      this.editEduQuality.detail = item.detail;
      this.editEduQuality.hasProcess = item.hasProcess;
      this.editEduQuality.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        mechanism: this.editEduQuality.mechanism,
        detail: this.editEduQuality.detail,
        detail: this.editEduQuality.detail,
        hasProcess: this.editEduQuality.hasProcess,
      };
      try {
        const result = await axios.put(
          `/api/edit-process/${this.editEduQuality.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("qui trình đã được sửa");
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
        if (confirm("Xóa qui trình này?")) {
          const result = await axios.delete(`/api/delete-process/${item._id}`);
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
