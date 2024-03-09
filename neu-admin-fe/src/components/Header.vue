<template>
  <header
    class="navbar navbar-expand-md navbar-light d-none d-lg-flex d-print-none"
  >
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
        aria-controls="navbar-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-nav flex-row" style="margin: 0 3rem 0 3rem;">
        <div class="nav-item">
          <a
            href="#"
            class="nav-link d-flex lh-1 text-reset p-0"
            data-bs-toggle="dropdown"
            aria-label="Open user menu"
          >
            <span
              class="avatar avatar-sm"
            ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0" fill="currentColor" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" stroke-width="0" fill="currentColor" /></svg></span>
            <div class="d-none d-xl-block ps-2">
              <div>Paweł Kuna</div>
              <div class="mt-1 small text-muted">UI Designer</div>
            </div>
          </a>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <div>
          <div class="mb-3">
            <label class="form-label">Năm và Tên chương trình</label>
            <div class="row g-2">
              <div class="col-2">
                <select v-model="year" class="form-select" tabindex="-1" @change="onYearChange()">
                  <option v-for="(year, index) in yearsArray" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
              <div class="col-10">
                <select v-model="programName" tabindex="-1" class="form-select">
                  <option v-for="(program, index) in programsOrderedByYearArr" :value="program.name">
                    {{ program.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    name: "Header",
    data() {
      return {
        year: "",
        programName: "",
      }
    },
  }
</script>
<style></style>
