import { Pressable, Text, View } from 'react-native';

type SectionTitleProps = {
  title: string;
  action?: string;
  onPress?: () => void;
};

export function SectionTitle({ title, action, onPress }: SectionTitleProps) {
  return (
    <View className="mb-4 mt-8 flex-row items-center justify-between">
      <Text className="text-lg font-extrabold tracking-[-0.5px] text-vision-black">{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onPress} className="rounded-full px-2 py-1 active:opacity-60">
          <Text className="text-xs font-bold text-vision-deep">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
