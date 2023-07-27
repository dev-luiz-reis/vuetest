<template>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCadastro">Register new Product</button>

  <div class="modal fade" id="modalCadastro" tabindex="-1" role="dialog" aria-labelledby="modalCadastroLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-2">
            <label for="nome">Name</label>
            <input v-model="nome" type="text" class="form-control" id="nome" placeholder="Name">
          </div>
          <div class="form-group mb-2">
            <label for="descricao">Description</label>
            <input v-model="descricao" type="text" class="form-control" id="descricao" placeholder="Description">
          </div>
          <div class="form-group mb-2">
            <label for="preco">Price</label>
            <input v-model="preco" type="number" class="form-control" id="preco" placeholder="Price">
          </div>
          <div class="form-group mb-2">
            <label for="categoria">Category</label>
            <input v-model="categoria" type="text" class="form-control" id="categoria" placeholder="Category">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="submitForm()" class="btn btn-primary" data-bs-dismiss="modal">Register</button>
          <button @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      nome: '',
      descricao: '',
      preco: '',
      categoria: '',
    };
  },
  computed: {
    ...mapState(['produtos', 'modalData'])
  },
  methods: {
    ...mapActions([
      'setModalData',
      'cadastrarProduto',
    ]),

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

    limparModal() {
      this.nome = '';
      this.descricao = '';
      this.preco = '';
      this.categoria = '';
    },
  },
};
</script>