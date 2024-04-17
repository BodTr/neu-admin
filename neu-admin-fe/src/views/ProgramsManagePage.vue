<template>
  <div class="page">
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý Chương trình liên kết</h2>
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
              aria-modal="true"
              style="display: block"
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
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên chương trình</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên chương trình"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Quốc gia</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nation"
                          placeholder="Nhập quốc gia"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trường đối tác</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="parterUni"
                          placeholder="Nhập tên trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chuyên ngành</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="major"
                          placeholder="Nhập tên chuyên ngành"
                        />
                      </div>

                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Năm</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập năm"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chỉ tiêu</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="quota"
                          placeholder="Nhập chỉ tiêu"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày hết hạn</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="expiry"
                          placeholder="Nhập ngày hết hạn"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trình độ đào tạo</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="level"
                          placeholder="Nhập trình độ đào tạo"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="submitForm()" class="btn btn-primary ms-auto">
                      Thêm mới
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
                  url="/api/get-all-programs"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:agency="item">
                    <span v-if="!item.row.agency">Chưa liên kết</span>
                    <span v-else>{{ item.row.agency }}</span>
                  </template>
                  <template v-slot:agencyPhoneNumber="item">
                    <span v-if="!item.row.agencyPhoneNumber">Chưa liên kết</span>
                    <span v-else>{{ item.row.agencyPhoneNumber }}</span>
                  </template>
                  <template v-slot:status="item">
                    <span
                      v-if="item.row.status === 'true'"
                      class="badge bg-green text-green-fg"
                      >Đang hoạt động</span
                    >
                    <span v-else class="badge bg-red text-red-fg"
                      >Đã hết hạn</span
                    >
                  </template>
                  <template v-slot:decisionsArray="item">
                    <div v-if="item.row.decisionsArray.length === 0">
                      Chưa có quyết định nào
                    </div>
                    <div v-else>
                      <div v-for="(ele, index) in item.row.decisionsArray">
                        <span
                          >{{ ele.decisionName }}
                          <a
                            :href="ele.decisionLink"
                            class="btn btn-success btn-icon"
                          >
                            <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-files"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                              <path
                                d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z"
                              />
                              <path
                                d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"
                              />
                            </svg>
                          </a>
                        </span>
                      </div>
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
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tên chương trình</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.name"
                                  placeholder="Nhập tên chương trình"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Quốc gia</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.nation"
                                  placeholder="Nhập quốc gia"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Trường đối tác</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.parterUni"
                                  placeholder="Nhập tên trường đối tác"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chuyên ngành</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.major"
                                  placeholder="Nhập tên chuyên ngành"
                                />
                              </div>

                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Năm</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editprogram.year"
                                  placeholder="Nhập năm"
                                />
                              </div>
                              <!-- <div class="mb-3 row row-cards">
                                <div class="col-md-10">
                                  <label class="form-label">Đơn vị quản lý</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editprogram.agency"
                                    disabled
                                  />
                                </div>
                                <div class="col-md-2" style="margin-top: 44px;">
                                  <a href="#" class="btn btn-google w-100 btn-icon" aria-label="Google" @click="unAttachedProgram()">
                                   
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path></svg>
                                  </a>
                                </div>
                              </div> -->
                              <div class="mb-3">
                                <label class="form-label">Chỉ tiêu</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editprogram.quota"
                                  placeholder="Nhập chỉ tiêu"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày hết hạn</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editprogram.expiry"
                                  placeholder="Nhập ngày hết hạn"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Trình độ đào tạo</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editprogram.level"
                                  placeholder="Nhập trình độ đào tạo"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <a
                              @click="onSubmit()"
                              class="btn btn-primary ms-auto"
                            >
                              Chỉnh sửa
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

export default {
  name: "ProgramManagePage",
  components: {},
  data() {
    return {
      columns: [
        "stt",
        "year",
        "name",
        "nation",
        "parterUni",
        "major",
        "quota",
        "level",
        "agency",
        "agencyPhoneNumber",
        "expiry",
        "status",
        "decisionsArray",
        "tool",
      ],
      options: {
        headings: {
          name: "Tên chương trình",
          year: "Năm",
          nation: "Quốc gia",
          parterUni: "Trường đối tác",
          major: "Chuyên ngành",
          quota: "Chỉ tiêu",
          level: "Trình độ đào tạo",
          agency: "Tên đơn vị quản lý",
          agencyPhoneNumber: "SĐT đơn vị quản lý",
          expiry: "Ngày hết hạn",
          status: "Trạng thái",
          decisionsArray: "Quyết định phê duyệt",
          tool: "Thao tác",
        },
      },
      name: "",
      year: "",
      nation: "",
      parterUni: "",
      major: "",
      quota: "",
      level: "",
      expiry: "",
      status: "",
      approvalDecisionLink: "",
      approvalDecisionName: "",
      displayModal: false,
      displayModalOne: false,
      editprogram: {
        id: "",
        name: "",
        year: "",
        nation: "",
        parterUni: "",
        major: "",
        quota: "",
        level: "",
        agency: "",
        expiry: "",
        status: "",
        approvalDecisionLink: "",
        approvalDecisionName: "",
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
        name: this.name,
        year: this.year,
        nation: this.nation,
        parterUni: this.parterUni,
        major: this.major,
        quota: this.quota,
        level: this.level,
        expiry: this.expiry,
      };

      try {
        const result = await instance.post("/api/create-program", data);

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
          this.year = "";
          this.nation = "";
          this.parterUni = "";
          this.major = "";
          this.quota = "";
          this.level = "";
          this.expiry = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editprogram.name = item.name;
      this.editprogram.year = item.year;
      this.editprogram.nation = item.nation;
      this.editprogram.parterUni = item.parterUni;
      this.editprogram.major = item.major;
      this.editprogram.quota = item.quota;
      this.editprogram.level = item.level;
      this.editprogram.agency = item.agency;
      this.editprogram.expiry = item.expiry;
      this.editprogram.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
    },

    async onSubmit() {
      const data = {
        name: this.editprogram.name,
        year: this.editprogram.year,
        nation: this.editprogram.nation,
        parterUni: this.editprogram.parterUni,
        major: this.editprogram.major,
        quota: this.editprogram.quota,
        level: this.editprogram.level,
        expiry: this.editprogram.expiry,
      };
      try {
        const result = await instance.put(
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
            `/api/delete-program/${item._id}`
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
    getIdArray() {
      const idArr = this.id;
      console.log(idArr, "id Array");
      localStorage.setItem("idArr", JSON.stringify(idArr));
    },
    // async unAttachedProgram() {
    //   this.editprogram.agency = ''
    //   const result = await instance.patch(`/api/delete-attached-program/${this.editprogram.id}`)
    //   if (result.data.error === true) {
    //     // alert(result.data.message)
    //     this.toast.error(result.data.message);
    //     this.$refs.table.refresh();
    //   } else {
    //     // alert('Project has been updated')
    //     this.toast.success(result.data.message);
    //     this.$refs.table.refresh();
    //     console.log(result.data);
    //   }
    // }
  },
};
</script>

<style scoped></style>
