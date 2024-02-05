<template>
  <div class="page">
    <VerticalNavbar :programId="id.length !== 1 ? `${id[1]}` : `${id[0]}`" />
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->
              <h2 class="page-title">
                Quản lí sinh viên đi nước ngoài trao đổi
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
                        <label class="form-label">Khoa/Viện đào tạo</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="department"
                          placeholder="Nhập khoa/viện đào tạo"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Khóa</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="academicYear"
                          placeholder="Nhập khoa/viện đào tạo"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Lớp chuyên ngành</label>
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
                        <label class="form-label">Mã sinh viên</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="studentCode"
                          placeholder="Nhập mã sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Năm học trao đổi</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="exchangeYear"
                          placeholder="Nhập năm học trao đổi"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Thời gian trao đổi</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="exchangeTime"
                          placeholder="Nhập Thời gian trao đổi"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Quốc gia tiếp nhận</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="receivingCountry"
                          placeholder="Nhập quốc gia tiếp nhận"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Trường đối tác</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="partnerUni"
                          placeholder="Nhập Trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Môn học tại trường đối tác</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="subject"
                          placeholder="Nhập môn học tại trường đối tác"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Kết quả học tập</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="result"
                          placeholder="Nhập kết quả học tập"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Công nhận kết quả học tập</label
                        >
                        <select
                          v-model="confirmedResult"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Công nhận kết quả?
                          </option>
                          <option value="Có">Có</option>
                          <option value="Không">Không</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Quyết định cử đi</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="exchangeDecision"
                          placeholder="Nhập môn học tại trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Điểm số được quy đổi</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="convertedScore"
                          placeholder="Nhập môn học tại trường đối tác"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Quyết định cử đi đính kèm</label
                        >
                        <input
                          type="file"
                          ref="attachedExchangeDoc"
                          class="form-control"
                          @change="handleExchangePdfChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handleExchangePdfUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="attachedExDocName"
                            disabled
                          />
                        </div>
                        <div v-if="eMessage != ''">{{ eMessage }}</div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Quyết định quy đổi điểm số đính kèm</label
                        >
                        <input
                          type="file"
                          ref="attachedScoreDoc"
                          class="form-control"
                          @change="handleScorePdfChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handleScorePdfUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="attachedScoreDocName"
                            disabled
                          />
                        </div>
                        <div v-if="sMessage != ''">{{ sMessage }}</div>
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
                  url="/api/get-all-ex-students"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:attachedExchangeDoc="item">
                    {{ item.row.attachedExDocName }}
                    <a
                      :href="item.row.attachedExDocLink"
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
                  </template>
                  <template v-slot:attachedScoreDoc="item">
                    {{ item.row.attachedScoreDocName }}
                    <a
                      :href="item.row.attachedScoreDocLink"
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
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Họ và tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.name"
                                  placeholder="Nhập họ và tên sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày sinh</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExStudent.birthday"
                                  placeholder="Nhập ngày sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Giới tính</label>
                                <select
                                  v-model="editExStudent.sex"
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
                                <label class="form-label"
                                  >Khoa/Viện đào tạo</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.department"
                                  placeholder="Nhập khoa/viện đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Khóa</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.academicYear"
                                  placeholder="Nhập khoa/viện đào tạo"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Lớp chuyên ngành</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.major"
                                  placeholder="Nhập chuyên ngành"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Mã sinh viên</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editExStudent.studentCode"
                                  placeholder="Nhập mã sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Năm học trao đổi</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.exchangeYear"
                                  placeholder="Nhập năm học trao đổi"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Thời gian trao đổi</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.exchangeTime"
                                  placeholder="Nhập Thời gian trao đổi"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quốc gia tiếp nhận</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.receivingCountry"
                                  placeholder="Nhập quốc gia tiếp nhận"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Trường đối tác</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.partnerUni"
                                  placeholder="Nhập Trường đối tác"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Môn học tại trường đối tác</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.subject"
                                  placeholder="Nhập môn học tại trường đối tác"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Kết quả học tập</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.result"
                                  placeholder="Nhập kết quả học tập"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Công nhận kết quả học tập</label
                                >
                                <select
                                  v-model="editExStudent.confirmedResult"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Công nhận kết quả?
                                  </option>
                                  <option value="Có">Có</option>
                                  <option value="Không">Không</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quyết định cử đi</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.exchangeDecision"
                                  placeholder="Nhập môn học tại trường đối tác"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Điểm số được quy đổi</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExStudent.convertedScore"
                                  placeholder="Nhập môn học tại trường đối tác"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quyết định cử đi đính kèm</label
                                >
                                <input
                                  type="file"
                                  ref="attachedExchangeDoc1"
                                  class="form-control"
                                  @change="handleExchangePdfChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handleExchangePdfUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExStudent.attachedExDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editExStudent.eMessage != ''">
                                  {{ editExStudent.eMessage }}
                                </div>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quyết định quy đổi điểm số đính kèm</label
                                >
                                <input
                                  type="file"
                                  ref="attachedScoreDoc1"
                                  class="form-control"
                                  @change="handleScorePdfChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handleScorePdfUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExStudent.attachedScoreDocName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editExStudent.sMessage != ''">
                                  {{ editExStudent.sMessage }}
                                </div>
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
  name: "ExchangeStudentManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "studentCode",
        "department",
        "academicYear",
        "major",
        "exchangeYear",
        "receivingCountry",
        "attachedExchangeDoc",
        "attachedScoreDoc",
        "tool",
      ],
      options: {
        headings: {
          name: "Họ và tên",
          studentCode: "MSSV",
          department: "Khoa/Viện đào tạo",
          academicYear: "Khóa",
          major: "Lớp chuyên ngành",
          exchangeYear: "Năm học trao đổi",
          receivingCountry: "Quốc gia tiếp nhận",
          attachedExchangeDoc: "Quyết định cử đi đính kèm",
          attachedScoreDoc: "Quyết định quy đổi điểm đính kèm",
          tool: "Thao tác",
        },
      },
      name: "",
      birthday: "",
      sex: "",
      department: "",
      academicYear: "",
      major: "",
      studentCode: "",
      exchangeYear: "",
      exchangeTime: "",
      receivingCountry: "",
      partnerUni: "",
      subject: "",
      result: "",
      confirmedResult: "",
      exchangeDecision: "",
      convertedScore: "",
      attachedExchangeDoc: null,
      attachedScoreDoc: null,
      attachedExDocName: "",
      attachedScoreDocName: "",
      sMessage: "",
      eMessage: "",

      displayModal: false,
      displayModalOne: false,

      editExStudent: {
        id: "",
        name: "",
        birthday: "",
        sex: "",
        department: "",
        academicYear: "",
        major: "",
        studentCode: "",
        exchangeYear: "",
        exchangeTime: "",
        receivingCountry: "",
        partnerUni: "",
        subject: "",
        result: "",
        confirmedResult: "",
        exchangeDecision: "",
        convertedScore: "",
        attachedExchangeDoc: null,
        attachedScoreDoc: null,
        attachedScoreDocName: "",
        attachedExDocName: "",
        attachedScoreDocLink: "",
        attachedExDocLink: "",
        eMessage: "",
        sMessage: "",
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
    handleScorePdfUpload() {
      this.$refs.attachedScoreDoc.click();
    },
    handleScorePdfUpload1() {
      this.$refs.attachedScoreDoc1.click();
    },
    handleExchangePdfUpload() {
      this.$refs.attachedExchangeDoc.click();
    },
    handleExchangePdfUpload1() {
      this.$refs.attachedExchangeDoc1.click();
    },
    handleScorePdfChange() {
      const file = this.$refs.attachedScoreDoc.files[0];
      console.log(file, "handleScorePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.attachedScoreDoc = file;
      this.attachedScoreDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.sMessage = "";
      } else {
        this.sMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleScorePdfChange1() {
      const file = this.$refs.attachedScoreDoc1.files[0];
      console.log(file, "handleScorePdfChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExStudent.attachedScoreDoc = file;
      this.editExStudent.attachedScoreDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExStudent.sMessage = "";
      } else {
        this.editExStudent.sMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleExchangePdfChange() {
      const file = this.$refs.attachedExchangeDoc.files[0];
      console.log(file, "handleScorePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.attachedExchangeDoc = file;
      this.attachedExDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.eMessage = "";
      } else {
        this.eMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleExchangePdfChange1() {
      const file = this.$refs.attachedExchangeDoc1.files[0];
      console.log(file, "handleScorePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExStudent.attachedExchangeDoc = file;
      this.editExStudent.attachedExDocName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExStudent.eMessage = "";
      } else {
        this.editExStudent.eMessage =
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
    async submitForm() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("birthday", this.birthday);
      formData.append("sex", this.sex);
      formData.append("department", this.department);
      formData.append("academicYear", this.academicYear);
      formData.append("major", this.major);
      formData.append("studentCode", this.studentCode);
      formData.append("exchangeYear", this.exchangeYear);
      formData.append("exchangeTime", this.exchangeTime);
      formData.append("receivingCountry", this.receivingCountry);
      formData.append("partnerUni", this.partnerUni);
      formData.append("subject", this.subject);
      formData.append("result", this.result);
      formData.append("confirmedResult", this.confirmedResult);
      formData.append("exchangeDecision", this.exchangeDecision);
      formData.append("convertedScore", this.convertedScore);
      formData.append("attachedExchangeDoc", this.attachedExchangeDoc);
      formData.append("attachedScoreDoc", this.attachedScoreDoc);

      try {
        const result = await instance.post("/api/create-ex-student", formData, {
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
          this.birthday = "";
          this.sex = "";
          this.department = "";
          this.academicYear = "";
          this.major = "";
          this.studentCode = "";
          this.exchangeYear = "";
          this.exchangeTime = "";
          this.receivingCountry = "";
          this.partnerUni = "";
          this.subject = "";
          this.result = "";
          this.confirmedResult = "";
          this.exchangeDecision = "";
          this.convertedScore = "";
          this.attachedExchangeDoc = null;
          this.attachedExDocName = "";
          this.attachedScoreDoc = null;
          this.attachedScoreDocName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editExStudent.name = item.name;
      this.editExStudent.birthday = item.birthday;
      this.editExStudent.sex = item.sex;
      this.editExStudent.department = item.department;
      this.editExStudent.academicYear = item.academicYear;
      this.editExStudent.major = item.major;
      this.editExStudent.studentCode = item.studentCode;
      this.editExStudent.exchangeYear = item.exchangeYear;
      this.editExStudent.exchangeTime = item.exchangeTime;
      this.editExStudent.receivingCountry = item.receivingCountry;
      this.editExStudent.partnerUni = item.partnerUni;
      this.editExStudent.subject = item.subject;
      this.editExStudent.result = item.result;
      this.editExStudent.confirmedResult = item.confirmedResult;
      this.editExStudent.exchangeDecision = item.exchangeDecision;
      this.editExStudent.convertedScore = item.convertedScore;
      this.editExStudent.attachedScoreDocName = item.attachedScoreDocName;
      this.editExStudent.attachedExDocName = item.attachedExDocName;
      this.editExStudent.attachedScoreDocLink = item.attachedScoreDocLink;
      this.editExStudent.attachedExDocLink = item.attachedExDocLink;
      this.editExStudent.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("name", this.editExStudent.name);
      formData.append("birthday", this.editExStudent.birthday);
      formData.append("sex", this.editExStudent.sex);
      formData.append("department", this.editExStudent.department);
      formData.append("academicYear", this.editExStudent.academicYear);
      formData.append("major", this.editExStudent.major);
      formData.append("studentCode", this.editExStudent.studentCode);
      formData.append("exchangeYear", this.editExStudent.exchangeYear);
      formData.append("exchangeTime", this.editExStudent.exchangeTime);
      formData.append("receivingCountry", this.editExStudent.receivingCountry);
      formData.append("partnerUni", this.editExStudent.partnerUni);
      formData.append("subject", this.editExStudent.subject);
      formData.append("result", this.editExStudent.result);
      formData.append("confirmedResult", this.editExStudent.confirmedResult);
      formData.append("exchangeDecision", this.editExStudent.exchangeDecision);
      formData.append("convertedScore", this.editExStudent.convertedScore);
      formData.append(
        "attachedExchangeDoc1",
        this.editExStudent.attachedExchangeDoc
      );
      formData.append("attachedScoreDoc1", this.editExStudent.attachedScoreDoc);
      formData.append(
        "attachedScoreDocName",
        this.editExStudent.attachedScoreDocName
      );
      formData.append(
        "attachedExDocName",
        this.editExStudent.attachedExDocName
      );
      formData.append(
        "attachedScoreDocLink",
        this.editExStudent.attachedScoreDocLink
      );
      formData.append(
        "attachedExDocLink",
        this.editExStudent.attachedExDocLink
      );
      try {
        const result = await instance.put(
          `/api/edit-ex-student/${this.editExStudent.id}`,
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
          this.toast.success("Văn bản đã được sửa");
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
          this.editExStudent.attachedDoc = null;
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
            `/api/delete-ex-student/${item._id}`
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
