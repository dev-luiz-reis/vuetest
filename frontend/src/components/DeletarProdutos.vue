<template>
    <div class="modal fade" id="modalDeletar" tabindex="-1" role="dialog" aria-labelledby="modalDeletar"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Exclusão</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Deseja realmente excluir o produto "{{ delProduto.nome }}"?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteProduto(delProduto.id)"
              data-bs-dismiss="modal">Excluir</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      delProduto: {
        id: '',
        nome: ''
      },
    };
  },
  computed: {
    ...mapState(['produtos'])
  },
  methods: {
    ...mapActions([
      'excluirProduto',
    ]),

    openDeleteModal(produto) {
      this.delProduto = produto;
    },

    deleteProduto(produto) {
      this.excluirProduto(produto);
    },
  },
};
</script>
