

var app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
        search_string:"",
        showCategoryMenu: false,
        categoryList: [
          { title: 'Water' },
          { title: 'Mountains' },
          { title: 'Space' },
          { title: 'Trees' },
          { title: 'Desert' },
          { title: 'Flowers' },
          { title: 'Sunsets' },
        ],
        products: []

    },

    methods:{


        createStripeConnection: function(stripe_api_key){
          const Stripe = require("stripe");
          const stripe = Stripe(stripe_api_key);
          stripe.setApiVersion('2019-03-14');//lock API version down to avoid code breaking
          stripe.setAppInfo({
            name: 'Naturistic',
            version: "0.2.0", //Optional
            url: 'https://naturistic.github.io' // Optional
          });
          stripe.setMaxNetworkRetries(3); //retry on network failure
          return stripe;
        },

        getProducts: async function(){

            console.log("getting all products");
//            const stripe = createStripeConnection("rk_test_72wdhn7pifTOWbrtrSNFxhsQ00NrdzPvaC");
            const stripe = require("stripe")("STRIPE_SECRET_KEY");
            const products = await stripe.products.list({
            limit: 15,
          });

        },

    },

    created:function(){
      this.getProducts();
    },

    computed: {
        filteredProducts: function(){
            var product_array = this.products;
            var searchString=this.searchString
            searchString = searchString.trim().toLowerCase();

            product_array= product_array.filter(function(item){
                if(item.title.toLowerCase().indexOf(searchString)!==-1){
                    return item
                }

            })
            return product_array
        }
   }
});
