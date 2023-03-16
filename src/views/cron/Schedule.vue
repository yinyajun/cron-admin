<template>


  <el-container>
    <el-header>
      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">
          <el-input v-model="search" prefix-icon="el-icon-search" placeholder="Type to search">
            <el-button slot="append" icon="el-icon-circle-plus" style="color: #409EFF;"
              @click="dialogFormVisible = true"></el-button>
          </el-input>
        </el-col>
      </el-row>


      <el-dialog title="Add job schedule" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" label-width="50px">

          <el-form-item label="Job">
            <el-select v-model="addForm.job" filterable remote placeholder="Please enter a job"
              :remote-method="remoteMethod" :loading="loading" style="display:block">
              <el-option v-for="item in options" :label="item" :value="item" :key="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Spec">
            <el-input v-model="addForm.spec" autocomplete="off" placeholder="@every 30s"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="onSubmit">confirm</el-button>
        </div>

      </el-dialog>

    </el-header>

    <el-main>
      <el-row :gutter="10">
        <el-col :xs="{span:22, offset:1}" :sm="{span:20, offset:2}" :md="{span:18, offset:3}" :lg="{span:14, offset:5}"
          :xl="{span:8, offset:8}">
          <el-table :data="events.filter(data => isSubString(data.name ,search) )" stripe style="width: 100%">
            <template slot="empty">
              <el-empty :image-size="100" description='No Data'></el-empty>
            </template>
            <el-table-column label="Job" prop="name" width="100%" sortable>
              <template slot-scope="scope">
                <router-link :to="{path: '/cron/history', query:{job:scope.row.name}}" style="color: #409EFF;">
                  {{scope.row.name}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="Next Execution" prop="next" sortable> </el-table-column>
            <el-table-column label="Spec" prop="spec"> </el-table-column>
            <el-table-column label="Status" width="100">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.displayed" @change="toggleJobStatus(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="Actions" width="200">
              <template slot-scope="scope">
                <el-button plain size="mini" icon="el-icon-video-play" type="primary" @click="execute(scope.row)">
                </el-button>
                <el-button plain size="mini" icon="el-icon-delete" type="danger"
                  @click="removeJob(scope.$index,scope.row)"></el-button>
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
    schedule,
    active,
    pause,
    remove,
    add,
    execute,
    history,
    jobs
  } from '../../api/cron';


  export default {
    data() {
      return {
        events: [],
        jobs: [],

        activeIndex: '/schedule',
        search: '',
        dialogFormVisible: false,
        options: [],
        loading: false,

        addForm: {
          job: '',
          spec: ''
        }
      }
    },
    created() {
      this.fetchSchedule()
      this.fetchJobs()
    },
    methods: {

      // fetch schedule
      fetchSchedule() {
        schedule().then(resp => {
          this.events = resp.data
        })
      },

      //
      fetchJobs() {
        jobs().then(resp => {
          this.jobs = resp.data
        })
      },

      // toggle job status
      toggleJobStatus(row) {
        if (row.displayed) {
          active(row.name).catch((err) => {
            row.displayed = false
            this.$message.warning(err);
          })
        } else {
          pause(row.name).catch((err) => {
            row.displayed = true
            this.$message.warning(err);
          })
        }
      },

      // remove job
      removeJob(index, row) {
        this.$confirm('This will permanently delete the job ' + row.name + ', continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          remove(row.name).then(() => {
            this.events.splice(index, 1);
            this.$message.success('Delete completed');
          }).catch((err) => {
            this.$message.warning(err);
          })
        }).catch(() => {})
      },

      // execute
      execute(row) {
        this.$confirm('This will immediately run the job ' + row.name + ', continue?', 'Info', {
          confirmButtonText: 'OK',
          cancelButtonText: 'cancel',
          type: 'info'
        }).then(() => {
          execute(row.name).then(() => {
            this.$message.success('Run completed')
          }).catch((err) => {
            this.$message.warning(err)
          })
        }).catch(() => {})
      },

      // remote
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.jobs.filter(item => {
              return this.isSubString(item, query)
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      isSubString: (item, query) => {
        return !query || item.toLowerCase().includes(query.toLowerCase())
      },
      // submit
      onSubmit() {
        this.dialogFormVisible = false
        add(this.addForm.spec, this.addForm.job).then(() => {
          this.$message.success("add completed")
          this.fetchSchedule()
        }).catch((err) => {
          this.$message.warning(err)
        })
      }
      
      // 
      


    }
  }
</script>
