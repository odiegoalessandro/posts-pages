# Curso de react

## Ciclo de vida dos components

1. componentDidMount: aqui o componente acabou de ser montado, aqui podemos fazer chamadas a API e coisas do genero
2. componentDidUpdate: o componente está sendo renderizado novamente, aqui é onde carregamos as props e estados
3. componentDidUnmount: o componente está sendo removido da tela, podemos utilizar esse meotodo como um "lixeiro" por exemplo limpar
setTimout, estados e coisas do genero.

Vale lembrar que além dessas etapas temos mais algumas como componentWillMount, componentWillUpdate, componentWillRecieveProps,
setState e outros que não são utilizados quanto estes, então vou focar inicialmente nesses 3.

## Hooks

Hooks são uma das se não a mais poderosa ferramenta do React funcional, eles nos possibilitam evitar renderizações, acessar ciclo de vida
atualizar elementos, pegar a refencia deles, passar informações de uma tela para outra e etc.

1. useState: hook responsavel por alterar estados, possibilitando renderizar components novamente por meio da mudança de estado do mesmo.
Um exemplo do uso desse hook é guardar o texto de um input:

```js
  export default function App(){
    const [inputText, setInputText] = useState("")
    
    function handleChange(e){
      // remove o comportamento padrão desse evento
      e.preventDefault()

      setInputText(e.target.value)
    }

    return (
      <div>
        <p>{inputText}</p>
        <input onChange={handleChange}>
      </div>
    )
  }
```

Esse exemplo é um classico uso de useState para obter informações de um componente, permitindo renderizar este novamente.

### Callback function no useState

Em alguns casos especificos precisamos garantir que o estado anterior esteja correto, por exemplo um contador, se eu clicar muito rapido nele
posso acidentalmente bugar o react e ele puxar o valor de maneira incorreta, afim de evitar isso vc pode fazer da seguinte forma:

```js
  export default function App(){
    const [counter, setCounter] = useState(0)

    function handleIncrement(){
      setCounter(prevState => prevState + 1)
    }

    return (
      <div>
        <p>{counter}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    )
  }
```

## useEffect

useEffect é o equivalente aos lifecycle methods do react class components(lembrando: não são a mesma coisa, apenas equivalentes, efeitos são efeitos, lifecycle methods são lifecycle methods). Aqui vai um exemplo de como utilizar o useEffect como componentDidUpdate, componentDidMount e componentWillUnmount

```js
  function eventFn(){
    console.log('h1 clicado')
  }

  export default function App(){
    const [counter, setCounter] = useState(0)

    useEffect(() => {
      // tudo oque estiver aqui será executado na hora que o componente estiver sendo atualizado
      console.log('componentDidUpdate')
    })

    useEffect(() => {
      // tudo oque estiver aqui será executado apenas na hora que o componente ser montado
      // o segundo parametro dessa função representa um array de dependencias, caso tenha algo dentro dela deve atualizar o componente novamente
      // nesse caso como o array está vazio é executado apenas uma vez quando se monta o componente em tela, funcionando como componentDidMount
      console.log('componentDidMount')

      // aqui temos garantinha de que o componente ja esta montado então podemos utilizar o vanilla js para manipular ele, como por exemplo adicionar eventos, remover eventos, criar itens e etc.s
      document.querySelector('h1')?.addEventListener('click', eventFn)

      return () => {
        // componentWillUnmount - remove eventos de itens que não estão mais na tela evitando leaks de memoria
        document.querySelector('h1')?.removeEventListener('click', eventFn)
      }
    }, [])

    return (
      <div>
        <h1>{counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>+</button>
      </div>
    )
  }
```

## Regras dos hooks

na [documentação](https://pt-br.legacy.reactjs.org/docs/hooks-rules.html) são feitas algumas exigencias sobre como podemos utilizar os hooks:

1. Use hooks apenas no nível superior: não utilize hooks dentro de for/if/else e outras estruturas, eles sempre devem ficar no nível superior da função
2. Use apenas dentro das funções react, fora disso eles não irão funcionar de maneira correta.

## useCallback

os componentes funcionais diferente do class component que chama apenas o método ``render()`` para atualizar o componente, chamam toda a função novamente assim recriando tudo oque tem ali dentro, estados, funções auxiliares e etc. No geral não há nenhum problema com isso desde que as funções sejam simples o custo de re-renderização delas é tão baixo a ponto de não ser significante, mas e as funções que tem lógicas muito complexas? Aqui entra o `useCallback()` evitando de re-renders de funções complexas e que essa mudança não irá afetar.

## useMemo

da mesma forma que o useCallback o useMemo memoiza um valor/componente evitando que esse valor seja re-renderizado.

## memoização

memoização é o ato de guardar uma informação na mémoria(cache) da aplicação, no react utilizamos memoização para salvar função caras de serem re-criadas e components que não devem ser re-renderizados, também temos a possibilidade de salvar valores em cache.

## useRef

useRef é uma forma de manipular o HTML real da página, você pode adicionar foco ao elemento, blur, pegar os valores dele e etc. Vale dizer
que ele pode modificar o valor dentro do elemento assim possibilitando modificar o valor mostrado em tela sem re-renderizar o componente.

## useContext e ContextApi

a ContextApi veio como uma forma de gerenciar estados de maneira nativa, eliminando a necessidade de bibliotecas redux e outras para
state manegement.
