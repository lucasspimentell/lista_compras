import { useState,useEffect } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";

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
        <div>
            <form onSubmit={confirmar}>
                <h1>Editar</h1>
            <input type="text" value={input} onChange={(e)=>setinput(e.target.value)}/>
            <button type="submit">Confirmar</button>
            <button><Link to='/'>Cancelar</Link></button>
            </form>
        </div>
    )
}

export default Editar;