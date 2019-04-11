<template>
  <v-app id="inspire">
    <v-content>

      <!-- Search Bar -->
      <v-toolbar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          color="blue darken-3"
          dark
          fixed
        >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-btn depressed large color="primary" @click="goHome">Home</v-btn>
        </v-toolbar-title>
        <v-text-field 
          flat solo-inverted 
          hide-details prepend-inner-icon="search" 
          label="Search" @keyup.enter.native="goAddress"
          v-model="search_address"
        ></v-text-field>
      </v-toolbar>


      <v-container  grid-list-md>
        <v-layout>
        </v-layout>
        <v-layout row wrap align-space-between>

          <!-- Top Component w/ Address Information -->
   

       <!-- Left Component w/ Transaction Actions -->
        <v-flex xs12 sm12 md3 class="pt-2 pr-2">
          <v-layout column>

             <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Information</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="text-xs-left">
                <p style="word-wrap: break-word;">Address: {{address.address}}</p>
                <p>Total Received: {{address.total_received}} </p>
                <p>Total Sent: {{address.total_sent}} </p>
                <p>Balance: {{address.balance}} </p>
                <p>Final Balance: {{address.final_balance}} </p>

              </v-card-text>
            </v-card>
          </v-flex>

          <!-- Deposit Funds Component --> 
            <v-flex xs12 sm12 md12 class="pt-3">
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Deposit</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="money" name="Deposit" label="Deposit" type="number" v-model="amount_deposit"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" @click="makeDeposit">Make Deposit</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

          <!-- Transfer Funds Component --> 
           <v-flex xs12 sm12 md12 class="pt-3">
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Transfer</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="swap_horiz" name="Transfer" label="Transfer" type="number" v-model="amount_transfer"></v-text-field>
                    <v-text-field prepend-icon="house" name="Address_To" label="Address" type="text" v-model="address_to"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" @click="makeTransaction">Make Transfer</v-btn>
                </v-card-actions>
                <p v-if="errors.length > 0">
                  <b>Please correct the following error(s):</b>
                    <ul class="text-xs-left">
                      <li v-for="(error, index) in errors" :key="index">-{{ error.error }}</li>
                    </ul>
                </p>
              </v-card>
            </v-flex>

          </v-layout>
        </v-flex>

        <v-spacer></v-spacer>

      <!-- Right Component w/ Transactions List -->
        <v-flex xs12 sm12 md9>
            <v-card class="elevation-12">
             <v-toolbar dark color="primary">
                  <v-toolbar-title>Transactions</v-toolbar-title>
                  <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
             <v-data-table :headers="headers" :items="transactions" class="elevation-1" >
                <template v-slot:items="props">
                  <td class="text-xs-left">{{ props.item["Date"]}}</td>
                  <td class="text-xs-left">{{ props.item["Sent By"]}}</td>
                  <td class="text-xs-left">{{ props.item["Received By"]}}</td>
                  <td class="text-xs-left">{{ props.item["Amount"]}}</td>
                  <!-- <td class="text-xs-left">{{ props.item["Hash #"]}}</td> -->

                </template>

              </v-data-table>
            </v-card-text>

            </v-card>
        </v-flex>
       
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import api_services from '@/services/api_services'

export default {
  name: 'Address',
  data () {
    return {
      address: {},
      search_address: '',
      address_to: '',
      transactions: [],
      errors: [],
      amount_deposit: 0,
      amount_transfer: 0,
      headers: [
          { text: 'Date', value: 'name'},
          { text: 'Sending Address', align: 'left', sortable: false, value: 'calories' },
          { text: 'Receiving Address', align: 'left', sortable: false, value: 'fat' },
          { text: 'Amount (Satoshis)', value: 'carbs' }
        ]
    }
  }, 
  mounted () {
    this.getAddress()
  },
  methods: {
    async getAddress(){//Update information fields and transaction data
      var response = await api_services.getAddress(this.$route.params.address)
      this.address = response.data.address
      this.transactions = response.data.transactions
    },

    async makeDeposit(){
      var body = {
        address: this.address.address, 
        amount: parseInt(this.amount_deposit)
        }

      var response = await api_services.makeDeposit(body)
      var update = this.getAddress()
      this.amount_deposit = ''

    },

    async makeTransaction(){//Fill in the body of the transaction request
      var body = {
        address_from: this.address.address,
        address_to: this.address_to,
        amount: parseInt(this.amount_transfer)
        }

      var response = await api_services.makeTransaction(body)

      if(response.data.errors != null){//Something went wrong with the transaction
        console.log(response.data.errors)
        this.errors = response.data.errors
      } else {
        this.amount_transfer = ''
        this.address_to = ''
        this.error = []
        await this.getAddress()
        
      }
    },

    goAddress(){
      this.$router.push( `/address/${this.search_address}`)
      this.$router.go()
    },

    goHome() {
      this.$router.push({ path: `/` })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
