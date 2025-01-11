/* eslint-disable react/prop-types */

function AppCard({ cardPost, del }) {
    let apiUrl = "http://localhost:3333"

    console.log(cardPost.tags)
    let newArray
    if (cardPost.tags != false){
        newArray = cardPost.tags.map((curTag, i) => {
            if (i!=cardPost.tags.length-1){
                return <span key={i} >{curTag}, </span>
            } else {
                return <span key={i} >{curTag}.</span>
            }
        })
    }



    return (
        <div className="post-card col">
            {cardPost.image.startsWith("https") ?
                <div><img className="imm" src={`${cardPost.image}`} alt="" /></div>
                : <div> <img className="imm" src={`${apiUrl}/${cardPost.image}`} alt="" /></div>}
            <div className="card-inside">
                <h4>{cardPost.title}</h4>
                <p>{cardPost.content}</p>
                <p className="tag">{cardPost.tags && newArray}</p>
            </div>
            <div><button onClick={del} className="btn btn-outline-danger del">🗑</button></div>
        </div>
    )
}

export default AppCard