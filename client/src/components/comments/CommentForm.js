import {React,useState} from 'react'

const CommentForm = (props) => {
    const [content, setContent] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        if(!content){
            console.log('Please add a comment..')
            return
        }
        props.onAdd(content)
        setContent('')
    }

    return (
        <div className="comment" style={{"paddingBottom":"0"}}>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <div>Add comment</div>
                    <textarea name="content" onChange={(e)=>{setContent(e.target.value)}} value={content}
                        style={{"backgroundColor":"#212121"}} id="content" cols="30" rows="2" className="form-control">
                        
                    </textarea>
                    <div className="w-100 d-flex justify-content-end">
                        <button type="submit" className="btn btn-sm btn-primary ">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CommentForm;