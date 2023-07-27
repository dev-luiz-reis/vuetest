<template>
    <div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalEditar" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Produto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-2">
              <label for="nome">Nome</label>
              <input v-model="editedProduto.nome" type="text" class="form-control" id="nome" placeholder="Nome">
            </div>
            <div class="form-group mb-2">
              <label for="descricao">Descrição</label>
              <input v-model="editedProduto.descricao" type="text" class="form-control" id="descricao"
                placeholder="Descrição">
            </div>
            <div class="form-group mb-2">
              <label for="preco">Preço</label>
              <input v-model="editedProduto.preco" type="number" class="form-control" id="preco" placeholder="Preço">
            </div>
            <div class="form-group mb-2">
              <label for="categoria">Categoria</label>
              <input v-model="editedProduto.categoria" type="text" class="form-control" id="categoria"
                placeholder="Categoria">
            </div>
          </div>
          <div class="modal-footer">
            <button @click="updateProduto()" class="btn btn-primary" data-bs-dismiss="modal">Editar</button>
            <button @click="closeModal" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
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
      editedProduto: {
        nome: '',
        descricao: '',
        preco: 0,
        categoria: ''
      },
    };
  },
  computed: {
    ...mapState(['produtos', 'modalEditData'])
  },
  methods: {
    ...mapActions([
      'editarProduto',
      'setModalEditData',
    ]),

    openEditModal(produto) {
      this.editedProduto = { ...produto };
    },

    updateProduto() {
      if (!this.editedProduto.nome || !this.editedProduto.descricao || !this.editedProduto.preco || !this.editedProduto.categoria) {
        Swal.fire(
          'Erro ao Editar!',
          'Por favor, preencha todos os campos!',
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
    
  },
};
</script>
