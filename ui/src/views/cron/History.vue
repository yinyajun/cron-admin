<template>
  <el-container>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">
          <el-table :data="executions" stripe style="width: 100%">
            <template slot="empty">
              <el-empty :image-size="100" description='No Data'></el-empty>
            </template>
            <el-table-column label="Id" prop="id" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column label="StartedAt" prop="started_at"> </el-table-column>
            <el-table-column label="FinisheddAt" prop="finished_at"> </el-table-column>
            <el-table-column label="Node" prop="node" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column label="Status" prop="status" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.success === true"><i class="el-icon-success"
                    style="color: green;font-size: 1.5rem;"></i></span>
                <span v-else> <i class="el-icon-error" style="color: red;font-size: 1.5rem;"></i> </span>
              </template>
            </el-table-column>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline>
                  <el-form-item label="output">
                    <span>{{scope.row.output}} </span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import {
    history
  } from '../../api/cron'

  export default {
    data() {
      return {
        executions: [],
      }
    },
    created() {
      const {
        job
      } = this.$route.query
      this.fetchHistory(job)
    },
    methods: {
      fetchHistory(job) {
        history(job).then(resp => {
          this.executions = resp.data
        }).catch((err) => {
          this.$message.error(err);
        })
      }
    }
  }
</script>

<style>
</style>
