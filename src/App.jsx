/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from 'axios';
import AppCard from "./components/AppCard";

function App() {

  let protoPost = {
    title: "",
    image: "",
    content: "",
    tags: "",
    // pubblicato: false
  }

  let [listaPosts, setListaPosts] = useState([])
  console.log(listaPosts)
  let [post, setPost] = useState("")
  let apiUrl = "http://localhost:3333"

  useEffect(() => {
    console.log("partito")
    getPosts();
  }, []);

  const getPosts = () => {
    axios.get(`${apiUrl}/posts`).then((resp) => {
      setListaPosts(resp.data.blogPosts);
      setPost(protoPost);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`${apiUrl}/posts`, post).then(() => {
      getPosts();
    })
  }

  const removePost = (a) => {
    axios.delete(`${apiUrl}/posts/${a}`).then(() => {
      getPosts()
    })
  }

  const printPosts = listaPosts.map((curPost) => {
    return ( 
      <div key={curPost.id} id={curPost.id} className="d-flex align-items-start mt-5 gap-1">
        <AppCard cardPost={curPost} del={()=>removePost(curPost.id)} />
      </div>
    )
  })

  const handleOnChange = (event) => {
    let newChiave = event.target.name;
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    let newPost = {
      ...post,
      [newChiave]: newValue,
    }
    setPost(newPost)
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Il mio Blog</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="title" className="form-label mt-4">Inserisci Titolo</label>
            <input type="text" required maxLength={25} className="form-control" name="title" id="title" value={post.title} onChange={(event) => handleOnChange(event)} />

            <label htmlFor="content" className="form-label mt-4">Inserisci una breve descrizione</label>
            <input type="text" required maxLength={140} className="form-control" name="content" id="content" value={post.content} onChange={(event) => handleOnChange(event)} />

            <label htmlFor="img" className="form-label mt-4 mb-1">Inserisci il link all&apos;immagine</label>
            <input type="text" required className="form-control" name="image" id="img" value={post.image} onChange={(event) => handleOnChange(event)} />

            {/* <label htmlFor="tags" className="form-label mt-4 mb-1">Scegli i tags</label>
            <select id="tags" name="tags" required className="form-select" value={post.tags} onChange={(event) => handleOnChange(event)}>
            <option value="" disabled>Seleziona...</option>
              <option value="tags 1">Uno</option>
              <option value="tags 2">Due</option>
              <option value="tags 3">Tre</option>
            </select> */}

            {/* <div className="d-flex align-items-center mt-5 mb-5 gap-1 col-2">
              <label htmlFor="published" className="form-label col">Pubblicato</label>
              <input type="checkbox" name="pubblicato" id="published" checked={post.pubblicato} onChange={(event) => handleOnChange(event)} />
            </div> */}

          </div>

          <button type="submit" className="btn btn-primary">Inserisci</button>
        </form>

        {/* TITOLO DEI POSTS */}
        <div>
          <div className="row row-cols-3 mb-5">
            {printPosts}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
