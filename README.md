# xiguacity
### 题目内容：
***
代码请提交到 github，并将 github 链接发回到sunhongbo@xigua.city 实现下拉框组件，并给出一个可展示效果的页面，主要用原生JS实现，可以用JQuery。

> 基本要求：
1. 基本功能同select元素，可以下拉选择
2. 支持直接输入，输入时下拉列表的选项自动前缀匹配，匹配到的前缀用红色文字展示
3. 支持异步加载数据
4. 兼容主流浏览器 

> 扩展要求：
1. 用测试代码来测试组件功能
2. 支持大量数据（比如10w+，考虑如何提高输入时的匹配效率）

### 目录结构

<pre>
.
├── README.md
├── css                             // 样式
├── img                             // 图片
├── js      
│   ├── data.js                     // 自定义虚拟数据
│   ├── jquery-3.3.1.min.js         // jquery库
│   ├── main.js                     // jQuery点击动画效果
│   ├── select.js                   // 选择器的主要功能
│   ├── tools.js                    // 工具函数（字符串匹配算法）
├── index.html                      // 项目入口文件
├── .project                        // 项目配置文件

</pre>
