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
      <h1 class="navbar-brand navbar-brand-autodark">
        <a href=".">
          <img
            src="../assets/logo-white.svg"
            width="110"
            height="32"
            alt="Tabler"
            class="navbar-brand-image"
          />
        </a>
      </h1>

      <div class="collapse navbar-collapse show" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                ><!-- Download SVG icon from http://tabler-icons.io/i/home -->
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
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/news-manage">
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
              <span class="nav-link-title">Quản lí Tin Tức </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/lesson-manage">
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
              <span class="nav-link-title"> Quản lí thư viện </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/club-manage">
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
              <span class="nav-link-title"> Quản lí club </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/staff-manage">
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
              <span class="nav-link-title"> Quản lí nhân viên </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/slideshow-images-manage">
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
              <span class="nav-link-title"> Quản lí ảnh slideshow </span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "VerticalNavBar",
};
</script>

<style></style>
