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
        })
      }
    }

  }
</script>
