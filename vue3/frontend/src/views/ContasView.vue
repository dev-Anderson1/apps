<template>
    <div>
       <v-card class="my-9 mx-auto" width="50%" v-if="mostrarForm">
        <v-btn
                 
                  color="red"
                  fab
                  top
                  dark
                  absolute
                  right
                  @click="mostrarForm=false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-container>
                    <div class="mb-4">Nova Conta</div>
                  <v-row>
                    <v-col
                            cols="12"
                            sm="4"
                        
                            >
                            <v-text-field
                                label="Descricao"
                                v-model="contaAtual.descricao"
                                outlined
                                hide-details
                            ></v-text-field>
                     </v-col>

                     <v-col
                            cols="12"
                            sm="4"
                        
                            >
                          <v-select
                            :items="tipo"
                            label="Tipo"
                            v-model="contaAtual.tipo"
                            outlined
                            hide-details
                            ></v-select>
                     </v-col>
                     <v-col
                            cols="12"
                            sm="4"
                        
                            >
                            <v-text-field
                                label="valor"
                                v-model="contaAtual.valor"
                                outlined
                                type="number"
                                hide-details
                            ></v-text-field>
                       </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                            outlined
                            label="Observações"
                           v-model="contaAtual.observacoes"
                           hide-details
                            ></v-textarea>
                       </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-row justify="center" class="mt-2 mb-2">
                    <v-btn color="success" @click="salvar" class="mx-1">
                        Salvar
                    </v-btn>
                    <v-btn color="warning" @click="cancelar" class="mx-1">
                        Cancelar
                    </v-btn>
                    </v-row>
                </v-card-actions>
       </v-card>
       <v-data-table
      :headers="cabecalho"
      :items="contas"
      class="elevation-1"
    >
    <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Contas Cadastradas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="abrirFormulario" v-if="!mostrarForm">Nova Conta</v-btn>
        </v-toolbar>
      </template>
      <template #[`body.append`]>
        <v-toolbar flat color="white">
          <v-toolbar-title>Balanço</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-card
          flat
          :class="balancoGeral >= 0 ? 'green--text' : 'red--text'"> 
          R$  {{  balancoGeral.toFixed(2) }}
          </v-card>
         
        </v-toolbar>
    </template>
      
      <template #[`item.acoes`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="detalhes(item)"
        >
          mdi-magnify
        </v-icon>
        <v-icon
          small
          @click="excluir(item)"
        >
         mdi-trash-can
        </v-icon>
      </template>
      <template #[`item.tipo`]="{ item }">
        <div :class="item.tipo === 'Receita' ? 'green--text':'red--text'">
            {{ item.tipo }}
        </div>
      </template>

      <template #[`item.valor`]="{ item }">
      R$ {{  item.valor.toFixed(2) }}
      </template>


      <template v-slot:no-data>
        <v-row justify="center">
            <v-subheader> Nenhuma Conta Cadastrada</v-subheader>
        </v-row>
       
      </template>
       </v-data-table>
       <v-dialog
      v-model="confirmaExclusao"
      persistent
      max-width="340"
    >
      <v-card>
        <v-card-title class="headline">
          Tem certeza que deseja excluir essa conta?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="cancelarExclusao"
          >
            Não
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="confirmarExclusao"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="detalhesDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">
          Detalhes da Conta
        </v-card-title>
        <v-card-text>
            <v-row>
                    <v-col
                            cols="12"
                            sm="4"
                        
                            >
                            <v-text-field
                                label="Descricao"
                                :value="contaAtualDetalhe.descricao"
                                outlined
                                hide-details
                                disabled
                            ></v-text-field>
                     </v-col>

                     <v-col
                            cols="12"
                            sm="4"
                        
                            >
                          <v-select
                            :items="tipo"
                            label="Tipo"
                            :value="contaAtualDetalhe.tipo"
                            outlined
                            hide-details
                            disabled

                            ></v-select>
                     </v-col>
                     <v-col
                            cols="12"
                            sm="4"
                        
                            >
                            <v-text-field
                                label="valor"
                                :value="contaAtualDetalhe.valor.toFixed(2)"
                                type="number"
                                outlined
                                hide-details
                                disabled

                            ></v-text-field>
                       </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea
                            outlined
                            label="Observações"
                           :value="contaAtualDetalhe.observacoes"
                           hide-details
                           disabled

                            ></v-textarea>
                       </v-col>
                    </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="detalhesDialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return{
            mostrarForm:false,
            contaAtual: {},
            confirmaExclusao:false,
            contaExcluir:null,
            detalhesDialog:false,
            contaAtualDetalhe:{
                valor:0,
            },
            tipo:["Receita", "Despesa"],
            geradorId: 3,
            balancoGeral:0,
            cabecalho:[
            {
            text:"Descriçao",
            value:"descricao"
        },
        {
            text:"Tipo",
            value:"tipo"
        },
        {
            text:"Valor",
            value:"valor"
        },
        {
            text:"Açoes",
            value:"acoes",
            sortable:false,
        },
            ],
            contas:[],
        }
       
    },
    created () {
    this.initialize()
  },
    methods:{
        initialize () {
        this.contas = [
            {
                id: 0,
                descricao: "Conta 1",
                observacoes:"Teste",
                tipo:"Receita",
                valor:10.0,
               
            },
            {
                id: 1,
                descricao: "Conta 2",
                observacoes:"Teste1",
                tipo:"Despesa",
                valor:20.0,
               
            },
            {
                id: 2,
                descricao: "Conta 3",
                observacoes:"teste2",
                tipo:"Receita",
                valor:30.0,
               
            },
        ]

        this.calcularBalanco()
    },
    abrirFormulario(){
        this.mostrarForm = true
    },
    salvar(){
        let contaNova = {}
        Object.assign(contaNova, this.contaAtual)
        contaNova.id = this.geradorId
        contaNova.valor = parseFloat(contaNova.valor)
        this.contas.push(contaNova)
        this.geradorId++
        this.calcularBalanco()
        this.cancelar()
    },

    excluir(conta){
        this.confirmaExclusao = true
        this.contaExcluir = conta
    },

       
    confirmarExclusao(){
        this.contas.forEach((conta, index) => {
            if(conta.id == this.contaExcluir.id){
                this.contas.splice(index, 1)
            }
        });
        this.confirmaExclusao = false
        this.calcularBalanco()
    },
    cancelarExclusao(){
        this.confirmaExclusao = false
        this.cancelar()
    },
    cancelar() {
      this.mostrarForm = false
      this.contaAtual = {}
      this.contaExcluir = null
    },
    detalhes(conta){
        this.detalhesDialog = true
        this.contaAtualDetalhe = conta
    },
    calcularBalanco(){
        this.balancoGeral = 0
        this.contas.forEach(conta => {
            if(conta.tipo === "Receita"){
                this.balancoGeral += conta.valor
            }else {
                this.balancoGeral -= conta.valor
            }
           
        });
    }
    }
    
}
</script>
<style lang="">
    
</style>