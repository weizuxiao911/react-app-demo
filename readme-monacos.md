# 工作台

1. 创建项目

```sh
npx create-react-app workspace --template=typescript
```

2. 切换到项目

```sh
cd workspace
```

3. 开启webpack config

```sh
npm run eject
```

4. 安装monaco-editor

```sh
yarn add monaco-editor monaco-editor-webpack-plugin
```

5. 配置monaco-editor

```js config/webpack.config.js

// https://github.com/microsoft/monaco-editor/blob/HEAD/docs/integrate-esm.md

// others...

// insert after line 2 ~ 100
/** monaco-editor */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// others...

// Generates an `index.html` file with the <script> injected.
// insert after line 568
/** monaco-editor */
new MonacoWebpackPlugin(),

```

6. 删除test.tsx

```sh 
rm -f src/App.test.tsx
```

7. 去除严格模式

```jsx src/index.tsx


import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


```

8. 创建组件目录

```sh
mkdir src/components
```

9.  创建monaco-editor示例组件

```sh
mkdir src/components/monaco
touch src/components/monaco/index.tsx
touch src/components/monaco/index.css
```

10. 编辑monaco-editor示例组件

```jsx src/components/monaco/index.tsx

import { useEffect, useRef, useState } from 'react'
import * as monaco from 'monaco-editor'
import './index.css'

const code = `
---
title: test
author: weizuxiao
---

# h1
## h2
### h3
#### h4
##### h5

text

\`inlinecode\`

\`\`\`
multiline code
\`\`\`
`


let Manaco: React.FC = () => {

    const containerRef = useRef(null)

    useEffect(() => {
        const editor = monaco.editor.create(containerRef.current!, {
            value: code,
            language: 'markdown',
            theme: 'vs-dark'
        })
        editor.onDidChangeModelContent((e: any) => console.log(e))

        editor.addAction({
            // An unique identifier of the contributed action.
            id: "test",

            // A label of the action that will be presented to the user.
            label: "test",

            // An optional array of keybindings for the action.
            keybindings: [
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ,
                // chord
                monaco.KeyMod.chord(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM
                ),
            ],

            // A precondition for this action.
            precondition: undefined,

            // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
            keybindingContext: undefined,

            contextMenuGroupId: "navigation",

            contextMenuOrder: 1.5,

            // Method that will be executed when the action is triggered.
            // @param editor The editor instance is passed in as a convenience
            run: function (ed) {
                alert("i'm running => " + ed.getPosition());
            },
        })

        editor.createDecorationsCollection([
            {
                range: new monaco.Range(3, 1, 5, 1),
                options: {
                    isWholeLine: true,
                    linesDecorationsClassName: "myLineDecoration",
                },
            },
            {
                range: new monaco.Range(7, 1, 9, 24),
                options: { 
                    isWholeLine: true,
                    linesDecorationsClassName:  "myInlineDecoration",
                    inlineClassName: "myInlineDecoration" 
                },
            },
        ])

        const commandId = editor.addCommand(
            monaco.KeyCode.Unknown,
            () => {
                alert("my command is executing!");
            }
        )
        monaco.languages.registerCodeLensProvider('json', {
            provideCodeLenses: function (model, token) {
                // console.log(model, token)
                return {
                    lenses: [
                        {
                            range: {
                                startLineNumber: 1,
                                startColumn: 1,
                                endLineNumber: 2,
                                endColumn: 1,
                            },
                            id: "First Line",
                            command: {
                                id: commandId!,
                                title: "First Line",
                            },
                        },
                        {
                            range: {
                                startLineNumber: 1,
                                startColumn: 1,
                                endLineNumber: 2,
                                endColumn: 1,
                            },
                            id: "First Line",
                            command: {
                                id: commandId!,
                                title: "button",
                            },
                        },
                    ],
                    dispose: () => { },
                };
            },
            resolveCodeLens: function (model, codeLens, token) {
                return codeLens;
            },
        });

        monaco.languages.registerDocumentSymbolProvider("json", {
            provideDocumentSymbols: function (model, token) {
                return [
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "File",
                        kind: 0,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Module",
                        kind: 1,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Namespace",
                        kind: 2,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Package",
                        kind: 3,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Class",
                        kind: 4,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Method",
                        kind: 5,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Property",
                        kind: 6,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Field",
                        kind: 7,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Constructor",
                        kind: 8,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Enum",
                        kind: 9,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Interface",
                        kind: 10,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Function",
                        kind: 11,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Variable",
                        kind: 12,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Constant",
                        kind: 13,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "String",
                        kind: 14,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Number",
                        kind: 15,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Boolean",
                        kind: 16,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Array",
                        kind: 17,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Object",
                        kind: 18,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Key",
                        kind: 19,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Null",
                        kind: 20,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "EnumMember",
                        kind: 21,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Struct",
                        kind: 22,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Event",
                        kind: 23,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "Operator",
                        kind: 24,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                    {
                        range: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                        name: "TypeParameter",
                        kind: 25,
                        detail: "",
                        tags: [],
                        selectionRange: {
                            startLineNumber: 1,
                            startColumn: 1,
                            endLineNumber: 2,
                            endColumn: 1,
                        },
                    },
                ];
            },
        });
        return () => {
            editor.dispose()
        }
    }, [])
    return <div>
        <div id="container" className='editor-container' ref={containerRef}></div>
    </div>

}

export default Manaco

```

11. 补充monaco-editor示例组件样式

```css src/components/monaco/index.css

.editor-container {
    width: 100%;
    height: 500px;
}

/* .myInlineDecoration {
    background: lightblue;
	color: red !important;
	cursor: pointer;
	text-decoration: underline;
	font-weight: bold;
	font-style: oblique;
}

.myLineDecoration {
	background: lightblue;
	width: 5px !important;
	margin-right: 3px;
} */

```

12. 在App引入示例组件

```jsx src/App.tsx

import './App.css';
import Monaco from './components/monaco';

function App() {
  return <Monaco />
}

export default App;

```

13. 启动并访问示例

```sh
yarn start

// http://127.0.0.1:3000
```