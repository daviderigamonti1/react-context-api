import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { GlobalProvider } from "./contexts/GlobalContext";

import DefaultLayout from "./pages/DefaultLayout"
import HomePage from "./pages/HomePage"
import Contact from "./pages/Contact"
import About from "./pages/About"
import PostsPage from "./pages/PostsPage"
import PostPage from "./pages/PostPage"
import MyForm from "./pages/MyForm"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout} >
              <Route path='/' Component={HomePage} />
              <Route path='/contact' Component={Contact} />
              <Route path='/about' Component={About} />
              <Route path='/posts' >
                <Route index Component={PostsPage} />
                <Route path=":id" Component={PostPage} />
                <Route path="create" Component={MyForm} />
              </Route>
            </Route>
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App;