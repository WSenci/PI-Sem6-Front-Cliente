import Cards from '../components/Card';
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import OptionBar from '../components/OptionBar'
import Slider from '../components/Slider'

const Array = [
  {
    id: '67be5e39821074d98495c24c',
    nome: 'X-Burger',
    preco: 20,
    tipo: 'Lanche',
    desc: 'Pão de hamburger, carne de hamburger 90g, queijo mussarela, molho da c…',
    img: '',
  },
  {
    id: '67be5e39821074d98495c24c',
    nome: 'X-Tudo',
    preco: 5,
    tipo: 'Lanche',
    desc: 'Pão de hamburger, carne de hamburger 90g, queijo mussarela, molho da c…',
    img: '',
  },
   {
    id: '67be5e39821074d98495c24c',
    nome: 'X-Tudo',
    preco: 5,
    tipo: 'Lanche',
    desc: 'Pão de hamburger, carne de hamburger 90g, queijo mussarela, molho da c…',
    img: '',
  },
  {
    id: '67be5e39821074d98495c24c',
    nome: 'X-Tudo',
    preco: 5,
    tipo: 'Lanche',
    desc: 'Pão de hamburger, carne de hamburger 90g, queijo mussarela, molho da c…',
    img: '',
  }
];

const render = Array.map((produto) => (
    <Cards
      key={produto.id}
      id={produto.id}
      nome={produto.nome}
      preco={produto.preco}
      tipo={produto.tipo}
      desc={produto.desc}
      img={produto.img}
    />
  ));


export default function Cardapio() {
  return (
    <Layout>
    <NavBar texto={'Cardápio'} />
    <OptionBar text1={"Lanche"} text2={"Bebidas"} text3={"Acompanhamentos"}> </OptionBar>
    <Slider> </Slider>
    </Layout>
    
  );
}
