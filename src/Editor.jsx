import "./css/editor.css"
function Editor({setText , text}) {

    return (
        <div id="editor">
            <div>
                <h1>Editor</h1>
            </div>
            <div>
                <textarea value={text} onChange={e => setText(e.target.value)}></textarea>
            </div>
        </div>
    )
}

export default Editor