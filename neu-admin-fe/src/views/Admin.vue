<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <!-- <Header /> -->
    <div class="page-wrapper">
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <!-- Page pre-title -->

              <h2 class="page-title">Quản lý tài khoản</h2>
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
              <div class="modal-dialog modal-lg" role="document">
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
                        <label class="form-label">Tên tài khoản</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="name"
                          placeholder="Nhập tên tài khoản"
                        />
                      </div>

                      <div class="mb-3">
                        <label class="form-label">Tên đăng nhập</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="username"
                          placeholder="Nhập tên đăng nhập"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Mật khẩu</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="password"
                          placeholder="Nhập mật khẩu"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="phoneNumber"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Phân quyền người dùng</label>
                        <select
                          v-model="permission"
                          class="form-select"
                          tabindex="-1"
                        >
                          <option value="" disabled selected>
                            Chọn phân quyền của người dùng
                          </option>
                          <option value="Cấp 3">Cấp 3</option>
                          <option value="Cấp 2">Cấp 2</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <a
                      @click="submitFile()"
                      class="btn btn-primary ms-auto"
                      data-bs-dismiss="modal"
                    >
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
                  url="/api/get-all-users"
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
                        href="#"
                        class="btn btn-warning btn-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-report-two"
                        @click="onEditPassWord(item.row)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-lock-square-rounded"
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
                            d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                          />
                          <path
                            d="M8 11m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"
                          />
                          <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        v-if="
                          item.row.permission === 'Cấp 2' ||
                          item.row.permission === 'Cấp 3'
                        "
                        class="btn btn-lime btn-icon"
                        data-bs-target="#modal-report-three"
                        @click="showUserMenu(item.row)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-users-group"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                          <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                          <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        v-if="item.row.permission === 'Cấp 3'"
                        class="btn btn-cyan btn-icon"
                        data-bs-target="#modal-report-four"
                        @click="onEditAttachedUserProgram(item.row)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-git-branch"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                          <path d="M7 8l0 8" />
                          <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
                          <path d="M14 14l3 -3l3 3" />
                        </svg>
                      </a>
                    </span>

                    <div
                      v-if="displayModalOne"
                      class="modal modal-blur fade show"
                      id="modal-report-one"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                    >
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Chỉnh sửa Tài khoản</h5>
                            <button
                              @click="hideModal1()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards mb-5">
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Tên tài khoản</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.name"
                                  placeholder="Nhập tên tài khoản"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label">Tên đăng nhập</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.username"
                                  placeholder="Nhập tên đăng nhập"
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="editUser.phoneNumber"
                                  placeholder="Nhập số điện thoại"
                                />
                              </div>
                              <div class="mb-3">
                                <label class="form-label"
                                  >Phân quyền người dùng</label
                                >
                                <select
                                  v-model="editUser.permission"
                                  class="form-select"
                                  tabindex="-1"
                                >
                                  <option value="" disabled selected>
                                    Chọn phân quyền của người dùng
                                  </option>
                                  <option value="Cấp 3">Cấp 3</option>
                                  <option value="Cấp 2">Cấp 2</option>
                                  <option value="Super Admin">
                                    Super Admin
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <a
                              @click="onSubmit()"
                              class="btn btn-primary ms-auto"
                              data-bs-dismiss="modal"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="displayModalTwo"
                      class="modal modal-blur fade show"
                      id="modal-report-two"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                      role="dialog"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Đổi mật khẩu</h5>
                            <button
                              @click="hideModal2()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="mb-3">
                              <label class="form-label">Mật khẩu mới</label>
                              <input
                                type="text"
                                class="form-control"
                                v-model="editUser.editedPassword"
                                placeholder="Nhập mật khẩu mới"
                              />
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="onPasswordChange()"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="displayModalThree"
                      class="modal modal-blur fade show"
                      id="modal-report-three"
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
                            <h5 class="modal-title">Phân quyền Menu</h5>
                            <button
                              @click="hideModal3()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <div class="table-responsive">
                              <table id="menu_table" class="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Bậc 1</th>
                                    <th>Bậc 2</th>
                                    <th>Bậc 3</th>
                                    <th>Hiển thị</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Quản lý chương trình liên kết</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="program_manage"
                                        :value="{
                                          name: 'programs-manage-page',
                                          stt: 1,
                                          title:
                                            'Quản lý chương trình liên kết',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td rowspan="14">CTLKĐT với nước ngoài</td>
                                    <td rowspan="7">Thông tin chung</td>
                                    <td>Thông tin chương trình liên kết</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="program_infor"
                                        :value="{
                                          name: 'trans-programs-manage-page',
                                          stt: 2,
                                          title: 'TT chương trình liên kết',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Các quyết định phê duyệt</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="approval_decision"
                                        :value="{
                                          name: 'approval-decision-manage-page',
                                          stt: 3,
                                          title: 'Các quyết định phê duyệt',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Các quyết định đóng chương trình</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="close-decision-manage-page"
                                        :value="{
                                          name: 'close-decision-manage-page',
                                          stt: 4,
                                          title:
                                            'Các quyết định đóng chương trình',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý văn bản liên kết</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="document"
                                        :value="{
                                          name: 'documents-manage-page',
                                          stt: 5,
                                          title: 'Quản lý văn bản liên kết',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý đối tác</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="partner"
                                        :value="{
                                          name: 'partners-manage-page',
                                          stt: 6,
                                          title: 'Quản lý đối tác',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý đơn vị thực hiện</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="agency"
                                        :value="{
                                          name: 'agencies-manage-page',
                                          stt: 7,
                                          title: 'Quản lý đơn vị thực hiện',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Mục tiêu chương trình</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="program_goal"
                                        :value="{
                                          name: 'goals-manage-page',
                                          stt: 8,
                                          title: 'Mục tiêu chương trình',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Đề án</td>
                                    <td>Quản lý nội dung đề án</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="plan"
                                        :value="{
                                          name: 'plans-manage-page',
                                          stt: 9,
                                          title: 'Quản lý nội dung đề án',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Chất lượng đào tạo</td>
                                    <td>Đảm bảo chất lượng đào tạo</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="education_quality"
                                        :value="{
                                          name: 'edu-quality-manage-page',
                                          stt: 10,
                                          title: 'Đảm bảo chất lượng đào tạo',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Khung chương trình</td>
                                    <td>Thông tin khung chương trình</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="curriculum"
                                        :value="{
                                          name: 'curriculums-manage-page',
                                          stt: 11,
                                          title: 'Thông tin khung chương trình',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td rowspan="4">Tuyển sinh</td>
                                    <td>Quản lý tuyển sinh</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="enrollment"
                                        :value="{
                                          name: 'enrollment-manage-page',
                                          stt: 12,
                                          title: 'Quản lý tuyển sinh',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý giảng viên</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="lecturer"
                                        :value="{
                                          name: 'lecturers-manage-page',
                                          stt: 13,
                                          title: 'Quản lý giảng viên',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý đơn vị công tác</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="unit"
                                        :value="{
                                          name: 'units-manage-page',
                                          stt: 14,
                                          title: 'Quản lý đơn vị công tác',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý môn học</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="subject"
                                        :value="{
                                          name: 'subjects-manage-page',
                                          stt: 15,
                                          title: 'Quản lý môn học',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý MOU.MOA</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="moumoa"
                                        :value="{
                                          name: 'moumoa-manage-page',
                                          stt: 16,
                                          title: 'Quản lý MOU.MOA',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý các dự án HTQT</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="htqt"
                                        :value="{
                                          name: 'htqt-manage-page',
                                          stt: 17,
                                          title: 'Quản lý các dự án HTQT',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td rowspan="2">
                                      Quản lý sinh viên trao đổi ngắn hạn
                                    </td>
                                    <td>Sinh viên nước ngoài đến trao đổi</td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="ex_f_stu"
                                        :value="{
                                          name: 'ex-f-student-manage-page',
                                          stt: 18,
                                          title:
                                            'Sinh viên nước ngoài đến trao đổi',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Sinh viên đi nước ngoài trao đổi</td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="ex_stu"
                                        :value="{
                                          name: 'ex-student-manage-page',
                                          stt: 19,
                                          title:
                                            'Sinh viên đi nước ngoài trao đổi',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý lưu sinh viên</td>
                                    <td>Quản lý lưu sinh viên</td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="student"
                                        :value="{
                                          name: 'student-manage-page',
                                          stt: 20,
                                          title: 'Quản lý lưu sinh viên',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Cấp/Gia hạn VISA</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="visa"
                                        :value="{
                                          name: 'extend-visa-manage-page',
                                          stt: 21,
                                          title: 'Cấp/Gia hạn VISA',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Quản lý tài khoản</td>
                                    <td>Quản lý tài khoản</td>
                                    <td></td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="user_manage"
                                        :value="{
                                          name: 'admin',
                                          stt: 22,
                                          title: 'Quản lý tài khoản',
                                        }"
                                        v-model="menuArray"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="onMenuChange()"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="displayModalFour"
                      class="modal modal-blur fade show"
                      id="modal-report-four"
                      tabindex="-1"
                      style="display: block"
                      aria-modal="true"
                    >
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">
                              Phân bổ Chương trình cho đơn vị
                            </h5>
                            <button
                              @click="hideModal4()"
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body row row-cards">
                            <div class="row">
                              <div class="col-md-4">
                                <label class="form-label">Năm học</label>
                                <select
                                  v-model="year"
                                  class="form-select"
                                  tabindex="-1"
                                  @change="onYearChange()"
                                >
                                  <option value="" disabled selected>
                                    Chọn năm học
                                  </option>
                                  <option
                                    v-for="(year, index) in yearsArray"
                                    :value="year"
                                  >
                                    {{ year }}
                                  </option>
                                </select>
                              </div>
                              <!-- <div class="col-auto text-muted">
                                <a
                                  href="#"
                                  class="btn btn-warning btn-icon"
                                  data-bs-target="#modal-report-four"
                                  @click="getAttchedProgram()"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-git-branch-deleted"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
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
                                    <path
                                      d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                    />
                                    <path
                                      d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
                                    />
                                    <path d="M7 8v8" />
                                    <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
                                    <path d="M14 14l3 -3l3 3" />
                                    <path d="M15 4l4 4" />
                                    <path d="M15 8l4 -4" />
                                  </svg>
                                </a>
                              </div> -->
                            </div>

                            <div class="table-responsive">
                              <table id="menu_table" class="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Tên chương trình</th>
                                    <th>Hiển thị</th>
                                  </tr>
                                </thead>
                                <tbody
                                  v-for="(
                                    program, index
                                  ) in programsOrderedByYearArr"
                                >
                                  <tr>
                                    <td>{{ program.name }}</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        id="program_manage"
                                        :value="program._id"
                                        v-model="selectedProgramIdArr"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="onUserChange()"
                            >
                              Lưu
                            </button>
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
// import Header from "../components/Header.vue";

export default {
  name: "Admin",
  components: {
    VerticalNavbar,
    // Header,
  },
  data() {
    return {
      columns: ["stt", "name", "username", "phoneNumber", "permission", "tool"],
      options: {
        headings: {
          name: "Tên tài khoản",
          username: "Tên đăng nhập",
          phoneNumber: "Số điện thoại",
          permission: "phân quyền",
          tool: "Thao tác",
        },
      },

      name: "",
      username: "",
      phoneNumber: "",
      permission: "",
      password: "",

      displayModal: false,
      displayModalOne: false,
      displayModalTwo: false,
      displayModalThree: false,
      displayModalFour: false,

      menuArray: [],
      yearsArray: [],
      programsOrderedByYearArr: [],
      selectedProgramIdArr: [],
      year: "",

      editUser: {
        id: "",
        name: "",
        username: "",
        phoneNumber: "",
        permission: "",
        editedPassword: "",
      },
    };
  },

  setup() {
    // get toast interface
    const toast = useToast();
    return { toast };
  },

  async mounted() {
    try {
      const yearsArr = await this.getYearsArr();
      console.log(yearsArr, "yearsArr");
      this.yearsArray = yearsArr;
    } catch (error) {
      console.log("mounted catch block error");
    }
  },

  methods: {

    async getYearsArr() {
      try {
        const result = await instance.get("/api/get-years-array");
        console.log(result, "result, getYearsArr()");
        const yearsArr = result.data.data;
        return yearsArr;
      } catch (error) {
        console.log(error, "getYearsArr() catch block error");
      }
    },
    onEditAttachedUserProgram(item) {
      console.log("onEditAttachedUserProgram click event");
      this.editUser.id = item._id;
      this.showModal4();
    },
    async onYearChange() {
      console.log(this.year, "onYearChange");
      try {
        const queryParams = { year: this.year };
        const result = await instance.get("/api/get-programs-by-year", {
          params: queryParams,
        });
        console.log(result, "result, get-programs-by-year api result");
        this.programsOrderedByYearArr =
          result.data.programsZeroUserFilterByYear;
      } catch (error) {
        console.log(error, "onYearChange() catch block error");
      }
    },

    async onUserChange() {
      try {
        const data = {
          programIdArr: this.selectedProgramIdArr,
        };
        const result = await instance.patch(
          `/api/add-programs-for-users/${this.editUser.id}`,
          data
        );
        console.log(result);
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModalFour = false;
          this.selectedProgramIdArr = [];
        }
      } catch (error) {}
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
    showModal3() {
      console.log("showModal3 click event");
      this.displayModalThree = true;
    },
    hideModal3() {
      this.displayModalThree = false;
    },
    showModal4() {
      this.displayModalFour = true;
    },
    hideModal4() {
      this.displayModalFour = false;
    },

    showUserMenu(item) {
      console.log(item);
      this.editUser.id = item._id;
      if (!item.menuManageArray) {
        this.menuArray = [];
      } else {
        this.menuArray = item.menuManageArray;
      }

      this.showModal3();
    },

    async onMenuChange() {
      console.log("onMenuChange click event");
      try {
        const data = {
          menuArray: this.menuArray,
        };
        const result = await instance.patch(
          `/api/add-menu/${this.editUser.id}`,
          data
        );
        console.log(result, "patch add-menu api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModalThree = false;
          this.menuArray = [];
        }
      } catch (error) {
        console.log(error, "onMenuChange catch block error");
      }
    },
    async submitFile() {
      try {
        const data = {
          name: this.name,
          username: this.username,
          phoneNumber: this.phoneNumber,
          permission: this.permission,
          password: this.password,
        };
        console.log(data, "post api data");

        const result = await instance.post("/api/create-user", data);
        console.log(result, "post api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModal = false;
          this.name = "";
          this.username = "";
          this.phoneNumber = "";
          this.permission = "";
          this.password = "";
        }
      } catch (error) {
        console.log(error, "post api catch block error");
      }
    },

    onEdit(item) {
      console.log(item, "item");
      this.editUser.name = item.name;
      this.editUser.username = item.username;
      this.editUser.phoneNumber = item.phoneNumber;
      this.editUser.permission = item.permission;
      this.editUser.id = item._id;
      this.showModal1();
    },

    async onSubmit() {
      try {
        const data = {
          name: this.editUser.name,
          username: this.editUser.username,
          phoneNumber: this.editUser.phoneNumber,
          permission: this.editUser.permission,
        };

        const result = await instance.put(
          `/api/edit-user/${this.editUser.id}`,
          data
        );
        console.log(result, "put api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          this.$refs.table.refresh();
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          console.log(result.data);
          this.displayModalOne = false;
        }
      } catch (error) {
        console.log(error, "put api catch block error");
      }
    },

    async onEditPassWord(item) {
      console.log(item);
      this.editUser.id = item._id;
      this.showModal2();
    },

    async onPasswordChange() {
      console.log(this.editUser.editedPassword, "editedPassword");
      try {
        const data = {
          editedPassword: this.editUser.editedPassword,
        };
        const result = await instance.patch(
          `/api/edit-user-password/${this.editUser.id}`,
          data
        );
        console.log(result, "patch api result");
        if (result.data.error === true) {
          // alert(result.data.message)
          this.toast.error(result.data.message);
          // location.reload();
          // this.$refs.table.refresh()
        }

        if (result.data.error === false) {
          // alert(result.data.message)
          this.toast.success(result.data.message);
          this.$refs.table.refresh();
          this.displayModalTwo = false;
          this.editedPassword = "";
        }
      } catch (error) {
        console.log(error, "patch api catch block error");
      }
    },

    async remove(item) {
      console.log(item);
      try {
        if (confirm("Xóa user này?")) {
          const result = await instance.delete(`/api/delete-user/${item._id}`);
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

<style scoped>
#menu_table td,
#menu_table th {
  border: 1px solid #ddd;
}
</style>
