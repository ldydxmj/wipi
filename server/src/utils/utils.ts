export function getPageObj(obj) {

    let back = {
        totalRow: obj.total,
        pageNumber: obj.currentPage,
        pageSize: obj.pageSize,
        list: obj.data
    }

    return {
        page: back
    }
} 