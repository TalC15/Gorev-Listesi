import {createRouter,createWebHistory} from 'vue-router';
import Todo from './Todo.vue';
import GorevCubugu from './GorevCubugu.vue';

const router =createRouter({
    history:createWebHistory(),
    routes: [
        {path:'/',component:Todo},
        {path:'/Gorev-Cubugu',component:GorevCubugu}
    ]
})

export default router