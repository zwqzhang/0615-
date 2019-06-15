export default {
    tel(str) {
        var re = /^1[3456789]\d{9}$/;
        return re.test(str)
    },
    id(str) {
        var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return re.test(str)
    },
    email(str) {
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        return re.test(str)
    },
}