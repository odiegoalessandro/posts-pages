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

*Notas:* um outro exemplo de uso do `useRef` é armazenar intervalos para que possam ser eliminados quando o componente for desmontado. Aqui vai um exemplo de hook que podemos criar com isso:

```js
  function useInterval(callback, delay) {
    const savedCallback = useRef()
  
    // guarda o último callback em memoria
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Configura o intervalo
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }
```

Esse hook foi criado por um desenvolvedor da meta, é muito interessante ver esse caso de uso, isso mostra um dos varios jeitos que os react-hooks podem ser utilizados, então sempre que possivel teste novas coisas, saia da caixinha.

## useContext e ContextApi

a ContextApi veio como uma forma de gerenciar estados de maneira nativa, eliminando a necessidade de bibliotecas redux e outras para
state manegement. Exemplo de uso da ContextApi:

```js
  // context/auth.js
  
  export const AuthContext = createContext()
```

```js
  // App.jsx
  
  import { AuthContext } from "./context/auth.js"

  export default function App(){
    const [auth, setAuth] = useState(null)
    
    return (
      <AuthContext.Provider value={{ auth, setAuth }} >
        // restante da aplicação
      <AuthContext.Provider>
    )
  }
```

```js
  // components/AuthSession.jsx

  import { AuthContext } from "./context/auth.js"

  export default function AuthSession(){
    const { auth, setAuth } = useContext(AuthContext)

    return (
      <div>
        autenticado
      </div>
    )
  }
```

Normalmente utilzariamos `useReducer` porém como ainda não vimos esse hook vou deixar como `useState` por enquanto, no futuro faremos um novo exemplo utilizando o `useReducer`. Após esse disclaimer vamos falar um pouco sobre recomendações sobre como usar contextos e tudo mais.

1. Não utilize um único contexto para toda sua aplicação, imagine só a complexidade de um contexto de um site como o `Facebook` por exemplo, ele deve lidar com autenticação, temas, preferencias do úsuario e outras milhares de coisas, nesse caso se vc utilizar um único estado sempre que você chamar seu contexto ele vai ser gigante, imagine só, para carregar uma informação simples como o nome do usuário todo seu contexto está sendo carregado novamente, com o tempo isso vai gerar grandes leaks de memoria.
2. Sempre se pergunte "isso realmente deve ser colocado dentro de um contexto?", muitas vezes a resposta será não.

## useReducer

`useReducer` funciona de maneira semelhante ao `useState` a diferença é que adicionamos mais algumas lógicas dentro dele, basicamente o `useState` apenas muda o estado, enquanto o `useReducer` tem toda um logica por trás com tipos especificos de mudança de estado. Um bom exemplo disso seria um reducer de um usuario, onde ao invés da logica do usuario ter que ficar do lado do componente ela é isolada dentro do hook, possibilitando um código limpo e organizado, além de garantir a mudança de estado de maneira correta nesse exemplo poderiamos migrar o estado do usuário para um reducer e definir 2 tipos de ação `login` e `logout` assim evitando possiveis erros humanos e padronizando a troca de estados. Exemplo de um reducer:

```js
const authState = {
  user: 'diego',
  role: 'ADMIN'
}

const reducer = (state, action) => {
  switch(action.type){
    case 'login':
      return { 
        user: action.payload.username, 
        role: action.payload.role 
      }
    case 'logout':
      return null
  }
}

export default function App(){
  const [state, dispatch] = useReducer(reducer, authState)

  
  return (
    <div>
      { state && <h1>{state.user} {state.role}</h1> }
      
      <button onClick={() => dispatch({ 
        type: 'login',
        payload: ...authState
      })}>
        Login
      </button>
      
      <button onClick={() => dispatch({ 
        type: 'logout',
        payload: null
      })}>
        Logout
      </button>
    </div>
  )
}
```

O `useReducer` é um hook que juntamente com a ContextApi tem a intenção de substituir o Redux. E realmente ContextApi + useReducer é uma forte combinação.

**Atenção:** Na hora de usar `useReducer` devemos criar funções auxiliares para fazer cada tipo de ação como boa prática, visando isolar o código e usar algo parecido com o padrão de [Adapter](https://refactoring.guru/design-patterns/adapter)

## React custom hooks

dentro do react podemos criar hooks próprios, é uma maneira de dividir o código em partes menores, evitando um `god object`. Recomendo ler o [artigo](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) do Dan Abramov sobre isso.

## useLayoutEffect

é muito semelhante ao `useEffect` porém é utilizado quando precisamos manipular o DOM cordenadamente com um dado. Vamos supor que você executar uma função muito demorada e após isso mostrar o resultado dela em tela, para que não haja um grande delay entre o gatilho dessa função até a execução dela podemos utilizar o `useLayoutEffect`. Exemplo de código com `useLayoutEffect`:

```js
  export const Home = () => {
    const [counted, setCounted] = useState([0, 1, 2, 3, 4])
    const divRef = useRef()

    useLayoutEffect(() => {
      const now = Date.now()
      while (Date.now() < now + 1500)
      divRef.current.scrollTop = divRef.current.scrollHeight
    })

    const handleClick = () => {
      setCounted((c) => [...c, +c.slice(-1) + 1])
    }

    return (
      <>
        <button onClick={handleClick}>Count {counted.slice(-1)}</button>
        <div ref={divRef} style={{ height: '100px', width: '100px', overflowY: 'scroll' }}>
          {counted.map((c) => {
            return <p key={`c-${c}`}>{c}</p>
          })}
        </div>
      </>
    )
  }
```

**Atenção**: não é recomendando utilizar este hook, apenas o utilize quando não houver outro recurso, nós demais casos tente ao máximo sanar seus problemas com `useEffect`

## forwardRef e useImperativeRef

o forwardRef te ajuda a passar ref`s de componentes pais para componentes filhos, useImperativeRef permite passar um ref dentro de outro ref. Lembrando que não é uma boa prática utilizar esse tipo de hook.

## Ordem de execução dos hooks

![React Hook Flow Diagram](/images/hook-flow.png)

1. Primeiro executamos os incializadores juntamente com os states
2. O componente é renderizado
3. os useLayoutEffect são limpos
4. os useLayoutEffect são executados
5. Navegador desenha a tela
6. useEffect são limpos
7. useEffect são executados

## Compound Components

[compound pattern](https://medium.com/@vitorbritto/react-design-patterns-compound-component-pattern-ec247f491294) é um padrão afim de evitar o `prop drilling`, é basicamente a prática de passar uma prop do elemento pai para varios elementos filhos até chegar no componente que realmente precisa desta prop.
Vale lembra que esse é um recurso muito poderoso que vem de maneira nativa no `React` mas que muitos desenvolvedores não sabem ou negligenciam a sua existencia. Exemplo de código feito com `compound components`:

```js
const ListItem = ({ children, style }) => (
  <li style={style}>
    {children}
  </li>
)

const List = ({ children }) => {
  
  return (
    <ul>
       {
        Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return cloneElement(child, {
              style: {
                 backgroundColor: index % 2 === 0 ? "red" : "blue" }
            });
          }
          return child;
        })
      }
    </ul>
  )
} 


export default function CompoundComponents(){
  return (
    <List>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
      <ListItem>teste</ListItem>
    </List>
  )
}
```

alguns podem se questionar "mas não seria mais fácil utilizar a ContextApi para isso?", e a resposta é não exatamente, ela pode sim ser uma boa ferramenta mas neste caso ela poderia trazer diversos problemas como:

1. problemas de performance: o valor de um contexto pode causar renderizações desnecessarias no consumo do componente, mesmo se as mudanças não forem relavantes pra esse componente em especifico.
2. complexidade na hora de testar: testar componentes que usem contextos podem ser bem mais complexos comparados a componentes baseado em `props`. Mockar ou fornecer o valor do contexto correto durante os testes requerem uma configuração adicional e podem fazer os testes unitarios mais complexos.
3. encapsulamento excessivo: o uso excessivo da `ContextApi` é prejudicial para o projeto como um todo, dificultando o entendimento do código.
4. tipagem invalida: os valores do contexto não tem os tipos validados por padrão, significa que o uso incorreto ou mudanãs no corpo do contexto podem não capturadas pelo compilador ou developer tools. Isso pode acarretar em erros e desafios na hora de debuggar.
5. problemas de escalabilidade: a `ContextApi` pode ser dificl para escalar e se manter em um app de grande escala.

em contraponto os `Compound Components` trazem diversas vantagens como:

1. Reutilização: Como os componentes individuais dentro de um componente composto são projetados para funcionar juntos, eles podem ser facilmente reutilizados em diferentes partes da sua aplicação sem a necessidade de duplicar código ou funcionalidade. Isso pode ajudar a reduzir a complexidade geral do seu código e facilitar a manutenção e atualização da sua aplicação ao longo do tempo.
2. Flexibilidade: Componentes compostos fornecem uma maneira flexível de construir componentes de UI complexos, mantendo uma API limpa e concisa. Esse padrão permite criar componentes altamente personalizáveis e reutilizáveis sem precisar passar muitos props para o componente.
3. Separação de Preocupações: Com componentes compostos, cada componente filho é responsável por sua funcionalidade específica, tornando mais fácil manter e atualizar componentes individuais sem afetar todo o sistema.
4. API Intuitiva: Ao encapsular componentes filhos relacionados dentro de um componente pai, o padrão de Componentes Compostos oferece uma API clara e intuitiva, fácil de entender e usar por outros desenvolvedores.
5. Personalização Aprimorada: Este padrão permite que os desenvolvedores troquem ou estendam facilmente os componentes filhos, levando a uma personalização aprimorada.
6. Consistência: Ao fornecer uma interface consistente para interagir com um componente composto, o padrão de componente composto pode ajudar a melhorar a experiência do usuário da sua aplicação.
7. Menos Prop Drilling: Em componentes compostos, em vez de passar estado através de props, passamos elementos como filhos para um elemento pai. Isso permite que o pai gerencie o estado implícito e reduz a necessidade de prop drilling.
8. Manutenibilidade:* Componentes compostos fornecem uma maneira mais flexível de compartilhar estado dentro de aplicações React, tornando mais fácil manter e depurar suas aplicações ao fazer uso de componentes compostos.
