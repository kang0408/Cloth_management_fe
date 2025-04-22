import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "@nuxt/ui/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        navigationMenu: {
          slots: {
            link: "text-base"
          },
          variants: {
            active: {
              true: {
                childLink: "text-(--ui-text-highlighted)"
              },
              false: {
                linkLeadingIcon: "text-(--color-black)"
              }
            },
            contentOrientation: {
              horizonal: {
                content: "w-[120px]"
              }
            }
          },
          compoundVariants: [
            {
              variant: "link",
              class: {
                link: ["hover:text-(--color-primary-500)", "transition-colors"]
              }
            }
          ]
        },
        button: {
          compoundVariants: [
            {
              color: "primary",
              variant: "solid",
              class:
                "border-2 font-medium border-primary-500 hover:text-primary-500 hover:bg-white rounded-none"
            },
            {
              color: "neutral",
              variant: "link",
              class: "hover:text-(--color-primary-500)"
            }
          ]
        },
        modal: {
          slots: {
            overlay: "z-50 fixed",
            content: "z-[51]"
          }
        },
        carousel: {
          slots: {
            root: "m-0 w-full h-full",
            viewport: "w-full h-full",
            container: "h-full",
            item: "h-full",
            dots: "bottom-2"
          },
          variants: {
            active: {
              true: {
                dot: "bg-(--color-primary-500)"
              }
            }
          }
        }
      }
    }),
    tailwindcss()
  ]
});
