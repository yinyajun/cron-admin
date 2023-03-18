<template>


  <el-container>





    <el-main>
      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">


        </el-col>

      </el-row>

      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">
          <el-table :data="executions" stripe style="width: 100%">
            <template slot="empty">
              <el-empty :image-size="100" description='No Data'></el-empty>
            </template>
            <el-table-column label="Id" prop="id" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column label="StartedAt" prop="started_at" :formatter="timeFormatter"> </el-table-column>
            <el-table-column label="FinisheddAt" prop="finished_at" :formatter="timeFormatter"> </el-table-column>
            <el-table-column label="Node" prop="node" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column label="Status" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.finished_at === 0"><i class="el-icon-loading" id="hist-loading"> </i></span>
                <span v-else-if="scope.row.success === true"><i class="el-icon-success" id="hist-success"></i></span>
                <span v-else> <i class="el-icon-error" id="hist-error"></i></span>
              </template>
            </el-table-column>

            <el-table-column type="expand" width=80>
              <template slot-scope="scope">
                <el-form v-if="scope.row.finished_at !== 0" label-position="left" block class="table-expand">
                  <el-form-item label="consume:"><span> {{consumeFormatter(scope.row)}} </span> </el-form-item>
                  <el-form-item label="result:"><span>{{scope.row.result}} </span> </el-form-item>
                </el-form>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">
          <!-- pagination -->
        </el-col>
      </el-row>
    </el-footer>

  </el-container>
</template>

<script>
  import {
    history
  } from '../../api/cron'

  import {
    timestampToTime,
    durationHuman
  } from '../../util/time'

  export default {
    data() {
      return {
        executions: [],
      }
    },
    created() {
      this.fetchHistory(this.$route.query.job)
    },
    methods: {
      fetchHistory(job) {
        history(job).then(resp => {
          this.executions = resp.data.executions
        }).catch((err) => {
          this.$message.error(err);
        })
      },

      timeFormatter: (row, col, value, idx) => timestampToTime(value),
      consumeFormatter: (row) => durationHuman((row.finished_at - row.started_at) / 1000)

    }
  }
</script>

<style>
  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #hist-loading {
    font-size: 1.5rem;
  }

  #hist-success {
    color: green;
    font-size: 1.5rem;
  }

  #hist-error {
    color: red;
    font-size: 1.5rem;
  }
</style>
