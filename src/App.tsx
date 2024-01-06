import './App.css';
import Monaco, { MonacoRef } from './monaco';
import { createElement, useEffect, useRef, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkCode from '@imarkjs/remark-code'
import remarkStringify from 'remark-stringify'
import Code from './component/Code';

function App() {

  const parser = unified()
    .use(remarkParse)
    .use(remarkCode)

  const stringifier = unified()
    .use(remarkParse)
    .use(remarkCode)
    .use(remarkStringify)

  const writterRef = useRef<MonacoRef>(null)

  const [text, setText] = useState<string>('')
  const [tree, setTree] = useState<string>()
  const [str, setStr] = useState<string>()

  useEffect(() => {
    console.log('text ->', text)
    const ast = parser.parse(text ?? '')
    setTree(JSON.stringify(ast))
    setStr(stringifier.stringify(ast))
  }, [text])

  return <div>
    <div className='monaco'>
      <Monaco ref={writterRef} lang='markdown' onChangeModelContent={(e: any) => {
        setText(writterRef.current?.getValue() ?? '')
      }} />
      <Monaco value={tree} lang='json' />
    </div>

    <div className='monaco'>
      <Monaco value={str} lang='markdown' />
    </div>

    {createElement(Code, {value: 'xxx'})}

  </div>
}

export default App;
