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
                  Thêm quy trình quản lý
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
                    <h5 class="modal-title">Thêm quy trình quản lý</h5>
                    <button
                      @click="hideModal()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <h3>Cơ chế đảm bảo chất lượng đào tạo</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Hình thức kiểm tra đánh giá</label
                        >
                        <textarea
                          class="form-control"
                          rows="3"
                          v-model="evaluationForm"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Khảo sát đánh giá chất lượng chương trình</label
                        >
                        <textarea
                          class="form-control"
                          rows="3"
                          v-model="evaluateProgramQuality"
                          placeholder="Nhập nội dung"
                        ></textarea>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Các quy trình tự đảm bảo chất lượng đào tạo</label
                      >
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <thead>
                            <tr class="g-2 align-items-center">
                              <th>Quy trình</th>
                              <th style="width: 60%">Nội dung quy trình</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <textarea
                                  class="form-control"
                                  row="1"
                                  placeholder="Nhập tên quy trình"
                                  v-model="processName"
                                ></textarea>
                              </td>
                              <td>
                                <textarea
                                  class="form-control"
                                  row="1"
                                  placeholder="Nhập nội dung quy trình"
                                  v-model="processDetail"
                                ></textarea>
                              </td>
                              <td>
                                <a
                                  href="#"
                                  @click="plusResult()"
                                  class="btn btn-azure btn-icon"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                            <tr v-for="(item, index) in processes" :key="index">
                              <td>{{ item.processName }}</td>
                              <td>{{ item.processDetail }}</td>
                              <td>
                                <a
                                  href="#"
                                  @click="deleteResult(index)"
                                  class="btn btn-ghost-danger btn-icon"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path
                                      d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                                    />
                                    <path
                                      d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                                    />
                                  </svg>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                  url="/api/get-all-processes"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:processes="item">
                    <div v-for="(ele, index) in item.row.processes" :key="index">
                      <div style="font-weight: 500;">Quy trình {{ index + 1 }}:</div>
                      <span style="font-weight: 500;"> - Tên quy trình:</span> {{ ele.processName }}
                      <div><span style="font-weight: 500;"> - Nội dung quy trình:</span> {{ ele.processDetail }}</div>
                    </div>
                  </template>
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
                            <h5 class="modal-title">Chỉnh sửa quy trình</h5>
                            <button
                              @click="hideModal1()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <h3>Cơ chế đảm bảo chất lượng đào tạo</h3>

                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Hình thức kiểm tra đánh giá</label
                                >
                                <textarea
                                  class="form-control"
                                  rows="3"
                                  v-model="editEduQuality.evaluationForm"
                                  placeholder="Nhập nội dung"
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Khảo sát đánh giá chất lượng chương
                                  trình</label
                                >
                                <textarea
                                  class="form-control"
                                  rows="3"
                                  v-model="editEduQuality.evaluateProgramQuality"
                                  placeholder="Nhập nội dung"
                                ></textarea>
                              </div>
                            </div>

                            <div class="mb-3">
                              <label class="form-label"
                                >Các quy trình tự đảm bảo chất lượng đào
                                tạo</label
                              >
                              <div class="table-responsive">
                                <table class="table mb-0">
                                  <thead>
                                    <tr class="g-2 align-items-center">
                                      <th>Quy trình</th>
                                      <th style="width: 60%">
                                        Nội dung quy trình
                                      </th>
                                      <th>Thao tác</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <textarea
                                          class="form-control"
                                          row="1"
                                          placeholder="Nhập tên quy trình"
                                          v-model="editEduQuality.processName"
                                        ></textarea>
                                      </td>
                                      <td>
                                        <textarea
                                          class="form-control"
                                          row="1"
                                          placeholder="Nhập nội dung quy trình"
                                          v-model="editEduQuality.processDetail"
                                        ></textarea>
                                      </td>
                                      <td>
                                        <a
                                          href="#"
                                          @click="plusResult1()"
                                          class="btn btn-azure btn-icon"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            />
                                            <path d="M12 5l0 14" />
                                            <path d="M5 12l14 0" />
                                          </svg>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr
                                      v-for="(item, index) in editEduQuality.processes"
                                      :key="index"
                                    >
                                      <td>{{ item.processName }}</td>
                                      <td>{{ item.processDetail }}</td>
                                      <td>
                                        <a
                                          href="#"
                                          @click="deleteResult1(index)"
                                          class="btn btn-ghost-danger btn-icon"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                                          >
                                            <path
                                              stroke="none"
                                              d="M0 0h24v24H0z"
                                              fill="none"
                                            />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path
                                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                                            />
                                            <path
                                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                                            />
                                          </svg>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
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
import { useToast } from "vue-toastification";
import router from "@/router";
export default {
  name: "EducationQualityManagePage",
  data() {
    return {
      columns: ["stt", "evaluationForm", "evaluateProgramQuality", "processes", "tool"],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          evaluationForm: "Hình thức kiểm tra đánh giá",
          evaluateProgramQuality: "Khảo sát đánh giá chất lượng chương trình",
          processes: "Các quy trình",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      processName: "",
      processDetail: "",
      evaluationForm: "",
      evaluateProgramQuality: "",

      processes: [],

      displayModal: false,
      displayModalOne: false,

      editEduQuality: {
        id: "",
        processName: "",
        processDetail: "",
        evaluationForm: "",
        evaluateProgramQuality: "",
        processes: [],
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
    plusResult() {
      if (!this.processName || !this.processDetail) {
        return this.toast.error("Hãy điền đủ form");
      } else {
        this.processes.push({
          processName: this.processName,
          processDetail: this.processDetail,
        });
        console.log(this.processes, "this.processes plusResult()");
        this.processName = "";
        this.processDetail = "";
        return this.processes;
      }
    },
    plusResult1() {
      if (!this.editEduQuality.processName || !this.editEduQuality.processDetail) {
        return this.toast.error("Hãy điền đủ form");
      } else {
        this.editEduQuality.processes.push({
          processName: this.editEduQuality.processName,
          processDetail: this.editEduQuality.processDetail,
        });
        console.log(this.editEduQuality.processes, "this.editEduQuality.processes plusResult1()");
        this.editEduQuality.processName = "";
        this.editEduQuality.processDetail = "";
        return this.editEduQuality.processes;
      }
    },
    deleteResult(index) {
      this.processes.splice(index, 1);
      console.log(this.processes, "this.processes deleteResult()");
    },
    deleteResult1(index) {
      this.editEduQuality.processes.splice(index, 1);
      console.log(this.editEduQuality.processes, "this.editEduQuality.processes deleteResult1()");
    },
    async submitForm() {
      console.log(this.id, "post api program id");
      const data = {
        programId: this.id,
        evaluationForm: this.evaluationForm,
        evaluateProgramQuality: this.evaluateProgramQuality,
        processes: this.processes,
      };

      try {
        const result = await instance.post("/api/create-process", data);

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
          this.evaluationForm = "";
          this.evaluateProgramQuality = "";
          this.processes = [];
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {

      this.editEduQuality.evaluationForm = item.evaluationForm;
      this.editEduQuality.evaluateProgramQuality = item.evaluateProgramQuality;
      this.editEduQuality.processes = item.processes
      this.editEduQuality.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        evaluationForm: this.editEduQuality.evaluationForm,
        evaluateProgramQuality: this.editEduQuality.evaluateProgramQuality,
        detail: this.editEduQuality.detail,
        processes: this.editEduQuality.processes,
      };
      try {
        const result = await instance.put(
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
          this.toast.success(result.data.message);
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
        if (confirm("Xóa quy trình này?")) {
          const result = await instance.delete(
            `/api/delete-process/${item._id}`
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
