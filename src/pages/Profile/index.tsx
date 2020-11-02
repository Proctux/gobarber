import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { TextInput, KeyboardAvoidingView, ScrollView ,Alert, Platform, View } from 'react-native';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import { Container, UserAvatarButton, UserAvatar, Title, BackButton } from './styles';
import api from '../../services/api';

interface UpdateProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>();

  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>();
  const userInputRef = useRef<TextInput>();
  const oldPasswordInputRef = useRef<TextInput>();
  const passwordInputRef = useRef<TextInput>();
  const passwordConfirmationInputRef = useRef<TextInput>();

  const { user, updateUser } = useAuth();

  const handleUpdateUser = useCallback(async (data: UpdateProfileFormData) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido."),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('password', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }).
        oneOf([Yup.ref('password')], 'Confirmação incorreta'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const { name, email, old_password, password, password_confirmation } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
            old_password,
            password,
            password_confirmation,
          }
          : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      Alert.alert("Perfil atualizado com sucesso. Todas as informações atualizadas já estão disponíveis.");

      navigation.goBack();
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors);

        return
      }

      Alert.alert(
        "Erro ao atualizar seu perfil",
        "Ocorreu um erro ao tentar atualizar seu perfil. Por favor, tente novamente mais tarde."
      );

      console.log(err)
    }
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <BackButton onPress={handleGoBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>

          <UserAvatarButton>
            <UserAvatar source={{ uri: user.avatar_url }}/>
          </UserAvatarButton>

          <View>
            <Title>Meu perfil</Title>
          </View>

          <Form ref={formRef} initialData={user} onSubmit={handleUpdateUser}>
            <Input
              ref={userInputRef}
              name="name"
              icon="user"
              placeholder="Usuário"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={() => {
                emailInputRef.current?.focus()
              }}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              name="email"
              icon="mail"
              placeholder="E-mail"
              onSubmitEditing={() => {
                oldPasswordInputRef.current?.focus()
              }}
            />

            <Input
              ref={oldPasswordInputRef}
              name="old_password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              secureTextEntry
              textContentType="newPassword"
              containerStyle={{ marginTop: 16 }}
              onSubmitEditing={() => {
                passwordInputRef.current?.focus()
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              secureTextEntry
              textContentType="newPassword"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current?.focus()
              }}
            />
            <Input
              ref={passwordConfirmationInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar de senha"
              returnKeyType="send"
              secureTextEntry
              textContentType="newPassword"
              onSubmitEditing={() => {
                formRef.current?.submitForm()
              }}
            />

            <Button onPress={() => { formRef.current?.submitForm() }}>Confirmar Mudanças</Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Profile;
