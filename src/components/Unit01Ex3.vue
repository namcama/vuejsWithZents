<template>
    <div id="calculator">

        <input type="string" class="calculator-input" v-model="value">

        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="clear()">C</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="del()">del</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn gray action" @click="addExpresion('%')">%</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('/')">/</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(7)">7</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(8)">8</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(9)">9</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('*')">*</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(4)">4</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(5)">5</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(6)">6</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('-')">-</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(1)">1</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(2)">2</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn" @click="addExpresion(3)">3</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="addExpresion('+')">+</button>
            </div>
        </div>
        <div class="calculator-row">
            <div class="calculator-col wide">
                <button class="calculator-btn" @click="addExpresion(0)">0</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn action" @click="addExpresion('.')">.</button>
            </div>
            <div class="calculator-col">
                <button class="calculator-btn accent action" @click="getResult()">=</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name :'Unit01Ex3',
    data () {
        return {
            value: 0
        }
    },
    methods: {
        addExpresion(e) {
            if (Number.isInteger(this.value)){
                this.value = '';
            }
            this.value += e;
        },
        getResult() {
            
            this.value = eval(this.value);
        },
        clear() {
            this.value = 0;
        },
        del() {
            this.value = this.value.slice(0, -1);
        }
    }
}
</script>
<style lang="scss">
    $darker: #2f2f31;
    $dark: #424345;
    $gray: #616163;
    $white: #fff;
    $light: #D4D4D2;
    $accent: #f49e3f;

    *, ::after, ::before {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        font-size: 10px;
        align-items: center;
        justify-content: center;
        background-color: $white;
    }

    #calculator {
        width: 100%;
        margin: 0 auto;
        display: flex;
        padding: 0;
        max-width: 320px;
        min-width: 320px;
        flex-direction: column;
        background-color: $darker;
        border-radius: 10px;

        .calculator-input {
            color: $light;
            width: 100%;
            border: none;
            padding: .8rem;
            display: block;
            font-size: 2.4rem;
            background: none;
            text-align: right;
            font-weight: lighter;
            &:focus, &:active {
                outline: none;
            }
        }

        .calculator-row {
            display: flex;
            padding: 0;
            justify-content: space-around;
            .calculator-col {
                flex: 1;
                &.wide { flex: 2; }
            }
        }

        .calculator-btn {
            width: 100%;
            color: $light;
            cursor: pointer;
            padding: .8rem;
            outline: none;
            font-size: 1.6rem;
            transition: all .3s ease-in-out;
            font-weight: 200;
            justify-content: center;
            background-color: $gray;
            border-radius: 10px;
            border: 1px solid $darker;

            &.accent { background-color: $accent; color: $white; }
            &.gray { background-color: $dark; }
            &.action { }
            &:active {
                background-color: $darker;
            }
        }
    }
</style>