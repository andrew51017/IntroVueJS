<template>
    <li class="list-group-item" v-bind:class="{'border-success' : item.done, 'border-warning' : !item.done}">
        {{item.text}} 
        <a v-if="!item.done" href="#" @click="toggleDone()">(Complete)</a>
        <a v-else href="#" @click="toggleDone()">(Re-open)</a>
    </li>
</template>

<script>

export default {
    props: {
        item: Object
    },
    methods: {
        toggleDone() {
            this.item.done = !this.item.done;
            this.$emit('updated-item');
        }
    }
}

</script>