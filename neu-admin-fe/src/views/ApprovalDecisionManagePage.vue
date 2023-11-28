<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí quyết định phê duyệt</h2>
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
                  Thêm quyết định
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
                    <h5 class="modal-title">Thêm quyết định</h5>
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
                        <label class="form-label">Tên quyết định</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày kí</label>
                        <input
                          type="date"
                          v-model="signDate"
                          class="form-control"
                          placeholder="Nhập ngày kí date"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Số quết định</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="number"
                          placeholder="Nhập số quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời hạn hiệu lực</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="expireIn"
                          placeholder="Nhập thời hạn hiệu lực"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Nội dung quyết định</label>
                      <textarea
                        class="form-control"
                        rows="5"
                        v-model="detail"
                        placeholder="Nhập nội dung quyết định"
                      ></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a
                      @click="submitForm()"
                      class="btn btn-primary ms-auto"
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
                  url="/api/get-all-decisions"
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
                            <h5 class="modal-title">Chỉnh sửa quyết định</h5>
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
                                <label class="form-label">Tên quyết định</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editDecision.name"
                                  placeholder="Nhập tên quyết định"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày kí</label>
                                <input
                                  type="date"
                                  v-model="editDecision.signDate"
                                  class="form-control"
                                  placeholder="Nhập ngày kí date"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Số quết định</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editDecision.number"
                                  placeholder="Nhập số quyết định"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời hạn hiệu lực</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editDecision.expireIn"
                                  placeholder="Nhập thời hạn hiệu lực"
                                />
                              </div>
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Nội dung quyết định</label
                              >
                              <textarea
                                class="form-control"
                                rows="5"
                                v-model="editDecision.detail"
                                placeholder="Nhập nội dung quyết định"
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
      columns: [
        "stt",
        "name",
        "detail",
        "number",
        "signDate",
        "expireIn",
        "tool",
      ],
      options: {
        params:{
          id: this.$route.params.id
        },
        headings: {
          name: "Tên quyết định",
          detail: "Nội dung quyết định",
          number: "Quyết định số",
          signDate: "Ngày kí",
          expireIn: "Thời hạn hiệu lực",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      name: "",
      detail: "",
      number: "",
      signDate: "",
      expireIn: "",
      displayModal: false,
      displayModalOne: false,

      editDecision: {
        id: "",
        name: "",
        detail: "",
        number: "",
        signDate: "",
        expireIn: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
    showModal (){
      this.displayModal = true
    },
    hideModal (){
      this.displayModal = false
    },
    showModal1 (){
      this.displayModalOne = true
    },
    hideModal1 (){
      this.displayModalOne = false
    },
    async submitForm() {
      console.log(this.id, "post api program id")
      const data = {
        programId: this.id,
        name: this.name,
        detail: this.detail,
        number: this.number,
        signDate: this.signDate,
        expireIn: this.expireIn,
      };

      try {
        const result = await axios.post("/api/create-decision", data);

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
          this.displayModal = false
          this.name = ''
          this.detail = ''
          this.number = ''
          this.signDate = ''
          this.expireIn = ''
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editDecision.name = item.name;
      this.editDecision.detail = item.detail;
      this.editDecision.number = item.number;
      this.editDecision.signDate = item.signDate;
      this.editDecision.expireIn = item.expireIn;
      this.editDecision.id = item._id;
      this.showModal1()

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        name: this.editDecision.name,
        detail: this.editDecision.detail,
        number: this.editDecision.number,
        signDate: this.editDecision.signDate,
        expireIn: this.editDecision.expireIn,
      };
      try {
        const result = await axios.put(
          `/api/edit-decision/${this.editDecision.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Quyết định đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa quyết định này?")) {
          const result = await axios.delete(
            `/api/delete-decision/${item._id}`
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
