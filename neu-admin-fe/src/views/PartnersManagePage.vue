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
                  Thêm đối tác
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
                    <h5 class="modal-title">Thêm đối tác</h5>
                    <button
                      @click="closeModal()"
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
                          >Tên trường đối tác tiếng Việt</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="vn_name"
                          placeholder="Nhập tên đối tác tiếng Việt"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label"
                          >Tên trường đối tác tiếng Anh</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          v-model="en_name"
                          placeholder="Nhập tên đối tác tiếng Anh"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Website</label>
                        <input
                          type="text"
                          v-model="website"
                          class="form-control"
                          placeholder="Nhập địa chỉ website"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Địa chỉ</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="address"
                          placeholder="Nhập địa chỉ"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Xếp hạng quốc tế</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="internationalRanking"
                          placeholder="Nhập xếp hạng quốc tế"
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-label required">
                        Các văn bản kiểm định/công nhận chất lượng đào tạo
                      </div>
                      <input
                        type="file"
                        name="docs"
                        class="form-control"
                        ref="docs"
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
                    <h3>Thông tin người liên hệ</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          v-model="contacterName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="contacterPosition"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                          v-model="contacterEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="contacterUnit"
                        />
                      </div>
                    </div>
                    <h3>Lãnh đạo cấp trường</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          v-model="uniLeaderName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="uniLeaderPosition"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                          v-model="uniLeaderEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="uniLeaderUnit"
                        />
                      </div>
                    </div>
                    <h3>Lãnh đạo đơn vị liên kết</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          v-model="unitLeaderName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="unitLeaderPosition"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                          v-model="unitLeaderEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="unitLeaderUnit"
                        />
                      </div>
                    </div>
                    <h3>Đại diện bộ phận đối ngoại</h3>
                    <!-- Foreign Affair Representative (FAR)-->
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          v-model="farName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="farPosition"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                          v-model="farEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="farUnit"
                        />
                      </div>
                    </div>
                    <h3>Người phụ trách chương trình</h3>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Họ tên</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          v-model="progManagerName"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Chức vụ</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Chức vụ"
                          v-model="progManagerPosition"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Email"
                          v-model="progManagerEmail"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Đơn vị</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Đơn vị"
                          v-model="progManagerUnit"
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
                  url="/api/get-all-partners"
                  id="ProjectList"
                  :columns="columns"
                  :options="options"
                  ref="table"
                >
                  <template v-slot:partnerDocs="item">
                    <div
                      v-for="(doc, index) in item.row.partnerDocs"
                      :key="index"
                      class="mb-1"
                    >
                      {{ doc.docName }}
                      <a :href="doc.docLink" class="btn btn-success btn-icon">
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
                            <h5 class="modal-title">Chỉnh sửa đối tác</h5>
                            <button
                              @click="closeModal1()"
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
                                  >Tên trường đối tác tiếng Việt</label
                                >
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editPartner.vn_name"
                                  placeholder="Nhập tên đối tác tiếng Việt"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Tên trường đối tác tiếng Anh</label
                                >
                                <textarea
                                  class="form-control"
                                  rows="5"
                                  v-model="editPartner.en_name"
                                  placeholder="Nhập tên đối tác tiếng Anh"
                                ></textarea>
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Website</label>
                                <input
                                  type="text"
                                  v-model="editPartner.website"
                                  class="form-control"
                                  placeholder="Nhập địa chỉ website"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Địa chỉ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editPartner.address"
                                  placeholder="Nhập địa chỉ"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Xếp hạng quốc tế</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editPartner.internationalRanking"
                                  placeholder="Nhập xếp hạng quốc tế"
                                />
                              </div>
                            </div>
                            <div class="mb-3">
                              <div class="form-label required">
                                Các văn bản kiểm định/công nhận chất lượng đào
                                tạo
                              </div>
                              <input
                                type="file"
                                name="docs"
                                class="form-control"
                                ref="docs1"
                                @change="handleFilesUpload1()"
                                style="display: none"
                                id="docs_file1"
                                multiple
                              />

                              <div id="filesUploadControl1" class="card">
                                <a
                                  id="btnF1"
                                  @click="handleDocsUpload1()"
                                  class="btn btn-outline-primary w-100"
                                  >Choose Files</a
                                >
                                <div
                                  v-for="(doc, index) in editPartner.docs"
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
                            <h3>Thông tin người liên hệ</h3>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Họ tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Họ tên"
                                  v-model="editPartner.contacterName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editPartner.contacterPosition"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="editPartner.contacterEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editPartner.contacterUnit"
                                />
                              </div>
                            </div>
                            <h3>Lãnh đạo cấp trường</h3>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Họ tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Họ tên"
                                  v-model="editPartner.uniLeaderName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editPartner.uniLeaderPosition"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="editPartner.uniLeaderEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editPartner.uniLeaderUnit"
                                />
                              </div>
                            </div>
                            <h3>Lãnh đạo đơn vị liên kết</h3>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Họ tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Họ tên"
                                  v-model="editPartner.unitLeaderName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editPartner.unitLeaderPosition"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="editPartner.unitLeaderEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editPartner.unitLeaderUnit"
                                />
                              </div>
                            </div>
                            <h3>Đại diện bộ phận đối ngoại</h3>
                            <!-- Foreign Affair Representative (FAR)-->
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Họ tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Họ tên"
                                  v-model="editPartner.farName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editPartner.farPosition"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="editPartner.farEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editPartner.farUnit"
                                />
                              </div>
                            </div>
                            <h3>Người phụ trách chương trình</h3>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Họ tên</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Họ tên"
                                  v-model="editPartner.progManagerName"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Chức vụ</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Chức vụ"
                                  v-model="editPartner.progManagerPosition"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="editPartner.progManagerEmail"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Đơn vị</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Đơn vị"
                                  v-model="editPartner.progManagerUnit"
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
// import VerticalNavbar from "../components/VerticalNavbar.vue";
import { useToast } from "vue-toastification";
import router from "@/router";
import _ from "lodash";
export default {
  name: "PartnerManagePage",
  // components: {

  // },
  data() {
    return {
      columns: [
        "stt",
        "vn_name",
        "address",
        "internationalRanking",
        "website",
        "partnerDocs",
        "tool",
      ],
      options: {
        params: {
          id: localStorage.getItem("progId"),
        },
        headings: {
          vn_name: "Tên đối tác tiếng Việt",
          address: "Địa chỉ",
          internationalRanking: "Xếp hạng quốc tế",
          website: "Website",
          partnerDocs: "Các văn bản kiểm định",
          tool: "Thao tác",
        },
      },
      programName: "",
      id: "",
      en_name: "",
      vn_name: "",
      address: "",
      internationalRanking: "",
      website: "",
      docs: [], // array này để quản lí các file chuẩn bị đc up lên sv ở phía fe
      uploadDocs: [], // array này ms là array các doc thật sự để up lên sv

      contacterName: "",
      contacterPosition: "",
      contacterEmail: "",
      contacterUnit: "",

      uniLeaderName: "",
      uniLeaderPosition: "",
      uniLeaderEmail: "",
      uniLeaderUnit: "",

      unitLeaderName: "",
      unitLeaderPosition: "",
      unitLeaderEmail: "",
      unitLeaderUnit: "",

      farName: "",
      farPosition: "",
      farEmail: "",
      farUnit: "",

      progManagerName: "",
      progManagerPosition: "",
      progManagerEmail: "",
      progManagerUnit: "",

      displayModal: false,
      displayModalOne: false,

      editPartner: {
        id: "",
        vn_name: "",
        en_name: "",
        address: "",
        internationalRanking: "",
        website: "",
        docs: [],
        uploadDocs: [],

        contacterName: "",
        contacterPosition: "",
        contacterEmail: "",
        contacterUnit: "",

        uniLeaderName: "",
        uniLeaderPosition: "",
        uniLeaderEmail: "",
        uniLeaderUnit: "",

        unitLeaderName: "",
        unitLeaderPosition: "",
        unitLeaderEmail: "",
        unitLeaderUnit: "",

        farName: "",
        farPosition: "",
        farEmail: "",
        farUnit: "",

        progManagerName: "",
        progManagerPosition: "",
        progManagerEmail: "",
        progManagerUnit: "",
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
    closeModal() {
      this.hideModal();
    },
    closeModal1() {
      this.hideModal1();
    },
    showModal() {
      this.displayModal = true;
    },
    hideModal() {
      this.displayModal = false;
      this.en_name = "";
      this.vn_name = "";
      this.address = "";
      this.internationalRanking = "";
      this.website = "";
      this.docs = [];
      this.uploadDocs = [];

      this.contacterName = "";
      this.contacterPosition = "";
      this.contacterEmail = "";
      this.contacterUnit = "";

      this.uniLeaderName = "";
      this.uniLeaderPosition = "";
      this.uniLeaderEmail = "";
      this.uniLeaderUnit = "";

      this.unitLeaderName = "";
      this.unitLeaderPosition = "";
      this.unitLeaderEmail = "";
      this.unitLeaderUnit = "";

      this.farName = "";
      this.farPosition = "";
      this.farEmail = "";
      this.farUnit = "";

      this.progManagerName = "";
      this.progManagerPosition = "";
      this.progManagerEmail = "";
      this.progManagerUnit = "";
    },
    showModal1() {
      this.displayModalOne = true;
    },
    hideModal1() {
      this.displayModalOne = false;
    },
    handleFilesUpload() {
      const docs = this.$refs.docs.files;
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
      // dùng lodash để dùng được map() với array files
      // hàm map() loop qua từng phần tử trong array và thêm các thuộc tính (name, ...) (map() tạo 1 array mới khác với array docs, với mỗi phần tử của array mới có những thuộc tính của từng doc trong docs array như trên (name, ...))
    },
    handleFilesUpload1() {
      const docs = this.$refs.docs1.files;
      console.log(docs);
      this.editPartner.uploadDocs = [...this.editPartner.uploadDocs, ...docs];

      this.editPartner.docs = [
        ...this.editPartner.docs,
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
      this.$refs.docs.click();
    },
    handleDocsUpload1() {
      this.$refs.docs1.click();
    },
    deleteDoc(index) {
      this.docs.splice(index, 1);
      console.log(this.docs);
      this.uploadDocs.splice(index, 1);
      console.log(this.uploadDocs);
    },
    deleteDoc1(index) {
      this.editPartner.docs.splice(index, 1);
      console.log(this.editPartner.docs);
      this.editPartner.uploadDocs.splice(index, 1);
      console.log(this.editPartner.uploadDocs);
    },
    async submitForm() {
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
          // nếu giá trị canUpload = false ta sẽ không gọi api create-partner, gửi thông báo cho người dùng sửa những file đã up lên
          this.toast.error("Hãy sửa đúng file upload");
        } else {
          // giá trị canUpload = true, gọi api create-partner
          console.log(this.id, "post api program id");
          let formData = new FormData();
          formData.append("programId", this.id);
          formData.append("en_name", this.en_name);
          formData.append("vn_name", this.vn_name);
          formData.append("address", this.address);
          formData.append("internationalRanking", this.internationalRanking);
          formData.append("website", this.website);

          formData.append("contacterName", this.contacterName);
          formData.append("contacterPosition", this.contacterPosition);
          formData.append("contacterEmail", this.contacterEmail);
          formData.append("contacterUnit", this.contacterUnit);

          formData.append("uniLeaderName", this.uniLeaderName);
          formData.append("uniLeaderPosition", this.uniLeaderPosition);
          formData.append("uniLeaderEmail", this.uniLeaderEmail);
          formData.append("uniLeaderUnit", this.uniLeaderUnit);

          formData.append("unitLeaderName", this.unitLeaderName);
          formData.append("unitLeaderPosition", this.unitLeaderPosition);
          formData.append("unitLeaderEmail", this.unitLeaderEmail);
          formData.append("unitLeaderUnit", this.unitLeaderUnit);

          formData.append("farName", this.farName);
          formData.append("farPosition", this.farPosition);
          formData.append("farEmail", this.farEmail);
          formData.append("farUnit", this.farUnit);

          formData.append("progManagerName", this.progManagerName);
          formData.append("progManagerPosition", this.progManagerPosition);
          formData.append("progManagerEmail", this.progManagerEmail);
          formData.append("progManagerUnit", this.progManagerUnit);

          _.forEach(this.uploadDocs, (doc) => {
            // dùng lodash để thêm từng file vào array docs
            formData.append("docs", doc);
          });

          const result = await instance.post("/api/create-partner", formData, {
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
            this.hideModal();
          }
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      const docRefsArr = item.partnerDocs.map(doc => {
        const MAX_SIZE = 20 * 1024 * 1024;
        const allowedTypes = ["application/pdf"];
        let invalidMessage = ""
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
          invalidMessage: invalidMessage
        }
      })
      this.editPartner.vn_name = item.vn_name;
      this.editPartner.en_name = item.en_name;
      this.editPartner.website = item.website;
      this.editPartner.address = item.address;
      this.editPartner.internationalRanking = item.internationalRanking;
      this.editPartner.website = item.website;
      this.editPartner.docs = docRefsArr;
      this.editPartner.uploadDocs = [];

      this.editPartner.contacterName = item.contacterName;
      this.editPartner.contacterPosition = item.contacterPosition;
      this.editPartner.contacterEmail = item.contacterEmail;
      this.editPartner.contacterUnit = item.contacterUnit;

      this.editPartner.unitLeaderName = item.unitLeaderName;
      this.editPartner.unitLeaderPosition = item.unitLeaderPosition;
      this.editPartner.unitLeaderEmail = item.unitLeaderEmail;
      this.editPartner.unitLeaderUnit = item.unitLeaderUnit;

      this.editPartner.uniLeaderName = item.uniLeaderName;
      this.editPartner.uniLeaderPosition = item.uniLeaderPosition;
      this.editPartner.uniLeaderEmail = item.uniLeaderEmail;
      this.editPartner.uniLeaderUnit = item.uniLeaderUnit;

      this.editPartner.farName = item.farName;
      this.editPartner.farPosition = item.farPosition;
      this.editPartner.farEmail = item.farEmail;
      this.editPartner.farUnit = item.farUnit;

      this.editPartner.progManagerName = item.progManagerName;
      this.editPartner.progManagerPosition = item.progManagerPosition;
      this.editPartner.progManagerEmail = item.progManagerEmail;
      this.editPartner.progManagerUnit = item.progManagerUnit;

      this.editPartner.id = item._id;
      this.showModal1();

      // console.log('content', this.content);
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
          this.toast.error("Hãy sửa đúng file upload");
        } else {
          const docsState = {
            docs1Refs: this.editPartner.docs
          }
          let formData = new FormData();
          formData.append("programId", this.id);
          formData.append("en_name", this.editPartner.en_name);
          formData.append("vn_name", this.editPartner.vn_name);
          formData.append("address", this.editPartner.address);
          formData.append(
            "internationalRanking",
            this.editPartner.internationalRanking
          );
          formData.append("contacterUnit", this.editPartner.contacterUnit);

          formData.append("contacterName", this.editPartner.contacterName);
          formData.append(
            "contacterPosition",
            this.editPartner.contacterPosition
          );
          formData.append("contacterEmail", this.editPartner.contacterEmail);
          formData.append("website", this.editPartner.website);

          formData.append("uniLeaderName", this.editPartner.uniLeaderName);
          formData.append(
            "uniLeaderPosition",
            this.editPartner.uniLeaderPosition
          );
          formData.append("uniLeaderEmail", this.editPartner.uniLeaderEmail);
          formData.append("uniLeaderUnit", this.editPartner.uniLeaderUnit);

          formData.append("unitLeaderName", this.editPartner.unitLeaderName);
          formData.append(
            "unitLeaderPosition",
            this.editPartner.unitLeaderPosition
          );
          formData.append("unitLeaderEmail", this.editPartner.unitLeaderEmail);
          formData.append("unitLeaderUnit", this.editPartner.unitLeaderUnit);

          formData.append("farName", this.editPartner.farName);
          formData.append("farPosition", this.editPartner.farPosition);
          formData.append("farEmail", this.editPartner.farEmail);
          formData.append("farUnit", this.editPartner.farUnit);

          formData.append("progManagerName", this.editPartner.progManagerName);
          formData.append(
            "progManagerPosition",
            this.editPartner.progManagerPosition
          );
          formData.append(
            "progManagerEmail",
            this.editPartner.progManagerEmail
          );
          formData.append("progManagerUnit", this.editPartner.progManagerUnit);
          formData.append("docsState", JSON.stringify(docsState));
          _.forEach(this.editPartner.uploadDocs, (doc) => {
            formData.append("docs1", doc)
          })

          const result = await instance.put(
            `/api/edit-partner/${this.editPartner.id}`,
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
            this.toast.success("đối tác đã được sửa");
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
        if (confirm("Xóa đối tác này?")) {
          const result = await instance.delete(
            `/api/delete-partner/${item._id}`
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
