import './App.css';
import axios from "axios";
import {useState,useEffect} from "react"
const client = axios.create({baseURL : "http://localhost:3004"});

function App() {
  
  const [posts, setPost] = useState(null);
  const [Lastname, setLastname] = useState(null);
  const [Firstname, setFirstname] = useState(null);
  const [ID, setId] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Gender, setGender] = useState(null);
  const [Status, setStatus] = useState(null);

  useEffect(() => {
      async function getPost() {
      const response = await client.get("/employees");
      setPost(response.data);
    }
    getPost();
  }, []);

    async function Post() {
      
    const res = await client.post("/employees",{
    id:ID,
    last_name:Lastname,
    first_name:Firstname,
    email:Email,
    gender:Gender,
    status:Status
    }
)
    alert("Post added!");
    setPost(res.data.employees);
    console.log(posts)
  }
  async function Delete(id) {
      alert("are you sure want to delete")
    const res = await client.delete(`/employees/${id}`)
    alert("Post deleted!");
    setPost(res.data.employees);
    console.log(posts)
  }
  async function Update(id) {
      
    const res = await client.put(`/employees/${id}`,{
    last_name:Lastname,
    first_name:Firstname,
    email:Email,
    gender:Gender,
    status:Status
    }
)
    alert("Post updated!");
    setPost(res.data.employees);
    console.log(posts)
  }

  if (!posts) return null;

  function refreshPage() {
    window.location.reload(true);
  }

  return (
    <div>
    {posts.map((post,index) =>  {
      return(
        <div className="flex-container" key={index}>
        <div>{post.id}</div>
        <div>{post.last_name}</div>
        <div>{post.first_name}</div>
        <div>{post.email}</div>
        <div>{post.gender}</div>
        <div>{post.status}</div>
        <button onClick={()=>[Delete(post.id), refreshPage()]}>Delete Post</button>
        </div>
        )
      })}
    <div>
    <input type="text" placeholder="Last Name" onChange={event => setLastname(event.target.value)}/>
    <input type="text" placeholder="First Name" onChange={event => setFirstname(event.target.value)}/>
    <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
    <input type="text" placeholder="Gender(Male/Female)" onChange={event => setGender(event.target.value)}/>
    <input type="text" placeholder="Status" onChange={event => setStatus(event.target.value)}/>
    <button onClick={()=>[Post(), refreshPage()]}>Create Post</button>
    </div>
    <div>
    <input type="text" placeholder="Id" onChange={event => setId(event.target.value)}/>
    <input type="text" placeholder="Last Name" onChange={event => setLastname(event.target.value)}/>
    <input type="text" placeholder="First Name" onChange={event => setFirstname(event.target.value)}/>
    <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
    <input type="text" placeholder="Gender(Male/Female)" onChange={event => setGender(event.target.value)}/>
    <input type="text" placeholder="Status" onChange={event => setStatus(event.target.value)}/>
    
    <button onClick={()=>[Update(ID), refreshPage()]}>update Post</button>
    </div>

    
    </div>
   
    
  );
}
export default App;
