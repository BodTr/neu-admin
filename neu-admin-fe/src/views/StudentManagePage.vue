<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">Quản lý lưu học sinh</h2>
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
                  Thêm sinh viên
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
                    <h5 class="modal-title">Thêm sinh viên</h5>
                    <button
                      @click="hideModal()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Họ và tên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập họ và tên sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mã sinh viên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="studentCode"
                          placeholder="Nhập mã sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày sinh</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="birthday"
                          placeholder="Nhập ngày sinh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Giới tính</label>
                        <select v-model="sex" class="form-select" tabindex="-1">
                          <option value="" disabled selected>
                            Chọn giới tính
                          </option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Quốc tịch</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nation"
                          placeholder="Nhập quốc tịch"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Khóa</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="schoolYear"
                          placeholder="Nhập khóa"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Nơi ở</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="tempResidence"
                          placeholder="Nhập nơi ở"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Diện</label>
                        <select
                          v-model="dien"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="Hiệp định">Hiệp định</option>
                          <option value="CLMV">CLMV</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chuyên ngành</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="major"
                          placeholder="Nhập chuyên ngành"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Khóa học</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="courseDuration"
                          placeholder="Nhập năm bắt đầu - kết thúc  của khóa học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số tháng</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="monthCount"
                          placeholder="Nhập số tháng"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Số QĐ tiếp nhận của BGD&ĐT</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="bgdReceiveNumber"
                          placeholder="Nhập ngày"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Ngày QĐ tiếp nhận của BGD&ĐT</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          v-model="bgdReceiveDate"
                          placeholder="Nhập số quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Số QĐ tiếp nhận của trường</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="neuReceiveNumber"
                          placeholder="Nhập số quyết định"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Ngày QĐ tiếp nhận của BGD&ĐT</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          v-model="neuReceiveDate"
                          placeholder="Nhập ngày"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Chi thường xuyên</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="expenses"
                          placeholder="Nhập khoản chi thường xuyên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">SHP</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="shp"
                          placeholder="Nhập tiền SHP"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">KPCK</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="kpck"
                          placeholder="Nhập tiền KPCK"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tiền quốc khánh</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="nationalDayExpenses"
                          placeholder="Nhập tiền quốc khánh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tiền tết VN</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="tetVnExpenses"
                          placeholder="Nhập tiền quốc khánh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tiền tết Lào, Cam</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="tetLaoCamExpenses"
                          placeholder="Nhập tiền quốc khánh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tiền đi lại</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="travelExpenses"
                          placeholder="Nhập tiền đi lại"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trang cấp ban đầu</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="initExpenses"
                          placeholder="Nhập tiền đi lại"
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
                  url="/api/get-all-students"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedDoc="item">
                    {{ item.row.attachedDocName }}
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
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Họ và tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.name"
                                  placeholder="Nhập họ và tên sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Mã sinh viên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.studentCode"
                                  placeholder="Nhập mã sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày sinh</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editStudent.birthday"
                                  placeholder="Nhập ngày sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Giới tính</label>
                                <select
                                  v-model="editStudent.sex"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn giới tính
                                  </option>
                                  <option value="Nam">Nam</option>
                                  <option value="Nữ">Nữ</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Quốc tịch</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.nation"
                                  placeholder="Nhập quốc tịch"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Khóa</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.schoolYear"
                                  placeholder="Nhập khóa"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Nơi ở</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.tempResidence"
                                  placeholder="Nhập nơi ở"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Diện</label>
                                <select
                                  v-model="editStudent.dien"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="Hiệp định">Hiệp định</option>
                                  <option value="CLMV">CLMV</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chuyên ngành</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.major"
                                  placeholder="Nhập chuyên ngành"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Khóa học</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.courseDuration"
                                  placeholder="Nhập năm bắt đầu - kết thúc  của khóa học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số tháng</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.monthCount"
                                  placeholder="Nhập số tháng"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số QĐ tiếp nhận của BGD&ĐT</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.bgdReceiveNumber"
                                  placeholder="Nhập ngày"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Ngày QĐ tiếp nhận của BGD&ĐT</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editStudent.bgdReceiveDate"
                                  placeholder="Nhập số quyết định"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số QĐ tiếp nhận của trường</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.neuReceiveNumber"
                                  placeholder="Nhập số quyết định"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Ngày QĐ tiếp nhận của BGD&ĐT</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editStudent.neuReceiveDate"
                                  placeholder="Nhập ngày"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Chi thường xuyên</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.expenses"
                                  placeholder="Nhập khoản chi thường xuyên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">SHP</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.shp"
                                  placeholder="Nhập tiền SHP"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">KPCK</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.kpck"
                                  placeholder="Nhập tiền KPCK"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tiền quốc khánh</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.nationalDayExpenses"
                                  placeholder="Nhập tiền quốc khánh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Tiền tết VN</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.tetVnExpenses"
                                  placeholder="Nhập tiền quốc khánh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tiền tết Lào, Cam</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.tetLaoCamExpenses"
                                  placeholder="Nhập tiền quốc khánh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Tiền đi lại</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.travelExpenses"
                                  placeholder="Nhập tiền đi lại"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Trang cấp ban đầu</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.initExpenses"
                                  placeholder="Nhập tiền đi lại"
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
import instance from "../instance";
// import { ref } from 'vue'
import VerticalNavbar from "../components/VerticalNavbar.vue";
import { useToast } from "vue-toastification";

export default {
  name: "StudentManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "studentCode",
        "birthday",
        "sex",
        "nation",
        "schoolYear",
        "tempResidence",
        "dien",
        "major",
        "courseDuration",
        "monthCount",
        "bgdReceiveNumber",
        "bgdReceiveDate",
        "neuReceiveNumber",
        "neuReceiveDate",
        "tool",
      ],
      options: {
        headings: {
          name: "Họ và tên",
          studentCode: "MSSV",
          birthday: "Ngày sinh",
          sex: "Giới tính",
          nation: "Quốc tịch",
          schoolYear: "Khóa",
          tempResidence: "Nơi ở",
          dien: "Diện",
          major: "Chuyên ngành",
          courseDuration: "Khóa học",
          monthCount: "Số tháng",
          bgdReceiveNumber: "Số QĐTN của BGD&ĐT",
          bgdReceiveDate: "Ngày QĐTN của BGD&ĐT",
          neuReceiveNumber: "Số QĐTN của trường",
          neuReceiveDate: "Ngày QĐTN của BGD&ĐT",
          tool: "Thao tác",
        },
      },
      name: "",
      studentCode: "",
      birthday: "",
      sex: "",
      nation: "",
      schoolYear: "",
      tempResidence: "",
      dien: "",
      major: "",
      courseDuration: "",
      monthCount: "",
      bgdReceiveNumber: "",
      bgdReceiveDate: "",
      neuReceiveNumber: "",
      neuReceiveDate: "",
      expenses: "",
      shp: "",
      kpck: "",
      nationalDayExpenses: "",
      tetVnExpenses: "",
      tetLaoCamExpenses: "",
      travelExpenses: "",
      initExpenses: "",

      displayModal: false,
      displayModalOne: false,

      editStudent: {
        id: "",
        name: "",
        studentCode: "",
        birthday: "",
        sex: "",
        nation: "",
        schoolYear: "",
        tempResidence: "",
        dien: "",
        major: "",
        courseDuration: "",
        monthCount: "",
        bgdReceiveNumber: "",
        bgdReceiveDate: "",
        neuReceiveNumber: "",
        neuReceiveDate: "",
        expenses: "",
        shp: "",
        kpck: "",
        nationalDayExpenses: "",
        tetVnExpenses: "",
        tetLaoCamExpenses: "",
        travelExpenses: "",
        initExpenses: "",
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

      try {
        const data = {
          name: this.name,
          studentCode: this.studentCode,
          birthday: this.birthday,
          sex: this.sex,
          nation: this.nation,
          schoolYear: this.schoolYear,
          tempResidence: this.tempResidence,
          dien: this.dien,
          major: this.major,
          courseDuration: this.courseDuration,
          monthCount: this.monthCount,
          bgdReceiveNumber: this.bgdReceiveNumber,
          bgdReceiveDate: this.bgdReceiveDate,
          neuReceiveNumber: this.neuReceiveNumber,
          neuReceiveDate: this.neuReceiveDate,
          expenses: this.expenses,
          shp: this.shp,
          kpck: this.kpck,
          nationalDayExpenses: this.nationalDayExpenses,
          tetVnExpenses: this.tetVnExpenses,
          tetLaoCamExpenses: this.tetLaoCamExpenses,
          travelExpenses: this.travelExpenses,
          initExpenses: this.initExpenses,
        }

        const result = await instance.post(
          "/api/create-student",
          data,
        );

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
          this.studentCode = "";
          this.birthday = "";
          this.sex = "";
          this.nation = "";
          this.schoolYear = "";
          this.tempResidence = "";
          this.dien = "";
          this.major = "";
          this.courseDuration = "";
          this.monthCount = "";
          this.bgdReceiveNumber = "";
          this.bgdReceiveDate = "";
          this.neuReceiveNumber = "";
          this.neuReceiveDate = "";
          this.expenses = "";
          this.shp = "";
          this.kpck = "";
          this.nationalDayExpenses = "";
          this.tetVnExpenses = "";
          this.tetLaoCamExpenses = "";
          this.travelExpenses = "";
          this.initExpenses = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editStudent.name = item.name;
      this.editStudent.studentCode = item.studentCode;
      this.editStudent.birthday = item.birthday;
      this.editStudent.sex = item.sex;
      this.editStudent.nation = item.nation;
      this.editStudent.schoolYear = item.schoolYear;
      this.editStudent.tempResidence = item.tempResidence;
      this.editStudent.dien = item.dien;
      this.editStudent.major = item.major;
      this.editStudent.courseDuration = item.courseDuration;
      this.editStudent.monthCount = item.monthCount;
      this.editStudent.bgdReceiveNumber = item.bgdReceiveNumber;
      this.editStudent.bgdReceiveDate = item.bgdReceiveDate;
      this.editStudent.neuReceiveNumber = item.neuReceiveNumber;
      this.editStudent.neuReceiveDate = item.neuReceiveDate;
      this.editStudent.expenses = item.expenses;
      this.editStudent.shp = item.shp;
      this.editStudent.kpck = item.kpck;
      this.editStudent.nationalDayExpenses = item.nationalDayExpenses;
      this.editStudent.tetVnExpenses = item.tetVnExpenses;
      this.editStudent.tetLaoCamExpenses = item.tetLaoCamExpenses;
      this.editStudent.travelExpenses = item.travelExpenses;
      this.editStudent.initExpenses = item.initExpenses;
      this.editStudent.id = item._id;
      this.showModal1();
    },

    async onSubmit() {

      try {
        const data = {
          name: this.editStudent.name,
          studentCode: this.editStudent.studentCode,
          birthday: this.editStudent.birthday,
          sex: this.editStudent.sex,
          nation: this.editStudent.nation,
          schoolYear: this.editStudent.schoolYear,
          tempResidence: this.editStudent.tempResidence,
          dien: this.editStudent.dien,
          major: this.editStudent.major,
          courseDuration: this.editStudent.courseDuration,
          monthCount: this.editStudent.monthCount,
          bgdReceiveNumber: this.editStudent.bgdReceiveNumber,
          bgdReceiveDate: this.editStudent.bgdReceiveDate,
          neuReceiveNumber: this.editStudent.neuReceiveNumber,
          neuReceiveDate: this.editStudent.neuReceiveDate,
          expenses: this.editStudent.expenses,
          shp: this.editStudent.shp,
          kpck: this.editStudent.kpck,
          nationalDayExpenses: this.editStudent.nationalDayExpenses,
          tetVnExpenses: this.editStudent.tetVnExpenses,
          tetLaoCamExpenses: this.editStudent.tetLaoCamExpenses,
          travelExpenses: this.editStudent.travelExpenses,
          initExpenses: this.editStudent.initExpenses,
        }
        const result = await instance.put(
          `/api/edit-student/${this.editStudent.id}`,
          data
        );

        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload()
          this.$refs.table.refresh();
        } else {
          // alert('Project has been updated')
          this.toast.success("Thông tin sinh viên đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
          this.editStudent.attachedDoc = null;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa thông tin sinh viên này này?")) {
          const result = await instance.delete(
            `/api/delete-student/${item._id}`
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
