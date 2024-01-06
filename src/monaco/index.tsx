import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import * as monaco from 'monaco-editor'
import './index.css'

export type MonacoProps = {
    value?: string,
    lang?: string,
    theme?: string,
    fontSize?: number,
    onChangeModelContent?: (e?: any) => void
    [others: string]: any
}

export type MonacoRef = {
    getValue: () => string;
    // 其他你想要暴露的方法  
}

const Monaco = forwardRef<MonacoRef, MonacoProps>((prop, ref) => {

    const { value, lang, theme, fontSize, onChangeModelContent } = prop || {}

    const containerRef = useRef(null)
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

    useEffect(() => {
        const editor = monaco.editor.create(containerRef.current!, {
            value: '',
            language: lang ?? '',
            theme: theme ?? 'vs-dark',
            fontSize: fontSize ?? 14,
            automaticLayout: true,
            formatOnType: true
        })

        editor.onDidChangeModelContent((e: any) => {
            onChangeModelContent && onChangeModelContent(e)
        })


        editorRef.current = editor

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

        const commandId = editor.addCommand(
            monaco.KeyCode.Unknown,
            () => {
                alert("my command is executing!");
            }
        )

        monaco.languages.registerCodeLensProvider(prop?.lang ?? '', {
            provideCodeLenses: function (model, token) {
                // console.log(model, token)
                return {
                    lenses: [
                        {
                            range: {
                                startLineNumber: 17,
                                startColumn: 1,
                                endLineNumber: 17,
                                endColumn: 1,
                            },
                            id: "command1",
                            command: {
                                id: commandId!,
                                title: "exec",
                            },
                        },
                    ],
                    dispose: () => { },
                };
            },
            resolveCodeLens: function (model, codeLens, token) {
                return codeLens;
            },
        })
    }, [])

    useEffect(() => {
        editorRef.current?.setValue(prop?.value ?? '')
        editorRef.current?.getAction('editor.action.formatDocument')?.run()
    }, [prop?.value])

    useImperativeHandle(ref, () => ({
        getValue: (): string => {
            return editorRef.current?.getValue() ?? ''
        }
    }))

    return <div>
        <div id="container" className='editor-container' ref={containerRef}></div>
    </div>

})

export default Monaco