<template>
  <aside class="navbar navbar-vertical navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebar-menu"
        aria-controls="sidebar-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-brand navbar-brand-autodark" style="height: 90px;">
        <a href=".">
          <img
            src="../assets/Logo-NEU.png"
            width="60"
            height="60"
            alt="neu-logo"
            class="navbar-brand-image-xl"
          />
        </a>
      </div>

      <div class="collapse navbar-collapse show" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                >
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
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí cấu hình </span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Thông tin chung</span>
            </a>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'trans-programs-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                >
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">TT chương trình liên kết</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'approval-decision-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">Các quyết định phê duyệt</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'documents-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí văn bản liên kết </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'partners-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí đối tác </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'agencies-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí đơn vị thực hiện </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'goals-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Mục tiêu chương trình </span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Đề án</span>
            </a>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'plans-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí nội dung đề án </span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Chất lượng đào tạo</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'edu-quality-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Đảm bảo chất lượng đào tạo </span>
            </router-link>
          </li>
          <li class="nav-item">
              <a href="#" class="nav-link">
                <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Khung chương trình</span>
              </a>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'curriculums-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Thông tin khung chương trình </span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Tuyển sinh</span>
            </a>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'enrollment-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lí tuyển sinh</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'lecturers-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">Quản lí giảng viên</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'units-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">Quản lí đơn vị công tác</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'subjects-manage-page', params: {id: programId} }">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">Quản lí môn học</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"  :to="{ name: 'moumoa-manage-page', params: {id: programId} }">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Quản lí MOU.MOA</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'htqt-manage-page', params: {id: programId} }">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Quản lí các dự án HTQT</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'ex-f-student-manage-page', params: {id: programId} }">

              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Quản lí sinh viên nước ngoài đến trao đổi</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'ex-student-manage-page', params: {id: programId} }">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Quản lí sinh viên đi nước ngoài trao đổi</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'extend-visa-manage-page', params: {id: programId} }">
              
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Cấp/Gia hạn VISA</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <span class="nav-link-title" style="font-size: 17px; font-weight: 600;">Quản trị</span>
            </a>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                >
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
                  <path d="M9 11l3 3l8 -8"></path>
                  <path
                    d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"
                  ></path>
                </svg>
              </span>
              <span class="nav-link-title">Quản lý tài khoản</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
// import axios from 'axios'

export default {
  
  name: "VerticalNavBar",
  data() {
    return {
      
    }
  },

  props: ['programId'],

};
</script>

<style></style>
