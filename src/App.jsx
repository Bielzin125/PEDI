  import './App.css'
  import React,{ useEffect, useState } from 'react';
  import ItemQuest from './components/ItemQuest.jsx'

  function App() {
    const [listPedidos, setListPedidos] = useState([]);
    const [pedidosAntigos,setPedidoAntigo] = useState([]);
    const [pedidos,setPedido] = useState('');
    const [values,setValor] = useState(0);
    const [ValoresdoDia,setDiaValores] = useState(0);
    useEffect(() => {
      const StoragePedidos = localStorage.getItem("ListPedidos");
      const StorageFatura = localStorage.getItem("Faturou");
      if(StoragePedidos) {
        const LoadList = JSON.parse(StoragePedidos);
        setListPedidos(LoadList);
      }else if(StorageFatura) {
        setDiaValores(StorageFatura)
      }
    },[]);


    function HandlePedido(e) {
      const PedidoValue = e.target.value
      setPedido(PedidoValue);
    }

    function HandleValor(e) {
      e.preventDefault();
      const novoValor = Number(e.target.value);
      setValor(novoValor);
    }

    function HandleAdd(){
      if(!pedidos.trim()) return;
      const novosPedidos = [...listPedidos,{pedido:pedidos,valor:values}]
      setListPedidos(novosPedidos);
      localStorage.setItem("ListPedidos",JSON.stringify(novosPedidos,null,2));
    }

    function FecharOdia() {
      const total = listPedidos.reduce((acumulador,item) => {
        return acumulador + Number(item.valor);
      },0);
      const Historico = JSON.parse(localStorage.getItem("PedidosAntigos") || "[]");
      const novoHistorico = [...Historico,...listPedidos];
      localStorage.setItem("PedidosAntigos",JSON.stringify(novoHistorico))
      setDiaValores(total);
      localStorage.setItem("Faturou",total)
      setListPedidos([]);
      localStorage.setItem("ListPedidos",JSON.stringify([]))
    }

    return(
      <div className='flex flex-col items-center bg-gray-200 w-full min-h-screen'>
        <header className='flex flex-row-reverse p-1.5 w-full h-[60px]'>
          <strong className='flex justify-center text-center items-center  p-4 w-[200px] h-[40px] bg-gray-200 drop-shadow-2xl drop-shadow-gray-500 rounded-2xl'>Faturou:{ValoresdoDia}</strong>
        </header>
        <div className='flex flex-col justify-around items-center w-full h-[50%]'>
            <div className='flex flex-row justify-around items-center  p-4 w-[50%] h-[100px] bg-gray-200 drop-shadow-2xl drop-shadow-gray-500 rounded-2xl '>
            <input type="text" placeholder='Digite o pedido' className='bg-white border-2 border-gray-600 w-[50%] h-[50%] rounded-[2px] gap-4'
            onChange={HandlePedido} />
            <input type="number" placeholder='digite o valor do pedido' className='bg-white border-2 border-gray-600 w-[30%] h-[50%] gap-4 rounded-[2px]' 
            onChange={HandleValor}/>
            <input type="image" src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvNzQ4Lzc0ODExMy5wbmc=&ts=1767450438&sig=67b42e5871c5800eeb6c21de3550207aa30108ef5ea2dcbba8fb930e6c30e40d" alt="+" className='p-2 bg-blue-600 w-[50px] rounded-[2px] hover:scale-120 transition'
            onClick={HandleAdd}/>
          </div>
          <br />
          <div className='grid grid-cols-1 gap-3 p-4 overflow-y-auto w-[50%] h-[300px] bg-gray-200 drop-shadow-2xl drop-shadow-gray-500 rounded-2xl' >
            {listPedidos.map((item,index)=> (
              <ItemQuest
                key={index}
                name={item.pedido}
                valor={item.valor}
              />
            ))}
          </div>
          <br />
          <button className='flex z-1 justify-center text-center items-center w-[400px] h-[50px] text-white bg-blue-500 hover:scale-120 transition drop-shadow-2xl drop-shadow-gray-500 rounded-2xl' 
            onClick={FecharOdia}
          >Fechar O Dia</button>
        </div>
      </div>
    )
  }

  export default App
