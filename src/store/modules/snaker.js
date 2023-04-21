const state = {
    snacks: false,
    colo: '',
    mess: {}
}
const getters = {
  getsnacks: (state)=> state.snacks,
  getmess: (state)=> state.mess,
  getcolo: (state)=> state.colo,
}

const mutations = {
  setsnacker(state, data){
    state.snacks = true
    state.mess = data.mess
    state.colo = data.color
  },
 resetsnacker(state){
   state.snacks = false
   state.mess = ''
   state.colo = ''
 }
}
export default{
  state,
  getters,
  mutations
}