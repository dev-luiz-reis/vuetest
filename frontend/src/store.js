import { createStore } from 'vuex';
import axios from 'axios';
import Swal from "sweetalert2";

export default createStore({
  state() {
    return {
      produtos: [],
      modalData: {
        nome: '',
        descricao: '',
        preco: '',
        categoria: ''
      },
      modalEditData: {
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        categoria: ''
      },
    };
  },
  mutations: {
    setProdutos(state, produtos) {
      state.produtos = produtos;
    },

    SetModalData(state, data) {
      state.modalData = data;
    },

    SetModalEditData(state, data) {
      state.modalEditData = data;
    },

    adicionarProduto(state, produto) {
      state.produtos.push(produto);
    },
    editarProduto(state, produtoAtualizado) {
      const index = state.produtos.findIndex(p => p.id === produtoAtualizado.id);
      if (index !== -1) {
        state.produtos.splice(index, 1, produtoAtualizado);
      }
    },
    excluirProduto(state, produtoId) {
      const index = state.produtos.findIndex(p => p.id === produtoId);
      if (index !== -1) {
        state.produtos.splice(index, 1);
      }
    },
  },
  actions: {
    setProdutos({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/produtos')
          .then(response => {
            commit('setProdutos', response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    setModalData({ commit }, data) {
      commit('SetModalData', data);
    },

    setModalEditData({ commit }, data) {
      commit('SetModalEditData', data);
    },

    cadastrarProduto({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/produtos', state.modalData, 
        {
          headers: {
          // Authorization: 'Bearer ' + YOUR_ACCESS_TOKEN,
        },
        })
          .then(response => {
            commit('adicionarProduto', response.data);
            Swal.fire(
              'Produto Cadastrado com Sucesso!',
              '',
              'success'
            )
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    editarProduto({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.put(`http://localhost:8000/api/produtos/${state.modalEditData.id}`, state.modalEditData)
          .then(response => {
            commit('editarProduto', response.data);
            Swal.fire(
              'Produto Editado com Sucesso!',
              '',
              'success'
            )
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    excluirProduto({ commit }, produtoId) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/api/produtos/${produtoId}`)
          .then(() => {
            commit('excluirProduto', produtoId);
            Swal.fire(
              'Produto Excluído com Sucesso!',
              '',
              'success'
            )
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
  getters: {
   
  },
});
