<template>
  <div class="page">
    <VerticalNavbar />
    <div class="empty">
      <div class="empty-header"><img
        src="../assets/Logo-NEU.png"
        width="100"
        height="100"
        alt="neu-logo"
        class="navbar-brand-image-xl"
      /></div>
      <p class="empty-title">Phần mềm quản lý chương trình HTQT NEU</p>
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