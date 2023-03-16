<template>

  <el-container>
    <el-main>

      <el-row :gutter="10">
        <el-col
        :xs="{span:22, offset:1}"
        :sm="{span:20, offset:2}"
        :md="{span:18, offset:3}"
        :lg="{span:14, offset:5}"
        :xl="{span:8, offset:8}">
        </el-col>
      </el-row>

    </el-main>

  </el-container>



</template>








<script>
  import {
    jobs
  } from '../../api/cron.js'

  export default {
    data() {
      return {
        jobs: []
      }
    },
    created() {
      this.fetchJobs()
    },
    methods: {
      fetchJobs() {
        jobs().then(resp => {
          this.jobs = resp.data
          console.log(jobs)
        })
      }
    }

  }
</script>

<style>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
