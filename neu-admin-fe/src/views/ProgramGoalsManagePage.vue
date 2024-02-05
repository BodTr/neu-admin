<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Mục tiêu chương trình</h2>
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
                  Thêm mục tiêu
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
              aria-modal="true"
              style="display: block"
            >
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Thêm mục tiêu</h5>
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
                        <label class="form-label"
                          >Mục tiêu chương trình liên kết
                        </label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="programGoal"
                          placeholder="Nhập mục tiêu chương trình liên kết đào tạo"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Nội dung tự đánh giá </label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="testDetail"
                          placeholder="Nhập nội dung kiểm định"
                        ></textarea>
                      </div>
                    </div>
                    <div class="mb-3">
                      <div>
                        <label class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            value="Mục tiêu chương trình"
                            v-model="goalFrom"
                          />
                          <span class="form-check-label"
                            >Mục tiêu chương trình</span
                          >
                        </label>
                        <label class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            value="Mục tiêu nhà trường"
                            v-model="goalFrom"
                          />
                          <span class="form-check-label"
                            >Mục tiêu nhà trường</span
                          >
                        </label>
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
                  url="/api/get-all-goals"
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
                            <h5 class="modal-title">Chỉnh sửa mục tiêu</h5>
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
                                  >Mục tiêu chương trình liên kết
                                </label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editGoal.programGoal"
                                  placeholder="Nhập mục tiêu chương trình liên kết đào tạo"
                                ></textarea>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Nội dung tự đánh giá
                                </label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editGoal.testDetail"
                                  placeholder="Nhập nội dung kiểm định"
                                ></textarea>
                              </div>
                            </div>
                            <div class="mb-3">
                              <div>
                                <label class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Mục tiêu chương trình"
                                    v-model="editGoal.goalFrom"
                                  />
                                  <span class="form-check-label"
                                    >Mục tiêu chương trình</span
                                  >
                                </label>
                                <label class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    value="Mục tiêu nhà trường"
                                    v-model="editGoal.goalFrom"
                                  />
                                  <span class="form-check-label"
                                    >Mục tiêu nhà trường</span
                                  >
                                </label>
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
      columns: ["stt", "programGoal", "testDetail", "goalFrom", "tool"],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          programGoal: "Nội dung mục tiêu",
          testDetail: "Tự đánh giá",
          goalFrom: "Phân loại",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      programGoal: "",
      testDetail: "",
      goalFrom: "",

      displayModal: false,
      displayModalOne: false,
      editGoal: {
        id: "",
        programGoal: "",
        testDetail: "",
        goalFrom: "",
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
        programGoal: this.programGoal,
        testDetail: this.testDetail,
        goalFrom: this.goalFrom,
      };

      try {
        const result = await instance.post("/api/create-goal", data);

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
          this.programGoal = "";
          this.testDetail = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editGoal.programGoal = item.programGoal;
      this.editGoal.testDetail = item.testDetail;
      this.editGoal.goalFrom = item.goalFrom;
      this.editGoal.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        programGoal: this.editGoal.programGoal,
        testDetail: this.editGoal.testDetail,
        goalFrom: this.editGoal.goalFrom,
      };
      try {
        const result = await instance.put(
          `/api/edit-goal/${this.editGoal.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Mục tiêu đã được sửa");
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
        if (confirm("Xóa mục tiêu này?")) {
          const result = await instance.delete(`/api/delete-goal/${item._id}`);
          console.log(result);
          // alert(result.data.message)
          this.toast.warning(result.data.message);
          this.$refs.table.refresh();
        }
      } catch (error) {
        console.log(error, "delete api catch block error");
      }
    },
    // getIdArray() {
    //   const idArr = this.id;
    //   console.log(idArr, "id Array");
    //   localStorage.setItem("idArr", JSON.stringify(idArr));
    // },
  },
};
</script>

<style scoped></style>