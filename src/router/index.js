import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Auth.vue"),
        props: () => ({
            action: true,
        })
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Auth.vue"),
        props: () => ({
            action: false,
        })
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/search/:id?",
        name: "resultSearch",
        component: () => import("@/views/resultSearch.vue"),
        props: true,
    },
    {
        path: "/category",
        name: "category",
        component: () => import("@/views/CategoryList.vue"),
        props: true,
    },
    {
        path: "/book/:id",
        name: "bookDetail",
        component: () => import("@/views/BookDetail.vue"),
        props: true,
    },
    {
        path: "/history",
        name: "manageHistory",
        component: () => import("@/views/manageHistory.vue"),
        props: true,
    },
    {
        path: "/manageCategory",
        name: "manageCategory",
        component: () => import("@/views/manageCategory.vue"),
        children: [
            {
                path: 'add', // Đường dẫn cho thêm danh mục
                name: 'manageCategoryAdd',
                component: () => import("@/views/manageCategoryForm.vue"),
                props: () => ({
                    action: 'add',
                })
            },
            {
                path: 'view/:id', // Đường dẫn cho xem chi tiết
                name: 'manageCategoryView',
                component: () => import("@/views/manageCategoryForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'view',
                })
            },
            {
                path: 'edit/:id', // Đường dẫn cho cập nhật
                name: 'manageCategoryEdit',
                component: () => import("@/views/manageCategoryForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'update',
                })
            },
        ],
    },
    {
        path: "/managePublisher",
        name: "managePublisher",
        component: () => import("@/views/managePublisher.vue"),
        children: [
            {
                path: 'add', // Đường dẫn cho thêm danh mục
                name: 'managePublisherAdd',
                component: () => import("@/views/managePublisherForm.vue"),
                props: () => ({
                    action: 'add',
                })
            },
            {
                path: 'view/:id', // Đường dẫn cho xem chi tiết
                name: 'managePublisherView',
                component: () => import("@/views/managePublisherForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'view',
                })
            },
            {
                path: 'edit/:id', // Đường dẫn cho cập nhật
                name: 'managePublisherEdit',
                component: () => import("@/views/managePublisherForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'update',
                })
            },
        ],
    },
    {
        path: "/manageBook",
        name: "manageBook",
        component: () => import("@/views/manageBook.vue"),
        children: [
            {
                path: 'add', // Đường dẫn cho thêm danh mục
                name: 'manageBookAdd',
                component: () => import("@/views/manageBookForm.vue"),
                props: () => ({
                    action: 'add',
                })
            },
            {
                path: 'view/:id', // Đường dẫn cho xem chi tiết
                name: 'manageBookView',
                component: () => import("@/views/manageBookForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'view',
                })
            },
            {
                path: 'edit/:id', // Đường dẫn cho cập nhật
                name: 'manageBookEdit',
                component: () => import("@/views/manageBookForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'update',
                })
            },
        ],
    },
    {
        path: "/manageRequest",
        name: "manageRequest",
        component: () => import("@/views/manageRequest.vue"),
        children: [
            {
                path: 'add', // Đường dẫn cho thêm danh mục
                name: 'manageRequestAdd',
                component: () => import("@/views/manageRequestForm.vue"),
                props: () => ({
                    action: 'add',
                })
            },
            {
                path: 'view/:id', // Đường dẫn cho xem chi tiết
                name: 'manageRequestView',
                component: () => import("@/views/manageRequestForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'view',
                })
            },
            {
                path: 'edit/:id', // Đường dẫn cho cập nhật
                name: 'manageRequestEdit',
                component: () => import("@/views/manageRequestForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'update',
                })
            },
        ],
    },
    {
        path: "/manageStaff",
        name: "manageStaff",
        component: () => import("@/views/manageStaff.vue"),
        children: [
            {
                path: 'add', // Đường dẫn cho thêm danh mục
                name: 'manageStaffAdd',
                component: () => import("@/views/manageStaffForm.vue"),
                props: () => ({
                    action: 'add',
                })
            },
            {
                path: 'view/:id', // Đường dẫn cho xem chi tiết
                name: 'manageStaffView',
                component: () => import("@/views/manageStaffForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'view',
                })
            },
            {
                path: 'edit/:id', // Đường dẫn cho cập nhật
                name: 'manageStaffEdit',
                component: () => import("@/views/manageStaffForm.vue"),
                props: (route) => ({
                    id: route.params.id,
                    action: 'update',
                })
            },
        ],
    },
    {
        path: "/manageAccount",
        name: "manageAccount",
        component: () => import("@/views/manageAccount.vue"),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@/views/NotFound.vue"),
    }

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


import store from "@/store";

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn; 
    if (to.name && to.name.startsWith("manage") && !isLoggedIn) {
        next({ name: "login" });
    } else {
        next();
    }
});
export default router;