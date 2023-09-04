<template>
  <v-app dark>

    <v-navigation-drawer
      :mini-variant.sync="mini"
      app
      fixed
      permanent
      color="#fafbfd"
      @click.stop="mini = true"
    >
      <v-list-item class="px-2">
        <v-col class="pl-0">
          <v-icon x-large color="#5d60ef"> mdi-ticket </v-icon>
        </v-col>

        <v-list-item-title>
          <h3 style="font-weight: bold; color: #3c4166">Board</h3>
        </v-list-item-title>

        <v-btn icon @click.stop="mini = true">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="#5d60ef">
          <v-list-item v-for="item in items" :key="item.title" link :to="item.to" @click.stop="mini = true">
            <v-list-item-icon >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title><strong>{{ item.title }}</strong> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      selectedItem: 0,
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard-variant",to:"/" },
        { title: "Buy Ticket", icon: "mdi-ticket-confirmation" ,to:"/ticket"},
        { title: "Ticket Management", icon: "mdi-table-edit" ,to:"/ticketManagement"},

      ],
      mini: true,
    };
  },
};
</script>
