<template>
  <v-app id="inspire">
    <v-content>
      <v-container  grid-list-md>
        <v-layout row wrap align-space-between>
          <!-- Top Component w/ Address Information -->
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Address: {{address.address}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="text-xs-left">
                <p>Total Received: {{address.total_received}} </p>
                <p>Total Sent: {{address.total_sent}} </p>
                <p>Balance: {{address.balance}} </p>
                <p>Final Balance: {{address.final_balance}} </p>

              </v-card-text>
            </v-card>
          </v-flex>

       <!-- Left Component w/ Transaction Actions -->
        <v-flex xs12 sm12 md3 class="pt-2 pr-2">
          <v-layout column>

          <!-- Deposit Funds Component --> 
            <v-flex xs12 sm12 md12 class="pt-3">
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Deposit</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="money" name="Deposit" label="Deposit" type="text" v-model="deposit"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" @click="getAddress">Make Deposit</v-btn>
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
                    <v-text-field prepend-icon="swap_horiz" name="Transfer" label="Transfer" type="text" v-model="transfer"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" >Make Transfer</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>

          </v-layout>
        </v-flex>

        <v-spacer></v-spacer>

      <!-- Right Component w/ Transaction Actions -->
        <v-flex xs12 sm12 md9 class="pt-3">
            <v-card dark color="primary">
              <v-card-text class="px-0">Transaction</v-card-text>
            
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
      transaction: [],
      deposit: 0,
      transfer: 0
    }
  }, 
  mounted () {
    this.getAddress()
  },
  methods: {
    async getAddress(){
      const response = await api_services.getAddress(this.$route.params.address)
      this.address = response.data.address
      this.transaction = response.data.transaction
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
