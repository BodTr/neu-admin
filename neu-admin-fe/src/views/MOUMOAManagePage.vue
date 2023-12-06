<template>
  <div class="page">
    <VerticalNavbar />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lí MOU.MOA</h2>
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
              <div class="modal-dialog modal-xl" role="document">
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
                        <label class="form-label">Quốc gia</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nation"
                          placeholder="Nhập quốc gia"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Loại văn bản</label>
                        <select
                          v-model="docType"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn loại văn bản
                          </option>
                          <option value="MOU">MOU</option>
                          <option value="MOA">MOA</option>
                          <option value="Letter of intend">
                            Letter of intend
                          </option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nội dung văn bản</label>
                        <textarea
                          v-model="docDetail"
                          class="form-control"
                          row="5"
                          placeholder="Nhập nội dung văn bản"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Văn bản đính kèm</label>
                        <input
                          type="file"
                          ref="attachedDoc"
                          class="form-control"
                          @change="handlePdfUpload()"
                        />
                        <div v-if="message != ''">{{ message }}</div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Tên trường đối tác</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="partnerUni"
                          placeholder="Nhập tên trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian kí kết</label>
                        <input
                          type="time"
                          class="form-control"
                          v-model="signingTime"
                          placeholder="Nhập thời gian kí kết"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian hết hạn</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="expireTime"
                          placeholder="Nhập thời gian hết hạn"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ghi chú</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          v-model="note"
                          placeholder="Nhập ghi chú"
                        ></textarea>
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
                  url="/api/get-all-moumoas"
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
                            <h5 class="modal-title">Chỉnh sửa</h5>
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
                                <label class="form-label">Quốc gia</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editMoumoa.nation"
                                  placeholder="Nhập quốc gia"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Loại văn bản</label>
                                <select
                                  v-model="editMoumoa.docType"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn loại văn bản
                                  </option>
                                  <option value="MOU">MOU</option>
                                  <option value="MOA">MOA</option>
                                  <option value="Letter of intend">
                                    Letter of intend
                                  </option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Nội dung văn bản</label
                                >
                                <textarea
                                  v-model="editMoumoa.docDetail"
                                  class="form-control"
                                  row="5"
                                  placeholder="Nhập nội dung văn bản"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Văn bản đính kèm</label
                                >
                                <input
                                  type="file"
                                  class="form-control"
                                  ref="attachedDoc1"
                                  placeholder="Nhập thời gian thực hiện"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Phân loại/học phần</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editMoumoa.partnerUni"
                                  placeholder="Nhập phân loại/học phần"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian kí kết</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editMoumoa.signingTime"
                                  placeholder="Nhập thời gian kí kết"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số lượng học viên</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editMoumoa.expireTime"
                                  placeholder="Nhập số lượng học viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ghi chú</label>
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editMoumoa.note"
                                  placeholder="Nhập ghi chú"
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
        "nation",
        "partnerUni",
        "docType",
        "docDetail",
        "attachedDoc",
        "signingTime",
        "expireTime",
        "note",
        "tool",
      ],
      options: {
        params: {
          id: this.$route.params.id,
        },
        headings: {
          nation: "Quốc gia",
          partnerUni: "Phân loại/học phần",
          docType: "Loại văn bản",
          signingTime: "Đơn vị thực hiện",
          docDetail: "Chức vụ",
          attachedDoc: "Thời gian thực hiện",
          expireTime: "Trường đào tạo",
          note: "Ghi chú",
          tool: "Thao tác",
        },
      },
      id: this.$route.params.id,
      nation: "",
      docType: "",
      docDetail: "",
      attachedDoc: null,
      partnerUni: "",
      signingTime: "",
      expireTime: "",
      note: "",

      displayModal: false,
      displayModalOne: false,

      editMoumoa: {
        id: "",
        nation: "",
        docType: "",
        docDetail: "",
        attachedDoc: null,
        partnerUni: "",
        signingTime: "",
        expireTime: "",
        note: "",
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
        nation: this.nation,
        docType: this.docType,
        docDetail: this.docDetail,
        attachedDoc: this.attachedDoc,
        partnerUni: this.partnerUni,
        signingTime: this.signingTime,
        expireTime: this.expireTime,
        note: this.note,
      };

      try {
        const result = await axios.post("/api/create-moumoa", data);

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);

          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.nation = "";
          this.docType = "";
          this.docDetail = "";
          this.attachedDoc = "";
          this.partnerUni = "";
          this.signingTime = "";
          this.expireTime = "";
          this.note = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editMoumoa.nation = item.nation;
      this.editMoumoa.docType = item.docType;
      this.editMoumoa.docDetail = item.docDetail;
      this.editMoumoa.attachedDoc = item.attachedDoc;
      this.editMoumoa.partnerUni = item.partnerUni;
      this.editMoumoa.signingTime = item.signingTime;
      this.editMoumoa.expireTime = item.expireTime;
      this.editMoumoa.note = item.note;
      this.editMoumoa.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      const data = {
        nation: this.editMoumoa.nation,
        docType: this.editMoumoa.docType,
        docDetail: this.editMoumoa.docDetail,
        attachedDoc: this.editMoumoa.attachedDoc,
        partnerUni: this.editMoumoa.partnerUni,
        signingTime: this.editMoumoa.signingTime,
        expireTime: this.editMoumoa.expireTime,
        note: this.editMoumoa.note,
      };
      try {
        const result = await axios.put(
          `/api/edit-moumoa/${this.editMoumoa.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);

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
          const result = await axios.delete(`/api/delete-moumoat/${item._id}`);
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
