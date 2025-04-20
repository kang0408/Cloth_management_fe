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
              color: "neutral",
              variant: "link",
              class: "hover:text-(--color-primary-500)"
            }
          ]
        },
        modal: {
          slots: {
            overley: "z-[90]",
            content: "z-[100]"
          }
        }
      }
    }),
    tailwindcss()
  ]
});
