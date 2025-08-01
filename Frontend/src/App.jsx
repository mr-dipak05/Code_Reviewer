import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import './App.css'

function App() {
  const [code, setCode] = useState(`// Write your code here...`)
  const [review, setReview] = useState('')

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('https://code-reviewer-backend-imxo.onrender.com', { code })
      setReview(response.data)
    } catch (error) {
      setReview("❌ Error: Could not fetch review.\n\nCheck if the backend is running at https://code-reviewer-backend-imxo.onrender.com")
      console.error(error)
    }
  }

  return (
    <main>
      <div className='left'>
        <div className='code'>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 15,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              minHeight: "400px",
              backgroundColor: "#1e1e2f",
              color: "#f8f8f2"
            }}
          />
        </div>
        <div onClick={reviewCode} className='review'>AI Review</div>
      </div>

      <div className='right'>
        <h4>Output/Preview:</h4>
        <div className='output'>
          <ReactMarkdown
            children={review}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          />
        </div>
      </div>
    </main>
  )
}

export default App
