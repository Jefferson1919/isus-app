import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormularioInfoPessoal from '../pages/NovoCadastro/formularioInfoPessoal';
import FormularioInfoProfissional from '../pages/NovoCadastro/formularioInfoProfissional';
import FormularioSenha from '../pages/NovoCadastro/formularioSenha';
import { FormProvider } from '../context/FormContext';
import rotas from '../constants/rotas';

const CadastroStack = createStackNavigator();

export default function RotasCadastro() {
  const navigation = useNavigation();

  const options = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0
    },
    headerTintColor: 'rgba(0, 0, 0, 0.87)',
    headerTitleAlign: 'center',
    headerTitle: 'Cadastro',
    headerLeft: () => (
      <TouchableOpacity
        style={{
          marginHorizontal: 19
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={28} color="#304FFE" />
      </TouchableOpacity>
    )
  };

  return (
    <FormProvider>
      <CadastroStack.Navigator>
        <CadastroStack.Screen
          name={rotas.FormularioPessoal}
          component={FormularioInfoPessoal}
          options={options}
        />
        <CadastroStack.Screen
          name={rotas.FormularioProfissional}
          component={FormularioInfoProfissional}
          initialParams={{ tela_anterior: rotas.FormularioPessoal }}
          options={options}
        />
        <CadastroStack.Screen
          name={rotas.FormularioSenha}
          component={FormularioSenha}
          options={options}
        />
      </CadastroStack.Navigator>
    </FormProvider>
  );
}
