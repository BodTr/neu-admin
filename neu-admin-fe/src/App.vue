
<template>
  <aside v-if="!['/login'].includes($route.path) && !['/init-program'].includes($route.path)" class="navbar navbar-vertical navbar-expand-lg navbar-dark">
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
            src="./assets/Logo-NEU.png"
            width="60"
            height="60"
            alt="neu-logo"
            class="navbar-brand-image-xl"
          />
        </a>
      </div>
      <div class="collapse navbar-collapse show" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li v-if="userPermission !== 'Cấp 2'" class="nav-item mb-3">
            <router-link
              class="btn btn-lime d-none d-sm-inline-block"
              to="/init-program"
              @click="storeRoutePath()"
            >
              <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
              Đổi chương trình quản lý
          </router-link>
          </li>
          <li v-show="programsIsShow" class="nav-item">
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
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý CTLK
              </span>
            </router-link>
          </li>
          <li v-show="lvOneProgramManageIsShow" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle show"
              href="#navbar-base"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="true"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                ><!-- Download SVG icon from http://tabler-icons.io/i/package -->
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
                  <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                  <path d="M12 12l8 -4.5"></path>
                  <path d="M12 12l0 9"></path>
                  <path d="M12 12l-8 -4.5"></path>
                  <path d="M16 5.25l-8 4.5"></path>
                </svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                CTLKĐT với nước ngoài
              </span>
            </a>
            <div class="dropdown-menu">
              <div class="dropdown-menu-column">
                <div v-show="genaralInforIsShow" class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle show"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    role="button"
                    aria-expanded="true"
                  >
                    Thông tin chung
                  </a>
                  <div class="dropdown-menu">
                    <router-link
                      v-for="(item, index) in genaralInforItem"
                      class="dropdown-item"
                      :to="{ name: item.name }" v-html="item.title"></router-link>
                  </div>
                </div>
                <div v-show="planIsShow" class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle show"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    role="button"
                    aria-expanded="true"
                  >
                    Đề án
                  </a>
                  <div class="dropdown-menu">
                    <router-link
                      v-for="(item, index) in planItem"
                      class="dropdown-item"
                      :to="{ name: item.name }"
                      >{{ item.title }}</router-link
                    >
                  </div>
                </div>
                <div v-show="educationQualityIsShow" class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle show"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    role="button"
                    aria-expanded="true"
                  >
                    Chất lượng đào tạo
                  </a>
                  <div class="dropdown-menu">
                    <router-link
                      v-for="(item, index) in educationQualityItem"
                      class="dropdown-item"
                      :to="{ name: item.name }" v-html="item.title"></router-link>
                  </div>
                </div>
                <div v-show="curriculumIsShow" class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle show"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    role="button"
                    aria-expanded="true"
                  >
                    Khung chương trình
                  </a>
                  <div class="dropdown-menu">
                    <router-link
                      v-for="(item, index) in curriculumItem"
                      class="dropdown-item"
                      :to="{ name: item.name }"
                      v-html="item.title"></router-link
                    >
                  </div>
                </div>
                <div v-show="enrollmentIsShow" class="dropend">
                  <a
                    class="dropdown-item dropdown-toggle show"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    role="button"
                    aria-expanded="true"
                  >
                    Tuyển sinh
                  </a>
                  <div class="dropdown-menu">
                    <router-link
                      v-for="(item, index) in enrollmentItem"
                      class="dropdown-item"
                      :to="{ name: item.name }"
                      >{{ item.title }}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li v-show="moumoaIsShow" class="nav-item">
            <router-link class="nav-link" to="/enrollment/moumoa-infor">
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
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý MOU.MOA
              </span>
            </router-link>
          </li>
          <li v-show="htqtIsShow" class="nav-item">
            <router-link class="nav-link" to="/enrollment/htqt-infor">
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
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý Các dự án HTQT
              </span>
            </router-link>
          </li>
          <li v-show="shortTermExStuIsShow" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle show"
              href="#navbar-base"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="true"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                ><!-- Download SVG icon from http://tabler-icons.io/i/package -->
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
                  <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                  <path d="M12 12l8 -4.5"></path>
                  <path d="M12 12l0 9"></path>
                  <path d="M12 12l-8 -4.5"></path>
                  <path d="M16 5.25l-8 4.5"></path>
                </svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý sinh viên <br />
                trao đổi ngắn hạn
              </span>
            </a>
            <div class="dropdown-menu">
              <router-link
                v-for="(item, index) in shortTermExStuItem"
                class="dropdown-item"
                :to="{ name: item.name }"
                v-html="item.title"></router-link
              >
            </div>
          </li>
          <li v-show="studentIsShow" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle show"
              href="#navbar-base"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="true"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                ><!-- Download SVG icon from http://tabler-icons.io/i/package -->
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
                  <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                  <path d="M12 12l8 -4.5"></path>
                  <path d="M12 12l0 9"></path>
                  <path d="M12 12l-8 -4.5"></path>
                  <path d="M16 5.25l-8 4.5"></path>
                </svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý lưu sinh viên</span
              >
            </a>
            <div class="dropdown-menu">
              <router-link
                v-for="(item, index) in studentItem"
                class="dropdown-item"
                :to="{ name: item.name }"
                >{{ item.title }}</router-link
              >
            </div>
          </li>
          <li v-show="visaIsShow" class="nav-item">
            <router-link class="nav-link" to="/enrollment/extend-visa">
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
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Cấp/Gia hạn VISA
              </span>
            </router-link>
          </li>
          <li v-show="userIsShow" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle show"
              href="#navbar-base"
              data-bs-toggle="dropdown"
              data-bs-auto-close="false"
              role="button"
              aria-expanded="true"
            >
              <span class="nav-link-icon d-md-none d-lg-inline-block"
                ><!-- Download SVG icon from http://tabler-icons.io/i/package -->
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
                  <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                  <path d="M12 12l8 -4.5"></path>
                  <path d="M12 12l0 9"></path>
                  <path d="M12 12l-8 -4.5"></path>
                  <path d="M16 5.25l-8 4.5"></path>
                </svg>
              </span>
              <span
                class="nav-link-title"
                style="font-size: 15px; font-weight: 600; color: #fff"
              >
                Quản lý tài khoản</span
              >
            </a>
            <div class="dropdown-menu">
              <router-link
                v-for="(item, index) in userItem"
                class="dropdown-item"
                :to="{ name: item.name }"
                >{{ item.title }}</router-link
              >
            </div>
          </li>
          <li class="nav-item">
            <a class="btn btn-ghost-danger" @click="logout()">
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <router-view />
</template>
<script>
import { useToast } from "vue-toastification";
import router from "@/router";
import instance from "./instance";


// import { RouterLink, RouterView } from "vue-router";
export default {
  name: "AppVue",
  created() {
    this.userPermission = localStorage.getItem("permission");
    const unOrderedUserMenuArr = localStorage.getItem("menuManageArray");
    console.log(unOrderedUserMenuArr, "unOrderedUserMenuArr created hook");
    if(unOrderedUserMenuArr){
      const orderedUserMenuArr = JSON.parse(unOrderedUserMenuArr);
      orderedUserMenuArr.sort((a, b) => {
        return a.stt - b.stt;
      });
      this.userMenuArr = orderedUserMenuArr;
      console.log(this.userMenuArr, "userMenuArr created hook");
    }

  },
  // beforeUpdate() {
  //   const unOrderedUserMenuArr = localStorage.getItem("menuManageArray");
  //   console.log(unOrderedUserMenuArr, "beforeUpdate hook");
  // },
  data() {
    return {

      userMenuArr: [],
      userPermission: "",
    };
  },

  computed: {
    programsIsShow() {
      // Quản lý chương trình liên kết
      const arrayZero = [1];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayZero);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    lvOneProgramManageIsShow() {
      // CTLKĐT với nước ngoài
      const arrayOne = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      const filteredUserMenuArr = this.userMenuArr.filter((item) => {
        if (arrayOne.includes(item.stt)) {
          return item;
        }
      });
      if (filteredUserMenuArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    genaralInforIsShow() {
      // Thông tin chung
      const arrayTwo = [2, 3, 4, 5, 6, 7, 8];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayTwo);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    genaralInforItem() {
      // Thông tin chung các item
      const arrayTwo = [2, 3, 4, 5, 6, 7, 8];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayTwo);
      console.log(filteredArr,"filteredArr genaralInforItem()")
      return filteredArr;
    },

    planIsShow() {
      // Đề án
      const arrayThree = [9];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayThree);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    planItem() {
      // Nội dung đề án
      const arrayThree = [9];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayThree);
      return filteredArr;
    },
    educationQualityIsShow() {
      // Chất lượng đào tạo
      const arrayFour = [10];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayFour);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    educationQualityItem() {
      // Đảm bảo chất lượng đào tạo
      const arrayFour = [10];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayFour);
      console.log(filteredArr, "educationQualityItem")
      return filteredArr;
    },
    curriculumIsShow() {
      // Khung chương trình
      const arrayFive = [11];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayFive);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    curriculumItem() {
      // Thông tin khung chương trình
      const arrayFive = [11];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayFive);
      return filteredArr;
    },
    enrollmentIsShow() {
      // Tuyển sinh
      const arraySix = [12, 13, 14, 15];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arraySix);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    enrollmentItem() {
      // quản lý tuyển sinh, giảng viên, đơn vị công tác, môn học
      const arraySix = [12, 13, 14, 15];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arraySix);
      return filteredArr;
    },
    moumoaIsShow() {
      // quản lý MOU.MOA
      const arraySix = [16];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arraySix);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    htqtIsShow() {
      const arraySeven = [17];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arraySeven);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    shortTermExStuIsShow() {
      // Quản lý sinh viên trao đổi ngắn hạn
      const arrayEight = [18, 19];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayEight);
      // for(var i = 0; i < filteredArr.length;i++){
      //   alert(filteredArr[i].name)
      // }
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    shortTermExStuItem() {
      // Sinh viên nước ngoài đến trao đổi, sinh viên đi nước ngoài
      const arrayEight = [18, 19];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayEight);
      return filteredArr;
    },
    studentIsShow() {
      // Quản lý lưu sinh viên
      const arrayNine = [20];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayNine);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    studentItem() {
      // Quản lý lưu sinh viên
      const arrayNine = [20];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayNine);
      return filteredArr;
    },
    visaIsShow() {
      // Cấp/Gia hạn VISA
      const arrayTen = [21];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayTen);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    userIsShow() {
      // Quản lý tài khoản
      const arrayEleven = [22];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayEleven);
      if (filteredArr.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    userItem() {
      // Quản lý tài khoản
      const arrayTwelve = [22];
      const arr1 = this.userMenuArr;
      const filteredArr = this.arrayFilterer(arr1, arrayTwelve);
      return filteredArr;
    },
  },

  setup() {
    const toast = useToast();
    return { toast };
  },

  methods: {
    storeRoutePath() {
      localStorage.setItem("routePath", router.currentRoute.value.path)
      // router.push('/init-program')
    },
    arrayFilterer(arr1, arr2) {
      // arr1 là array userMenuArr, và array này có prop stt trong mỗi phần tử, arr2 là array dùng để lọc arr1,
      const filteredArr = arr1.filter((item) => {
        if (arr2.includes(item.stt)) {
          return item;
        }
      });

      return filteredArr;
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
<style>
.VueTables__search__input {
  width: 200px;
  margin: 10px;
}

.VueTables__search-field label {
  float: left;
  margin: 5px;
}
@media (min-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 100% !important;
  }
}
.page-title {
  color: white !important;
}
.container-tight {
  width: 500px !important;
}
.card {
  border-radius: 10px;
}
.VueTables.VueTables--server {
  padding: 15px;
}
.VuePagination__count {
  margin-top: 15px;
}
.modal-content {
  border: 2px solid #242424b5;
}
.router-link-active{
  background-color: #484242 !important;
  
}
</style>
