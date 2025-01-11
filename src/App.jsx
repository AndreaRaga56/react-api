// /* eslint-disable react-hooks/exhaustive-deps */
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
  let [listaTags, setListaTags] = useState([])
  let [post, setPost] = useState("")
  let [tagFiltro, setTagFiltro] = useState(false)
  let apiUrl = "http://localhost:3333"

  useEffect(() => {
    console.log("partito")
    getPosts();
    getTags()
  }, []);

  const getPosts = () => {
    axios.get(`${apiUrl}/posts`).then((resp) => {
      console.log(resp.data.blogPosts)
      setListaPosts(resp.data.blogPosts);
      setPost(protoPost);
    });
  };

  const getTags = () => {
    axios.get(`${apiUrl}/posts`).then((resp) => {
      let posts = resp.data.blogPosts;
      let newListaTags = []
      for (let i = 0; i < posts.length; i++) {
        let curTagList = posts[i].tags
        for (let j = 0; j < curTagList.length; j++) {
          if (!newListaTags.includes(curTagList[j])) {
            newListaTags.push(curTagList[j])
          }
        }
      }
      setListaTags(newListaTags)
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`${apiUrl}/posts`, post).then(() => {
      console.log(post)
      getPosts();
    })
  }

  const removePost = (a) => {
    axios.delete(`${apiUrl}/posts/${a}`).then(() => {
      getPosts()
    })
  }

  const printPosts = listaPosts.map((curPost) => {
    console.log(curPost.tags.includes(curPost.tags[0]))
    console.log(curPost.tags, curPost.tags[0], tagFiltro)


    if (curPost.tags.includes(tagFiltro)){
      return (
        <div key={curPost.id} id={curPost.id} className="d-flex align-items-start mt-5 gap-1">
          <AppCard cardPost={curPost} del={() => removePost(curPost.id)} />
        </div>
      )
    } else {
      return (false)
    }

  })

  const printTags = listaTags.map((curTag, i) => {
    return (
      <option key={i} value={curTag}> {curTag}</option>
    )
  })

  const handleOnChange = (event) => {
    let newChiave = event.target.name;
    let newValue;

    if (event.target.type !== "checkbox" && event.target.type !== "select-one") {
      newValue = event.target.value;
    } else if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      let array = []
      array.push(event.target.value)
      newValue = [...array];
    }
    
      let newPost = {
        ...post,
        [newChiave]: newValue,
      }
      console.log(newPost)
      setPost(newPost)
  }

  const filtra = (event) =>{
    let newValue = event.target.value;
    setTagFiltro(newValue)
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

            <label htmlFor="tags" className="form-label mt-4 mb-1">Scegli i tags</label>
            <select id="tags" name="tags" required className="form-select" value={post.tags} onChange={(event) => handleOnChange(event)}>
              <option value="" disabled>Seleziona...</option>
              {printTags}
            </select>

            {/* <div className="d-flex align-items-center mt-5 mb-5 gap-1 col-2">
              <label htmlFor="published" className="form-label col">Pubblicato</label>
              <input type="checkbox" name="pubblicato" id="published" checked={post.pubblicato} onChange={(event) => handleOnChange(event)} />
            </div> */}

          </div>

          <button type="submit" className="btn btn-primary">Inserisci</button>
        </form>

        {/* TITOLO DEI POSTS */}
        <div>
          <div className="row row-cols-3 my-5">
            <label htmlFor="tagFiltro" className="form-label mt-4 mb-1">Filtra</label>
            <select id="tagFiltro" name="tagFiltro" required className="form-select" value={tagFiltro} onChange={(event) => filtra(event)}>
              <option value="" disabled>Seleziona...</option>
              {printTags}
            </select>

            {printPosts}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
