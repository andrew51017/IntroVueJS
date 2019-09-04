<template>
    <div>
        <p>Hello World!</p>
        <p>The value is {{test}}</p>
        <p>The value is {{name}}</p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            test: "value"
        }
    },
    props: {
        name: String
    },
    created() {
        fetch("http://www.example.com")
            .then(res => res.json())
            .then(res => this.test = res.value);
            
        alert("My Component");
    },
    computed: {
        theDate() {
            return new Date();
        }
    },
    methods: 
    {
        myMethod() {
            this.$emit('an-event');
            return true;
        }
    }
}

</script>