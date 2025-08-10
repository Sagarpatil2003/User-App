import { useEffect, useState } from "react"

export function Task() {
  let [data, setData] = useState([])
  let [currentPage, setCurrentPage] = useState(1)

  let displayPage = 10

  async function getData() {
    try {
      let res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
      let userData = await res.json()
      setData(userData)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  let lastIndex = currentPage * displayPage
  let firstIndex = lastIndex - displayPage
  let currentItems = data.slice(firstIndex, lastIndex)

 let totalPages = Math.ceil(data.length/displayPage)

  if (!data || data.length === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      {currentItems.map(user => (
        <div key={user.id}>
          <h5>{user.title}</h5>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)  ].map((_,i)=>{
          let pageNum = i + 1
          return(
            <button onClick={()=>setCurrentPage(pageNum)}
             style={{
                backgroundColor: currentPage === pageNum ? "lightblue" : "white",
                color:"black"
              }}
            >
                {pageNum}
            </button>
          )
        })}

        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}
