# naive-admin fedration

naive-admin是基于vue3、naive-ui开发的后台管理框架，本项目基于[naive-admin](https://github.com/jekip/naive-ui-admin)的开源版本,使用[vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)来做一个模块化的后台管理框架。

> 模块化相关知识，请自行查看vite-plugin-federation的wiki和webpack相关文档，在此不做赘述。

### 快速开始

安装

```bash
pnpm install
```

编译

```bash
pnpm build
```

启动

```bash
pnpm serve
```

### naive-admin拆解

原naive-admin的功能比较多，直接套上去，会有一堆问题，所以采用一步步将功能拆解的做法，缩小问题排查的范围。原框架拆解为app+其他模块，app为原有框架的主要功能，其他模块是以路由为单位的业务模块。模块需要在app中导入使用，后续模块变更可以独立开发并布署。

当前任务及进度
- [x] app搭建基础功能，主要是layout和路由
- [x] list模块导出路由，在app中引入
- [x] 各模块使用tailwind
- [x] app 加上 directives
- [x] app 加上 hooks
- [x] app 加上env，及编译配置
- [x] app 完成登录并根据权限筛选路由
- [x] 在list模块中请求接口
- [x] app 导出form、table、modal组件，在模块中使用
- [x] app 通过接口数据生成路由
- [x] 在list中使用store

### FAQ

开发模式

打包时，共享的包怎么处理

动态路由

子模块导出模块路由，主模块引入。再根据接口筛选。