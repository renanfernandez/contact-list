import ContactHeader from "./components/ContactHeader"
import ContactList from "./components/ContactList"
import Search from "./components/Search"

function App() {
  return (
    <>
      <ContactHeader />
      <main>
        <div className="container">
          <Search />
          <ContactList />
        </div>
      </main>
    </>
  )
}

export default App
