import { createApp } from 'vue'

createApp({
    data() {
        return {
            awesome: false,
            text: `버튼`
        }
    },
    methods: {
        toggle() {
            this.awesome = !this.awesome
        }
    }
}).mount(`#app1`)

createApp({
    data() {
        return {
            text: `버튼2`
        }
    }
}).mount(`#app2`)
