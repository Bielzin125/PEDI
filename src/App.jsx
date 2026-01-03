  import './App.css'
  import React,{ useState } from 'react';
  import ItemQuest from './components/ItemQuest'

  function App() {
    const [listPedidos, setListPedidos] = useState<Array<{pedido: string, valor: number}>>([]);
    const [pedidos,setPedido] = useState('');
    const [values,setValor] = useState(0);

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
      localStorage.setItem("ListaDePedidoseValores",JSON.stringify(setListPedidos([...listPedidos,{pedido:pedidos,valor:values}])));
    }

    return(
      <div className='flex fle-col justify-center items-center bg-gray-200 w-full min-h-screen'>
        <div className='flex flex-col justify-around items-center w-full h-[50%]'>
            <div className='flex flex-row justify-around items-center  p-4 w-[50%] h-[100px] bg-gray-200 drop-shadow-2xl drop-shadow-gray-500 rounded-2xl '>
            <input type="text" placeholder='Digite o pedido' className='bg-white border-2 border-gray-600 w-[50%] h-[50%] rounded-[2px] gap-4'
            onChange={HandlePedido} />
            <input type="number" placeholder='digite o valor do pedido' className='bg-white border-2 border-gray-600 w-[30%] h-[50%] gap-4 rounded-[2px]' 
            onChange={HandleValor}/>
            <input type="image" src="https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvNzQ4Lzc0ODExMy5wbmc=&ts=1767450438&sig=67b42e5871c5800eeb6c21de3550207aa30108ef5ea2dcbba8fb930e6c30e40d" alt="+" className='p-2 bg-blue-600 w-[50px] rounded-[2px] hover:scale-90 transition'
            onClick={HandleAdd}/>
          </div>
          <br />
          <div className='flex flex-col overflow-y-scroll w-[50%] h-[300px] bg-gray-200 drop-shadow-2xl drop-shadow-gray-500 rounded-2xl' >
            {listPedidos.map((item,index) => {
              
              <ItemQuest 
                key={index}
                name={item.pedido}  
                value={item.valor}
              />
              
              })
            
            }
          </div>
        </div>
      </div>
    )
  }

  export default App
