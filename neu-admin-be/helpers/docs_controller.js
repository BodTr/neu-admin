// kiểm tra trong array thông tin các file ta gửi về server có file nào giống nhau không
function hasNewDocsArrayDuplicate(arr) {
    const filteredArr = arr.filter((element, index, array) => {
        return array.indexOf(element) !== index // lấy những phần tử trùng nhau trong array gốc
    })

    const isDuplicate = filteredArr.length > 0 // Nếu filteredArr.length > 0 có nghĩa là có phần tử trùng nhau, isDuplicate = true
    return isDuplicate
}

// lấy docs array những doc đã bị xóa
function docsControl(docRefsArr, docsInDbArr) {
    console.log(docRefsArr, "docRefsArr docs_controller")
    const docNamesArr = docRefsArr.map(doc => {
        return doc.name
    })
    console.log(docNamesArr, "docNamesArr docs_controller")
    if (docRefsArr.length === 0) {
        console.log('docs1 empty input docs_controller')
        const emptyInputError = 'DOCS1_EMPTY_INPUT_ERROR'
        return emptyInputError
    } else if (hasNewDocsArrayDuplicate(docNamesArr)) {
        console.log('có doc trùng nhau docs_controller')
        const duplicatedDocsError = 'DUPLICATED_DOCS_ERROR'
        return duplicatedDocsError
    } else {
        let newExistedDocsArray = [] // array các doc được gửi lên sv và là các file cũ
        let deletedDocsArray = []  // array các doc đã bị xóa
        docRefsArr.forEach(doc => {
            if (!doc.link) { // nếu phần tử trong array docRefsArray ko có link, có nghĩa là file mới được tải lên
                // pass
                console.log(`doc ${doc.name} is new docs_controller`)
            } else { // trường hợp phần tử trong array docRefsArray có link, có nghĩa là file cũ
                const link = doc.link
                newExistedDocsArray.push(link)
            }
        })
        console.log(newExistedDocsArray, "newExistedDocsArray, docs_controller")
        docsInDbArr.forEach(doc => {
            if (newExistedDocsArray.includes(doc.docLink)) {
                // pass
                console.log(`doc ${doc.docName} dont change`)
            } else {
                deletedDocsArray.push(doc)
            }
        })
        console.log(deletedDocsArray, "deletedDocsArray docs_controller")

        return deletedDocsArray
    }
}

module.exports = {
    docsControl
}