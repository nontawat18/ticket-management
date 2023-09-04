<template>
  <div>
    <Navbar namePage="Dashboard" />

    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="7" lg="7">
        <v-card
          class="pa-4"
          rounded="xl"
          elevation="0"
          color="#fafbfd"
          min-height="340px"
        >
          <v-row class="">
            <v-col cols="12" md="6" lg="9">
              <h2 style="font-weight: bold; color: #3c4166">Day's Sales</h2>
              <p style="color: #909090">Sales Summary</p>
            </v-col>
            <v-col cols="12" md="6" lg="3">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Date"
                    dense
                    outlined
                    color="#3c4166"
                    persistent-hint
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  show-current
                  @input="sortDate"
                  color="#3c4166"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row class="pt-4">
            <v-col cols="12" sm="12" md="3" lg="3">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 4 : 0"
                  :class="{ 'on-hover': hover }"
                  color="#fcf3e1"
                >
                  <v-col class="text-right pb-0 pt-1">
                    <v-chip
                      x-small
                      color="#7af5af"
                      dark
                      v-if="getTicketAToday < getTicketPerDay[0].limitPerDay - 3"
                      >In Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#7ad0f5"
                      dark
                      v-else-if="getTicketPerDay[0].limitPerDay > getTicketAToday && getTicketAToday >= getTicketPerDay[0].limitPerDay - 3"
                      >Low Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#f5887a"
                      dark
                      v-else-if="getTicketAToday == getTicketPerDay[0].limitPerDay"
                      >Out Stock</v-chip
                    >
                  </v-col>
                  <v-col class="text-center pt-0">
                    <v-avatar size="50">
                      <v-img
                        :src="require('@/assets/images/letter-a.png')"
                      ></v-img>
                    </v-avatar>
                    <h1 style="font-weight: bold; color: #3c4166">
                      {{ getTicketAToday }}
                    </h1>
                    <span style="color: #909090">Ticket A</span><br />
                    <small style="color: red; font-size: 9px"
                      >Remaining {{ getTicketPerDay[0].limitPerDay - getTicketAToday }}
                    </small>
                  </v-col>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 4 : 0"
                  :class="{ 'on-hover': hover }"
                  color="#dcf7e8"
                >
                  <v-col class="text-right pb-0 pt-1">
                    <v-chip
                      x-small
                      color="#7af5af"
                      dark
                      v-if="getTicketBToday < getTicketPerDay[1].limitPerDay - 3"
                      >In Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#7ad0f5"
                      dark
                      v-else-if="getTicketPerDay[1].limitPerDay > getTicketBToday && getTicketBToday >= getTicketPerDay[1].limitPerDay - 3"
                      >Low Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#f5887a"
                      dark
                      v-else-if="getTicketBToday == getTicketPerDay[1].limitPerDay"
                      >Out Stock</v-chip
                    >
                  </v-col>
                  <v-col class="text-center pt-0">
                    <v-avatar size="50">
                      <v-img
                        :src="require('@/assets/images/letter-b.png')"
                      ></v-img>
                    </v-avatar>
                    <h1 style="font-weight: bold; color: #3c4166">
                      {{ getTicketBToday }}
                    </h1>
                    <span style="color: #909090">Ticket B</span><br />
                    <small style="color: red; font-size: 9px"
                      >Remaining {{ getTicketPerDay[1].limitPerDay - getTicketBToday }}
                    </small>
                  </v-col>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 4 : 0"
                  :class="{ 'on-hover': hover }"
                  color="#dfdcf7"
                >
                  <v-col class="text-right pb-0 pt-1">
                    <v-chip
                      x-small
                      color="#7af5af"
                      dark
                      v-if="getTicketCToday < getTicketPerDay[2].limitPerDay - 3"
                      >In Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#7ad0f5"
                      dark
                      v-else-if="getTicketPerDay[2].limitPerDay > getTicketCToday && getTicketCToday >= getTicketPerDay[2].limitPerDay - 3"
                      >Low Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#f5887a"
                      dark
                      v-else-if="getTicketCToday == getTicketPerDay[2].limitPerDay"
                      >Out Stock</v-chip
                    >
                  </v-col>
                  <v-col class="text-center pt-0">
                    <v-avatar size="50">
                      <v-img
                        :src="require('@/assets/images/letter-c.png')"
                      ></v-img>
                    </v-avatar>
                    <h1 style="font-weight: bold; color: #3c4166">
                      {{ getTicketCToday }}
                    </h1>
                    <span style="color: #909090">Ticket C</span>
                    <br />
                    <small style="color: red; font-size: 9px"
                      >Remaining {{ getTicketPerDay[2].limitPerDay - getTicketCToday }}
                    </small>
                  </v-col>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 4 : 0"
                  :class="{ 'on-hover': hover }"
                  color="#d6f4ff"
                >
                  <v-col class="text-right pb-0 pt-1">
                    <v-chip
                      x-small
                      color="#7af5af"
                      dark
                      v-if="getTicketDToday < getTicketPerDay[3].limitPerDay - 3"
                      >In Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#7ad0f5"
                      dark
                      v-else-if="getTicketPerDay[3].limitPerDay > getTicketDToday && getTicketDToday >= getTicketPerDay[3].limitPerDay - 3"
                      >Low Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#f5887a"
                      dark
                      v-else-if="getTicketDToday == getTicketPerDay[3].limitPerDay"
                      >Out Stock</v-chip
                    >
                  </v-col>
                  <v-col class="text-center pt-0">
                    <v-avatar size="50">
                      <v-img
                        :src="require('@/assets/images/letter-d.png')"
                      ></v-img>
                    </v-avatar>
                    <h1 style="font-weight: bold; color: #3c4166">
                      {{ getTicketDToday }}
                    </h1>
                    <span style="color: #909090">Ticket D</span>
                    <br />
                    <small style="color: red; font-size: 9px"
                      >Remaining {{ getTicketPerDay[3].limitPerDay - getTicketDToday }}
                    </small>
                  </v-col>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
          <!-- <v-row class="pt-4">
            <v-col cols="12" sm="12" md="3" lg="3" v-for="(item, i) in getTicketPerDay" :key="i">
              <v-hover v-slot="{ hover }" close-delay="200">
                <v-card
                  rounded="lg"
                  :elevation="hover ? 4 : 0"
                  :class="{ 'on-hover': hover }"
                  :color="item.color"
                >
                  <v-col class="text-right pb-0 pt-1">
                    <v-chip
                      x-small
                      color="#7af5af"
                      dark
                      v-if="getTicketAToday < item.limitPerDay - 3"
                      >In Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#7ad0f5"
                      dark
                      v-else-if="item.limitPerDay > getTicketAToday && getTicketAToday >= item.limitPerDay - 3"
                      >Low Stock</v-chip
                    >
                    <v-chip
                      x-small
                      color="#f5887a"
                      dark
                      v-else-if="getTicketAToday == item.limitPerDay"
                      >Out Stock</v-chip
                    >
                  </v-col>
                  <v-col class="text-center pt-0">
                    <v-avatar size="50">
                      <v-img
                        :src="item.picture"
                      ></v-img>
                    </v-avatar>
                    <h1 style="font-weight: bold; color: #3c4166">
                      {{ getTicketAToday }}
                    </h1>
                    <span style="color: #909090">{{ item.ticket }}</span><br />
                    <small style="color: red; font-size: 9px"
                      >Remaining {{ item.limitPerDay - getTicketAToday }}
                    </small>
                  </v-col>
                </v-card>
              </v-hover>
            </v-col>

          </v-row> -->
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="5">
        <v-card
          class="pa-4"
          rounded="xl"
          elevation="0"
          color="#fafbfd"
          min-height="340px"
        >
          <v-row class="">
            <v-col cols="6" md="6" lg="7">
              <h2 style="font-weight: bold; color: #3c4166">Sales Summary</h2>
            </v-col>
            <v-col cols="6" md="6" lg="5">
              <v-select
                v-model="nameTicket"
                :items="items"
                item-value="title"
                item-text="title"
                label="Select Ticket"
                outlined
                clearable
                color=" #3c4166"
                @change="changeTicket"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <div class="pt-6">
            <v-sparkline
              :smooth="16"
              :labels="labels"
              :gradient="gradients"
              :line-width="3"
              :value="tickets"
              auto-draw
              height="100"
              stroke-linecap="round"
            >
              <template v-slot:label="item">
                {{ item.value }}
              </template>
            </v-sparkline>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="7" lg="7">
        <v-card
          class="pa-4"
          rounded="xl"
          elevation="0"
          color="#fafbfd"
          min-height="380px"
        >
          <div class="pb-2">
            <h2 style="font-weight: bold; color: #3c4166">Ticket Order</h2>
          </div>

          <v-data-table
            :headers="headers"
            :items="getTicket"
            class="elevation-0"
            color="#fafbfd"
            :items-per-page="5"
          >
            <template v-slot:[`item.title`]="{ item }">
              <v-chip :color="getColor(item.title)" dark small>
                {{ item.title }}
              </v-chip>
            </template>
            <template v-slot:[`item.price`]="{ item }">

                {{ item.price * item.amount }}
            </template>


          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="5" lg="5">
        <v-card
          class="pa-4"
          rounded="xl"
          elevation="0"
          color="#fafbfd"
          min-height="380px"
        >
          <div class="pb-2">
            <h2 style="font-weight: bold; color: #3c4166">New Customer</h2>
          </div>
          <v-data-table
            :headers="headersTicket"
            :items="dessertsTicket"
            class="elevation-0"
            color="#fafbfd"
            :items-per-page="5"
          >
            <template v-slot:[`item.customer`]="{ item }">
              <v-avatar size="30">
                <v-img :src="item.customer.picture"></v-img>
              </v-avatar>
              <strong>{{ item.customer.name }}</strong>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  name: "IndexPage",
  data() {
    return {
      menu2: false,
      selectedItem: 0,
      drawer: true,
      checking: false,
      tickets: [],
      gradients: [],
      table: [
        {
          id: 1,
          positions: "ตำแหน่ง 1",
          date: "20/06/2566",
        },
        {
          id: 2,
          positions: "ตำแหน่ง 2",
          date: "20/06/2566",
        },
        {
          id: 3,
          positions: "ตำแหน่ง 3",
          date: "20/06/2566",
        },
        {
          id: 4,
          positions: "ตำแหน่ง 4",
          date: "20/06/2566",
        },
      ],
      items: [
        {
          title: "Ticket A",
          src: require("@/assets/images/letter-a.png"),
          amount: 2,
          color: "#fcf3e1",
          status: "Low Stock",
          colorStatus: "#7ad0f5",
        },
        {
          title: "Ticket B",
          src: require("@/assets/images/letter-b.png"),
          amount: 19,
          color: "#dcf7e8",
          status: "In Stock",
          colorStatus: "#7af5af",
        },
        {
          title: "Ticket C",
          src: require("@/assets/images/letter-c.png"),
          amount: 22,
          color: "#dfdcf7",
          status: "In Stock",
          colorStatus: "#7af5af",
        },
        {
          title: "Ticket D",
          src: require("@/assets/images/letter-d.png"),
          amount: 40,
          color: "#d6f4ff",
          status: "Out Stock",
          colorStatus: "#f5887a",
        },
      ],
      mini: true,
      labels: [
        "Jan",
        "Fab",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      headers: [
        // {
        //   text: "ID",
        //   align: "start",
        //   sortable: true,
        //   value: "id",
        // },
        {
          text: "Customer",
          value: "customer",
          sortable: false,
          align: "start",
        },
        { text: "Ticket", value: "title", sortable: true },
        { text: "Amount", value: "amount", sortable: false },
        { text: "Total Price (฿)", value: "price", sortable: false },

        { text: "Date", value: "date", sortable: true },
      ],
      headersTicket: [
        { text: "ID", value: "id", sortable: true, align: "start" },
        { text: "Customer", value: "customer", sortable: false },
        { text: "Email", value: "email", sortable: false },
      ],
      desserts: [
        {
          id: 1,
          name: "Frozen Yogurt",
          ticket: "Ticket A",
          amount: 1,
          price: 5000,
          date: "30-08-2023",
        },
        {
          id: 2,
          name: "Kim ji",
          ticket: "Ticket B",
          amount: 1,
          price: 2500,
          date: "30-08-2023",
        },
        {
          id: 3,
          name: "Fu ji",
          ticket: "Ticket C",
          amount: 1,
          price: 1000,
          date: "30-08-2023",
        },
        {
          id: 4,
          name: "Mo ji",
          ticket: "Ticket D",
          amount: 1,
          price: 500,
          date: "30-08-2023",
        },
        {
          id: 5,
          name: "Heng Heng",
          ticket: "Ticket A",
          amount: 1,
          price: 5000,
          date: "31-08-2023",
        },
        {
          id: 6,
          name: "Mi ji",
          ticket: "Ticket B",
          amount: 2,
          price: 5000,
          date: "31-08-2023",
        },
        {
          id: 7,
          name: "Moo Hwan",
          ticket: "Ticket D",
          amount: 2,
          price: 1000,
          date: "28-08-2023",
        },
        {
          id: 8,
          name: "Kim Jisoo",
          ticket: "Ticket D",
          amount: 1,
          price: 500,
          date: "28-08-2023",
        },
      ],
      dessertsTicket: [
        {
          id: 1,
          customer: {
            name: "Kim Jisoo",
            picture: require("@/assets/images/jisoo.jpg"),
          },
          email: "demo1@mail.com",
        },
        {
          id: 2,
          customer: {
            name: "Kim Jennie",
            picture: require("@/assets/images/jennie.jpg"),
          },
          email: "demo1@mail.com",
        },
        {
          id: 3,
          customer: {
            name: "Lalisa Manobal",
            picture: require("@/assets/images/lisa.jpg"),
          },
          email: "demo1@mail.com",
        },
        {
          id: 4,
          customer: {
            name: "Park Chae-young",
            picture: require("@/assets/images/rose.jpg"),
          },
          email: "demo1@mail.com",
        },
        {
          id: 5,
          customer: {
            name: "Park Bogum",
            picture: require("@/assets/images/bogum.jpg"),
          },
          email: "demo1@mail.com",
        },
      ],
      // date: format(parseISO(new Date().toISOString()), "dd-MM-yyyy"),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      sortByDate: "",
      nameTicket: "",
    };
  },
  computed: {
    getTicketPerDay: {
      get() {
        if (
          this.$store.state.tickets.tickets.allTicket == null ||
          this.$store.state.tickets.tickets.allTicket == 0 ||
          this.$store.state.tickets.tickets.allTicket == [] ||
          this.$store.state.tickets.tickets.allTicket == ""
        ) {
          return null;
        } else {


          return this.$store.state.tickets.tickets.allTicket;
        }
      },
      set() {},
    },
    computedDateFormatted() {
      return this.date;
    },
    getTicketAToday: {
      get() {
        if (
          this.$store.state.tickets.selectedTicket.ticketA == null ||
          this.$store.state.tickets.selectedTicket.ticketA == 0 ||
          this.$store.state.tickets.selectedTicket.ticketA == [] ||
          this.$store.state.tickets.selectedTicket.ticketA == ""
        ) {
          return 0;
        } else {
          let count = 0;
          this.$store.state.tickets.selectedTicket.ticketA.forEach((ticket) => {
            if (ticket.ticket.date == this.sortByDate) {
              let ticketAmout = parseInt(ticket.ticket.amount);
              count += ticketAmout;
              return count;
            }
          });

          return count;
        }
      },
      set() {},
    },
    getTicketBToday: {
      get() {
        if (
          this.$store.state.tickets.selectedTicket.ticketB == null ||
          this.$store.state.tickets.selectedTicket.ticketB == 0 ||
          this.$store.state.tickets.selectedTicket.ticketB == [] ||
          this.$store.state.tickets.selectedTicket.ticketB == ""
        ) {
          return 0;
        } else {
          let count = 0;
          this.$store.state.tickets.selectedTicket.ticketB.forEach((ticket) => {
            if (ticket.ticket.date == this.sortByDate) {
              let ticketBmout = parseInt(ticket.ticket.amount);
              count += ticketBmout;
              return count;
            }
          });

          return count;
        }
      },
      set() {},
    },
    getTicketCToday: {
      get() {
        if (
          this.$store.state.tickets.selectedTicket.ticketC == null ||
          this.$store.state.tickets.selectedTicket.ticketC == 0 ||
          this.$store.state.tickets.selectedTicket.ticketC == [] ||
          this.$store.state.tickets.selectedTicket.ticketC == ""
        ) {
          return 0;
        } else {
          let count = 0;
          this.$store.state.tickets.selectedTicket.ticketC.forEach((ticket) => {
            if (ticket.ticket.date == this.date) {
              let ticketAmout = parseInt(ticket.ticket.amount);
              count += ticketAmout;
              return count;
            }
          });

          return count;
        }
      },
      set() {},
    },
    getTicketDToday: {
      get() {
        if (
          this.$store.state.tickets.selectedTicket.ticketD == null ||
          this.$store.state.tickets.selectedTicket.ticketD == 0 ||
          this.$store.state.tickets.selectedTicket.ticketD == [] ||
          this.$store.state.tickets.selectedTicket.ticketD == ""
        ) {
          return 0;
        } else {
          let count = 0;
          this.$store.state.tickets.selectedTicket.ticketD.forEach((ticket) => {
            if (ticket.ticket.date == this.date) {
              let ticketAmout = parseInt(ticket.ticket.amount);
              count += ticketAmout;
              return count;
            }
          });

          return count;
        }
      },
      set() {},
    },
    getTicket: {
      get() {
        if (
          this.$store.state.tickets.selectedTicket == null ||
          this.$store.state.tickets.selectedTicket == 0 ||
          this.$store.state.tickets.selectedTicket == [] ||
          this.$store.state.tickets.selectedTicket == ""
        ) {
          return null;
        } else {
          let allTIcket = [];
          this.$store.state.tickets.selectedTicket.ticketA.forEach((ticket) => {
            allTIcket.push(ticket.ticket);
            return allTIcket;
          });
          this.$store.state.tickets.selectedTicket.ticketB.forEach((ticket) => {
            allTIcket.push(ticket.ticket);
            return allTIcket;
          });
          this.$store.state.tickets.selectedTicket.ticketC.forEach((ticket) => {
            allTIcket.push(ticket.ticket);
            return allTIcket;
          });
          this.$store.state.tickets.selectedTicket.ticketD.forEach((ticket) => {
            allTIcket.push(ticket.ticket);
            return allTIcket;
          });
          return allTIcket;
        }
      },
      set() {},
    },
  },
  mounted() {
    this.tickets = Array.from({ length: 12 }, this.ticket);
    this.gradients = ["#f5887a", "#7af5af", "#a97af5", "#7adof5"];
    this.sortDate();
  },
  methods: {
    sortDate() {
      this.sortByDate = this.date;
      this.menu2 = false;
    },
    ticket() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    changeTicket() {
      if (this.nameTicket == "Ticket A") {
        this.tickets = Array.from({ length: 12 }, this.ticket);
        this.gradients = ["#f5887a"];
      } else if (this.nameTicket == "Ticket B") {
        this.tickets = Array.from({ length: 12 }, this.ticket);
        this.gradients = ["#7af5af"];
      } else if (this.nameTicket == "Ticket C") {
        this.tickets = Array.from({ length: 12 }, this.ticket);
        this.gradients = ["#a97af5"];
      } else if (this.nameTicket == "Ticket D") {
        this.tickets = Array.from({ length: 12 }, this.ticket);
        this.gradients = ["#7ad0f5"];
      } else {
        this.tickets = Array.from({ length: 12 }, this.ticket);
        this.gradients = ["#f5887a", "#7af5af", "#a97af5", "#7adof5"];
      }
    },
    getColor(ticket) {
      if (ticket == "Ticket A") return "#f5887a";
      else if (ticket == "Ticket B") return "#7af5af";
      else if (ticket == "Ticket C") return "#a97af5";
      else return "#7ad0f5";
    },
    getStatus(status) {
      if (status > 3) return "In Stock";
      else if (status >= 1 && status <= 3) return "Low Stock";
      else if (status < 1) return "Out Stock";
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
