
// 一段时间未操作或者突然断网等其他原因，再次操作时需要重新登录
function login(obj, d) {
    obj.$message({
        message: d.data.info,
        type: "warning"
    });
    obj.$router.replace('/login');
    return;
}


function del(obj, url, method, id) {
    obj.$confirm("确定是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
    })
        .then(() => {
            obj.$http({
                url: url,
                method: method,
                params: id
            }).then(d => {
                if (d.data.code == -1) {
                    login(obj, b);
                }
                obj.reload();
                obj.$message({
                    type: "success",
                    message: "删除成功!"
                });
            });
        })
        .catch(() => {
            obj.$message({
                type: "info",
                message: "已取消删除"
            });
        });
}


export default {
    login,
    del,
}

