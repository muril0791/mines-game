<template>
  <v-dialog v-model="show" persistent max-width="290">
    <v-card :class="resultClass">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text v-if="win">{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="close">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        win: {
            type: Boolean,
            default: false,
        },
        amountWon: {
            type: Number,
            default: 0,
        },
        autoWin: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        title() {
            if (this.win) return 'Parabéns!';
            return 'Que pena!';
        },
        message() {
            if (this.win) {
                return `Você ganhou R$${this.amountWon.toFixed(2)}`;
            }
            return 'Você perdeu. Tente novamente.';
        },
        resultClass() {
            if (this.win) {
                return this.autoWin ? 'success-auto' : 'success';
            }
            return 'failure';
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
    watch: {
        show(newVal) {
            console.log('show changed', newVal);  // Debug log
            if (newVal) {
                setTimeout(() => {
                    this.$emit('close');
                }, 5000);  // Fechar o popup após 5 segundos
            }
        },
    },
};
</script>



<style scoped>
.success {
  background-color: green;
  color: white;
}
.success-auto {
  background-color: gold;
  color: green;
}
.failure {
  background-color: red;
  color: white;
}
</style>
