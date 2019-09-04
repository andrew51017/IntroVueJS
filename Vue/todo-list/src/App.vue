<template>

  <div id="app">

    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">My ToDo List</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>

    <main role="main" class="container">
        <div class="card">
            <div class="card-header">
                <h4>Pending <span class="badge badge-secondary" id="pendingBadge">{{ pendingItems.length }}</span></h4>
            </div>
            <ul class="list-group list-group-flush" id="pendingItems">
              <todo-item :item="item" v-for="(item,idx) in pendingItems" :key="idx" v-on:updated-item="onUpdatedItem"></todo-item>
            </ul>
            <new-item v-on:new-item="handleNewItem"></new-item>              
        </div>     
        
        <hr/>
        
        <div class="card">
                <div class="card-header">
                    <h4>Done <span class="badge badge-secondary" id="doneBadge">{{ completedItems.length }}</span></h4>
                </div>
                <ul class="list-group list-group-flush" id="doneItems">
                  <todo-item :item="item" v-for="(item,idx) in completedItems" :key="idx" v-on:updated-item="onUpdatedItem"></todo-item>
                </ul>
            </div>             
    </main>
  </div>

</template>

<script>

import TodoItem from './components/TodoItem';
import NewItem from './components/NewItem';

let endpointGet = 'http://localhost:8000/get.php';
let endpointPut = 'http://localhost:8000/put.php';

export default {
  name: 'app',
  data() {
    return {
      items: []
    }
  },
  computed: {
    pendingItems() {
      return this.items.filter(i => !i.done);
    },
    completedItems() {
      return this.items.filter(i => i.done);
    }    
  },
  created() {
    
    fetch(endpointGet)
        .then(resp => resp.json())
        .then(res => {
            this.items = res;
        });
  },
  methods: {
    onUpdatedItem() {
      return fetch(endpointPut, {
          method: 'POST',
          body: JSON.stringify(this.items),
          headers: new Headers({
          'Content-Type': 'application/json'
          }),
      });
    },
    handleNewItem(newItem) {
      this.items.push(newItem);
      this.onUpdatedItem();
    }
  },
  components: {
    TodoItem,
    NewItem
  },

}
</script>

<style>

  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';

  main {
      padding-top: 100px;
  }

</style>
