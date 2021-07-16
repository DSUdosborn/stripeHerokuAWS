

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
        getProducts: async function(){

            console.log("getting all products");

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
