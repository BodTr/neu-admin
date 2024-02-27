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
      <div class="navbar-brand navbar-brand-autodark" style="height: 90px">
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
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
              </span>
              <span class="nav-link-title"> Quản lý cấu hình </span>
            </router-link>
          </li>
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Thông tin chung</span>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'trans-programs-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title">TT chương trình liên kết</span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'approval-decision-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"
                    >Các quyết định <br />phê duyệt<br
                  /></span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'close-decision-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"
                    >Các quyết định đóng <br />chương trình<br
                  /></span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'documents-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"> Quản lý văn bản liên kết </span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'partners-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"> Quản lý đối tác </span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'agencies-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"> Quản lý đơn vị thực hiện </span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'goals-manage-page', params: { id: programId } }"
                >
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
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">
            
          </li> -->

          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <li class="nav-item active dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="false" role="button" aria-expanded="false">
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Đề án</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'plans-manage-page', params: { id: programId } }"
                >
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
                  <span class="nav-link-title"> Quản lý nội dung đề án </span>
                </router-link>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">

          </li> -->
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Chất lượng đào tạo</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'edu-quality-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title">
                    Đảm bảo chất lượng <br /> đào tạo
                  </span>
                </router-link>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">

          </li> -->
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Khung chương trình</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'curriculums-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title">
                    Thông tin khung <br /> chương trình
                  </span>
                </router-link>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">

          </li> -->
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Tuyển sinh</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'enrollment-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title"> Quản lý tuyển sinh</span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'lecturers-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title">Quản lý giảng viên</span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'units-manage-page', params: { id: programId } }"
                >
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
                  <span class="nav-link-title">Quản lý đơn vị công tác</span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'subjects-manage-page',
                    params: { id: programId },
                  }"
                >
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
                  <span class="nav-link-title">Quản lý môn học</span>
                </router-link>
              </div>
            </div>
          </li>
          <!-- <li class="nav-item">
            
          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->
          <!-- <li class="nav-item">

          </li> -->

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'moumoa-manage-page' }">
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff; "
                >Quản lý MOU.MOA</span
              >
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'htqt-manage-page' }">
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff;"
                >Quản lý các dự án HTQT</span
              >
            </router-link>
          </li>
           <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Quản lý sinh viên <br /> trao đổi ngắn hạn</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'ex-f-student-manage-page',
                  }"
                >
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
                  <span class="nav-link-title">
                    Quản lý sinh viên nước <br /> ngoài đến trao đổi
                  </span>
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{
                   name: 'ex-student-manage-page',
                  }"
                >
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
                  <span class="nav-link-title">
                    Quản lý sinh viên đi nước <br /> ngoài trao đổi
                  </span>
                </router-link>
              </div>
            </div>
          </li>
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Quản lý lưu sinh viên</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  :to="{
                    name: 'student-manage-page',
                  }"
                >
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
                  <span class="nav-link-title">
                    Quản lý lưu học sinh
                  </span>
                </router-link>
                
              </div>
            </div>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'extend-visa-manage-page',
              }"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-apps" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 7l6 0" /><path d="M17 4l0 6" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff;"
                >Cấp/Gia hạn VISA</span
              >
            </router-link>
          </li>
         
          <li class="nav-item active dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="false"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block" style="color: #fff;">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600"
                >Quản trị</span
              >
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-columns">
                <router-link
                  class="dropdown-item"
                  to="/admin"
                >
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
                  <span class="nav-link-title">
                    Quản lý tài khoản
                  </span>
                </router-link>
                
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="#" class="btn btn-ghost-danger" @click="logout()">
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { useToast } from "vue-toastification";
import router from "@/router";
import instance from "../instance";

export default {
  name: "VerticalNavBar",
  data() {
    return {};
  },

  props: ["programId"],
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async logout() {
      try {
        const data = { refresh_token: localStorage.getItem("refreshToken") };
        const result = await instance.post("/api/logout", data);
        if (result.data.error === false) {
          localStorage.clear();
          console.log(result);
          this.toast.success(result.data.message);
          router.push("/login");
        }
      } catch (error) {
        console.log(error, "logout api catch block error");
      }
    },
  },
};
</script>

<style></style>
