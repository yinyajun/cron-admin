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
            <el-table-column label="Job" prop="name" sortable="">
              <template slot-scope="scope">
                <router-link :to="{path: '/cron/history', query:{job:scope.row.name}}" style="color: #409EFF;">
                  {{scope.row.name}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="StartedAt" prop="started_at" sortable> </el-table-column>
            <el-table-column label="Node" prop="node" :show-overflow-tooltip="true"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<script>
  import {
    running
  } from '../../api/cron'

  export default {
    data() {
      return {
        executions: []
      }
    },

    created() {
      this.fetchRunning()
    },

    methods: {
      fetchRunning() {
        running().then(resp => {
          this.executions = resp.data
        }).catch((err) => {
          this.$message.error(err);
        })
      }
    }
  }
</script>
