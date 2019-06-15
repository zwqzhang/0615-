<template>
  <div class="admincreate">
    <h2>{{$route.name}}</h2>
    <div class="box">
      <em>账号</em>
      <div class="input">
        <el-input v-model="arr.name" :disabled="turn" @blur="account()"></el-input>
      </div>
      <span>{{a}}</span>
    </div>
    <div class="box">
      <em>密码</em>
      <div class="input">
        <el-input v-model="arr.pass" show-password :disabled="turn"></el-input>
      </div>
      <span>{{b}}</span>
    </div>
    <div class="box" v-if="arr.id==0">
      <em>确认密码</em>
      <div class="input">
        <el-input v-model="pass1" show-password></el-input>
      </div>
      <span>{{c}}</span>
    </div>
    <div class="box">
      <em>属性</em>
      <div class="input">
        <el-input v-model="arr.prop"></el-input>
      </div>
      <span></span>
    </div>
    <div class="box">
      <em>注册时间</em>
      <div class="input">
        <el-date-picker v-model="arr.time" type="date" placeholder="选择日期"></el-date-picker>
      </div>
      <span></span>
    </div>
    <div class="btn">
      <el-button type="primary" round @click="update(arr.id)">{{change}}</el-button>
      <el-button type="primary" round @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import $ from "jquery";
import login from "../../common/js/fn";
export default {
  components: {},
  props: [],
  data() {
    return {
      arr: {
        id: "",
        name: "",
        pass: "",
        prop: "",
        time: ""
      },
      pass1: "",
      turn: true,
      change: "",
      a: "",
      b: "",
      c: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    update(id) {
      if (this.$route.params.id != 0) {
        // 修改、更新管理员数据
        delete this.arr._id;
        this.$http({
          url: API.updateManage,
          params: this.arr,
          method: "get"
        }).then(d => {
          console.log(d);

          if (d.data.code == -1) {
            login(this, b);
          }
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.go(-1);
          } else {
            this.$message({
              message: "更新失败",
              type: "warning"
            });
          }
        });
      } else {
        // 新建，并且判断两次输入密码是否一样
        if (this.arr.pass == this.pass1) {
          if (this.a == "账号不符合规则") {
            return;
          }
          this.$http({
            url: API.addManage,
            method: "get",
            params: this.arr
          }).then(d => {
            if (d.data.code == -1) {
              login(this, b);
            }
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.go(-1);
          });
        } else {
          this.$message({
            message: "两次密码填写不一致",
            type: "warning"
          });
        }
      }
    },
    // 验证数据库中是否有此账号
    account() {
      this.$http({
        url: API.findManage,
        method: "get"
      }).then(d => {
        // console.log(d);
        d.data.data.filter(item => {
          if (this.arr.name == item.name) {
            return (this.a = "账号已存在");
          } else {
            var re1 = /^\w{4,20}$/;
            var re2 = /^\W{4,20}$/;
            if (re1.test(this.arr.name) || re2.test(this.arr.name)) {
              return (this.a = "账号可以使用");
            } else {
              return (this.a = "账号不符合规则");
            }
          }
        });
      });
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    if (this.$route.params.id == 0) {
      this.turn = false;
      this.change = "注册";
    } else {
      this.change = "修改";
      this.turn = true;
      this.$http({
        url: API.findManage,
        method: "get",
        params: {
          id: this.$route.params.id
        }
      }).then(d => {
        // console.log(d);
        this.arr = d.data.data[0];
        this.pass1 = this.arr.pass;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.admincreate {
  width: 70%;
  padding: 30px 50px;
}

h2 {
  font-size: $h2;
}

box();

.box {
  span {
    width: 180px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    // color:green;
  }
}
</style>
