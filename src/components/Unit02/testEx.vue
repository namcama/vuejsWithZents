<template>
    <div>
        <div>
            <h1>test</h1>
            <div v-for="(product, index) in products" :key= "index">
                <div v-if="product.quantity <=20">
                    <p>{{index}}</p>
                    <p>ID: {{product.id}}</p>
                    <p>Name: {{product.name}}</p>
                    <p>Price: {{product.price}}</p>
                    <p>Quantity: {{product.quantity}}</p>
                </div>
                <hr>
                
            </div>
            <p>{{reverseMsg}}</p>
            <p>Number +a : {{addA}}</p>
            <p>Number +b :{{addB}}</p>
            <button type="text" @click="a++">increA</button>
            <button type="text" @click="b++">increB</button>
            <div class="wrap" :style=brg_color>
                <input type="number" v-model="c">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'testEx',
        data() {
            return {
                c:"",
                a :30,
                b :40,
                msg :"xin chao cac ban toi la Nam",
                products: [
                    {
                        id :1,
                        name : "IP 13 PRM",
                        price : 2500000,
                        quantity :10
                    },
                     {
                        id :2,
                        name : "IP 12 PRM",
                        price : 2000000,
                        quantity :5
                    },
                     {
                        id :3,
                        name : "IP 11 PRM",
                        price : 1500000,
                        quantity :30
                    },
                ],
                brg_color:"background-color : white",
            }
        },
        methods: {
            
        },
        computed: {
            reverseMsg() {
                return this.msg.split('').reverse().join('')
            },
            addA(){
                console.log('Add A running')
                return this.number + this.a;
            },
            addB(){
                console.log('Add B running')
                return this.number + this.b;
            },
        },
        watch: {
            c(value){
                if(value>=1 && value<=10){
                    this.brg_color="background-color:red"
                }else if(value>10 && value<=20){
                    this.brg_color="background-color:blue"
                }else{
                    this.brg_color="background-color:yellow"
                }
                console.log(value);  
            }
        },
    }
</script>
<style lang="scss">
    .wrap{
        width :500px;
        height :300px;
        
    }
    
</style>