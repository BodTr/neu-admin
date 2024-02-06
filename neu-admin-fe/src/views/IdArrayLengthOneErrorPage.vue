<template>
  <div class="page page-center">
    <div class="container-tight py-4">
      <div class="empty">
        <div class="empty-header"><img
            src="../assets/Logo-NEU.png"
            width="100"
            height="100"
            alt="neu-logo"
            class="navbar-brand-image-xl"
          /></div>
        <p class="empty-title">Cần chọn chương trình quản lý</p>
        <p class="empty-subtitle text-muted">
          Ở phần Quản lý cấu hình, hãy tích MỘT chương trình bạn muốn quản lý
        </p>
        <div class="empty-action">
          <router-link class="btn btn-primary" to="/">
            <!-- Download SVG icon from http://tabler-icons.io/i/arrow-left -->
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
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg>
            Chọn chương trình quản lý
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "IdArrayLengthOneErrorPage",
  };
</script>
<style scoped></style>
