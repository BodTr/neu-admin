<template>
  <div class="page">
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
                        <label class="form-label">Đơn vị thực hiện</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nhập đơn vị thực hiện"
                          v-model="unit"
                        />
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
                          v-model="progLeaderName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="progLeaderPosition"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Số điện thoại"
                          v-model="progLeaderPhoneNumber"
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
                          v-model="progLeaderEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="progLeaderUnit"
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
                          v-model="progManagementName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="progManagementPosition"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Số điện thoại"
                          v-model="progManagementPhoneNumber"
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
                          v-model="progManagementEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="progManagementUnit"
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
                          v-model="coordinatorName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="coordinatorPosition"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Số điện thoại"
                          v-model="coordinatorPhoneNumber"
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
                          v-model="coordinatorEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="coordinatorUnit"
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
                                  >Đơn vị thực hiện</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Nhập đơn vị thực hiện"
                                  v-model="editAgency.unit"
                                />
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
                                  v-model="editAgency.progLeaderName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editAgency.progLeaderPosition"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Số điện thoại"
                                  v-model="editAgency.progLeaderPhoneNumber"
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
                                  v-model="editAgency.progLeaderEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editAgency.progLeaderUnit"
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
                                  v-model="editAgency.progManagementName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editAgency.progManagementPosition"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Số điện thoại"
                                  v-model="editAgency.progManagementPhoneNumber"
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
                                  v-model="editAgency.progManagementEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editAgency.progManagementUnit"
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
                                  v-model="editAgency.coordinatorName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editAgency.coordinatorPosition"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Số điện thoại"
                                  v-model="editAgency.coordinatorPhoneNumber"
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
                                  v-model="editAgency.coordinatorEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editAgency.coordinatorUnit"
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
// import { ref } from 'vue'
import instance from "../instance";
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "ProgramManagePage",
  data() {
    return {
      columns: [
        "stt",
        "unit",
        "progLeaderName",
        "progManagementName",
        "coordinatorName",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },

        headings: {
          unit: "Đơn vị thực hiện",
          progLeaderName: "Tên lãnh đạo chương trình",
          progManagementName: "Tên chủ nhiệm chương trình",
          coordinatorName: "Tên điều phối viên",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      unit: "",

      progLeaderName: "",
      progLeaderPosition: "",
      progLeaderPhoneNumber: "",
      progLeaderEmail: "",
      progLeaderUnit: "",

      progManagementName: "",
      progManagementPosition: "",
      progManagementPhoneNumber: "",
      progManagementEmail: "",
      progManagementUnit: "",

      coordinatorName: "",
      coordinatorPosition: "",
      coordinatorPhoneNumber: "",
      coordinatorEmail: "",
      coordinatorUnit: "",

      displayModal: false,
      displayModalOne: false,

      editAgency: {
        id: "",
        unit: "",

        progLeaderName: "",
        progLeaderPosition: "",
        progLeaderPhoneNumber: "",
        progLeaderEmail: "",
        progLeaderUnit: "",

        progManagementName: "",
        progManagementPosition: "",
        progManagementPhoneNumber: "",
        progManagementEmail: "",
        progManagementUnit: "",

        coordinatorName: "",
        coordinatorPosition: "",
        coordinatorPhoneNumber: "",
        coordinatorEmail: "",
        coordinatorUnit: "",
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
        unit: this.unit,

        progLeaderName: this.progLeaderName,
        progLeaderPosition: this.progLeaderPosition,
        progLeaderPhoneNumber: this.progLeaderPhoneNumber,
        progLeaderEmail: this.progLeaderEmail,
        progLeaderUnit: this.progLeaderUnit,

        progManagementName: this.progManagementName,
        progManagementPosition: this.progManagementPosition,
        progManagementPhoneNumber: this.progManagementPhoneNumber,
        progManagementEmail: this.progManagementEmail,
        progManagementUnit: this.progManagementUnit,

        coordinatorName: this.coordinatorName,
        coordinatorPosition: this.coordinatorPosition,
        coordinatorPhoneNumber: this.coordinatorPhoneNumber,
        coordinatorEmail: this.coordinatorEmail,
        coordinatorUnit: this.coordinatorUnit,

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
          this.unit = "";

          this.progLeaderName = "";
          this.progLeaderPosition = "";
          this.progLeaderPhoneNumber = "";
          this.progLeaderEmail = "";
          this.progLeaderUnit = "";

          this.progManagementName = "";
          this.progManagementPosition = "";
          this.progManagementPhoneNumber = "";
          this.progManagementEmail = "";
          this.progManagementUnit = "";

          this.coordinatorName = "";
          this.coordinatorPosition = "";
          this.coordinatorPhoneNumber = "";
          this.coordinatorEmail = "";
          this.coordinatorUnit = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editAgency.unit = item.unit;

      this.editAgency.progLeaderName = item.progLeaderName;
      this.editAgency.progLeaderPosition = item.progLeaderPosition;
      this.editAgency.progLeaderPhoneNumber = item.progLeaderPhoneNumber;
      this.editAgency.progLeaderEmail = item.progLeaderEmail;
      this.editAgency.progLeaderUnit= item.progLeaderUnit;

      this.editAgency.progManagementName = item.progManagementName;
      this.editAgency.progManagementPosition = item.progManagementPosition;
      this.editAgency.progManagementPhoneNumber = item.progManagementPhoneNumber;
      this.editAgency.progManagementEmail = item.progManagementEmail;
      this.editAgency.progManagementUnit = item.progManagementUnit;

      this.editAgency.coordinatorName = item.coordinatorName;
      this.editAgency.coordinatorPosition = item.coordinatorPosition;
      this.editAgency.coordinatorPhoneNumber = item.coordinatorPhoneNumber;
      this.editAgency.coordinatorEmail = item.coordinatorEmail;
      this.editAgency.coordinatorUnit = item.coordinatorUnit;

      this.editAgency.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        programId: this.id,
        unit: this.editAgency.unit,

        progLeaderName: this.editAgency.progLeaderName,
        progLeaderPosition: this.editAgency.progLeaderPosition,
        progLeaderPhoneNumber: this.editAgency.progLeaderPhoneNumber,
        progLeaderEmail: this.editAgency.progLeaderEmail,
        progLeaderUnit: this.editAgency.progLeaderUnit,

        progManagementName: this.editAgency.progManagementName,
        progManagementPosition: this.editAgency.progManagementPosition,
        progManagementPhoneNumber: this.editAgency.progManagementPhoneNumber,
        progManagementEmail: this.editAgency.progManagementEmail,
        progManagementUnit: this.editAgency.progManagementUnit,

        coordinatorName: this.editAgency.coordinatorName,
        coordinatorPosition: this.editAgency.coordinatorPosition,
        coordinatorPhoneNumber: this.editAgency.coordinatorPhoneNumber,
        coordinatorEmail: this.editAgency.coordinatorEmail,
        coordinatorUnit: this.editAgency.coordinatorUnit,
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
