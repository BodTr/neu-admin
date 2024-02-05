<template>
  <div class="page">
    <VerticalNavbar :programId="id.length !== 1 ? `${id[1]}` : `${id[0]}`" />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <div class="page-pretitle">Overview</div>
              <h2 class="page-title">Quản lí tài khoản</h2>
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
              <div class="modal-dialog modal-lg" role="document">
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
                        <label class="form-label">Tên tài khoản</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên tài khoản"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Tên đăng nhập</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="username"
                          placeholder="Nhập tên đăng nhập"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mật khẩu</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="password"
                          placeholder="Nhập mật khẩu"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="phoneNumber"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a
                      @click="submitFile()"
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
                  url="/api/get-all-users"
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

                      
                      <a
                        href="#"
                        class="btn btn-warning btn-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-report-two"
                        @click="onEditPassWord(item.row)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-lock-square-rounded"
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
                            d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                          />
                          <path
                            d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"
                          />
                          <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                        </svg>
                      </a>
                      
                    </span>

                    <div
                      v-if="displayModalOne"
                      class="modal modal-blur fade show"
                      id="modal-report-one"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                    >
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Chỉnh sửa Tài khoản</h5>
                            <button
                              @click="hideModal1()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards mb-5">
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Tên tài khoản</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.name"
                                  placeholder="Nhập tên tài khoản"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Tên đăng nhập</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.username"
                                  placeholder="Nhập tên đăng nhập"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.phoneNumber"
                                  placeholder="Nhập số điện thoại"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            
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
                    <div
                      v-if="displayModalTwo"
                      class="modal modal-blur fade show"
                      id="modal-report-two"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                      role="dialog"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Đổi mật khẩu</h5>
                            <button
                              @click="hideModal2()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="mb-3">
                              <label class="form-label">Mật khẩu mới</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="editUser.editedPassword"
                                placeholder="Nhập mật khẩu mới"
                              />
                            </div>
                          </div>
                          <div class="modal-footer">
                          
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="onPasswordChange()"
                            >
                              Lưu
                            </button>
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

export default {
  name: "Admin",
  components: {
    VerticalNavbar,
  },
  data() {
    return {
      columns: ["stt", "name", "username", "phoneNumber", "tool"],
      options: {
        headings: {
          name: "Tên tài khoản",
          username: "Tên đăng nhập",
          phoneNumber: "Số điện thoại",
          tool: "Thao tác",
        },
      },

      name: "",
      username: "",
      phoneNumber: "",
      password: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      editUser: {
        id: "",
        name: "",
        username: "",
        phoneNumber: "",
        editedPassword: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  created() {
    // this.id = ['0']
    const idArr = localStorage.getItem("idArr");
    console.log(idArr === null, "check id");
    console.log(this.id, "this.id");
    if (idArr === null) {
      this.id = ["0"];
      console.log(this.id, "this.id123");
      console.log("if statement", this.id);
    } else {
      this.id = JSON.parse(localStorage.getItem("idArr"));
      console.log("else statement", this.id);
    }
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
    showModal2() {
      this.displayModalTwo = true;
    },
    hideModal2() {
      this.displayModalTwo = false;
    },

    async submitFile() {
      try {
        const data = {
          name: this.name,
          username: this.username,
          phoneNumber: this.phoneNumber,
          password: this.password,
        };
        console.log(data, "post api data");

        const result = await instance.post("/api/create-user", data);
        console.log(result, "post api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.name = "";
          this.username = "";
          this.phoneNumber = "";
          this.password = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      console.log(item, "item");
      this.editUser.name = item.name;
      this.editUser.username = item.username;
      this.editUser.phoneNumber = item.phoneNumber;
      this.editUser.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      try {
        const data = {
          name: this.editUser.name,
          username: this.editUser.username,
          phoneNumber: this.editUser.phoneNumber,
        };

        const result = await instance.put(
          `/api/edit-user/${this.editUser.id}`,
          data
        );
        console.log(result, "put api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async onEditPassWord(item) {
      console.log(item);
      this.editUser.id = item._id;
      this.showModal2()
    },

    async onPasswordChange() {
      console.log(this.editUser.editedPassword, "editedPassword");
      try {
        const data = {
          editedPassword: this.editUser.editedPassword,
        };
        const result = await instance.patch(
          `/api/edit-user-password/${this.editUser.id}`,
          data
        );
        console.log(result, "patch api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModalTwo = false;
          this.editedPassword = "";
        }
      } catch (error) {
        console.log(error, "patch api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa user này?")) {
          const result = await instance.delete(`/api/delete-user/${item._id}`);
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
