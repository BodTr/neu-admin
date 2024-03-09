<template>
  <div class="page page-center">
    <div class="container container-tight py-4">
      <div class="card card-md">
        <div class="card-body text-center py-4 p-sm-5">
          <img src="../assets/Logo-NEU.png" height="120" class="mb-n2" alt="" />
          <h1 class="mt-5">Kết nối tri thức - vững bước tương lai!</h1>
        </div>
        <div class="hr-text hr-text-center hr-text-spaceless">
          Chọn chương trình
        </div>
        <div v-if="hasProgram" class="card-body">
          <div class="col-md-4">
            <label class="form-label">Năm học</label>
            <select
              v-model="year"
              class="form-select"
              tabindex="-1"
              @change="onYearChange()"
            >
              <option value="" disabled selected>Chọn năm học</option>
              <option v-for="(year, index) in yearsArray" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Chương trình</label>
            <select
              v-model="programName"
              class="form-select"
              tabindex="-1"
            >
              <option value="" disabled selected>Chọn chương trình</option>
              <option v-for="(program, index) in programsOrderedByYearArr" :value="program.name">
                {{ program.name }}
              </option>
            </select>
          </div>
        </div>
        <div v-else class="card-body text-center py-4 p-sm-5">
          <div class="mb-3">
            <p class="text-muted">Bạn chưa được liên kết với chương trình nào, liên hệ với admin để gán chương trình cho tài khoản</p>
          </div>
          <div>
            <a href="#" class="btn btn-ghost-danger" @click="logout()">
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
      <div class="row align-items-center mt-3">
        <div class="col">
          <div class="btn-list justify-content-end">
            
            <a class="btn btn-primary" @click="pushRouter()"> Tiếp tục </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import instance from '../instance';
import router from '@/router';
export default {
  name: "InitProgram",
  data() {
    return {
      yearsArray: [],
      programsOrderedByYearArr: [],
      hasProgram: false,
      programName: "",
      year: "",
    };
  },
  async mounted() {
    try {
      const yearsArr = await this.getYearsArr();
      console.log(yearsArr, "yearsArr mounted hook");
      this.yearsArray = yearsArr;

      const hasProgram = await this.hasAttachedProgram()
      console.log(hasProgram, "hasProgram mounted hook");
      this.hasProgram = hasProgram
    } catch (error) {
      console.log(error, "mounted catch block error");
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

    async hasAttachedProgram() {
      try {
        const result = await instance.get("/api/check-user-has-program-or-not")
        console.log(result, "result check-user-has-program-or-not api")
        return result.data.hasProgram
      } catch (error) {
        console.log(error, "hasAttachedProgram() catch block error")
      }
    },
    async onYearChange() {
      console.log(this.year, "onYearChange")
      try {
        const queryParams = { year: this.year }
        const result = await instance.get('/api/get-attached-programs-by-year', {params: queryParams})
        console.log(result, "result /api/get-attached-programs-by-year api")
        this.programsOrderedByYearArr = result.data.attachedProgramsFilterByYear
      } catch (error) {
        
      }
    },
    pushRouter() {
      // router.push('/init-page');

      console.log(router.push('/init-page'), "pushRouter click event")
      if(this.programName === '') {
        alert('Hãy chọn một chương trình')
      } else {
        localStorage.setItem("year", this.year)
        localStorage.setItem("programName", this.programName)
        router.push('/init-page');
      }

      
    },
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
