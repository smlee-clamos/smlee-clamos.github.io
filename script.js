export default {
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
}