import { useRouter } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';

const menuItems = [
  { label: 'Editar perfil', icon: { ios: 'person.crop.circle', android: 'manage_accounts', web: 'manage_accounts' } as const },
  { label: 'Notificações', icon: { ios: 'bell', android: 'notifications', web: 'notifications' } as const },
  { label: 'Preferências de estudo', icon: { ios: 'slider.horizontal.3', android: 'tune', web: 'tune' } as const },
  { label: 'Ajuda e suporte', icon: { ios: 'questionmark.circle', android: 'help', web: 'help' } as const },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

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
          <Text className="text-xs font-bold uppercase tracking-[2px] text-vision-deep">Sua jornada</Text>
          <Text className="mt-1 text-[30px] font-black tracking-[-1.4px] text-vision-black">Perfil</Text>
        </View>
        <Pressable accessibilityLabel="Configurações" className="h-12 w-12 items-center justify-center rounded-2xl border border-vision-line bg-white">
          <Icon name={{ ios: 'gearshape.fill', android: 'settings', web: 'settings' }} size={21} />
        </Pressable>
      </View>

      <View className="mt-8 items-center">
        <View className="h-24 w-24 items-center justify-center rounded-[32px] bg-vision-black">
          <View className="absolute -right-2 -top-2 h-7 w-7 items-center justify-center rounded-full border-4 border-vision-light bg-vision-green">
            <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} />
          </View>
          <Text className="text-3xl font-black text-vision-green">A</Text>
        </View>
        <Text className="mt-4 text-2xl font-black tracking-[-0.8px] text-vision-black">{user?.name ?? 'Ana Souza'}</Text>
        <Text className="mt-1 text-sm text-vision-gray">{user?.email}</Text>
        <View className="mt-3 rounded-full bg-vision-green/20 px-3 py-1.5">
          <Text className="text-[10px] font-black uppercase tracking-[1.4px] text-vision-deep">Plano Vision</Text>
        </View>
      </View>

      <View className="mt-8 flex-row overflow-hidden rounded-[26px] border border-vision-line bg-white">
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">42h</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">Estudadas</Text>
        </View>
        <View className="w-px bg-vision-line" />
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">1.284</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">Questões</Text>
        </View>
        <View className="w-px bg-vision-line" />
        <View className="flex-1 items-center py-5">
          <Text className="text-2xl font-black text-vision-black">18</Text>
          <Text className="mt-1 text-[10px] font-bold uppercase tracking-wider text-vision-gray">Sequência</Text>
        </View>
      </View>

      <SectionTitle title="Meta semanal" action="Editar" />
      <View className="rounded-[26px] bg-vision-black p-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-[1.4px] text-white/45">Tempo de estudo</Text>
            <Text className="mt-2 text-xl font-black text-white">7h 30min <Text className="text-sm text-white/40">/ 10h</Text></Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-vision-green">
            <Icon name={{ ios: 'target', android: 'track_changes', web: 'track_changes' }} size={23} />
          </View>
        </View>
        <View className="mt-5"><ProgressBar value={75} dark /></View>
        <View className="mt-4 flex-row justify-between">
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
            <View key={`${day}-${index}`} className="items-center gap-2">
              <View className={`h-7 w-7 items-center justify-center rounded-full ${index < 5 ? 'bg-vision-green' : 'bg-white/10'}`}>
                {index < 5 ? <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={12} /> : null}
              </View>
              <Text className="text-[9px] font-bold text-white/40">{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <SectionTitle title="Conta e preferências" />
      <View className="overflow-hidden rounded-[26px] border border-vision-line bg-white px-4">
        {menuItems.map((item, index) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            className={`flex-row items-center py-4 active:opacity-60 ${index !== menuItems.length - 1 ? 'border-b border-vision-line' : ''}`}>
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-vision-light">
              <Icon name={item.icon} color={palette.gray} size={19} />
            </View>
            <Text className="ml-3 flex-1 text-sm font-bold text-vision-black">{item.label}</Text>
            <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} color={palette.gray} size={16} />
          </Pressable>
        ))}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSignOut}
        className="mt-5 h-14 flex-row items-center justify-center rounded-2xl border border-red-200 bg-red-50 active:scale-[0.99]">
        <Icon name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }} color="#DC2626" size={19} />
        <Text className="ml-2 text-sm font-extrabold text-red-600">Sair da conta</Text>
      </Pressable>
    </Screen>
  );
}
