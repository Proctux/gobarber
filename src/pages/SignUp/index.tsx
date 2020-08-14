import React, { useRef, useCallback } from 'react';
import { Image, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, BackToLogonButton, BackToLogonButtonText } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation();

  const handleSignUp = useCallback((data: object) => {
    console.log(data)
  }, [])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp} style={{flex: 1}}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <View>
                <Button onPress={() => { console.log('criado ') }}>Cadastrar</Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogonButton onPress={() => { navigation.goBack() }}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToLogonButtonText>Voltar para o logon</BackToLogonButtonText>
      </BackToLogonButton>
    </>
  );
};

export default SignUp;
