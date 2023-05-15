<template>
  <v-app id="inspire">
    <v-navigation-drawer
 
    v-model="drawer"
      app
    >
  
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            SMB 
          </v-list-item-title>
          <v-list-item-subtitle>
            Painel Admin
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>CONTROLE DE ENTRADA E SAIDA DE MATERIAIS SMB </v-toolbar-title>
    </v-app-bar>

    <v-main>
      
      <router-view />
     
    </v-main>

    <v-footer>
      <span>
        Seção de Material Belico
      </span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null,
      
                        items: [
                            { title: 'Home', icon: 'mdi-home', to:'/' },
                            { title: 'Contas', icon: 'mdi-cash', to:'/contas' },
                            { title: 'Usuarios', icon: 'mdi-account', to:'/usuarios' },
                            { title: 'Relatorios', icon: 'mdi-align-vertical-bottom', to:'/relatorios' },
                        ],
                           
                         
    
                }),
  }
</script>