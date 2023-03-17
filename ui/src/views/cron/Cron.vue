<template>

  <div>
    <el-container>

      <el-header style="padding: 0;">
        <el-row>

          <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="/cron/schedule"> Schedule </el-menu-item>
            <el-menu-item index="/cron/running"> Running </el-menu-item>
            <el-menu-item index="/cron/dashboard" :disabled=true> Dashboard </el-menu-item>
          </el-menu>

        </el-row>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>

  </div>



</template>


<style scoped>
  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }


</style>




<script>
  export default {
    data() {
      return {
        activeIndex: '',
        events: []
      }
    },

    mounted() {
      this.activeIndex = sessionStorage.getItem("cronKeyPath") || '/cron/schedule'
    },
    watch: {
      activeIndex(newValue) {
        if (newValue != this.$route.path) {
          this.activeIndex = this.$route.path;
        }
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        sessionStorage.setItem('cronKeyPath', key)
      }

    }
  }
</script>
