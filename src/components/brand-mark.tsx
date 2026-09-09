import { Text, View } from 'react-native';

type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className={`${compact ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl'} items-center justify-center bg-vision-green`}>
        <View className="absolute h-5 w-5 rotate-45 rounded-[6px] border-2 border-vision-black" />
        <View className="h-2.5 w-2.5 rounded-full bg-vision-black" />
      </View>
      <Text className={`${compact ? 'text-base' : 'text-xl'} font-black tracking-[4px] ${inverse ? 'text-white' : 'text-vision-black'}`}>
        VISION
      </Text>
    </View>
  );
}
