import React from 'react';
import {
          Image,
          View,
          ScrollView,
          KeyboardAvoidingView,
          Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoimg from '../../assets/logo.png';

import {
    Container,
    Title,
    BackToSignIn,
    BackToSignInText
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoimg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Input name="user" icon="user" placeholder="Nome" />

          <Input name="email" icon="mail" placeholder="Email" />

          <Input name="password" icon="lock" placeholder="Senha" />

          <Button onPress={() => {
            console.log('deu');
            }}
          >
            Entrar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>

      <BackToSignIn onPress={() => {
        navigation.goBack();
      }}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>
          voltar para logon
        </BackToSignInText>
      </BackToSignIn>

    </>
  );
}

export default SignUp;