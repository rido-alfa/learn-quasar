import Vue from 'vue'
import { db } from 'boot/firebase'

const state = {
  task: {}
}
const mutations = {
  getTask (state, payload) {
    if (payload) {
      state.task = payload
    } else {
      state.task = {}
    }
  },

  addTask (state, payload) {
    Vue.set(state.task, payload.id, payload.taskDB)
  },

  updateTask (state, payload) {
    Object.assign(state.task[payload.id], { tanggal: payload.tanggal, selesai: payload.selesai })
  },

  deleteTask (state, id) {
    Vue.delete(state.task, id)
  }
}
const actions = {
  async getTask ({ commit }, payload) {
    try {
      const query = await db
        .collection('tasks')
        .get()
      query.forEach(doc => {
        const payload = {
          id: doc.id,
          taskDB: doc.data()
        }
        commit('addTask', payload)
      })
    } catch (error) {
      console.log(error)
    }
  },

  async addTask ({ commit, rootState }, task) {
    try {
      const docRef = await db.collection('tasks').add(task)
      console.log(docRef)
      const payload = {
        id: docRef.id,
        taskDB: task
      }
      commit('addTask', payload)
    } catch (error) {
      console.log(error)
    }
  },

  async editTask ({ commit, rootState }, task) {
    try {
      const docRef = await db.collection('tasks').doc(task.id).update({
        selesai: task.selesai, tanggal: Date.now()
      })
      console.log(docRef)
      commit('updateTask', { id: task.id, selesai: task.selesai, tanggal: Date.now() })
    } catch (error) {
      console.log(error)
    }
  },

  async deleteTask ({ commit }, id) {
    try {
      const docRef = await db.collection('tasks').doc(id).delete()
      console.log(docRef)
      commit('deleteTask', id)
    } catch (error) {
      console.log(error)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
