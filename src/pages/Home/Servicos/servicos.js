import React from 'react';
import { Title } from 'react-native-paper';
import { FlatList, StyleSheet, Linking } from 'react-native';
import Servico1 from '../../../assets/icons/servicos/servico_1.svg';
import Servico2 from '../../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../../assets/icons/servicos/servico_3.svg';
import Servico4 from '../../../assets/icons/servicos/servico_4.svg';
import Servico5 from '../../../assets/icons/servicos/servico_5.svg';
import Servico6 from '../../../assets/icons/servicos/servico_6.svg';
import CartaoHome from '../cartaoHome';

function Servicos({ navigation }) {
  const listaServicos = [
    {
      id: 'services-1',
      titulo: 'IntegraSUS',
      icone: Servico1,
      navegacao: {
        componente: 'webview',
        titulo: 'IntegraSUS',
        url: 'https://integrasus.saude.ce.gov.br'
      }
    },
    {
      id: 'services-2',
      titulo: 'SUS no Ceará',
      icone: Servico2,
      navegacao: {
        componente: 'SUS_NO_CEARA'
      }
    },
    {
      id: 'services-3',
      titulo: 'Fale Conosco',
      icone: Servico3,
      navegacao: {
        componente: 'FEEDBACK'
      }
    },
    {
      id: 'services-4',
      titulo: 'Ações do governo',
      icone: Servico4,
      navegacao: {
        componente: 'webview',
        titulo: 'Ações do governo',
        url: 'https://coronavirus.ceara.gov.br/isus/governo/'
      }
    },
    {
      id: 'services-5',
      titulo: 'ESP',
      icone: Servico5,
      navegacao: {
        componente: 'webview',
        titulo: 'ESP',
        url: 'https://www.esp.ce.gov.br/'
      }
    },
    {
      id: 'services-6',
      titulo: 'ESP Virtual',
      icone: Servico6,
      navegacao: {
        componente: 'browser',
        titulo: 'ESP Virtual',
        url: 'http://espvirtual.esp.ce.gov.br/'
      }
    }
  ];

  return (
    <>
      <Title style={estilos.titulo}>Serviços</Title>

      <FlatList
        horizontal
        data={listaServicos}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartaoHome
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => (item.navegacao.componente !== 'browser'
              ? navigation.navigate(item.navegacao.componente, {
                title: item.navegacao.titulo,
                url: item.navegacao.url
              })
              : Linking.openURL(item.navegacao.url))
            }
          />
        )}
      />
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    marginHorizontal: 16,
    fontSize: 20,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)'
  }
});

export default Servicos;
