import './Infos.css';

const Infos = () => {
  return (
      <section className="infos-container ">
     

  <div className="infos-content">
    <div className="infos-image">
        <img src="/junina.png" className='w-full h-full rounded-lg' />
    </div>
    <div className="infos-text bg-transparent">
      <h3>Festa Junina</h3>
      <p>
        A Festa Junina é um dos eventos mais tradicionais e esperados do ano, celebrada com muita alegria, música, danças típicas, comidas deliciosas e momentos especiais para toda a família.
      </p>
      <p>
        É um tempo de encontro, de resgate cultural e de diversão para todas as idades — com bandeirinhas coloridas, quadrilhas animadas e o cheirinho irresistível de milho e canjica no ar.
      </p>
    </div>
  </div>

      </section>


  );
};
export default Infos;