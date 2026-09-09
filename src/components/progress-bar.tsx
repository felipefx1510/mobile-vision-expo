import { View } from 'react-native';

type ProgressBarProps = {
  value: number;
  dark?: boolean;
};

export function ProgressBar({ value, dark = false }: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, value));

  return (
    <View className={`h-2 overflow-hidden rounded-full ${dark ? 'bg-white/15' : 'bg-vision-black/10'}`}>
      <View className="h-full rounded-full bg-vision-green" style={{ width: `${percentage}%` }} />
    </View>
  );
}
