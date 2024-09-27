import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from "@/components/HomePage.vue";
import ErrorPage from '@/components/ErrorPage.vue';
import DoctorPage from "@/components/DoctorPage.vue";
import PatientPage from "@/components/PatientPage.vue";
import DoctorStation from "@/components/DoctorStation.vue";
import DoctorView from "@/components/DoctorView.vue";
import PatientChat from "@/components/PatientChat.vue";
import dayjs from "dayjs";

dayjs.locale('zh-cn')

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta:{
                title:'医患导诊录入一体化平台',
            },
        },
        {
            path: '/doctor',
            name: 'doctor',
            component: DoctorPage,
            meta:{
                title:'癫痫患者管理系统',
            },
            children: [
                {
                    path: '',
                    component: DoctorStation,
                    meta:{
                        name:'station',
                    },
                },
                {
                    path: 'view',
                    component: DoctorView,
                    meta:{
                        name:'view',
                    },
                },
                {
                    path: '/doctor/:pathMatch(.*)*',
                    component: DoctorStation,
                    meta:{
                        name:'station',
                    },
                },
            ],
        },
        {
            path: '/patient',
            name: 'patient',
            component: PatientPage,
            meta:{
                title:'患者智能导诊系统',
            },
            children: [
                {
                    path: '',
                    component: PatientChat,
                    meta:{
                        name:'chat',
                    },
                },
                {
                    path: '/patient/:pathMatch(.*)*',
                    component: PatientChat,
                    meta:{
                        name:'chat',
                    },
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error',
            component: ErrorPage
        }
    ]
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    if(to.meta.title){
        document.title = to.meta.title;
    }
})

const app = createApp(App);

app.use(router).use(Antd).mount('#app');