import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vitejs.dev/config/
export default defineConfig((mode) => {
  return {
    plugins: [
      vue(),
      vueSetupExtend(),
      AutoImport({
        imports: ["vue", "vue-router"],
      }),
    ],
    //配置路径名称
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    //配置代理
    server: {
      port: "9900",
      open: true,
    },
    build: {
      outDir: "lib",
      lib: {
        entry: resolve(__dirname, "./src/lib/main.js"), //指定组件编译入口文件
        name: "db-formsearch-plus",
        fileName: "db-formsearch-plus",
      }, //库编译模式配置
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
