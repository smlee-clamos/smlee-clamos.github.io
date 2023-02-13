const templateText = `
<button class="btn btn-primary" @click="toggle">{{ text }}</button>

<div v-if="awesome">
    <h1>멋진</h1>
    <p>단락</p>
</div>
<div v-else>
    <h1>멋지지 않은</h1>
    <h2>제목</h2>
</div>
`

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
    },
    template: templateText
}