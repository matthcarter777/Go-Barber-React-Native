import React, { useRef, useCallback } from 'react';
import {
          Image,
          View,
          ScrollView,
          KeyboardAvoidingView,
          Platform,
          TextInput,
          Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

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

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passWordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome e obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um email valido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Voçê já pode fazer login na aplicação'
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);
          return;
        }

        Alert.alert(
          'error',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
      }
    },
    [navigation],
  );

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

          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => {
                passWordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passWordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              secureTextEntry
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

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
