var app = new Vue({
    el: "#app",
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
        products: [
            {
                "title":"Single Desert Mountain",
                "url":"",
                "image":"../images/desert_mountain.jpg",
                "description":"Desert Mountain"
            },
            {
                "title":"California Waves",
                "url":"",
                "image":"../images/wave.jpg",
                "descriptioin":"Ocean Waves in California USA"
            }
        ]

    },

    vuetify: new Vuetify(),

    created:function(){
      this.getProducts();
    },

    methods:{
        getProductss:function(){
          
            console.log("getting all products");

            const products = stripe.products.list({
            limit: 15,
          });

        },
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
