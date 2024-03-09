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
                Quản lý cấp/gia hạn visa cho giảng viên/sinh viên nước ngoài
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
                        <label class="form-label">Quốc tịch</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="nationality"
                          placeholder="Nhập quốc tịch"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số hộ chiếu</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="visaCode"
                          placeholder="Nhập "
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="phoneNumber"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Nghề nghiệp</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="job"
                          placeholder="Nhập nghề nghiệp"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mục đích</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="purpose"
                          placeholder="Nhập mục đích"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mã số sinh viên</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="studentCode"
                          placeholder="Nhập mã số sinh viên"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số giấy phép lao động</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="workPermit"
                          placeholder="Nhập số giấy phép lao động"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Loại hộ chiếu</label>
                        <select
                          v-model="visaType"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn loại visa
                          </option>
                          <option value="Nam">Một lần</option>
                          <option value="Nữ">Nhiều lần</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Địa chỉ tạm chú</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="address"
                          placeholder="Nhập địa chỉ tạm chú"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-3">
                        <label class="form-label">Từ ngày</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="visaBeginDay"
                          placeholder="Nhập ngày visa bắt đầu hiệu lực"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đến ngày</label>
                        <input
                          type="date"
                          class="form-control"
                          v-model="visaEndDay"
                          placeholder="Nhập ngày visa hết hiệu lực"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị đề nghị</label>
                        <input
                          type="file"
                          class="form-control"
                          ref="suggestUnit"
                          @change="handleSuggestUnitChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handleSuggestUnitUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="suggestUnitName"
                            disabled
                          />
                        </div>
                        <div v-if="uMessage != ''">{{ uMessage }}</div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Số quyết định</label>
                        <input
                          type="file"
                          ref="decisionNumber"
                          class="form-control"
                          @change="handleDecisionNumberChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handleDecisionNumberUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="decisionNumberName"
                            disabled
                          />
                        </div>
                        <div v-if="eMessage != ''">{{ eMessage }}</div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Upload ảnh hoặc Pdf</label>
                        <input
                          type="file"
                          ref="attachedFile"
                          class="form-control"
                          @change="handleFileChange()"
                          style="display: none"
                        />
                        <div class="card">
                          <button
                            @click="handleFileUpload()"
                            class="btn btn-outline-primary w-100"
                          >
                            Choose File
                          </button>
                          <input
                            type="text"
                            class="form-control"
                            v-model="fileName"
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
                  url="/api/get-all-extend-visas"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:suggestUnit="item">
                    {{ item.row.suggestUnitName }}
                    <a
                      :href="item.row.suggestUnitLink"
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
                  <template v-slot:decisionNumber="item">
                    {{ item.row.decisionNumberName }}
                    <a
                      :href="item.row.decisionNumberLink"
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
                  <template v-slot:attachedFile="item">
                    <div>
                      {{ item.row.attachedFileName }}
                      <a
                        :href="item.row.attachedFileLink"
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
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Họ và tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.name"
                                  placeholder="Nhập họ và tên sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Ngày sinh</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExtendVisa.birthday"
                                  placeholder="Nhập ngày sinh"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Giới tính</label>
                                <select
                                  v-model="editExtendVisa.sex"
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
                                  v-model="editExtendVisa.nationality"
                                  placeholder="Nhập quốc tịch"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số hộ chiếu</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.visaCode"
                                  placeholder="Nhập "
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.phoneNumber"
                                  placeholder="Nhập số điện thoại"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Nghề nghiệp</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.job"
                                  placeholder="Nhập nghề nghiệp"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Mục đích</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.purpose"
                                  placeholder="Nhập mục đích"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Mã số sinh viên</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.studentCode"
                                  placeholder="Nhập mã số sinh viên"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Số giấy phép lao động</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.workPermit"
                                  placeholder="Nhập số giấy phép lao động"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Loại hộ chiếu</label>
                                <select
                                  v-model="editExtendVisa.visaType"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn loại visa
                                  </option>
                                  <option value="Nam">Một lần</option>
                                  <option value="Nữ">Nhiều lần</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Địa chỉ tạm chú</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editExtendVisa.address"
                                  placeholder="Nhập địa chỉ tạm chú"
                                />
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="mb-3">
                                <label class="form-label">Từ ngày</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExtendVisa.visaBeginDay"
                                  placeholder="Nhập ngày visa bắt đầu hiệu lực"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đến ngày</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="editExtendVisa.visaEndDay"
                                  placeholder="Nhập ngày visa hết hiệu lực"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị đề nghị</label>
                                <input
                                  type="file"
                                  class="form-control"
                                  ref="suggestUnit1"
                                  @change="handleSuggestUnitChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handleSuggestUnitUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExtendVisa.suggestUnitName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editExtendVisa.uMessage != ''">
                                  {{ editExtendVisa.uMessage }}
                                </div>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Số quyết định</label>
                                <input
                                  type="file"
                                  ref="decisionNumber1"
                                  class="form-control"
                                  @change="handleDecisionNumberChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handleDecisionNumberUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExtendVisa.decisionNumberName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editExtendVisa.eMessage != ''">
                                  {{ editExtendVisa.eMessage }}
                                </div>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Upload ảnh hoặc Pdf</label
                                >
                                <input
                                  type="file"
                                  ref="attachedFile1"
                                  class="form-control"
                                  @change="handleFileChange1()"
                                  style="display: none"
                                />
                                <div class="card">
                                  <button
                                    @click="handleFileUpload1()"
                                    class="btn btn-outline-primary w-100"
                                  >
                                    Choose File
                                  </button>
                                  <input
                                    type="text"
                                    class="form-control"
                                    v-model="editExtendVisa.fileName"
                                    disabled
                                  />
                                </div>
                                <div v-if="editExtendVisa.sMessage != ''">
                                  {{ editExtendVisa.sMessage }}
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
  name: "VISAManagePage",
  components: {
    VerticalNavbar,
  },

  data() {
    return {
      columns: [
        "stt",
        "name",
        "purpose",
        "nationality",
        "visaCode",
        "phoneNumber",
        "job",
        "workPermit",
        "suggestUnit",
        "decisionNumber",
        "attachedFile",
        "tool",
      ],
      options: {
        headings: {
          name: "Họ và tên",
          purpose: "Mục đích",
          nationality: "Quốc tịch",
          visaCode: "Số hộ chiếu",
          phoneNumber: "Số điện thoại",
          job: "Nghề nghiệp",
          workPermit: "Số giấy phép lao động",
          suggestUnit: "Đơn vị đề nghị",
          decisionNumber: "Quyết định số",
          attachedFile: "File pdf hoặc ảnh",
          tool: "Thao tác",
        },
      },
      name: "",
      birthday: "",
      sex: "",
      nationality: "",
      visaCode: "",
      phoneNumber: "",
      purpose: "",
      job: "",
      studentCode: "",
      workPermit: "",
      visaType: "",
      address: "",
      visaBeginDay: "",
      visaEndDay: "",
      suggestUnit: null,
      decisionNumber: null,
      attachedFile: null,
      suggestUnitName: "",
      decisionNumberName: "",
      fileName: "",
      sMessage: "",
      eMessage: "",
      uMessage: "",

      displayModal: false,
      displayModalOne: false,

      editExtendVisa: {
        id: "",
        name: "",
        birthday: "",
        sex: "",
        nationality: "",
        visaCode: "",
        phoneNumber: "",
        purpose: "",
        job: "",
        studentCode: "",
        workPermit: "",
        visaType: "",
        address: "",
        visaBeginDay: "",
        visaEndDay: "",
        suggestUnit: null,
        decisionNumber: null,
        attachedFile: null,
        suggestUnitName: "",
        decisionNumberName: "",
        fileName: "",
        suggestUnitLink: "",
        decisionNumberLink: "",
        fileLink: "",
        eMessage: "",
        sMessage: "",
        uMessage: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  methods: {
    handleSuggestUnitUpload() {
      this.$refs.suggestUnit.click();
    },
    handleSuggestUnitUpload1() {
      this.$refs.suggestUnit1.click();
    },
    handleDecisionNumberUpload() {
      this.$refs.decisionNumber.click();
    },
    handleDecisionNumberUpload1() {
      this.$refs.decisionNumber1.click();
    },
    handleFileUpload() {
      this.$refs.attachedFile.click();
    },
    handleFileUpload1() {
      this.$refs.attachedFile1.click();
    },
    handleSuggestUnitChange() {
      const file = this.$refs.suggestUnit.files[0];
      console.log(file, "handleSuggestUnitChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.suggestUnit = file;
      this.suggestUnitName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.uMessage = "";
      } else {
        this.uMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleSuggestUnitChange1() {
      const file = this.$refs.suggestUnit1.files[0];
      console.log(file, "handleSuggestUnitChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExtendVisa.suggestUnit = file;
      this.editExtendVisa.suggestUnitName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExtendVisa.uMessage = "";
      } else {
        this.editExtendVisa.uMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleDecisionNumberChange() {
      const file = this.$refs.decisionNumber.files[0];
      console.log(file, "handleScorePdfChange file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.decisionNumber = file;
      this.decisionNumberName = file.name;
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
    handleDecisionNumberChange1() {
      const file = this.$refs.decisionNumber1.files[0];
      console.log(file, "handleDecisionNumberChange1 file");
      const allowedTypes = ["application/pdf"];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExtendVisa.decisionNumber = file;
      this.editExtendVisa.decisionNumberName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExtendVisa.eMessage = "";
      } else {
        this.editExtendVisa.eMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleFileChange() {
      const file = this.$refs.attachedFile.files[0];
      console.log(file, "handleFileChange file");
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.attachedFile = file;
      this.fileName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExtendVisa.sMessage = "";
      } else {
        this.editExtendVisa.sMessage =
          tooLarge && allowedTypes.includes(file.type)
            ? `File quá nặng, giới hạn kích thước là ${
                MAX_SIZE / (1024 * 1024)
              }Mb`
            : "Định dạng file không phù hợp!!";
      }
    },
    handleFileChange1() {
      const file = this.$refs.attachedFile1.files[0];
      console.log(file, "handleFileChange file");
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      const MAX_SIZE = 20 * 1024 * 1024;
      const tooLarge = file.size > MAX_SIZE;
      this.editExtendVisa.attachedFile = file;
      this.editExtendVisa.fileName = file.name;
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.editExtendVisa.eMessage = "";
      } else {
        this.editExtendVisa.eMessage =
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
      formData.append("nationality", this.nationality);
      formData.append("visaCode", this.visaCode);
      formData.append("phoneNumber", this.phoneNumber);
      formData.append("purpose", this.purpose);
      formData.append("job", this.job);
      formData.append("studentCode", this.studentCode);
      formData.append("workPermit", this.workPermit);
      formData.append("visaType", this.visaType);
      formData.append("address", this.address);
      formData.append("visaBeginDay", this.visaBeginDay);
      formData.append("visaEndDay", this.visaEndDay);
      formData.append("suggestUnit", this.suggestUnit);
      formData.append("decisionNumber", this.decisionNumber);
      formData.append("attachedFile", this.attachedFile);

      try {
        const result = await instance.post("/api/create-extend-visa", formData, {
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
          this.nationality = "";
          this.visaCode = "";
          this.phoneNumber = "";
          this.purpose = "";
          this.job = "";
          this.studentCode = "";
          this.workPermit = "";
          this.visaType = "";
          this.address = "";
          this.visaBeginDay = "";
          this.visaEndDay = "";
          this.suggestUnit = null;
          this.decisionNumber = null;
          this.attachedFile = null;
          this.suggestUnitName = "";
          this.decisionNumberName = "";
          this.fileName = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      this.editExtendVisa.name = item.name;
      this.editExtendVisa.birthday = item.birthday;
      this.editExtendVisa.sex = item.sex;
      this.editExtendVisa.nationality = item.nationality;
      this.editExtendVisa.visaCode = item.visaCode;
      this.editExtendVisa.phoneNumber = item.phoneNumber;
      this.editExtendVisa.purpose = item.purpose;
      this.editExtendVisa.job = item.job;
      this.editExtendVisa.studentCode = item.studentCode;
      this.editExtendVisa.workPermit = item.workPermit;
      this.editExtendVisa.visaType = item.visaType;
      this.editExtendVisa.address = item.address;
      this.editExtendVisa.visaBeginDay = item.visaBeginDay;
      this.editExtendVisa.visaEndDay = item.visaEndDay;
      this.editExtendVisa.suggestUnit = null; // tránh trường hợp upfile lên r lại thoát ra khỏi modal (lúc đó file vẫn lưu vào vue)
      this.editExtendVisa.decisionNumber = null;
      this.editExtendVisa.attachedFile = null;
      this.editExtendVisa.suggestUnitName = item.suggestUnitName;
      this.editExtendVisa.decisionNumberName = item.decisionNumberName;
      this.editExtendVisa.fileName = item.attachedFileName;
      this.editExtendVisa.suggestUnitLink = item.suggestUnitLink;
      this.editExtendVisa.decisionNumberLink = item.decisionNumberLink;
      this.editExtendVisa.fileLink = item.attachedFileLink;
      this.editExtendVisa.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      let formData = new FormData();
      formData.append("name", this.editExtendVisa.name);
      formData.append("birthday", this.editExtendVisa.birthday);
      formData.append("sex", this.editExtendVisa.sex);
      formData.append("nationality", this.editExtendVisa.nationality);
      formData.append("visaCode", this.editExtendVisa.visaCode);
      formData.append("phoneNumber", this.editExtendVisa.phoneNumber);
      formData.append("purpose", this.editExtendVisa.purpose);
      formData.append("job", this.editExtendVisa.job);
      formData.append("studentCode", this.editExtendVisa.studentCode);
      formData.append("workPermit", this.editExtendVisa.workPermit);
      formData.append("visaType", this.editExtendVisa.visaType);
      formData.append("address", this.editExtendVisa.address);
      formData.append("visaBeginDay", this.editExtendVisa.visaBeginDay);
      formData.append("visaEndDay", this.editExtendVisa.visaEndDay);
      formData.append("suggestUnit1", this.editExtendVisa.suggestUnit);
      formData.append("decisionNumber1", this.editExtendVisa.decisionNumber);
      formData.append("attachedFile1", this.editExtendVisa.attachedFile);
      formData.append("suggestUnitName", this.editExtendVisa.suggestUnitName);
      formData.append(
        "decisionNumberName",
        this.editExtendVisa.decisionNumberName
      );
      formData.append("fileName", this.editExtendVisa.fileName);
      formData.append(
        "attachedExDocName",
        this.editExtendVisa.attachedExDocName
      );
      formData.append("suggestUnitLink", this.editExtendVisa.suggestUnitLink);
      formData.append(
        "decisionNumberLink",
        this.editExtendVisa.decisionNumberLink
      );
      formData.append("fileLink", this.editExtendVisa.fileLink);

      try {
        const result = await instance.put(
          `/api/edit-extend-visa/${this.editExtendVisa.id}`,
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
          this.editExtendVisa.attachedDoc = null;
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
            `/api/delete-extend-visa/${item._id}`
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
