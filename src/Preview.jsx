import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import './css/preview.css'

const Preview = ({text}) => {
    return (
        <div id="preview">
            <div>
                <h1>Preview</h1>
            </div>
            <div>
                <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
            </div>
        </div>
    )
}

export default Preview