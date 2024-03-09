<template>
  <div class="page">
    <!-- <VerticalNavbar /> -->
    <div class="empty">
      <div class="empty-header"><img
        src="../assets/Logo-NEU.png"
        width="100"
        height="100"
        alt="neu-logo"
        class="navbar-brand-image-xl"
      /></div>
      <p style="color: white;" class="empty-title">PHẦM MỀM CHUYỂN ĐỔI SỐ QUẢN TRỊ DỮ LIỆU PHÒNG HỢP TÁC QUỐC TẾ <br /> TRƯỜNG ĐẠI HỌC KINH TẾ QUỐC DÂN</p>
    </div>
  </div>
</template>
<script>
  import VerticalNavbar from "../components/VerticalNavbar.vue";
  export default {
    name: 'EmptyPage',
    components: {
      VerticalNavbar,
    },
    data() {
      return {

      }
    }
  }
</script>
<style>

</style>