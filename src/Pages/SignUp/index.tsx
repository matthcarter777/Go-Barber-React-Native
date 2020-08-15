import React, { useRef } from 'react';
import {
          Image,
          View,
          ScrollView,
          KeyboardAvoidingView,
          Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const formRef = useRef<FormHandles>(null);
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

          <Form ref={formRef} onSubmit={(data) => {
            console.log(data);
          }}>
            <Input name="user" icon="user" placeholder="Nome" />

            <Input name="email" icon="mail" placeholder="Email" />

            <Input name="password" icon="lock" placeholder="Senha" />

          </Form>

          {/* Possivel erro, mudei pois o buttom perdeu o style */}
          <Button onPress={() => {
              formRef.current?.submitForm()
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
