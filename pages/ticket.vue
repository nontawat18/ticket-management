<template>
  <div>
    <Navbar namePage="Buy Ticket" />
    <v-row class="mt-16">
      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="(item, i) in getTicketPerDay"
        :key="i"
      >
        <v-card
          class=""
          max-width="374"
          elevation="1"
          color="#fafbfd"
          rounded="xl"
        >
          <v-img height="250" :src="item.picture" :class="item.class"> </v-img>

          <v-card-title>{{ item.ticket }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="item.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                {{ item.rating }} ({{ item.countReview }})
              </div>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">{{ item.price }}฿</div>
              <v-spacer></v-spacer>
              <div class="grey--text ms-4" v-if="getSumAmount == 0">
                Remaining {{ item.limitPerDay - getSumAmount }} /
                {{ item.limitPerDay }}
              </div>
              <div class="grey--text ms-4" v-else>
                Remaining {{ item.limitPerDay - getSumAmount[i] }} /
                {{ item.limitPerDay }}
              </div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="item.limitPerDay - getSumAmount[i] == 0"
              color="#5d60ef"
              elevation="0"
              dark
              :disabled="true"
              @click="saveData(item, i)"
            >
              <span style="color: #ededed">Buy</span>
            </v-btn>
            <v-btn
              v-else
              color="#5d60ef"
              elevation="0"
              dark
              :disabled="false"
              @click="saveData(item, i)"
            >
              <span style="color: #ededed">Buy</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" width="80%">
        <v-card class="pa-4" v-if="ticket != null">
          <v-row class="ma-0" align="end">
            <v-col cols="12" md="3" lg="3">
              <v-card rounded="xl">
                <v-img :src="ticket.picture"> </v-img>
              </v-card>
              <v-row class="text-center pa-0 ma-0" align="center">
                <v-col cols="4">
                  <v-btn
                    x-small
                    elevation="0"
                    fab
                    color="#5d60ef"
                    @click="ticketMinus()"
                    :disabled="disabledMinus"
                  >
                    <v-icon dark color="#ffffff">mdi-minus</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="4" class="pl-0 pr-0"
                  ><v-text-field
                    v-model="countBuy"
                    type="number"
                    outlined
                    readonly
                    dense
                    hide-details=""
                  ></v-text-field
                ></v-col>
                <v-col cols="4">
                  <v-btn
                    x-small
                    elevation="0"
                    color="#5d60ef"
                    fab
                    @click="ticketPlus()"
                    :disabled="disabledPlus"
                  >
                    <v-icon dark color="#ffffff">mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="9" lg="9">
              <h1>{{ ticket.ticket }}</h1>
              <v-row>
                <v-col cols="12" md="12" lg="12">
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="ticket.rating"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ms-4">
                      {{ ticket.rating }} ({{ ticket.countReview }})
                    </div>
                  </v-row>
                </v-col>
                <v-col cols="12" md="6" lg="6">
                  <span
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aut cumque, modi obcaecati soluta corporis fugit unde fuga.
                    Mollitia reiciendis repellat libero. Porro, earum nemo!
                    Assumenda laboriosam perferendis ipsa incidunt
                    expedita.</span
                  ></v-col
                >

                <v-col cols="12" md="6" lg="6" class="pl-8">
                  <v-row align="end">
                    <v-icon class="pr-2 pb-2"> mdi-cash-multiple </v-icon>
                    <div>
                      <small>Price / Ticket</small>
                      <h2>฿{{ ticket.price }}</h2>
                    </div>
                  </v-row>
                  <v-row align="end">
                    <v-icon class="pr-2"> mdi-calendar-month-outline </v-icon>
                    <div>
                      <small>Buying Date</small><br />
                      <strong>{{ this.date }}</strong>
                    </div>
                  </v-row>
                  <v-row align="end">
                    <v-icon class="pr-2"> mdi-ticket </v-icon>
                    <div>
                      <small>Remaining</small><br />
                      <strong
                        >{{ ticket.limitPerDay - getSumAmount[this.index] }} /
                        {{ ticket.limitPerDay }}</strong
                      >
                    </div>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="#fa4646"
              elevation="0"
              @click="(countBuy = 1), (dialog = false)"
            >
              Cancle
            </v-btn>
            <v-btn
              elevation="0"
              dark
              color="#6ef5a8"
              @click="buyTicket()"
              v-if="ticket.minimumBuying <= this.countBuy"
            >
              Confirm
            </v-btn>
            <v-btn
              elevation="0"
              :disabled="true"
              color="#6ef5a8"
              @click="buyTicket()"
              v-else
            >
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      countBuy: 1,

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      dialog: false,

      ticket: null,
      disabledPlus: false,
      disabledMinus: true,
      getSumAmount: 0,
      buyTicketDisabled: false,
      index: null,
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
  },
  mounted() {
    this.buyTicketDisable();
    this.sumAmount();
  },
  methods: {
    ticketPlus() {
      this.countBuy += 1;
      if (this.countBuy <= this.ticket.minimumBuying) {
        this.disabledPlus = false;
        this.disabledMinus = true;
      } else if (
        this.countBuy >= this.ticket.minimumBuying &&
        this.countBuy < this.ticket.limitPerDay - this.getSumAmount[this.index]
      ) {
        this.disabledPlus = false;
        this.disabledMinus = false;
      } else {
        this.disabledPlus = true;
        this.disabledMinus = false;
      }
    },
    ticketMinus() {
      this.countBuy -= 1;
      if (this.countBuy == this.ticket.minimumBuying) {
        this.disabledPlus = false;
        this.disabledMinus = true;
      } else if (
        this.countBuy > this.ticket.minimumBuying &&
        this.countBuy < this.ticket.limitPerDay
      ) {
        this.disabledPlus = false;
        this.disabledMinus = false;
      } else {
        this.disabledPlus = true;
        this.disabledMinus = false;
      }
    },
    saveData(item, i) {
      this.ticket = item;
      this.index = i;
      this.dialog = true;
    },
    async buyTicket() {
      let data = {
        id: this.ticket.id,
        title: this.ticket.ticket,
        date: this.date,
        customer: "Kim Jennie2",
        amount: this.countBuy,
        price: 5000,
      };
      await this.$store.dispatch(`tickets/buyTicket`, {
        ticket: data,
        amount: this.countBuy,
      });
      console.log(data);
      this.buyTicketDisable();
      this.sumAmount();

      this.dialog = false;
      await this.$router.push("/");
    },
    buyTicketDisable() {
      this.getTicketPerDay.forEach((ticket, i) => {
        if (this.getSumAmount[i] >= ticket.limitPerDay) {
          this.buyTicketDisabled = true;
        }
      });
    },
    sumAmount() {
      if (
        this.$store.state.tickets.sumAmount == null ||
        this.$store.state.tickets.sumAmount == 0 ||
        this.$store.state.tickets.sumAmount == [] ||
        this.$store.state.tickets.sumAmount == ""
      ) {
        this.getSumAmount = 0;
      } else {
        this.getSumAmount = this.$store.state.tickets.sumAmount;
      }
    },
  },
};
</script>
