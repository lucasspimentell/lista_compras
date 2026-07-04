import { useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import'./editar.css'

function Editar() {
    const navigate = useNavigate()
    const location = useLocation()

    const produto = location.state?.produtoAtual
    const [input,setinput] = useState(produto.produtoName)

    function confirmar(e) {
        e.preventDefault()

        let produtosSalvos = JSON.parse(localStorage.getItem("@produto")) ||[]

        let produtoEditado = produtosSalvos.map((item)=>{
            if (item.id === produto.id) {
                
                return {...item, produtoName:input}
            }

            return item
        })

        localStorage.setItem("@produto",JSON.stringify(produtoEditado))

        navigate('/')
    }


    return(
        <div className="editarContainer">
            <form onSubmit={confirmar} className="editarForm">
                <h1>Editar</h1>
            <input className="editarInput" type="text" value={input} onChange={(e)=>setinput(e.target.value)}/>
            <div className="containerBtn">
                <button className="confirmar" type="submit">Confirmar</button>
            <button className="cancelar"><Link to='/'>Cancelar</Link></button>
            </div>
            </form>
        </div>
    )
}

export default Editar;