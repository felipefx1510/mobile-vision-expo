import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';
import { type LoginErrors, validateLogin } from '@/lib/validation';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Redirect href="/inicio" />;
  }

  const handleSubmit = async () => {
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await signIn(email.trim().toLowerCase());
    router.replace('/inicio');
  };

  return (
    <SafeAreaView className="flex-1 bg-vision-black">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="w-full max-w-xl flex-1 self-center px-5 pb-6 pt-4">
            <BrandMark inverse />

            <View className="mb-8 mt-12">
              <View className="mb-6 h-28 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
                <View className="absolute -right-3 -top-8 h-36 w-36 rounded-full border border-vision-green/40" />
                <View className="absolute right-7 top-1 h-28 w-28 rounded-full border border-dashed border-white/20" />
                <View className="absolute right-[72px] top-12 h-3 w-3 rounded-full bg-vision-green" />
                <View className="absolute bottom-0 left-0 h-1.5 w-2/3 bg-vision-green" />
                <View className="h-full justify-center px-5">
                  <Text className="text-[10px] font-bold uppercase tracking-[2.5px] text-vision-green">Seu próximo passo</Text>
                  <Text className="mt-2 max-w-[210px] text-xl font-extrabold leading-6 text-white">Estude com direção. Evolua com dados.</Text>
                </View>
              </View>

              <Text className="text-[34px] font-black tracking-[-1.6px] text-white">Bem-vindo de volta.</Text>
              <Text className="mt-2 text-[15px] leading-6 text-white/55">
                Entre para continuar a sua rota até a aprovação.
              </Text>
            </View>

            <View className="gap-5 rounded-[28px] bg-white p-5">
              <View>
                <Text className="mb-2 text-xs font-bold uppercase tracking-[1.4px] text-vision-gray">E-mail</Text>
                <View className={`h-14 flex-row items-center rounded-2xl border px-4 ${errors.email ? 'border-red-500 bg-red-50' : 'border-vision-line bg-vision-light'}`}>
                  <Icon name={{ ios: 'envelope', android: 'mail', web: 'mail' }} color={errors.email ? '#DC2626' : palette.gray} size={19} />
                  <TextInput
                    accessibilityLabel="E-mail"
                    autoCapitalize="none"
                    autoComplete="email"
                    className="ml-3 flex-1 text-[15px] text-vision-black"
                    keyboardType="email-address"
                    onChangeText={(value) => {
                      setEmail(value);
                      if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
                    }}
                    onSubmitEditing={() => undefined}
                    placeholder="voce@email.com"
                    placeholderTextColor="#92998D"
                    returnKeyType="next"
                    value={email}
                  />
                </View>
                {errors.email ? <Text className="ml-1 mt-1.5 text-xs font-medium text-red-600">{errors.email}</Text> : null}
              </View>

              <View>
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-xs font-bold uppercase tracking-[1.4px] text-vision-gray">Senha</Text>
                  <Pressable accessibilityRole="button" className="p-1">
                    <Text className="text-xs font-bold text-vision-deep">Esqueci minha senha</Text>
                  </Pressable>
                </View>
                <View className={`h-14 flex-row items-center rounded-2xl border px-4 ${errors.password ? 'border-red-500 bg-red-50' : 'border-vision-line bg-vision-light'}`}>
                  <Icon name={{ ios: 'lock', android: 'lock', web: 'lock' }} color={errors.password ? '#DC2626' : palette.gray} size={19} />
                  <TextInput
                    accessibilityLabel="Senha"
                    autoCapitalize="none"
                    className="ml-3 flex-1 text-[15px] text-vision-black"
                    onChangeText={(value) => {
                      setPassword(value);
                      if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
                    }}
                    onSubmitEditing={handleSubmit}
                    placeholder="Mínimo de 6 caracteres"
                    placeholderTextColor="#92998D"
                    returnKeyType="done"
                    secureTextEntry={!passwordVisible}
                    value={password}
                  />
                  <Pressable
                    accessibilityLabel={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    hitSlop={12}
                    onPress={() => setPasswordVisible((value) => !value)}>
                    <Icon
                      name={passwordVisible
                        ? { ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }
                        : { ios: 'eye', android: 'visibility', web: 'visibility' }}
                      color={palette.gray}
                      size={20}
                    />
                  </Pressable>
                </View>
                {errors.password ? <Text className="ml-1 mt-1.5 text-xs font-medium text-red-600">{errors.password}</Text> : null}
              </View>

              <Pressable
                accessibilityRole="button"
                className={`h-14 flex-row items-center justify-center rounded-2xl bg-vision-green active:scale-[0.98] ${submitting ? 'opacity-70' : ''}`}
                disabled={submitting}
                onPress={handleSubmit}>
                {submitting ? (
                  <ActivityIndicator color={palette.black} />
                ) : (
                  <>
                    <Text className="text-[15px] font-black text-vision-black">Entrar na Vision</Text>
                    <Text className="ml-3 text-xl font-bold text-vision-black">→</Text>
                  </>
                )}
              </Pressable>

              <Text className="text-center text-xs leading-5 text-vision-gray">
                Para testar, use qualquer e-mail válido e uma senha com 6 ou mais caracteres.
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/onboarding')}
                className="min-h-[44px] items-center justify-center py-2">
                <Text className="text-xs font-bold text-vision-gray">
                  Primeiro acesso? <Text className="text-vision-deep font-black underline">Configurar minhas metas</Text>
                </Text>
              </Pressable>
            </View>

            <Text className="mt-6 text-center text-[11px] leading-5 text-white/35">
              Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
