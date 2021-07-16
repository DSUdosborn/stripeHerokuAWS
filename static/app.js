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
        getProducts:function(){

            console.log("getting all products");
            
            const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
              apiVersion: '2020-08-27',
              appInfo: { // For sample support and debugging, not required for production:
                name: "naturistic e-store demo",
                version: "0.0.1",
                url: "https://github.com/naturistic/herokuStripe"
              }
            });

            const products = stripe.products.list({
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
