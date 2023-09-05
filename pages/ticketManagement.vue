<template>
  <div>
    <Navbar namePage="Ticket Management" />

    <v-col cols="12" sm="12" md="12" lg="12" class="mt-16">
      <v-card class="pa-4" rounded="xl" elevation="0" color="#fafbfd">

        <v-col class="text-right pa-0">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#5d60ef"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                elevation="0"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ticket"
                        label="Ticket"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.limitPerDay"
                        label="Amount limit per day"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price (฿)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.minimumBuying"
                        label="Minimum Buying"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="#fa4646"
                  @click="dialog = false,editedIndex = -1"
                  elevation="0"
                >
                  Cancel
                </v-btn>
                <v-btn dark color="#6ef5a8" @click="save" elevation="0">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <v-data-table
          :headers="headers"
          :items="getTicket"
          class="elevation-0"
          color="#fafbfd"
          :items-per-page="5"
        >
          <template v-slot:[`item.ticket`]="{ item }">
            <v-chip :color="getColor(item.ticket)" dark small>
              {{ item.ticket }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapState } from "vuex";

export default {
  name: "IndexPage",
  data() {
    return {
      tickets: [],
      gradients: [],

      mini: true,

      headers: [
        { text: "Ticket", value: "ticket", sortable: true, align: "start" },
        { text: "Amount limit per day", value: "limitPerDay", sortable: false },
        { text: "Price (฿)", value: "price", sortable: false },

        { text: "Minimum Buying", value: "minimumBuying", sortable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],

      // date: format(parseISO(new Date().toISOString()), "dd-MM-yyyy"),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      editedItem: {
        ticket: "",
        limitPerDay: 0,
        minimumBuying: 0,
        price: 0,
      },
      dialog: false,
      editedIndex: -1,
    };
  },

  computed: {
    computedDateFormatted() {
      return this.date;
    },

    getTicket: {
      get() {
        if (
          this.$store.state.tickets.tickets == null ||
          this.$store.state.tickets.tickets == 0 ||
          this.$store.state.tickets.tickets == [] ||
          this.$store.state.tickets.tickets == ""
        ) {
          return null;
        } else {
          let allTIcket = this.$store.state.tickets.tickets.allTicket;
          console.log(allTIcket);
          return allTIcket;
        }
      },
      set() {},
    },
    getTicketLength: {
      get() {
        if (
          this.$store.state.tickets.tickets == null ||
          this.$store.state.tickets.tickets == 0 ||
          this.$store.state.tickets.tickets == [] ||
          this.$store.state.tickets.tickets == ""
        ) {
          return null;
        } else {
          let allTIcket = this.$store.state.tickets.tickets.allTicket.length;
          return allTIcket;
        }
      },
      set() {},
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  mounted() {},
  methods: {
    editItem(item) {
      this.editedIndex = this.getTicket.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    ...mapActions({
      changeTicket: "tickets/changeTicket",
    }),

    getColor(ticket) {
      if (ticket == "Ticket A") return "#f5887a";
      else if (ticket == "Ticket B") return "#7af5af";
      else if (ticket == "Ticket C") return "#a97af5";
      else if (ticket == "Ticket D") return "#7ad0f5";
      else return "#fce1f1";
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async save() {
      if (this.editedIndex > -1) {
        let data = {
          ticket: this.editedItem.ticket,
          price: this.editedItem.price,
          limitPerDay: this.editedItem.limitPerDay,
          minimumBuying: this.editedItem.minimumBuying,
        };
        await this.$store.dispatch(`tickets/changeTicket`, {
          ticket: data,
          limitPerDay: this.editedItem.limitPerDay,
        });
        this.dialog = false;
      } else {
        let data = {
          id: this.getTicketLength + 1,
          ticket: this.editedItem.ticket,
          price: this.editedItem.price,
          limitPerDay: this.editedItem.limitPerDay,
          minimumBuying: this.editedItem.minimumBuying,
          color: "#fce1f1",
          picture: require("~/assets/images/letter-e.png"),
          rating: 5.0,
          countReview: 0,
          class: "ticket-e",
        };

        await this.$store.dispatch(`tickets/changeTicket`, {
          ticket: data,
          limitPerDay: this.editedItem.limitPerDay,
        });
        this.dialog = false;
      }
    },
  },
};
</script>
