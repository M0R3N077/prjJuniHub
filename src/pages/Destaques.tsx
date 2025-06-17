import React, { useState } from 'react';

const destaques = [
  {
    titulo: 'Festa',
    imagens: [
      '/eat/1.jpg',
    '/eat/2.jpg',
        '/eat/3.jpg',

    ],
  },
  {
    titulo: 'Quadrilha',
    imagens: [
      '/brinquedos/1.jpeg',
            '/brinquedos/2.jpg',
            '/brinquedos/3.jpg',
    ],
  },
  {
    titulo: 'Comidas',
    imagens: [
      '/junina3/1.jpg',
      '/junina3/2.jpg',
      '/junina3/3.jpg',
    ],
  },
  {
    titulo: 'Decoração',
    imagens: [
      '/junina4/1.jpeg',
      '/junina4/2.jpeg',
      '/junina4/3.jpeg',
    ],
  },
];

export default function DestaquesInstagram() {
  const [modalAberto, setModalAberto] = useState(false);
  const [indiceDestaque, setIndiceDestaque] = useState(0);
  const [indiceImagem, setIndiceImagem] = useState(0);

  const abrirModal = (index) => {
    setIndiceDestaque(index);
    setIndiceImagem(0);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIndiceImagem(0);
  };

  const irParaProximaImagem = () => {
    setIndiceImagem((oldIndex) => {
      const maxIndex = destaques[indiceDestaque].imagens.length - 1;
      if (oldIndex === maxIndex) {
        fecharModal();
        return 0;
      }
      return oldIndex + 1;
    });
  };

  const irParaImagemAnterior = () => {
    setIndiceImagem((oldIndex) => {
      if (oldIndex === 0) {
        return 0;
      }
      return oldIndex - 1;
    });
  };

  const handleClickModal = (e) => {
    const largura = e.currentTarget.clientWidth;
    const clickX = e.clientX;
    if (clickX < largura / 2) {
      irParaImagemAnterior();
    } else {
      irParaProximaImagem();
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }} className='bg-transparent'>
      <h2 style={{ marginBottom: 20 }} className='text-black text-2xl'>Destaques</h2>

      <div
        style={{
          display: 'flex',
          gap: 15,
          overflowX: 'auto',
          justifyContent: 'center',
          paddingBottom: 10,
        }}
      >
        {destaques.map((item, i) => (
          <div
            key={i}
            onClick={() => abrirModal(i)}
            title={item.titulo}
            style={{
              backgroundImage: `url(${item.imagens[0]})`,
              cursor: 'pointer',
              borderRadius: '50%',
              width: 70,
              height: 70,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1.5px solid rgb(0, 0, 0)', 
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {modalAberto && (
        <div
          style={{
            position: 'fixed',
            inset: 0, 
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            zIndex: 1000,
            padding: 20,
          }}
          onClick={handleClickModal}
          title="Clique na esquerda para voltar, direita para avançar"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              fecharModal();
            }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              borderRadius: '50%',
              width: 40,
              height: 40,
              cursor: 'pointer',
              zIndex: 1100,
              lineHeight: '40px',
              textAlign: 'center',
            }}
            aria-label="Fechar modal"
          >
            ×
          </button>

          <img
            src={destaques[indiceDestaque].imagens[indiceImagem]}
            alt={`Slide ${indiceImagem + 1} - ${destaques[indiceDestaque].titulo}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: 1,
              objectFit: 'contain', 
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
