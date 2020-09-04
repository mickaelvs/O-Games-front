import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import UserProfil from '../views/UserProfil.vue';
import Tournament from '../views/Tournament.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Stream from '../views/Stream.vue';
import News from '../views/News.vue';
import NewsHome from '../views/NewsHome.vue';
import Classement from '../views/Classement.vue';
import TournamentHome from '../views/TournamentHome.vue';
import CreateTournament from '../views/CreateTournament.vue';
import InviteFriend from '../views/InviteFriend.vue';
import RulesTournament from '../views/RulesTournament.vue';





Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/userProfil', 
    name: 'userProfil', 
    component: UserProfil
  },
  {
    path: "/tournament/create",
    name: "create-tournament",
    component: CreateTournament
  },
  {
    path: '/tournamentHome', 
    name: 'tournament-home', 
    component: TournamentHome
  }, 
  {
    path: "/tournamentHome/:tournamentId",
    name: "single-tournament",
    component: Tournament
  },
  {
    path: '/rulesTournament', 
    name: 'rules-tournament', 
    component: RulesTournament
  }, 
  {
    path: "/invite-friend",
    name: "invite-friend",
    component: InviteFriend
  },
  {
    path: '/login', 
    name: 'login', 
    component: Login

  },
  {
    path: '/register', 
    name: 'register', 
    component: Register
  }, 
  {
    path: '/stream',
    name: 'stream',
    component: Stream
  },
  {
    path: '/newsHome', 
    name: 'news-home', 
    component: NewsHome
  }, 
  {
    path: "/newsHome/:newsId",
    name: "single-news",
    component: News
  },
  {
    path: '/classement',
    name: 'classement',
    component: Classement
  },
  {
    path: "/:pageNumber",
    name: "tournament-paginated",
    component: TournamentHome
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router