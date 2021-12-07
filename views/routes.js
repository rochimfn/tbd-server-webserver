import Home from './Home.vue'
import Login from './Login.vue'
import Logout from './Logout.vue'
import Secondary from './Secondary.vue'
import PrimaryMonitor from './PrimaryMonitor.vue'
import Primary from './Primary.vue'

const routes = [
    { path: '/', name: 'Secondary Monitor', component: Home },
    { path: '/secondary', name: 'Secondary Nodes', component: Secondary },
    { path: '/primary-monitor', name: 'Primary Monitor', component: PrimaryMonitor },
    { path: '/primary', name: 'Primary Node', component: Primary },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/login', name: 'Login', component: Login },
]

export { routes }