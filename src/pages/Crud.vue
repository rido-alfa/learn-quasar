<template>
<div>

  <q-page class="mdi-18px">
    <q-btn @click="medium = true" style="margin: 30px 0 20px 20px;">Tambah</q-btn>
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card bg-purple text-white" v-for="(item, index) in task" :key="index">
      <q-card-section>
        <div class="text-h6">{{ item.nama }}</div>
        <div class="text-subtitle2">Tanggal: {{ Date(item.tanggal) }}</div>
        <div class="text-subtitle2">Status: {{ item.selesai }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat @click="editTask({id:index, selesai: !item.selesai})">Edit</q-btn>
        <q-btn flat  @click="deleteTask(index)">Hapus</q-btn>
      </q-card-actions>
    </q-card>
    </div>
  </q-page>
  <q-dialog
      v-model="medium"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Medium</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <q-input v-model="taskData.nama"></q-input>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="Kembali" v-close-popup />
          <q-btn flat label="Tambah" class="text-blue" @click="tambahData" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { db } from 'boot/firebase'
export default {
  data () {
    return {
      medium: false,
      taskData: {
        nama: '',
        selesai: false,
        tanggal: Date.now()
      }
    }
  },
  computed: {
    ...mapState('Crud', ['task'])
  },
  created () {
    this.getTask()
  },
  methods: {
    ...mapActions('Crud', ['getTask', 'addTask', 'editTask', 'deleteTask']),
    async tambahData () {
      const dataTask = {
        nama: this.taskData.nama,
        tanggal: this.taskData.tanggal,
        selesai: this.taskData.selesai
      }
      this.addTask(dataTask)
      this.medium = false
      this.taskData.nama = ''
    }
  }
}
</script>
