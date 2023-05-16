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
                type="password"
            ></v-text-field>
            </v-col>
       </v-row>
      </v-container>
      <v-card-actions>
        <v-row justify="center mb-2">
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
      :headers="cabecalhos"
      :items="usuarios"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuarios Cadastrados</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="abrirFormulario" v-if="!mostrarForm">Novo Usuario</v-btn>
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
        if (this.itemEdicao==null){
          this.adicionar();
        } else {
          this.salvarEdicao()
        }
        this.mostrarForm = false
        this.cancelar();
    },
    adicionar(){
        let usuarioCopia = {}
        Object.assign(usuarioCopia, this.usuarioAtual)
        usuarioCopia.id =  this.geradorId
        usuarioCopia.ativo = true
        this.usuarios.push(usuarioCopia)
        this.geradorId++
    },
    salvarEdicao() {
        for (let i = 0; i < this.usuarios.length; i++) {
            if(this.itemEdicao.id == this.usuarios[i].id){
              this.usuarios.splice(i, 1, this.itemEdicao)
              break
            }
          
        }
    },
    editar(usuario){
        let usuarioCopia = {}
        Object.assign(usuarioCopia, usuario)
        this.itemEdicao = usuarioCopia
        this.usuarioAtual =  usuarioCopia
        this.mostrarForm = true
    },
    cancelar() {
      this.usuarioAtual = {}
      this.itemEdicao = null
    },
}
}
</script>
