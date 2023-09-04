<template>
  <div>
    <Navbar namePage="Buy Ticket" />
    <v-row>
      <v-col cols="12" md="6" lg="3">
        <v-card
          class=""
          max-width="374"
          elevation="1"
          color="#fafbfd"
          rounded="xl"
        >
          <v-img
            height="250"
            :src="require('~/assets/images/letter-a.png')"
            class="ticket-a"
          >
          </v-img>

          <v-card-title>Ticket A</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="getTicketPerDay[0].rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ getTicketPerDay[0].rating }} ({{ getTicketPerDay[0].countReview }})</div>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">5000฿</div>
              <v-spacer></v-spacer>
              <div class="grey--text ms-4">
                Remaining {{  getTicketPerDay[0].limitPerDay - getTicketAToday }} / {{ getTicketPerDay[0].limitPerDay }}
              </div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row class="text-center">
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketAMinus"
                  :disabled="disabledMinusA"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-0 pr-0"
                ><v-text-field
                  v-model="ticketA"
                  type="number"
                  outlined
                  readonly
                  dense
                  hide-details=""
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketAPlus"
                  :disabled="disabledPlusA"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogA" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#5d60ef"
                  v-bind="attrs"
                  v-on="on"
                  elevation="0"
                  dark
                  :disabled="buyTicketADisabled"
                >
                  <span style="color: #ededed">Buy</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Confirm to buy this ticket?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogA = false">
                    Cancle
                  </v-btn>
                  <v-btn color="green darken-1" text @click="buyTicketA">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card
          class=""
          max-width="374"
          elevation="1"
          color="#fafbfd"
          rounded="xl"
        >
          <v-img
            height="250"
            :src="require('~/assets/images/letter-b.png')"
            class="ticket-b"
          >
          </v-img>

          <v-card-title>Ticket B</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value=" getTicketPerDay[1].rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ getTicketPerDay[1].rating }} ({{ getTicketPerDay[1].countReview }})</div>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">2500฿</div>
              <v-spacer></v-spacer>
              <div class="grey--text ms-4">Remaining {{  getTicketPerDay[1].limitPerDay - getTicketBToday }} / {{ getTicketPerDay[1].limitPerDay }}</div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row class="text-center">
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketBMinus"
                  :disabled="disabledMinusB"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-0 pr-0"
                ><v-text-field
                  v-model="ticketB"
                  type="number"
                  outlined
                  dense
                  readonly
                  hide-details=""
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketBPlus"
                  :disabled="disabledPlusB"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogB" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#5d60ef"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  elevation="0"
                  :disabled="buyTicketBDisabled"
                >
                  <span style="color: #ededed">Buy</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Confirm to buy this ticket?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogB = false">
                    Cancle
                  </v-btn>
                  <v-btn color="green darken-1" text @click="buyTicketB">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card
          class=""
          max-width="374"
          elevation="1"
          color="#fafbfd"
          rounded="xl"
        >
          <v-img
            height="250"
            :src="require('~/assets/images/letter-c.png')"
            class="ticket-c"
          >
          </v-img>

          <v-card-title>Ticket C</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="getTicketPerDay[2].rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ getTicketPerDay[2].rating }} ({{ getTicketPerDay[2].countReview }})</div>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">1000฿</div>
              <v-spacer></v-spacer>
              <div class="grey--text ms-4">Remaining {{ getTicketPerDay[2].limitPerDay  - getTicketCToday }} / {{ getTicketPerDay[2].limitPerDay }}</div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row class="text-center">
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketCMinus"
                  :disabled="disabledMinusC"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-0 pr-0"
                ><v-text-field
                  v-model="ticketC"
                  type="number"
                  outlined
                  readonly
                  dense
                  hide-details=""
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketCPlus"
                  :disabled="disabledPlusC"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogC" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#5d60ef"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  elevation="0"
                  :disabled="buyTicketCDisabled"

                >
                  <span style="color: #ededed">Buy</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Confirm to buy this ticket?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogC = false">
                    Cancle
                  </v-btn>
                  <v-btn color="green darken-1" text @click="buyTicketC">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="3">
        <v-card
          class=""
          max-width="374"
          elevation="1"
          color="#fafbfd"
          rounded="xl"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            :src="require('~/assets/images/letter-d.png')"
            class="ticket-d"
          >
          </v-img>

          <v-card-title>Ticket D</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value=" getTicketPerDay[3].rating "
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ getTicketPerDay[3].rating }} ({{ getTicketPerDay[3].countReview }})</div>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">500฿</div>
              <v-spacer></v-spacer>
              <div class="grey--text ms-4">Remaining {{  getTicketPerDay[3].limitPerDay  - getTicketDToday }} / {{ getTicketPerDay[3].limitPerDay }}</div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row class="text-center">
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketDMinus"
                  :disabled="disabledMinusD"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-0 pr-0"
                ><v-text-field
                  v-model="ticketD"
                  type="number"
                  outlined
                  readonly
                  dense
                  hide-details=""
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketDPlus"
                  :disabled="disabledPlusD"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogD" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#5d60ef"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  elevation="0"
                  :disabled="buyTicketCDisabled"
                >
                  <span style="color: #ededed">Buy</span>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Confirm to buy this ticket?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="dialogD = false">
                    Cancle
                  </v-btn>
                  <v-btn color="green darken-1" text  @click="buyTicketD">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-row>
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
              <div class="grey--text ms-4">
                Remaining {{ item.limitPerDay - getTicketAToday }} /
                {{ item.limitPerDay }}
              </div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-row class="text-center">
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketAMinus"
                  :disabled="disabledMinusA"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4" class="pl-0 pr-0"
                ><v-text-field
                  v-model="ticketA"
                  type="number"
                  outlined
                  readonly
                  dense
                  hide-details=""
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-btn
                  icon
                  x-small
                  fab
                  @click="ticketAPlus"
                  :disabled="disabledPlusA"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-btn
              color="#5d60ef"
              elevation="0"
              dark
              :disabled="buyTicketADisabled"
              @click="saveData(item)"
            >
              <span style="color: #ededed">Buy</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialogA" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Confirm to buy this ticket?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogA = false">
              Cancle
            </v-btn>
            <v-btn color="green darken-1" text @click="buyTicket()">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->
  </div>
</template>
<script>
import { format, parseISO } from "date-fns";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      ticketA: 1,
      ticketB: 2,
      ticketC: 2,
      ticketD: 3,
      // date: format(parseISO(new Date().toISOString()), "dd-MM-yyyy"),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      disabledPlusB: false,
      disabledMinusB: true,
      disabledPlusA: false,
      disabledMinusA: true,
      disabledPlusC: false,
      disabledMinusC: true,
      disabledPlusD: false,
      disabledMinusD: true,
      dialogA: false,
      dialogB: false,
      dialogC: false,
      dialogD: false,
      buyTicketADisabled: false,
      buyTicketBDisabled: false,
      buyTicketCDisabled: false,
      buyTicketDDisabled: false,
      ticket: null,
    };
  },
  computed: {
    getTicketA: {
      get() {
        if (this.$store.state.tickets) {
          return this.$store.state.tickets.selectedTicket.ticketA[0];
        } else {
          return null;
        }
      },
      set() {},
    },
    getTicketAAmount: {
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
            let ticketAmout = parseInt(ticket.ticket.amount);
            count += ticketAmout;
            return count;
          });

          return count;
        }
      },
      set() {},
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
  },
  methods: {
    ticketAPlus() {
      this.ticketA += 1;
      if (this.ticketA == 1) {
        this.disabledPlusA = false;
        this.disabledMinusA = true;
      } else if (
        this.ticketA >= 1 &&
        this.ticketA <
          this.getTicketPerDay[0].limitPerDay - this.getTicketAToday
      ) {
        this.disabledPlusA = false;
        this.disabledMinusA = false;
      } else {
        this.disabledPlusA = true;
        this.disabledMinusA = false;
      }
    },
    ticketAMinus() {
      this.ticketA -= 1;
      if (this.ticketA == 1) {
        this.disabledPlusA = false;
        this.disabledMinusA = true;
      } else if (
        this.ticketA > 1 &&
        this.ticketA < this.getTicketPerDay[0].limitPerDay
      ) {
        this.disabledPlusA = false;
        this.disabledMinusA = false;
      } else {
        this.disabledPlusA = true;
        this.disabledMinusA = false;
      }
    },
    ticketBPlus() {
      this.ticketB += 1;
      if (this.ticketB == 2) {
        this.disabledPlusB = false;
        this.disabledMinusB = true;
      } else if (
        this.ticketB >= 2 &&
        this.ticketB <
          this.getTicketPerDay[1].limitPerDay - this.getTicketBToday
      ) {
        this.disabledPlusB = false;
        this.disabledMinusB = false;
      } else {
        this.disabledPlusB = true;
        this.disabledMinusB = false;
      }
    },
    ticketBMinus() {
      this.ticketB -= 1;
      if (this.ticketB == 2) {
        this.disabledPlusB = false;
        this.disabledMinusB = true;
      } else if (
        this.ticketB > 2 &&
        this.ticketB < this.getTicketPerDay[1].limitPerDay
      ) {
        this.disabledPlusAB = false;
        this.disabledMinusB = false;
      } else {
        this.disabledPlusB = true;
        this.disabledMinusB = false;
      }
    },

    ticketCPlus() {
      this.ticketC += 1;
      if (this.ticketC == 2) {
        this.disabledPlusC = false;
        this.disabledMinusC = true;
      } else if (
        this.ticketC > 2 &&
        this.ticketC <
          this.getTicketPerDay[2].limitPerDay - this.getTicketCToday
      ) {
        this.disabledPlusC = false;
        this.disabledMinusC = false;
      } else {
        this.disabledPlusC = true;
        this.disabledMinusC = false;
      }
    },
    ticketCMinus() {
      this.ticketC -= 1;
      if (this.ticketC == 2) {
        this.disabledPlusC = false;
        this.disabledMinusC = true;
      } else if (
        this.ticketC > 2 &&
        this.ticketC < this.getTicketPerDay[2].limitPerDay
      ) {
        this.disabledPlusC = false;
        this.disabledMinusC = false;
      } else {
        this.disabledPlusC = true;
        this.disabledMinusC = false;
      }
    },
    ticketDPlus() {
      this.ticketD += 1;
      if (this.ticketD == 3) {
        this.disabledPlusD = false;
        this.disabledMinusD = true;
      } else if (
        this.ticketD > 3 &&
        this.ticketD <
          this.getTicketPerDay[3].limitPerDay - this.getTicketDToday
      ) {
        this.disabledPlusD = false;
        this.disabledMinusD = false;
      } else {
        this.disabledPlusD = true;
        this.disabledMinusD = false;
      }
    },
    ticketDMinus() {
      this.ticketD -= 1;
      if (this.ticketD == 3) {
        this.disabledPlusD = false;
        this.disabledMinusD = true;
      } else if (
        this.ticketD > 3 &&
        this.ticketD < this.getTicketPerDay[3].limitPerDay
      ) {
        this.disabledPlusD = false;
        this.disabledMinusD = false;
      } else {
        this.disabledPlusD = true;
        this.disabledMinusC = false;
      }
    },
    async buyTicketA() {
      let data = {
        id: 1,
        title: "Ticket A",
        date: this.date,
        customer: "Kim Jisoo",
        amount: this.ticketA,
        price: 5000,
      };
      await this.$store.dispatch(`tickets/buyTicketA`, {
        ticket: data,
        amount: this.ticketA,
      });
      this.buyTicketDisable();
      this.dialogA = false;
    },
    async buyTicketB() {
      let data = {
        id: 2,
        title: "Ticket B",
        date: this.date,
        customer: "Kim Jennie",
        amount: this.ticketB,
        price: 2500,
      };
      await this.$store.dispatch(`tickets/buyTicketB`, {
        ticket: data,
        amount: this.ticketB,
      });
      this.buyTicketDisable();
      this.dialogB = false;
    },
    async buyTicketC() {
      let data = {
        id: 3,
        title: "Ticket C",
        date: this.date,
        customer: "Lalisa Monobal",
        amount: this.ticketC,
        price: 1000,
      };
      await this.$store.dispatch(`tickets/buyTicketC`, {
        ticket: data,
        amount: this.ticketC,
      });
      this.buyTicketDisable();
      this.dialogC = false;
    },
    async buyTicketD() {
      let data = {
        id: 4,
        title: "Ticket D",
        date: this.date,
        customer: "Park Bogum",
        amount: this.ticketD,
        price: 500,
      };
      await this.$store.dispatch(`tickets/buyTicketD`, {
        ticket: data,
        amount: this.ticketD,
      });
      this.buyTicketDisable();
      this.dialogD = false;
    },
    saveData(item) {
      this.dialogA = true
       this.ticket = item;
    },
    async buyTicket() {
      let data = {
        id: this.ticket.id,
        title: this.ticket.ticket,
        date: this.date,
        customer: "Kim Jisoo",
        amount: this.ticketA,
        price: 5000,
      };
      await this.$store.dispatch(`tickets/buyTicket`, {
        ticket: data,
        amount: this.ticketA,
      });
      this.buyTicketDisable();
      this.dialogA = false;
    },
    buyTicketDisable() {
      if (this.getTicketAToday >= this.getTicketPerDay[0].limitPerDay) {
        this.buyTicketADisabled = true;
      }
      if (this.getTicketBToday >= this.getTicketPerDay[1].limitPerDay) {
        this.buyTicketBDisabled = true;
      }
      if (this.getTicketCToday >= this.getTicketPerDay[2].limitPerDay) {
        this.buyTicketCDisabled = true;
      }
      if (this.getTicketCToday >= this.getTicketPerDay[3].limitPerDay) {
        this.buyTicketDDisabled = true;
      }
    },
  },
};
</script>
