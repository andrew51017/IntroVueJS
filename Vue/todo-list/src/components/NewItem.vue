<template>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <form id="newForm">
                <div class="input-group mb-3">
                    <input v-model="newItemText" type="text" class="form-control" placeholder="New item">
                    <div class="input-group-append">
                        <button v-on:click="addNewItem()" class="btn btn-outline-secondary" type="submit">Add</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>  
</template>

<script>

export default {
    data() {
        return {
            newItemText: ''
        }
    },
    methods: {
        addNewItem() {
            let newItem = {
                text: this.newItemText,
                done: false
            };

            this.$emit("new-item", newItem);
            this.newItemText = '';
            return false;
        }
    }
}

</script>