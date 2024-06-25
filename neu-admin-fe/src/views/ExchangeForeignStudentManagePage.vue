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
                Quản lý sinh viên nước ngoài đến trao đổi
              </h2>
            </div>

            <div class="col-auto ms-auto d-print-none">
              <div class="btn-list">
                <a
                  href="#"
                  class="btn btn-bitbucket d-none d-sm-inline-block"
                  @click="showModal2()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-table-import"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8"
                    />
                    <path d="M3 10h18" />
                    <path d="M10 3v18" />
                    <path d="M19 22v-6" />
                    <path d="M22 19l-3 -3l-3 3" />
                  </svg>
                  Import excel
                </a>
                <a
                  href="#"
                  class="btn btn-lime d-none d-sm-inline-block"
                  @click="getExcelFile()"
                >
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-table-export"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"
                    />
                    <path d="M3 10h18" />
                    <path d="M10 3v18" />
                    <path d="M16 19h6" />
                    <path d="M19 16l3 3l-3 3" />
                  </svg>
                  Export excel
                </a>
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
              <div
                class="modal-dialog modal-dialog-scrollable modal-xl"
                role="document"
              >
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
                  <div class="modal-body">
                    <div class="mb-3 row row-cards">
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
                          <select
                            v-model="sex"
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
                          <label class="form-label">Chức vụ</label>
                          <select
                            v-model="position"
                            class="form-select"
                            tabindex="-1"
                          >
                            <option value="" disabled selected>
                              Chọn chức vụ
                            </option>
                            <option value="Giảng viên">Giảng viên</option>
                            <option value="Sinh viên">Sinh viên</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Bậc học (Trường đối tác)</label
                          >
                          <select
                            v-model="educationLevel"
                            class="form-select"
                            tabindex="-1"
                          >
                            <option value="" disabled selected>
                              Chọn bậc học
                            </option>
                            <option value="Cử nhân">Cử nhân</option>
                            <option value="Thạc sỹ">Thạc sỹ</option>
                            <option value="Tiến sỹ">Tiến sỹ</option>
                            <option value="Sau tiến sỹ">Sau tiến sỹ</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Chuyên ngành (Trường đối tác)</label
                          >
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
                          <label class="form-label"
                            >Mã sinh viên/Giảng viên (NEU)</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="studentCode"
                            placeholder="Nhập mã sinh viên/giảng viên"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Đơn vị tiếp nhận (NEU)</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="unit"
                            placeholder="Nhập đơn vị tiếp nhận"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Quyết định tiếp nhận (NEU)</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="receptionDecision"
                            placeholder="Nhập quyết định tiếp nhận"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="mb-3">
                          <label class="form-label">Thời gian tiếp nhận</label>
                          <input
                            type="date"
                            class="form-control"
                            v-model="receptionTime"
                            placeholder="Nhập thời gian tiếp nhận"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Năm học tiếp nhận</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="receptionYear"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Văn bản đính kèm</label>
                          <input
                            type="file"
                            ref="attachedDoc"
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
                    <div class="mb-3">
                      <label class="form-label"
                        >Công nhận kết quả học tập (NEU)</label
                      >
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <thead>
                            <tr class="g-2 align-items-center">
                              <th style="width: 60%">Tên môn học</th>
                              <th>Đơn vị đào tạo</th>
                              <th>Kết quả</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td>
                                <textarea
                                  class="form-control"
                                  row="1"
                                  placeholder="Nhập tên môn học"
                                  v-model="resultSubject"
                                ></textarea>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Nhập đơn vị đào tạo"
                                  v-model="resultTrainingUnit"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Nhập kết quả"
                                  v-model="resultPoint"
                                />
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
                            <tr v-for="(item, index) in results">
                              <td>{{ item.subjectName }}</td>
                              <td>{{ item.trainingUnit }}</td>
                              <td>{{ item.point }}</td>
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
                      Tạo mới
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="displayModalTwo"
              class="modal modal-blur fade show"
              tabindex="-1"
              style="display: block"
              aria-modal="true"
            >
              <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Import dữ liệu</h5>
                    <button
                      @click="hideModal2()"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body row row-cards">
                    <div class="mb-3">
                      <a
                        href="#"
                        class="btn btn-green d-none d-sm-inline-block"
                        @click="downloadTemplate()"
                      >
                        <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
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
                          class="icon icon-tabler icons-tabler-outline icon-tabler-download"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
                          />
                          <path d="M7 11l5 5l5 -5" />
                          <path d="M12 4l0 12" />
                        </svg>
                        Tải file excel mẫu
                      </a>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Upload import file</label>
                      <input
                        type="file"
                        ref="importExFStudentsDoc"
                        class="form-control"
                        @change="handleExcelChange()"
                        style="display: none"
                      />
                      <div class="card">
                        <button
                          @click="handleExcelUpload()"
                          class="btn btn-outline-primary w-100"
                        >
                          Choose File
                        </button>
                        <input
                          type="text"
                          class="form-control"
                          v-model="importExFStudentsDocName"
                          disabled
                        />
                      </div>
                      <div v-if="importDocMessage != ''">
                        {{ importDocMessage }}
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a @click="importFile()" class="btn btn-primary ms-auto">
                      Import file
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
                  url="/api/get-all-ex-f-students"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedDoc="item">
                    <a
                      v-if="item.row.attachedDocLink !== 'undefined'"
                      :href="item.row.attachedDocLink"
                    >
                      {{ item.row.attachedDocName }}
                    </a>
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
                  </template>
                </v-server-table>
                <div
                  v-if="displayModalOne"
                  class="modal modal-blur fade show"
                  id="modal-report-one"
                  tabindex="-1"
                  style="display: block"
                  aria-modal="true"
                >
                  <div
                    class="modal-dialog modal-dialog-scrollable modal-xl"
                    role="document"
                  >
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
                      <div class="modal-body">
                        <div class="mb-3 row row-cards">
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label">Họ và tên</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.name"
                                placeholder="Nhập họ và tên sinh viên"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Ngày sinh</label>
                              <input
                                type="date"
                                class="form-control"
                                v-model="editExForeignStudent.birthday"
                                placeholder="Nhập ngày sinh"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Giới tính</label>
                              <select
                                v-model="editExForeignStudent.sex"
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
                              <label class="form-label">Chức vụ</label>
                              <select
                                v-model="editExForeignStudent.position"
                                class="form-select"
                                tabindex="-1"
                              >
                                <option value="" disabled selected>
                                  Chọn chức vụ
                                </option>
                                <option value="Giảng viên">Giảng viên</option>
                                <option value="Sinh viên">Sinh viên</option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Bậc học (Trường đối tác)</label
                              >
                              <select
                                v-model="editExForeignStudent.educationLevel"
                                class="form-select"
                                tabindex="-1"
                              >
                                <option value="" disabled selected>
                                  Chọn bậc học
                                </option>
                                <option value="Cử nhân">Cử nhân</option>
                                <option value="Thạc sỹ">Thạc sỹ</option>
                                <option value="Tiến sỹ">Tiến sỹ</option>
                                <option value="Sau tiến sỹ">Sau tiến sỹ</option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Chuyên ngành (Trường đối tác)</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.major"
                                placeholder="Nhập chuyên ngành"
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label"
                                >Mã sinh viên/Giảng viên (NEU)</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.studentCode"
                                placeholder="Nhập mã sinh viên/giảng viên"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Đơn vị tiếp nhận (NEU)</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.unit"
                                placeholder="Nhập đơn vị tiếp nhận"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Quyết định tiếp nhận (NEU)</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.receptionDecision"
                                placeholder="Nhập quyết định tiếp nhận"
                              />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="mb-3">
                              <label class="form-label"
                                >Thời gian tiếp nhận</label
                              >
                              <input
                                type="date"
                                class="form-control"
                                v-model="editExForeignStudent.receptionTime"
                                placeholder="Nhập thời gian tiếp nhận"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label"
                                >Năm học tiếp nhận</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                v-model="editExForeignStudent.receptionYear"
                              />
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Văn bản đính kèm</label>
                              <input
                                type="file"
                                ref="attachedDoc1"
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
                                  v-model="editExForeignStudent.attachedDocName"
                                  disabled
                                />
                              </div>
                              <div v-if="message != ''">{{ message }}</div>
                            </div>
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="form-label"
                            >Công nhận kết quả học tập (NEU)</label
                          >
                          <div class="table-responsive">
                            <table class="table mb-0">
                              <thead>
                                <tr class="g-2 align-items-center">
                                  <th style="width: 60%">Tên môn học</th>
                                  <th>Đơn vị đào tạo</th>
                                  <th>Kết quả</th>
                                  <th>Thao tác</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td>
                                    <textarea
                                      class="form-control"
                                      row="1"
                                      placeholder="Nhập tên môn học"
                                      v-model="
                                        editExForeignStudent.resultSubject
                                      "
                                    ></textarea>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Nhập đơn vị đào tạo"
                                      v-model="
                                        editExForeignStudent.resultTrainingUnit
                                      "
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      class="form-control"
                                      placeholder="Nhập kết quả"
                                      v-model="editExForeignStudent.resultPoint"
                                    />
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
                                  v-for="(
                                    item, index
                                  ) in editExForeignStudent.results"
                                >
                                  <td>{{ item.subjectName }}</td>
                                  <td>{{ item.trainingUnit }}</td>
                                  <td>{{ item.point }}</td>
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
                        <a @click="onSubmit()" class="btn btn-primary ms-auto">
                          Chỉnh sửa
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
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
  name: "ExchangeForeignStudentManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "studentCode",
        "position",
        "educationLevel",
        "major",
        "unit",
        "attachedDoc",
        "tool",
      ],
      options: {
        headings: {
          name: "Họ và tên",
          studentCode: "MSSV (NEU)",
          position: "Chức vụ",
          educationLevel: "Bậc học (Trường đối tác)",
          major: "Chuyên ngành (Trường đối tác)",
          unit: "Đơn vị tiếp nhận (NEU)",
          attachedDoc: "Văn bản đính kèm",
          tool: "Thao tác",
        },
      },
      name: "",
      studentCode: "",
      position: "",
      educationLevel: "",
      receptionTime: "",
      receptionYear: "",
      birthday: "",
      sex: "",
      major: "",
      unit: "",
      receptionDecision: "",

      attachedDoc: null,
      attachedDocName: "",
      message: "",
      results: [],
      resultSubject: "",
      resultTrainingUnit: "",
      resultPoint: "",

      importExFStudentsDoc: null,
      importExFStudentsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      editExForeignStudent: {
        id: "",
        name: "",
        studentCode: "",
        position: "",
        educationLevel: "",
        receptionTime: "",
        receptionYear: "",
        birthday: "",
        sex: "",
        major: "",
        unit: "",
        receptionDecision: "",
        attachedDoc: null,
        attachedDocName: "",
        attachedDocLink: "",
        message: "",
        results: [],
        resultSubject: "",
        resultTrainingUnit: "",
        resultPoint: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
    handlePdfUpload() {
      this.$refs.attachedDoc.click();
    },
    handlePdfUpload1() {
      this.$refs.attachedDoc1.click();
    },
    handlePdfChange() {
      const file = this.$refs.attachedDoc.files[0];
      console.log(file, "handlePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.attachedDoc = file;
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
      const file = this.$refs.attachedDoc1.files[0];
      console.log(file, "handlePdfChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExForeignStudent.attachedDoc = file;
      this.editExForeignStudent.attachedDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExForeignStudent.message = "";
      } else {
        this.editExForeignStudent.message =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
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
    handleExcelUpload() {
      this.$refs.importExFStudentsDoc.click();
    },
    handleExcelChange() {
      const file = this.$refs.importExFStudentsDoc.files[0];
      console.log(file, "file handleExcelChange()");
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importExFStudentsDoc = file;
      this.importExFStudentsDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.importDocMessage = "";
      } else {
        this.importDocMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp, file phải có đuôi .xlsx";
      }
    },
    async submitForm() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("studentCode", this.studentCode);
      formData.append("position", this.position);
      formData.append("educationLevel", this.educationLevel);
      formData.append("receptionTime", this.receptionTime);
      formData.append("receptionYear", this.receptionYear);
      formData.append("birthday", this.birthday);
      formData.append("sex", this.sex);
      formData.append("major", this.major);
      formData.append("unit", this.unit);
      formData.append("receptionDecision", this.receptionDecision);
      formData.append("attachedExFStuDoc", this.attachedDoc);
      formData.append("results", JSON.stringify(this.results));

      try {
        console.log(this.attachedDoc, "attachedExFStuDoc formData");
        const result = await instance.post(
          "/api/create-ex-f-student",
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
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.name = "";
          this.position = "";
          this.studentCode = "";
          this.receptionTime = "";
          this.receptionYear = "";
          this.educationLevel = "";
          this.birthday = "";
          this.sex = "";
          this.major = "";
          this.unit = "";
          this.receptionDecision = "";
          this.attachedDoc = null;
          this.attachedDocName = "";
          this.results = [];
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      // let receptionTime = item.receptionTime
      // let birthday = item.birthday
      // let a_receptionTime = receptionTime.split("/")
      // let a_birthday = birthday.split("/")
      // receptionTime = a_receptionTime[2] + "-" + a_receptionTime[1] + "-" + a_receptionTime[0]
      // birthday = a_birthday[2] + "-" + a_birthday[1] + "-" + a_birthday[0]

      console.log(item.results, "item.results onEdit");
      this.editExForeignStudent.name = item.name;
      this.editExForeignStudent.position = item.position;
      this.editExForeignStudent.studentCode = item.studentCode;
      this.editExForeignStudent.receptionTime = item.receptionTime;
      this.editExForeignStudent.receptionYear = item.receptionYear;
      this.editExForeignStudent.educationLevel = item.educationLevel;
      this.editExForeignStudent.birthday = item.birthday;
      this.editExForeignStudent.sex = item.sex;
      this.editExForeignStudent.major = item.major;
      this.editExForeignStudent.unit = item.unit;
      this.editExForeignStudent.receptionDecision = item.receptionDecision;
      this.editExForeignStudent.attachedDocName = item.attachedDocName;
      this.editExForeignStudent.attachedDocLink = item.attachedDocLink;
      this.editExForeignStudent.results = item.results;
      this.editExForeignStudent.id = item._id;
      console.log(
        this.editExForeignStudent.results,
        "this.editExForeignStudent.results onEdit"
      );
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("name", this.editExForeignStudent.name);
      formData.append("studentCode", this.editExForeignStudent.studentCode);
      formData.append("position", this.editExForeignStudent.position);
      formData.append(
        "educationLevel",
        this.editExForeignStudent.educationLevel
      );
      formData.append("receptionTime", this.editExForeignStudent.receptionTime);
      formData.append("receptionYear", this.editExForeignStudent.receptionYear);
      formData.append("birthday", this.editExForeignStudent.birthday);
      formData.append("sex", this.editExForeignStudent.sex);
      formData.append("major", this.editExForeignStudent.major);
      formData.append("unit", this.editExForeignStudent.unit);
      formData.append(
        "receptionDecision",
        this.editExForeignStudent.receptionDecision
      );
      formData.append(
        "attachedExFStuDoc1",
        this.editExForeignStudent.attachedDoc
      );
      formData.append(
        "attachedDocName",
        this.editExForeignStudent.attachedDocName
      );
      formData.append(
        "attachedDocLink",
        this.editExForeignStudent.attachedDocLink
      );
      formData.append(
        "results",
        JSON.stringify(this.editExForeignStudent.results)
      );
      try {
        const result = await instance.put(
          `/api/edit-ex-f-student/${this.editExForeignStudent.id}`,
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
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
          this.editExForeignStudent.attachedDoc = null;
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
            `/api/delete-ex-f-student/${item._id}`
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
    async getExcelFile() {
      try {
        const queryParams = { id: this.id };
        const result = await instance.get("/api/export-excel-exfstudents", {
          params: queryParams,
        });
        const excelFilePath = result.data.path;
        console.log(excelFilePath, "excelFilePath getExcelFile()");
        location.href = excelFilePath;
      } catch (error) {
        console.log(error, "/api/export-excel-exfstudents catch block error");
      }
    },
    plusResult() {
      this.results.push({
        subjectName: this.resultSubject,
        trainingUnit: this.resultTrainingUnit,
        point: this.resultPoint,
      });
      console.log(this.results, "plusResult");
      this.resultSubject = "";
      this.resultTrainingUnit = "";
      this.resultPoint = "";
      return this.results;
    },
    plusResult1() {
      this.editExForeignStudent.results.push({
        subjectName: this.editExForeignStudent.resultSubject,
        trainingUnit: this.editExForeignStudent.resultTrainingUnit,
        point: this.editExForeignStudent.resultPoint,
      });
      console.log(this.editExForeignStudent.results, "plusResult1");
      this.editExForeignStudent.resultSubject = "";
      this.editExForeignStudent.resultPoint = "";
      this.editExForeignStudent.resultTrainingUnit = "";
      return this.editExForeignStudent.results;
    },
    deleteResult(index) {
      this.results.splice(index, 1);
      console.log(this.results, "deleteResult");
    },
    deleteResult1(index) {
      this.editExForeignStudent.results.splice(index, 1);
      console.log(this.editExForeignStudent.results, "deleteResult1");
    },
    async downloadTemplate() {
      try {
        const result = await instance.get("/api/get-exfstudents-template");
        const templateLink = result.data.path;
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(error, "/api/get-exfstudents-template catch block error");
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append("exfstudents-import-file", this.importExFStudentsDoc);
        formData.append("programId", this.id);
        const result = await instance.post(
          "/api/import-exfstudents-data",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(result, "result importFile()");
        if (result.data.error === true) {
          this.toast.error(result.data.message);
        } else {
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.importExFStudentsDoc = null;
          this.importExFStudentsDocName = "";
          this.displayModalTwo = false;
        }
      } catch (error) {
        console.log(error, "/api/import-exfstudents-data catch block error");
      }
    },
  },
};
</script>

<style scoped></style>
