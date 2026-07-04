import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './home.css'

function Home() {
    const [produto, setProduto] = useState(JSON.parse(localStorage.getItem("@produto")) || [])



    const [input, setIput] = useState("")



    const [id, setId] = useState(Date.now())
    const [concluida, setConcluida] = useState(false)

    useEffect(() => {
        localStorage.setItem("@produto", JSON.stringify(produto))

    }, [produto])

    function adicionar(e) {
        e.preventDefault()


        const produtObj = {
            id: id,
            produtoName: input,
            valor: "",
            concluida: concluida
        }


        setProduto([...produto, produtObj])

        setId(Date.now())
        setIput("")



    }
    let total = produto.reduce((acumulador, item) => {
        let textoValor = String(item.valor || "0").replace(",", ".")
        let numberValor = parseFloat(textoValor) || 0

        return acumulador + numberValor
    }, 0)
    console.log(produto)

    console.log(total)




    function totalFunc(id, num) {

        let valorFormatado = num.replace(/[^0-9,.]/g, "")



        let produtoPreco = produto.map((item) => {
            if (item.id === id) {
                return { ...item, valor: valorFormatado }
            }

            return item;
        })

        setProduto(produtoPreco)

    }





    function verificar(id) {

        let produtoVerificado = produto.map((item) => {
            if (item.id === id) {
                return { ...item, concluida: !item.concluida } // aqui acesso as propriedades de item, passo as outras e acesso so mente concluida
            }
            return item
        })
        setProduto(produtoVerificado)
        console.log(produto)
    }

    function excluir(id) {

        let filtrada = produto.filter(item => item.id !== id)
        setProduto(filtrada)
        console.log(filtrada)
    }

    return (
        <div className="container">
            <div className="cabecalho">
                <div className="titulos">

                    <h1>Lista</h1>
                    <h2> de Compras</h2>
                </div>
                <img className="vegetais" src="/vegetal.png" alt="" />
                <img className="carrinho"  src="/carrinho.png" alt="" />
                <div className="formContainer">
                    <form onSubmit={adicionar}>

                        <input type="text" value={input} onChange={(e) => setIput(e.target.value)} />

                        <button type="submit">+</button>


                    </form>
                </div>
            </div>


            <p className="total"><span>Total: R${total.toFixed(2).replace(".", ",")}</span></p>

            <div className="listaProdutos">
                {produto.length === 0 ? <div className="containerIcone"> <img className="vazioIcone" src="/compras.png" alt="astronalta no carrinho vazio" /> </div>: null }
                {produto.map((item) => {
                    return (
                     <div className="itemContainer" key={item.id}>

                    <div className="nomeValor">
                    <p className={item.concluida ? "verificada" : ""}>{item.produtoName} </p>

                    <span> R$:</span> <input type="text" step="0.01" value={item.valor} onChange={(e) => totalFunc(item.id, e.target.value)} />
                    </div>

                    <input type="checkbox" checked={item.concluida} id="verificado" onClick={() => verificar(item.id)}/>
                    <button className="editar"><Link to="/Editar" state={{ produtoAtual: item }}><img src="/lapis.png" /></Link></button>
                    <button className="excluir" onClick={() => excluir(item.id)}><img src="/excluir.png" /></button>
                                    </div>
                                )
                })}

            </div>
        </div>
    )
}

export default Home;