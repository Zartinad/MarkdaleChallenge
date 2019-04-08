<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>

            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Public Address Balance</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="house" name="Address" label="Address" type="text" v-model="address"></v-text-field>
                  <p>{{error}}</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                 <v-btn color="primary" @click="generateAddress">Generate Address</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="redirectToAddress" v-bind:disabled="address === ''">Check Balance</v-btn>
              </v-card-actions>
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
  name: 'Home',
  data () {
    return {
      address: '',
      error:''
      
    }
  },
  methods: {
    async redirectToAddress () {
     var response = await api_services.getAddress(this.address)
     
      if (response.data.address == null){
        this.error = "Invalid Address"
       
      } else {
         this.$router.push('address/' + this.address)
      }
      
    },
    async generateAddress () {
      var response = await api_services.generateAddress();
      this.$router.push('address/' + response.data.address)

    }

  },
  watch: {
    address: function () {
      this.valid_address = true
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
