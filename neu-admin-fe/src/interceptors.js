import router from '@/router'

router.beforeEach(async(to, from) => {
    try {
        const idArr = JSON.parse(localStorage.getItem("idArr"))
        // console.log(idArr, "idArr")
        // if (to.name === 'programs-manage-page') {
        //     localStorage.setItem("idArr", null)
        // } else {

        // }
        if (idArr !== null) {
            if (to.meta.requiresProgramId && idArr.length !== 2) {
                return {name: 'id-array-error-page'}
            } else {

            }
        } else {
            if (to.meta.requiresProgramId) {
                return {name: 'id-array-error-page'}
            } else {

            }
        }
        
    } catch (error) {
        console.log(error, "beforeEach() catch block error")
    }
})