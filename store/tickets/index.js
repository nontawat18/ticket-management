/* states */

import colors from "vuetify/lib/util/colors";

export const state = () => ({
    selectedTicket: {
        ticketA: [],
        ticketB: [],
        ticketC: [],
        ticketD: [],
        ticket: []
    },
    tickets: {
        allTicket: [{
                id: 1,
                ticket: "Ticket A",
                price: 5000,
                limitPerDay: 10,
                minimumBuying: 1,
                color: "#fcf3e1",
                picture: require('~/assets/images/letter-a.png'),
                rating: 4.5,
                countReview: 413,
                class: "ticket-a"
            },
            {
                id: 2,
                ticket: "Ticket B",
                price: 2500,
                limitPerDay: 20,
                minimumBuying: 2,
                color: "#dcf7e8",
                picture: require('~/assets/images/letter-b.png'),
                rating: 4.3,
                countReview: 410,
                class: "ticket-b"

            },
            {
                id: 3,
                ticket: "Ticket C",
                price: 1000,
                limitPerDay: 30,
                minimumBuying: 2,
                color: "#dfdcf7",
                picture: require('~/assets/images/letter-c.png'),
                rating: 4.7,
                countReview: 300,
                class: "ticket-c"

            },
            {
                id: 4,
                ticket: "Ticket D",
                price: 500,
                limitPerDay: 40,
                minimumBuying: 3,
                color: "#d6f4ff",
                picture: require('~/assets/images/letter-d.png'),
                rating: 5.0,
                countReview: 698,
                class: "ticket-d"

            }
        ]
    }






});

/* getters */
export const getters = {


};


/* mutations */
export const mutations = {
    buyTicketA(state, { ticket, amount }) {
        if (!state.selectedTicket.ticketA)
            state.selectedTicket.ticketA = [];


        let ticketInCart = state.selectedTicket.ticketA.find(item => {
            return item.ticket.customer === ticket.customer;
        });
        let ticketInDate = state.selectedTicket.ticketA.find(item => {
            console.log(item.ticket.date, ticket.date)
            return item.ticket.date === ticket.date;
        });
        let ticketInID = state.selectedTicket.ticketA.find(item => {
            return item.ticket.id === ticket.id;
        });
        if (ticketInCart && ticketInDate && ticketInID) {
            ticketInCart.ticket.amount += amount;
            return;
        }

        state.selectedTicket.ticketA.push({
            ticket
        });
    },
    buyTicketB(state, { ticket, amount }) {
        if (!state.selectedTicket.ticketB)
            state.selectedTicket.ticketB = [];


        let ticketInCart = state.selectedTicket.ticketB.find(item => {
            return item.ticket.customer === ticket.customer;
        });
        let ticketInDate = state.selectedTicket.ticketB.find(item => {
            console.log(item.ticket.date, ticket.date)
            return item.ticket.date === ticket.date;
        });
        let ticketInID = state.selectedTicket.ticketB.find(item => {
            return item.ticket.id === ticket.id;
        });
        if (ticketInCart && ticketInDate && ticketInID) {
            ticketInCart.ticket.amount += amount;
            return;
        }

        state.selectedTicket.ticketB.push({
            ticket
        });
    },
    buyTicketC(state, { ticket, amount }) {
        if (!state.selectedTicket.ticketC)
            state.selectedTicket.ticketC = [];


        let ticketInCart = state.selectedTicket.ticketC.find(item => {
            return item.ticket.customer === ticket.customer;
        });
        let ticketInDate = state.selectedTicket.ticketC.find(item => {
            console.log(item.ticket.date, ticket.date)
            return item.ticket.date === ticket.date;
        });
        let ticketInID = state.selectedTicket.ticketC.find(item => {
            return item.ticket.id === ticket.id;
        });
        if (ticketInCart && ticketInDate && ticketInID) {
            ticketInCart.ticket.amount += amount;
            return;
        }

        state.selectedTicket.ticketC.push({
            ticket
        });
    },
    buyTicketD(state, { ticket, amount }) {
        if (!state.selectedTicket.ticketD)
            state.selectedTicket.ticketD = [];


        let ticketInCart = state.selectedTicket.ticketD.find(item => {
            return item.ticket.customer === ticket.customer;
        });
        let ticketInDate = state.selectedTicket.ticketD.find(item => {
            console.log(item.ticket.date, ticket.date)
            return item.ticket.date === ticket.date;
        });
        let ticketInID = state.selectedTicket.ticketD.find(item => {
            return item.ticket.id === ticket.id;
        });
        if (ticketInCart && ticketInDate && ticketInID) {
            ticketInCart.ticket.amount += amount;
            return;
        }

        state.selectedTicket.ticketD.push({
            ticket
        });
    },
    changeTicket(state, { ticket, limitPerDay }) {
        if (!state.tickets.allTicket)
            state.tickets.allTicket = [];


        let ticketInCart = state.tickets.allTicket.find(item => {
            return item.ticket === ticket.ticket;
        });

        if (ticketInCart) {
            ticketInCart.limitPerDay = limitPerDay;
            return;
        }

        state.tickets.allTicket.push(
            ticket
        );
    },
    buyTicket(state, { ticket, amount }) {
        if (!state.selectedTicket.ticket)
            state.selectedTicket.ticket = [];


        let ticketInCart = state.selectedTicket.ticket.find(item => {
            return item.ticket.customer === ticket.customer;
        });
        let ticketInDate = state.selectedTicket.ticket.find(item => {
            console.log(item.ticket.date, ticket.date)
            return item.ticket.date === ticket.date;
        });
        let ticketInID = state.selectedTicket.ticket.find(item => {
            return item.ticket.id === ticket.id;
        });
        if (ticketInCart && ticketInDate && ticketInID) {
            ticketInID.ticket.amount += amount;
            return;
        }

        state.selectedTicket.ticket.push({
            ticket
        });
    },

};

/* actions */

export const actions = {
    buyTicketA({ commit }, { ticket, amount }) {
        commit("buyTicketA", { ticket, amount });
    },
    buyTicketB({ commit }, { ticket, amount }) {
        commit("buyTicketB", { ticket, amount });
    },
    buyTicketC({ commit }, { ticket, amount }) {
        commit("buyTicketC", { ticket, amount });
    },
    buyTicketD({ commit }, { ticket, amount }) {
        commit("buyTicketD", { ticket, amount });
    },
    changeTicket({ commit }, { ticket, limitPerDay }) {
        commit("changeTicket", { ticket, limitPerDay });
    },
    buyTicket({ commit }, { ticket, amount }) {
        commit("buyTicket", { ticket, amount });
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};