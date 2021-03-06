import Vue from 'vue'
//toast提示框
export const confirm = async (msg, type = 'warning') => {
    return await Vue.prototype.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type
    })
}
