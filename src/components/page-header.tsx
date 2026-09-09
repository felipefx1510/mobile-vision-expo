import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  showBell?: boolean;
};

export function PageHeader({ eyebrow, title, showBell = false }: PageHeaderProps) {
  return (
    <View className="mb-7 mt-5 flex-row items-center justify-between">
      <View>
        <Text className="mb-1 text-xs font-bold uppercase tracking-[2px] text-vision-deep">{eyebrow}</Text>
        <Text className="text-[30px] font-black tracking-[-1.4px] text-vision-black">{title}</Text>
      </View>
      {showBell ? (
        <Pressable
          accessibilityLabel="Abrir notificações"
          className="relative h-12 w-12 items-center justify-center rounded-2xl border border-vision-line bg-white active:scale-95">
          <Icon name={{ ios: 'bell.fill', android: 'notifications', web: 'notifications' }} size={20} />
          <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-vision-green" />
        </Pressable>
      ) : null}
    </View>
  );
}
