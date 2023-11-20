<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí chương trình</h2>
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
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên chương trình"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Năm</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập năm"
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
                  url="http://localhost:1696/api/get-all-programs"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:isManaged>
                    <label class="form-check">
                      <input class="form-check-input" type="radio" checked="" />
                    </label>
                  </template>
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
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.name"
                                  placeholder="Nhập tên chương trình"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.year"
                                  placeholder="Nhập năm"
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
  name: "programManagePage",
  components: {
    VerticalNavbar,
  },
  data() {
    return {
      columns: ["stt", "name", "year", "isManaged", "tool"],
      options: {
        headings: {
          name: "Tên chương trình",
          year: "Năm",
          isManaged: "Chọn quản lí"
        },
      },

      name: "",
      year: "",
      isManaged: {
        choose: false,
        id: "",
      },
      editprogram: {
        name: "",
        year: "",
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
        name: this.name,
        year: this.year,
      };

      try {
        const result = await axios.post("/api/create-program", data);

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
      this.editprogram.name = item.name;
      this.editprogram.year = item.year;
      this.editprogram.id = item._id;

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        name: this.editprogram.name,
        year: this.editprogram.year,
      };
      try {
        const result = await axios.put(
          `/api/edit-program/${this.editprogram.id}`,
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
          const result = await axios.delete(`/api/delete-program/${item._id}`);
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

<style></style>
