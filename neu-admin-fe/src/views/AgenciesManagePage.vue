<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý đơn vị thực hiện</h2>
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
                  Thêm đơn vị
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
                    <h5 class="modal-title">Thêm đơn vị</h5>
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
                        <label class="form-label">Họ tên người thực hiện</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập họ và tên người thực hiện"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="text"
                          v-model="phoneNumber"
                          class="form-control"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          v-model="position"
                          class="form-control"
                          placeholder="Nhập chức vụ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="email"
                          placeholder="Nhập email"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị thực hiện</label>
                        <select
                          v-model="unit"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn đơn vị thực hiện
                          </option>
                          <option value="Đơn vị 1">Đơn vị 1</option>
                          <option value="Đơn vị 2">Đơn vị 2</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nội dung phụ trách</label>
                        <textarea
                          class="form-control"
                          row="1"
                          v-model="content"
                          placeholder="Nhập nội dung phụ trách"
                        ></textarea>
                      </div>
                    </div>
                    <h3>Lãnh đạo phụ trách chương trình</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                        />
                      </div>
                    </div>
                    <h3>Chủ nhiệm chương trình</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                        />
                      </div>
                    </div>
                    <h3>Điều phối viên chương trình</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
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
                  url="/api/get-all-agencies"
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
                                  >Tên văn bản liên kết</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editAgency.name"
                                  placeholder="Nhập tên văn bản liên kết đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editAgency.phoneNumber"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editAgency.position"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editAgency.email"
                                  placeholder="Nhập email"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Đơn vị thực hiện</label
                                >
                                <select
                                  v-model="editAgency.unit"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn đơn vị thực hiện
                                  </option>
                                  <option value="Đơn vị 1">Đơn vị 1</option>
                                  <option value="Đơn vị 2">Đơn vị 2</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Nội dung phụ trách</label
                                >
                                <textarea
                                  class="form-control"
                                  row="1"
                                  v-model="editAgency.content"
                                  placeholder="Nhập nội dung phụ trách"
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
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
import instance from "../instance";
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
        "email",
        "phoneNumber",
        "unit",
        "content",
        "position",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },

        headings: {
          name: "Họ tên người thực hiện",
          email: "Email",
          phoneNumber: "Số điện thoại",
          unit: "Đơn vị thực hiện",
          content: "Nội dung phụ trách",
          position: "Chức vụ",
          tool: "Thao tác",
        },
      },
      id: localStorage.getItem("progId"),
      name: "",
      phoneNumber: "",
      position: "",
      email: "",
      unit: "",
      content: "",
      displayModal: false,
      displayModalOne: false,

      editAgency: {
        id: "",
        name: "",
        phoneNumber: "",
        position: "",
        email: "",
        unit: "",
        content: "",
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
        phoneNumber: this.phoneNumber,
        position: this.position,
        email: this.email,
        unit: this.unit,
        content: this.content,
      };

      try {
        const result = await instance.post("/api/create-agency", data);

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
          this.phoneNumber = "";
          this.position = "";
          this.email = "";
          this.unit = "";
          this.content = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editAgency.name = item.name;
      this.editAgency.phoneNumber = item.phoneNumber;
      this.editAgency.position = item.position;
      this.editAgency.email = item.email;
      this.editAgency.unit = item.unit;
      this.editAgency.content = item.content;
      this.editAgency.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {

        name: this.editAgency.name,
        phoneNumber: this.editAgency.phoneNumber,
        position: this.editAgency.position,
        email: this.editAgency.email,
        unit: this.editAgency.unit,
        content: this.editAgency.content,
      };
      try {
        const result = await instance.put(
          `/api/edit-agency/${this.editAgency.id}`,
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
            `/api/delete-agency/${item._id}`
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
