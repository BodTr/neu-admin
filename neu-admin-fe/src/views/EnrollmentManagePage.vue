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
                        <label class="form-label">Năm học</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="year"
                          placeholder="Nhập năm học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chỉ tiêu tuyển sinh</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="enrollmentCount"
                          placeholder="Nhập chỉ tiêu tuyển sinh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số sinh viên nhập học</label>
                        <input
                          type="number"
                          v-model="admissionCount"
                          class="form-control"
                          placeholder="Nhập số sinh viên nhập học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Số sinh viên chuyển tiếp</label
                        >
                        <input
                          type="number"
                          v-model="transferStudents"
                          class="form-control"
                          placeholder="Nhập số sinh viên chuyển tiếp"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Số sinh viên tốt nghiệp</label
                        >
                        <input
                          type="number"
                          v-model="graduatedCount"
                          class="form-control"
                          placeholder="Nhập số sinh viên tốt nghiệp"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label"
                          >Quy mô tuyển sinh theo đề án</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="applicantsCount"
                          placeholder="Nhập Quy mô tuyển sinh theo đề án"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Số sinh viên trúng tuyển</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="admittedStudents"
                          placeholder="Nhập số sinh viên trúng tuyển"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số sinh viên thôi học</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="dropoutCount"
                          placeholder="Nhập số sinh viên thôi học"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số sinh viên bảo lưu</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="reservedStudents"
                          placeholder="Nhập số sinh viên bảo lưu"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Tổng số sinh viên đang đào tạo</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="trainingStudents"
                          placeholder="Nhập số sinh viên đang đào tạo"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-label required">
                        Các quyết định liên quan đến tuyển sinh
                      </div>
                      <input
                        type="file"
                        name="docs"
                        class="form-control"
                        ref="enrollmentDocs"
                        @change="handleFilesUpload()"
                        style="display: none"
                        id="docs_file"
                        multiple
                      />

                      <div id="filesUploadControl" class="card">
                        <a
                          id="btnF"
                          @click="handleDocsUpload()"
                          class="btn btn-outline-primary w-100"
                          >Choose Files</a
                        >
                        <div
                          v-for="(doc, index) in docs"
                          :key="index"
                          class="list-group card-list-group"
                        >
                          <div class="list-group-item">
                            <div class="row g-2 align-items-center">
                              <div class="col">
                                {{ doc.name }}
                                <div
                                  class="text-muted"
                                  v-if="doc.invalidMessage"
                                >
                                  {{ doc.invalidMessage }}
                                </div>
                              </div>
                              <div class="col-auto">
                                <button
                                  class="btn btn-pinterest w-100 btn-icon"
                                  @click="deleteDoc(index)"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-x-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                        ref="importEnrollmentsDoc"
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
                          v-model="importEnrollmentsDocName"
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
                  url="/api/get-all-enrollments"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:enrollmentDocs="item">
                    <div
                      v-for="(doc, index) in item.row.enrollmentDocs"
                      :key="index"
                      class="mb-1"
                    >
                      <a :href="doc.docLink">
                        {{ doc.docName }}
                      </a>
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
                                <label class="form-label">Năm học</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.year"
                                  placeholder="Nhập năm học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Chỉ tiêu tuyển sinh</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.enrollmentCount"
                                  placeholder="Nhập chỉ tiêu tuyển sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên nhập học</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.admissionCount"
                                  placeholder="Nhập số sinh viên nhập học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên chuyển tiếp</label
                                >
                                <input
                                  type="number"
                                  v-model="editEnroll.transferStudents"
                                  class="form-control"
                                  placeholder="Nhập số sinh viên chuyển tiếp"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên tốt nghiệp</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.graduatedCount"
                                  placeholder="Nhập tên văn bằng"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label"
                                  >Quy mô tuyển sinh theo đề án</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.applicantsCount"
                                  placeholder="Nhập Quy mô tuyển sinh theo đề án"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên trúng tuyển</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.admittedStudents"
                                  placeholder="Nhập số sinh viên trúng tuyển"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên thôi học</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.dropoutCount"
                                  placeholder="Nhập số sinh viên thôi học"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số sinh viên bảo lưu</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.reservedStudents"
                                  placeholder="Nhập số sinh viên bảo lưu"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tổng số sinh viên đang đào tạo</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  v-model="editEnroll.trainingStudents"
                                  placeholder="Nhập số sinh viên đang đào tạo"
                                />
                              </div>
                            </div>
                            <div class="mb-3">
                              <div class="form-label required">
                                Các quyết định liên quan đến tuyển sinh
                              </div>
                              <input
                                type="file"
                                name="docs"
                                class="form-control"
                                ref="enrollmentDocs1"
                                @change="handleFilesUpload1()"
                                style="display: none"
                                id="docs_file"
                                multiple
                              />

                              <div id="filesUploadControl1" class="card">
                                <a
                                  id="btnF"
                                  @click="handleDocsUpload1()"
                                  class="btn btn-outline-primary w-100"
                                  >Choose Files</a
                                >
                                <div
                                  v-for="(doc, index) in editEnroll.docs"
                                  :key="index"
                                  class="list-group card-list-group"
                                >
                                  <div class="list-group-item">
                                    <div class="row g-2 align-items-center">
                                      <div class="col">
                                        {{ doc.name }}
                                        <div
                                          class="text-muted"
                                          v-if="doc.invalidMessage"
                                        >
                                          {{ doc.invalidMessage }}
                                        </div>
                                      </div>
                                      <div class="col-auto">
                                        <button
                                          class="btn btn-pinterest w-100 btn-icon"
                                          @click="deleteDoc1(index)"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-x-lg"
                                            viewBox="0 0 16 16"
                                          >
                                            <path
                                              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
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
import { useToast } from "vue-toastification";
import router from "@/router";
import _ from "lodash";
import { formToJSON } from "axios";
export default {
  name: "EnrollmentManagePage",

  data() {
    return {
      columns: [
        "stt",
        "year",
        "applicantsCount",
        "admissionCount",
        "dropoutCount",
        "graduatedCount",
        "trainingStudents",
        "enrollmentDocs",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          year: "Năm học",
          applicantsCount: "Quy mô tuyển sinh theo đề án",
          admissionCount: "Số sinh viên nhập học",
          dropoutCount: "Số sinh viên thôi học",
          graduatedCount: "Số sinh viên tốt nghiệp",
          trainingStudents: "Tổng số sinh viên đang đào tạo",
          enrollmentDocs: "Các quyết định tuyển sinh",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      year: "",
      enrollmentCount: "",
      admissionCount: "",
      transferStudents: "",
      graduatedCount: "",
      applicantsCount: "",
      admittedStudents: "",
      dropoutCount: "",
      reservedStudents: "",
      trainingStudents: "",
      docs: [], // array này để quản lí các file chuẩn bị đc up lên sv ở phía fe
      uploadDocs: [], // array này ms là array các doc thật sự để up lên sv

      importEnrollmentsDoc: null,
      importEnrollmentsDocName: "",
      importDocMessage: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,

      editEnroll: {
        id: "",
        year: "",
        enrollmentCount: "",
        admissionCount: "",
        transferStudents: "",
        graduatedCount: "",
        applicantsCount: "",
        admittedStudents: "",
        dropoutCount: "",
        reservedStudents: "",
        trainingStudents: "",
        docs: [],
        uploadDocs: [],
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
    showModal2() {
      this.displayModalTwo = true;
    },
    hideModal2() {
      this.displayModalTwo = false;
    },
    handleFilesUpload() {
      const docs = this.$refs.enrollmentDocs.files;
      console.log(docs);
      this.uploadDocs = [...this.uploadDocs, ...docs];
      // [1] this.docs = [...this.docs, ...docs] // gộp 2 array this.docs là array lưu trong data, docs là array các files đc lưu lại khi ta chọn các file từ máy

      this.docs = [
        ...this.docs,
        ..._.map(docs, (doc) => {
          return {
            name: doc.name,
            size: doc.size,
            type: doc.type,
            invalidMessage: this.validate(doc),
          };
        }),
      ];
      console.log(this.docs);
    },
    handleFilesUpload1() {
      const docs = this.$refs.enrollmentDocs1.files;
      console.log(docs);
      this.editEnroll.uploadDocs = [...this.editEnroll.uploadDocs, ...docs];
      // [1] this.docs = [...this.docs, ...docs] // gộp 2 array this.docs là array lưu trong data, docs là array các files đc lưu lại khi ta chọn các file từ máy

      this.editEnroll.docs = [
        ...this.editEnroll.docs,
        ..._.map(docs, (doc) => {
          return {
            name: doc.name,
            size: doc.size,
            type: doc.type,
            invalidMessage: this.validate(doc),
          };
        }),
      ];
      console.log(this.docs);
    },
    handleExcelUpload() {
      this.$refs.importEnrollmentsDoc.click();
    },
    handleExcelChange() {
      const file = this.$refs.importEnrollmentsDoc.files[0]
      console.log(file, "file handleExcelChange()")
      const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.importEnrollmentsDoc = file;
      this.importEnrollmentsDocName = file.name
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.importDocMessage = "";
      } else {
        this.importDocMessage = tooLarge && allowedTypes.includes(file.type) ? `File quá nặng, giới hạn kích thước là ${MAX_SIZE / (1024 * 1024)}Mb` : "Định dạng file không phù hợp, file phải có đuôi .xlsx"
      }
    },
    validate(doc) {
      const MAX_SIZE = 20 * 1024 * 1024;
      const allowedTypes = ["application/pdf"];

      if (doc.size > MAX_SIZE) {
        return `Vượt quá dung lượng: ${MAX_SIZE / (1024 * 1024)}Mb`;
      } else if (!allowedTypes.includes(doc.type)) {
        return "Không phải file pdf";
      } else {
        return "";
      }
    },
    handleDocsUpload() {
      this.$refs.enrollmentDocs.click();
    },
    handleDocsUpload1() {
      this.$refs.enrollmentDocs1.click();
    },
    deleteDoc1(index) {
      this.editEnroll.docs.splice(index, 1);
      console.log(this.editEnroll.docs, "this.editEnroll.docs deleteDoc1");
      this.editEnroll.uploadDocs.splice(index, 1);
      console.log(
        this.editEnroll.uploadDocs,
        "this.editEnroll.uploadDocs deleteDoc1"
      );
    },
    deleteDoc(index) {
      this.docs.splice(index, 1);
      console.log(this.docs, "this.docs deleteDoc");
      this.uploadDocs.splice(index, 1);
      console.log(this.uploadDocs, "this.uploadDocs deleteDoc");
    },
    async submitForm() {
      try {
        // files input validate ở fe, check xem các file up lên có lỗi ko
        let canUpload = false;
        const trueFalseArr = this.docs.map((doc) => {
          // nếu trong array docs có phần tử nào không phù hợp invalidMessage !== "" thì sẽ lưu trong trueFalseArr là false
          if (doc.invalidMessage === "") {
            return "true";
          } else {
            return "false";
          }
        });
        console.log(trueFalseArr, "trueFalseArr submitForm() method");
        if (trueFalseArr.includes("false")) {
          // Nếu array trueFalseArr có 1 phần tử mang giá trị 'false' có nghĩa là có file up lên lỗi (có thể sai định dạng hoặc dung lượng lớn), khi đó ta trả về giá trị canUpload = false, ngược lại thì canUpload = true
          canUpload = false;
          // return canUpload;
        } else {
          canUpload = true;
          // return canUpload;
        }
        console.log(canUpload, "canUpload submitForm() method");

        if (!canUpload) {
          // nếu giá trị canUpload = false ta sẽ không gọi api create-enrollment, gửi thông báo cho người dùng sửa những file đã up lên
          this.toast.error("File upload cần đúng định dạng pdf/dưới 20Mb");
        } else {
          // giá trị canUpload = true, gọi api create-enrollment
          console.log(this.id, "post api program id");
          let formData = new FormData();
          formData.append("programId", this.id);
          formData.append("year", this.year);
          formData.append("enrollmentCount", this.enrollmentCount);
          formData.append("admissionCount", this.admissionCount);
          formData.append("transferStudents", this.transferStudents);
          formData.append("graduatedCount", this.graduatedCount);
          formData.append("applicantsCount", this.applicantsCount);
          formData.append("trainingStudents", this.trainingStudents);
          formData.append("admittedStudents", this.admittedStudents);
          formData.append("dropoutCount", this.dropoutCount);
          formData.append("reservedStudents", this.reservedStudents);
          _.forEach(this.uploadDocs, (doc) => {
            formData.append("enrollmentDocs", doc);
          });
          const result = await instance.post(
            "/api/create-enrollment",
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
            this.year = "";
            this.enrollmentCount = "";
            this.admissionCount = "";
            this.transferStudents = "";
            this.graduatedCount = "";
            this.applicantsCount = "";
            this.trainingStudents = "";
            this.admittedStudents = "";
            this.dropoutCount = "";
            this.reservedStudents = "";
            this.docs = [];
            this.uploadDocs = [];
          }
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      const docRefsArr = item.enrollmentDocs.map((doc) => {
        const MAX_SIZE = 20 * 1024 * 1024;
        const allowedTypes = ["application/pdf"];
        let invalidMessage = "";
        if (doc.docSize > MAX_SIZE) {
          invalidMessage = `Vượt quá dung lượng: ${MAX_SIZE / (1024 * 1024)}Mb`;
        } else if (!allowedTypes.includes(doc.docType)) {
          invalidMessage = "Không phải file pdf";
        } else {
          invalidMessage = "";
        }
        return {
          name: doc.docName,
          size: doc.docSize,
          type: doc.docType,
          link: doc.docLink,
          invalidMessage: invalidMessage,
        };
      });
      if (item.year === null) {
        this.editEnroll.year = "";
      } else {
        this.editEnroll.year = item.year;
      }

      if (item.enrollmentCount === null) {
        this.editEnroll.enrollmentCount = "";
      } else {
        this.editEnroll.enrollmentCount = item.enrollmentCount;
      }

      if (item.admissionCount === null) {
        this.editEnroll.admissionCount = "";
      } else {
        this.editEnroll.admissionCount = item.admissionCount;
      }

      if (item.transferStudents === null) {
        this.editEnroll.transferStudents = "";
      } else {
        this.editEnroll.transferStudents = item.transferStudents;
      }

      if (item.graduatedCount === null) {
        this.editEnroll.graduatedCount = "";
      } else {
        this.editEnroll.graduatedCount = item.graduatedCount;
      }

      if (item.applicantsCount === null) {
        this.editEnroll.applicantsCount = "";
      } else {
        this.editEnroll.applicantsCount = item.applicantsCount;
      }

      if (item.trainingStudents === null) {
        this.editEnroll.trainingStudents = "";
      } else {
        this.editEnroll.trainingStudents = item.trainingStudents;
      }

      if (item.admittedStudents === null) {
        this.editEnroll.admittedStudents = "";
      } else {
        this.editEnroll.admittedStudents = item.admittedStudents;
      }

      if (item.admittedStudents === null) {
        this.editEnroll.admittedStudents = "";
      } else {
        this.editEnroll.admittedStudents = item.admittedStudents;
      }

      if (item.dropoutCount === null) {
        this.editEnroll.dropoutCount = "";
      } else {
        this.editEnroll.dropoutCount = item.dropoutCount;
      }

      if (item.reservedStudents === null) {
        this.editEnroll.reservedStudents = "";
      } else {
        this.editEnroll.reservedStudents = item.reservedStudents;
      }

      this.editEnroll.docs = docRefsArr;
      this.editEnroll.uploadDocs = [];
      this.editEnroll.id = item._id;
      this.showModal1();
      console.log(this.editEnroll.docs, "this.editEnroll.docs");
    },

    async onSubmit() {
      try {
        let canUpload = false;
        const trueFalseArr = this.docs.map((doc) => {
          // nếu trong array docs có phần tử nào không phù hợp invalidMessage !== "" thì sẽ lưu trong trueFalseArr là false
          if (doc.invalidMessage === "") {
            return "true";
          } else {
            return "false";
          }
        });
        console.log(trueFalseArr, "trueFalseArr onSubmitForm() method");

        if (trueFalseArr.includes("false")) {
          // Nếu array trueFalseArr có 1 phần tử mang giá trị 'false' có nghĩa là có file up lên lỗi (có thể sai định dạng hoặc dung lượng lớn), khi đó ta trả về giá trị canUpload = false, ngược lại thì canUpload = true
          canUpload = false;
          // return canUpload;
        } else {
          canUpload = true;
          // return canUpload;
        }
        console.log(canUpload, "canUpload onSubmitForm() method");
        if (!canUpload) {
          this.toast.error("File upload cần đúng định dạng pdf/dưới 20Mb");
        } else {
          const docsState = {
            docs1Refs: this.editEnroll.docs,
          };
          let formData = new FormData();
          formData.append("programId", this.id);
          formData.append("year", this.editEnroll.year);
          formData.append("enrollmentCount", this.editEnroll.enrollmentCount);
          formData.append("admissionCount", this.editEnroll.admissionCount);
          formData.append("transferStudents", this.editEnroll.transferStudents);
          formData.append("graduatedCount", this.editEnroll.graduatedCount);
          formData.append("applicantsCount", this.editEnroll.applicantsCount);
          formData.append("trainingStudents", this.editEnroll.trainingStudents);
          formData.append("admittedStudents", this.editEnroll.admittedStudents);
          formData.append("dropoutCount", this.editEnroll.dropoutCount);
          formData.append("reservedStudents", this.editEnroll.reservedStudents);
          formData.append("docsState", JSON.stringify(docsState));
          _.forEach(this.editEnroll.uploadDocs, (doc) => {
            formData.append("enrollmentDocs1", doc);
          });
          const result = await instance.put(
            `/api/edit-enrollment/${this.editEnroll.id}`,
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
          }
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
            `/api/delete-enrollment/${item._id}`
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
        const result = await instance.get("/api/export-excel-enrollments", {
          params: queryParams,
        });
        const excelFilePath = result.data.path;
        console.log(excelFilePath, "excelFilePath getExcelFile()");
        location.href = excelFilePath;
      } catch (error) {
        console.log(error, "/api/export-excel-enrollments catch block error");
      }
    },
    async downloadTemplate() {
      try {
        const result = await instance.get("/api/get-enrollments-template")
        const templateLink = result.data.path
        console.log(templateLink, "templateLink downloadTemplate()");
        location.href = templateLink;
      } catch (error) {
        console.log(
          error,
          "/api/get-enrollments-template catch block error"
        );
      }
    },
    async importFile() {
      try {
        let formData = new FormData();
        formData.append("enrollments-import-file", this.importEnrollmentsDoc)
        formData.append("programId", this.id)
        const result = await instance.post("/api/import-enrollments-data", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
        console.log(result, "result importFile()")
        if (result.data.error === true) {
          this.toast.error(result.data.message);
        } else {
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.importEnrollmentsDoc = null;
          this.importEnrollmentsDocName = ""
          this.displayModalTwo = false
        }

      } catch (error) {
        console.log(error, "/api/import-enrollments-data catch block error");
      }
    },
  },
};
</script>

<style scoped></style>
