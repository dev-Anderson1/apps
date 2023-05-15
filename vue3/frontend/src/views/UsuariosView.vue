<template>

  <div>

    <v-card class="my-9 mx-auto" width="50%" v-if="mostrarForm">
      <v-btn
                  v-show="!hidden"
                  color="red"
                  fab
                  top
                  dark
                  small
                  absolute
                  bottom
                  right
                  @click="mostrarForm=false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
      <v-container>
            <div class="mb-4">{{ formTitulo }}</div>
        <v-row>
            <v-col
            cols="12"
            sm="6"
           
            >
            <v-text-field
                label="Nome"
                v-model="usuarioAtual.nome"
                outlined
            ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="6"
           
            >
            <v-text-field
                label="Email"
                v-model="usuarioAtual.email"
                outlined
            ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="6"
          
            >
            <v-text-field
                label="Username"
                v-model="usuarioAtual.username"
                outlined
            ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="6"
           
            >
            <v-text-field
                label="Senha"
                v-model="usuarioAtual.senha"
                outlined
            ></v-text-field>
            </v-col>
       </v-row>
      </v-container>
      <v-card-actions>
        <v-btn color="success" @click="salvar" class="mx-1">
            Salvar
        </v-btn>
        <v-btn color="warning" @click="cancelar" class="mx-1">
            Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
        <v-data-table
      :headers="cabecalhos"
      :items="usuarios"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>Usuarios Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="abrirFormulario" v-if="!mostrarForm">Novo Usuario</v-btn>
          
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>


      <template #[`item.acoes`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editar(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="ativarInativar(item)"
        >
          {{  item.ativo ? "mdi-cancel" : "mdi-check-bold"}}
        </v-icon>
      </template>


      <template v-slot:no-data>
        <v-subheader> Nenhum Usuario Cadastrado</v-subheader>
      </template>
    </v-data-table>
    </div>
  </template>
    

    
<script>
export default {
  data: () => ({
    itemEdicao: null,
    usuarios: [],
    usuarioAtual:{},
    geradorId:3,
    mostrarForm:false,
    cabecalhos:[
        {
            text:"Nome",
            value:"nome"
        },
        {
            text:"Username",
            value:"username"
        },
        {
            text:"Email",
            value:"email"
        },
        {
            text:"Ações",
            value:"acoes"
        }

    ]

  }),

  computed: {
    formTitulo () {
      return this.itemEdicao == null ? 'Novo Usuario' : 'Editar Usuario'
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
        this.usuarios = [
            {
                id: 0,
                nome: "Joao da Silva",
                username:"joao01",
                senha: 123,
                email:"joao0'@email.com",
                ativo:true,
            },
            {
                id: 1,
                nome: "Joel da Silva",
                username:"joel01",
                senha: 123,
                email:"joel@email.com",
                ativo:false,
            },
            {
                id: 2,
                nome: "Maria da Silva",
                username:"maria01",
                senha: 123,
                email:"maria@email.com",
                ativo:true,
            },
        ]
    },
    abrirFormulario(){
        this.mostrarForm = true
    }, 
    ativarInativar(usuario) {
        usuario.ativo = !usuario.ativo
    }, 
    salvar() {

    },
    cancelar() {

    },
}
}
</script>
