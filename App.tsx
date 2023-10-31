import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function verifyAvailableAuthentication() {
    const isCompatible = await LocalAuthentication.hasHardwareAsync();
    console.log(isCompatible);

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      types.map(type => LocalAuthentication.AuthenticationType[type]),
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log({ isBiometricEnrolled });

    if (!isBiometricEnrolled)
      return Alert.alert(
        'Login',
        'Nenhuma biometria encontrada, Por favor cadastre em seu dispositivo.',
      );

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com biometria',
      fallbackLabel: 'Biometria não reconhecida',
    });

    console.log(auth);
    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Usuário conectado: {isAuthenticated ? 'Sim' : 'Não'} </Text>
      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
