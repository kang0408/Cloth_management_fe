import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

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

import Dashboard from "../pages/Admin/Dashboard.vue";
import IndexProducts from "../pages/Admin/Products/Index.vue";
import AdminProducts from "../pages/Admin/Products/Products.vue";
import CreateProduct from "../pages/Admin/Products/Create.vue";
import EditProduct from "../pages/Admin/Products/Edit.vue";
import IndexUsers from "../pages/Admin/Users/Index.vue";
import AdminUsers from "../pages/Admin/Users/Users.vue";
import CreateUser from "../pages/Admin/Users/Create.vue";
import EditUser from "../pages/Admin/Users/Edit.vue";

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
  },
  {
    path: "/admin",
    meta: {
      requiresAuth: true,
      requiresRole: "admin"
    },
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "products",
        name: "Index Products",
        component: IndexProducts,
        children: [
          {
            path: "",
            name: "Products",
            component: AdminProducts
          },
          {
            path: "create",
            name: "Create product",
            component: CreateProduct
          },
          {
            path: "edit/:id",
            name: "Edit product",
            component: EditProduct
          }
        ]
      },

      {
        path: "users",
        name: "Index Users",
        component: IndexUsers,
        children: [
          {
            path: "",
            name: "Users",
            component: AdminUsers
          },
          {
            path: "create",
            name: "Create user",
            component: CreateUser
          },
          {
            path: "edit/:id",
            name: "Edit user",
            component: EditUser
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (authStore.token && !authStore.role) {
    await authStore.getProfile();
  }

  if (!authStore.token && to.meta.requiresAuth)
    return { name: "Login", query: { redirect: to.fullPath } };

  if (to.meta.requiresRole && to.meta.requiresRole !== authStore.role) {
    return { name: "Home" };
  }

  if (to.name === "Login" && authStore.token) {
    return { name: "Home" };
  }

  return true;
});

export default router;
