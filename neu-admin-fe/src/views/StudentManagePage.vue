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
                          >Ngày QĐ tiếp nhận của Trường</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          v-model="neuReceiveDate"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số QĐ gia hạn</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="decisionNumber"
                          placeholder="Nhập số quyết định gia hạn"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Ngày gia hạn</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="decisionDate"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian gia hạn</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="decisionTime"
                          placeholder="Nhập thời gian gia hạn"
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
                      <div class="mb-3">
                        <label class="form-label">Quyết định gia hạn</label>
                        <input
                          type="file"
                          ref="decisionDoc"
                          class="form-control"
                          @change="handlePdfChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handlePdfUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="attachedDocName"
                            disabled
                          />
                        </div>
                        <div v-if="message != ''">{{ message }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="submitForm()" class="btn btn-primary ms-auto">
                      Tạo mới
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
                    <a
                      v-if="item.row.attachedDocLink !== ''"
                      :href="item.row.attachedDocLink"
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
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                        <path
                          d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z"
                        />
                        <path
                          d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"
                        />
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
                                  >Ngày QĐ tiếp nhận của trường</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editStudent.neuReceiveDate"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số QĐ gia hạn</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editStudent.decisionNumber"
                                  placeholder="Nhập số quyết định gia hạn"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày gia hạn</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editStudent.decisionDate"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian gia hạn</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editStudent.decisionTime"
                                  placeholder="Nhập thời gian gia hạn"
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
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quyết định gia hạn</label
                                >
                                <input
                                  type="file"
                                  ref="decisionDoc1"
                                  class="form-control"
                                  @change="handlePdfChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handlePdfUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editStudent.attachedDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editStudent.message != ''">
                                  {{ editStudent.message }}
                                </div>
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
        "attachedDocName",
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
          attachedDocName: "Quyết định gia hạn",
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
      decisionNumber: "",
      decisionDate: "",
      decisionTime: "",
      decisionDoc: null,
      attachedDocName: "",
      message: "",

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
        decisionNumber: "",
        decisionDate: "",
        decisionTime: "",
        decisionDoc: null,
        attachedDocName: "",
        attachedDocLink: "",
        message: "",
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
    handlePdfUpload() {
      this.$refs.decisionDoc.click();
    },
    handlePdfUpload1() {
      this.$refs.decisionDoc1.click();
    },
    handlePdfChange() {
      const file = this.$refs.decisionDoc.files[0];
      console.log(file, "handlePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.decisionDoc = file;
      this.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.message = "";
      } else {
        this.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handlePdfChange1() {
      const file = this.$refs.decisionDoc1.files[0];
      console.log(file, "handlePdfChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editStudent.decisionDoc = file;
      this.editStudent.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editStudent.message = "";
      } else {
        this.editStudent.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },

    async submitForm() {
      console.log("click event submitForm() method");
      try {
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("studentCode", this.studentCode);
        formData.append("birthday", this.birthday);
        formData.append("sex", this.sex);
        formData.append("nation", this.nation);
        formData.append("schoolYear", this.schoolYear);
        formData.append("tempResidence", this.tempResidence);
        formData.append("dien", this.dien);
        formData.append("major", this.major);
        formData.append("courseDuration", this.courseDuration);
        formData.append("monthCount", this.monthCount);
        formData.append("bgdReceiveNumber", this.bgdReceiveNumber);
        formData.append("bgdReceiveDate", this.bgdReceiveDate);
        formData.append("neuReceiveNumber", this.neuReceiveNumber);
        formData.append("neuReceiveDate", this.neuReceiveDate);
        formData.append("expenses", this.expenses);
        formData.append("shp", this.shp);
        formData.append("kpck", this.kpck);
        formData.append("nationalDayExpenses", this.nationalDayExpenses);
        formData.append("tetVnExpenses", this.tetVnExpenses);
        formData.append("tetLaoCamExpenses", this.tetLaoCamExpenses);
        formData.append("travelExpenses", this.travelExpenses);
        formData.append("initExpenses", this.initExpenses);
        formData.append("decisionNumber", this.decisionNumber);
        formData.append("decisionDate", this.decisionDate);
        formData.append("decisionTime", this.decisionTime);
        formData.append("decisionDoc", this.decisionDoc);
        const result = await instance.post("/api/create-student", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
          this.decisionNumber = "";
          this.decisionDate = "";
          this.decisionTime = "";
          this.attachedDocName = "";
          this.decisionDoc = null;
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
      this.editStudent.decisionNumber = item.decisionNumber;
      this.editStudent.decisionDate = item.decisionDate;
      this.editStudent.decisionTime = item.decisionTime;
      this.editStudent.attachedDocName = item.attachedDocName;
      this.editStudent.attachedDocLink = item.attachedDocLink;
      this.editStudent.decisionDoc = null;
      this.editStudent.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      try {
        let formData = new FormData();
        formData.append("name", this.editStudent.name);
        formData.append("studentCode", this.editStudent.studentCode);
        formData.append("birthday", this.editStudent.birthday);
        formData.append("sex", this.editStudent.sex);
        formData.append("nation", this.editStudent.nation);
        formData.append("schoolYear", this.editStudent.schoolYear);
        formData.append("tempResidence", this.editStudent.tempResidence);
        formData.append("dien", this.editStudent.dien);
        formData.append("major", this.editStudent.major);
        formData.append("courseDuration", this.editStudent.courseDuration);
        formData.append("monthCount", this.editStudent.monthCount);
        formData.append("bgdReceiveNumber", this.editStudent.bgdReceiveNumber);
        formData.append("bgdReceiveDate", this.editStudent.bgdReceiveDate);
        formData.append("neuReceiveNumber", this.editStudent.neuReceiveNumber);
        formData.append("neuReceiveDate", this.editStudent.neuReceiveDate);
        formData.append("expenses", this.editStudent.expenses);
        formData.append("shp", this.editStudent.shp);
        formData.append("kpck", this.editStudent.kpck);
        formData.append(
          "nationalDayExpenses",
          this.editStudent.nationalDayExpenses
        );
        formData.append("tetVnExpenses", this.editStudent.tetVnExpenses);
        formData.append(
          "tetLaoCamExpenses",
          this.editStudent.tetLaoCamExpenses
        );
        formData.append("travelExpenses", this.editStudent.travelExpenses);
        formData.append("initExpenses", this.editStudent.initExpenses);
        formData.append("decisionNumber", this.editStudent.decisionNumber);
        formData.append("decisionDate", this.editStudent.decisionDate);
        formData.append("decisionTime", this.editStudent.decisionTime);
        formData.append("decisionDoc1", this.editStudent.decisionDoc);
        formData.append("attachedDocLink", this.editStudent.attachedDocLink);
        formData.append("attachedDocName", this.editStudent.attachedDocName);

        const result = await instance.put(
          `/api/edit-student/${this.editStudent.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
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
