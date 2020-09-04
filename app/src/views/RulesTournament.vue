<template>
  <body class="container">
    <div class="text">
      <h2>Prochain tournoi : Ogame cup #1</h2>
     <img class="countdown" src="https://img1.niftyimages.com/gj1/onio/6ebo?addHours=2136" />
      
      <div class="div-jaquette-jeux">
          <img
          class="jaquette-jeux"
          src="../assets/images/call-of-duty-jaquette.png"
          alt=""
        />
      </div> 
      <p class="jaquette">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est reiciendis
        repellendus itaque voluptates, omnis nobis suscipit, eaque voluptatum
        quisquam optio natus facilis nesciunt repudiandae laudantium nostrum nam
        dolores quae voluptatem.
      </p>
    

      <h3>Regles à respecter</h3>
      <ol>
        <li class="li-tournois">
          Soyez respecteux avec les autres participants
        </li>
        <li class="li-tournois">Arriver à l'heure pour le tournois</li>
        <li class="li-tournois">
          Vous pouvez participer uniquement en reseignant au préalable votre
          gamertag
        </li>
      </ol>

      <h3>Modalités d'inscription</h3>
      <ol>
        <li class="li-tournois">Vous devez être inscrit sur Ogame</li>
        <li class="li-tournois">
          Reseignez votre gamer tag ci dessous
        </li>
        <li class="li-tournois">Arrivez avant l'heure du départ du tournoi</li>
      </ol>
      <div class="button-inscription-tournoi"></div>
    </div>
    <div class="liste-inscription">
      <div id="app" class="Block-inscriptions">
        <div class="w-1/4 h-full bg-grey-darkest"></div>
        <div
          class="block-inscriptions-bis"
        >
          <h1
            class="h1-block-inscriptions"
          >
            Inscriptions
          </h1>
          <div class="add-players">
            <input
              class="input-inscription"
              type="text"
              placeholder="Votre GamerTag"
              aria-label="Full name"
              v-model="newTodo"
              @keypress.enter="addTodo(newTodo)"
             
            />
            <button
              class="bouton-ajouter-gamertag"
              type="button"
              @click="addTodo(newTodo)"
            >
              S'inscrire
            </button>
          </div>
          <template v-if="todos.length == 0">
            <h3
              class="h3-block-inscriptions"
            >
              Pas encore d'inscrits
            </h3>
          </template>
          <template v-else>
            <div
              
              v-for="(todo, index) in todos"
              :key="index"
            >
              <h3
                class="h3-block-inscriptions"
              >
                {{ todo }}
              </h3>
              <div class="effacer-gamertag">
                <i
                  class="fa fa-times text-2xl"
                  aria-hidden="true"
                  @click="removeTodo(index)"
                ></i>
              </div>
            </div>
           <!-- <button class="w-full bg-red-light hover:bg-red text-white font-thin py-2 px-8 mt-4 rounded"
                    @click="clearAll()"
                    >
                Clear All
            </button>-->
          </template>
        </div>
        <div class="test"></div>
      </div>
    </div>

    <TournamentFull />
    <FooterLayout />
  </body>
</template>

<script>
import TournamentFull from "@/components/TournamentFull.vue";
import FooterLayout from "@/components/FooterLayout.vue";

export default {
  name: "RulesTournament",
  components: {
    //HeaderLayout,
    TournamentFull,
    FooterLayout,
  },
  data() {
    return {
      newTodo: "",
      todos: [],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos.push(todo);
      this.newTodo = "";
      
    },
    cancelTodo() {
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    clearAll() {
      this.todos = [];
    }, 

    
  },

  watch: {
  todos: {
    handler() {
      console.log('Todos changed!');
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    deep: true,
  },
},

mounted() {
  console.log('App mounted!');
  if (localStorage.getItem('todos')) this.todos = JSON.parse(localStorage.getItem('todos'));
},

//start countdown



//end countdown

   
};
</script>
<style lang="scss">
@import "../scss/tournamentfull.scss";

.container {
  margin-top: 3%;
}


</style>
