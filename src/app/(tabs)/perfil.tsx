import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, Switch, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { AppButton } from '@/components/ui/button';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  // Preferências de Acessibilidade (WCAG)
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [showA11yModal, setShowA11yModal] = useState(false);

  const handleSignOut = () => {
    Alert.alert('Sair da conta?', 'Você poderá entrar novamente quando quiser.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          signOut();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <Screen>
      <View className="mt-5 flex-row items-center justify-between">
        <View>
          <Text className="text-xs font-bold uppercase tracking-[2px] text-vision-deep">
            Sua jornada
          </Text>
          <Text className="mt-1 text-[30px] font-black tracking-[-1.4px] text-vision-black">
            Perfil
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ajustes de Acessibilidade"
          hitSlop={12}
          onPress={() => setShowA11yModal(true)}
          className="h-12 w-12 items-center justify-center rounded-2xl border border-vision-line bg-white active:bg-vision-light">
          <Icon name={{ ios: 'figure.walk.circle', android: 'accessibility', web: 'accessibility' }} size={22} />
        </Pressable>
      </View>

      <View className="mt-8 items-center">
        <View className="h-24 w-24 items-center justify-center rounded-[32px] bg-vision-black shadow-md">
          <View className="absolute -right-2 -top-2 h-7 w-7 items-center justify-center rounded-full border-4 border-vision-light bg-vision-green">
            <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} />
          </View>
          <Text className="text-3xl font-black text-vision-green">A</Text>
        </View>
        <Text className="mt-4 text-2xl font-black tracking-[-0.8px] text-vision-black">
          {user?.name ?? 'Ana Souza'}
        </Text>
        <Text className="mt-1 text-sm text-vision-gray">{user?.email}</Text>
        <View className="mt-3 rounded-full bg-vision-green/20 px-3 py-1.5">
          <Text className="text-[10px] font-black uppercase tracking-[1.4px] text-vision-deep">
            Foco: Medicina ENEM
          </Text>
        </View>
      </View>

      <View className="mt-8 flex-row overflow-hidden rounded-[26px] border border-vision-line bg-white shadow-sm">
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">42h</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">
            Estudadas
          </Text>
        </View>
        <View className="w-px bg-vision-line" />
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">1.284</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">
            Questões
          </Text>
        </View>
        <View className="w-px bg-vision-line" />
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">18</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">
            Dias Seguidos
          </Text>
        </View>
      </View>

      <SectionTitle title="Meta semanal" action="Editar" onPress={() => router.push('/onboarding')} />
      <View className="rounded-[26px] bg-vision-black p-5 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-white/45">
              Tempo de estudo
            </Text>
            <Text className="mt-2 text-xl font-black text-white">
              7h 30min <Text className="text-sm text-white/40">/ 10h</Text>
            </Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-vision-green">
            <Icon name={{ ios: 'target', android: 'track_changes', web: 'track_changes' }} size={23} />
          </View>
        </View>
        <View className="mt-5"><ProgressBar value={75} dark /></View>
        <View className="mt-4 flex-row justify-between">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
            <View key={`${day}-${index}`} className="items-center gap-2">
              <View
                className={`h-7 w-7 items-center justify-center rounded-full ${
                  index < 5 ? 'bg-vision-green' : 'bg-white/10'
                }`}>
                {index < 5 ? <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} /> : null}
              </View>
              <Text className="text-[9px] font-bold text-white/40">{day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Seção de Acessibilidade & Preferências */}
      <SectionTitle title="Acessibilidade & Sistema" action="Ajustar" onPress={() => setShowA11yModal(true)} />
      <View className="overflow-hidden rounded-[26px] border border-vision-line bg-white px-4 shadow-sm">
        <View className="flex-row items-center justify-between py-3.5 border-b border-vision-line">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-vision-light">
              <Icon name={{ ios: 'circle.lefthalf.filled', android: 'contrast', web: 'contrast' }} size={18} />
            </View>
            <View>
              <Text className="text-sm font-bold text-vision-black">Alto Contraste</Text>
              <Text className="text-xs text-vision-gray">WCAG AAA (Razão 7:1)</Text>
            </View>
          </View>
          <Switch
            accessibilityLabel="Ativar alto contraste"
            value={highContrast}
            onValueChange={setHighContrast}
            trackColor={{ false: palette.line, true: palette.green }}
            thumbColor={palette.black}
          />
        </View>

        <View className="flex-row items-center justify-between py-3.5 border-b border-vision-line">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-vision-light">
              <Icon name={{ ios: 'figure.walk.motion', android: 'directions_walk', web: 'directions_walk' }} size={18} />
            </View>
            <View>
              <Text className="text-sm font-bold text-vision-black">Redução de Movimento</Text>
              <Text className="text-xs text-vision-gray">Pausa transições e animações</Text>
            </View>
          </View>
          <Switch
            accessibilityLabel="Ativar redução de movimento"
            value={reduceMotion}
            onValueChange={setReduceMotion}
            trackColor={{ false: palette.line, true: palette.green }}
            thumbColor={palette.black}
          />
        </View>

        <View className="flex-row items-center justify-between py-3.5">
          <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-vision-light">
              <Icon name={{ ios: 'textformat.size', android: 'format_size', web: 'format_size' }} size={18} />
            </View>
            <View>
              <Text className="text-sm font-bold text-vision-black">Texto Ampliado</Text>
              <Text className="text-xs text-vision-gray">Aumenta legibilidade</Text>
            </View>
          </View>
          <Switch
            accessibilityLabel="Ativar texto ampliado"
            value={largerText}
            onValueChange={setLargerText}
            trackColor={{ false: palette.line, true: palette.green }}
            thumbColor={palette.black}
          />
        </View>
      </View>

      {/* Botão de Logout Acessível */}
      <View className="mt-6 mb-8">
        <AppButton
          variant="danger"
          size="md"
          fullWidth
          title="Sair da Conta"
          icon={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }}
          iconPosition="left"
          onPress={handleSignOut}
        />
      </View>

      {/* Modal de Acessibilidade */}
      <Modal visible={showA11yModal} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/60 px-5">
          <View className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <View className="flex-row items-center gap-2 mb-3">
              <Icon name={{ ios: 'accessibility', android: 'accessibility_new', web: 'accessibility_new' }} color={palette.greenDeep} size={22} />
              <Text className="text-lg font-black text-vision-black">
                Recursos de Acessibilidade
              </Text>
            </View>
            <Text className="text-xs leading-5 text-vision-gray mb-4">
              O Vision segue as diretrizes internacionais WCAG 2.0 / 2.2 Nível AA, garantindo contraste mínimo de 4.5:1, áreas de toque de pelo menos 44x44px e compatibilidade total com leitores de tela.
            </Text>
            <AppButton
              variant="secondary"
              size="sm"
              fullWidth
              title="Entendido"
              onPress={() => setShowA11yModal(false)}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
