import React, { useLayoutEffect, useCallback, useState } from 'react';
import {
  View, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CabecalhoPerfil from './cabecalhoPerfil';
import MenuPerfil from './Menus/menuPerfil';
import MenuPerfilItem from './Menus/menuPerfilItem';
import { logout } from '../../apis/apiKeycloak';
import { pegarTokenDoUsuarioNoStorage, excluirTokenDoUsuarioNoStorage } from '../../services/autenticacao';
import { DadosUsuario, DadosUsuarioProfissional } from './DadosUsuario';
import { perfilUsuario } from '../../apis/apiCadastro';
import BarraDeStatus from '../../components/barraDeStatus';
import { salvarDados } from '../../services/armazenamento';

export default function PerfilScreen() {
  const [dadosUsuario, alterarDadosUsuario] = useState({});
  const [tokenUsuario, alterarTokenUsuario] = useState({});
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function pegarTokenUsuario() {
        const token = await pegarTokenDoUsuarioNoStorage();
        alterarTokenUsuario(token);
        try {
          const perfil = await perfilUsuario();
          console.log('retornar', perfil.data);
          alterarDadosUsuario(perfil.data);
          salvarDados('perfil', perfil.data);
        } catch (err) {
          console.log('ERRO', err);
        }
      }
      pegarTokenUsuario();
    }, [])
  );

  const realizarLogout = async () => {
    try {
      await logout(tokenUsuario);
    } catch (err) {
      console.log('erro', err);
    }
    await excluirTokenDoUsuarioNoStorage();
    navigation.navigate('HOME');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#FFF' }}>
        <View style={estilos.margem}>
          <CabecalhoPerfil nome={dadosUsuario.name} />
          <MenuPerfil titulo="Informações pessoais">
            <DadosUsuario dados={dadosUsuario} />
          </MenuPerfil>
          <MenuPerfil titulo="Informações profissionais">
            <DadosUsuarioProfissional dados={dadosUsuario} />
          </MenuPerfil>
          <MenuPerfil titulo="Privacidade">
            <MenuPerfilItem icone="clipboard-text" titulo="Termos de uso" onPress={() => navigation.navigate('TERMOS_DE_USO')} />
          </MenuPerfil>
          <MenuPerfil titulo="Preferências">
            <MenuPerfilItem icone="exit-to-app" titulo="Sair" onPress={() => realizarLogout()} />
          </MenuPerfil>
        </View>
      </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  margem: {
    padding: 15,
    flex: 1,
    flexDirection: 'column'
  },
  espacamento: {
    marginLeft: 20,
    marginBottom: 10
  }
});
