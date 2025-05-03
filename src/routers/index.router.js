import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

import Home from "../pages/Main/Home.vue";
import Products from "../pages/Main/Products.vue";
import Profile from "../pages/Main/Profile.vue";
import Cart from "../pages/Main/Cart.vue";
import ProductDetail from "../pages/Main/ProductDetail.vue";

import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import ForgotPassword from "../pages/Auth/ForgotPassword.vue";
import ChangePassword from "../pages/Auth/ChangePassword.vue";

import Infor from "../components/Profile/Infor.vue";
import Wishlist from "../components/Profile/Wishlist.vue";

import { useAuthStore } from "../stores/User/auth.store";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "products",
        name: "Products list",
        component: Products
      },
      {
        path: "products/:id",
        name: "Product Detail",
        component: ProductDetail
      },
      {
        path: "cart",
        name: "Cart",
        component: Cart,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "infor",
            name: "Infor",
            component: Infor
          },
          {
            path: "wishlist",
            name: "Wishlist",
            component: Wishlist
          }
        ]
      }
    ]
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "register",
        name: "Register",
        component: Register
      },
      {
        path: "forgot-password",
        name: "Forgot Password",
        component: ForgotPassword
      },
      {
        path: "change-password",
        name: "Change Password",
        component: ChangePassword,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (!authStore.token && to.meta.requiresAuth)
    return { name: "Login", query: { redirect: to.fullPath } };

  if (to.name === "Login" && authStore.token) {
    return { name: "Home" };
  }

  return true;
});

export default router;
