<template>
  <div class="container">
    <Header />
    <CadatroProdutos />
    <div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditar" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-2">
              <label for="nome">Name</label>
              <input v-model="editedProduto.nome" type="text" class="form-control" id="nome" placeholder="Name">
            </div>
            <div class="form-group mb-2">
              <label for="descricao">Description</label>
              <input v-model="editedProduto.descricao" type="text" class="form-control" id="description"
                placeholder="Descrição">
            </div>
            <div class="form-group mb-2">
              <label for="preco">Price</label>
              <input v-model="editedProduto.preco" type="number" class="form-control" id="preco" placeholder="Price">
            </div>
            <div class="form-group mb-2">
              <label for="categoria">Category</label>
              <input v-model="editedProduto.categoria" type="text" class="form-control" id="categoria"
                placeholder="Category">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="updateProduto()" class="btn btn-primary" data-bs-dismiss="modal">Edit</button>
            <button @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="modalDeletar" tabindex="-1" role="dialog" aria-labelledby="modalDeletar"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Do you really want to delete this product "{{ delProduto.nome }}"?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteProduto(delProduto.id)"
              data-bs-dismiss="modal">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.preco }}</td>
          <td>{{ produto.categoria }}</td>
          <td>
            <button @click="openEditModal(produto)" class="btn btn-primary btn-sm" data-bs-toggle="modal"
              data-bs-target="#modalEditar">Edit</button>
            <button @click="openDeleteModal(produto)" class="btn btn-danger btn-sm ms-3" data-bs-toggle="modal"
              data-bs-target="#modalDeletar">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import Swal from "sweetalert2";
import Header from './components/HeaderProdutos.vue';
import CadatroProdutos from './components/CadatroProdutos.vue';
// import EditarProdutos from './components/EditarProdutos.vue';
// import DeletarProdutos from './components/DeletarProdutos.vue';
// import TableProdutos from './components/TableProdutos.vue';

export default {
  components:{
    Header,
    CadatroProdutos
},
  data() {
    return {
      nome: '',
      descricao: '',
      preco: '',
      categoria: '',
      editedProduto: {
        nome: '',
        descricao: '',
        preco: 0,
        categoria: ''
      },
      delProduto: {
        id: '',
        nome: ''
      },
    };
  },
  computed: {
    ...mapState(['produtos', 'modalData', 'modalEditData'])
  },
  mounted() {
    this.$store.dispatch("setProdutos");
  },
  methods: {
    ...mapActions([
      'editarProduto',
      'excluirProduto',
      'setModalData',
      'setModalEditData',
      'cadastrarProduto',
    ]),

    openEditModal(produto) {
      this.editedProduto = { ...produto };
    },

    openDeleteModal(produto) {
      this.delProduto = produto;
    },

    submitForm() {
      if (!this.nome || !this.descricao || !this.preco || !this.categoria) {
        Swal.fire(
          'An error occurred!',
          'Please, complete all required fields.',
          'error'
        )
      } else {
        const modalData = {
          nome: this.nome,
          descricao: this.descricao,
          preco: this.preco,
          categoria: this.categoria
        };

        this.setModalData(modalData);

        this.cadastrarProduto();

        this.limparModal();
      }
    },

    updateProduto() {
      if (!this.editedProduto.nome || !this.editedProduto.descricao || !this.editedProduto.preco || !this.editedProduto.categoria) {
        Swal.fire(
          'An error occurred!',
          'Please, complete all required fields.',
          'error'
        )
      } else {
        const modalData = {
          id: this.editedProduto.id,
          nome: this.editedProduto.nome,
          descricao: this.editedProduto.descricao,
          preco: this.editedProduto.preco,
          categoria: this.editedProduto.categoria
        };

        this.setModalEditData(modalData);

        this.editarProduto();
      }
    },

    deleteProduto(produto) {
      this.excluirProduto(produto);
    },

    limparModal() {
      this.nome = '';
      this.descricao = '';
      this.preco = '';
      this.categoria = '';
    },
  },
};
</script>
