import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  header?: ReactNode;
  scroll?: boolean;
}>;

export function Screen({ children, header, scroll = true }: ScreenProps) {
  const body = (
    <View className="w-full max-w-xl flex-1 self-center px-5">
      {header}
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-vision-light" edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow pb-32"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {body}
        </ScrollView>
      ) : body}
    </SafeAreaView>
  );
}
