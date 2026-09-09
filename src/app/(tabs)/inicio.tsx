import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { palette } from '@/constants/design';
import { useAuth } from '@/context/auth-context';
import { subjectProgress, todayTasks } from '@/data/study';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Screen header={<PageHeader eyebrow="Terça, 08 de setembro" title={`Olá, ${user?.name ?? 'estudante'}!`} showBell />}>
      <View className="overflow-hidden rounded-[30px] bg-vision-black p-5">
        <View className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-vision-green/20" />
        <View className="absolute right-0 top-1 h-36 w-36 rounded-full border border-dashed border-white/10" />
        <View className="flex-row items-center justify-between">
          <View className="max-w-[58%]">
            <View className="mb-4 self-start rounded-full bg-vision-green/15 px-3 py-1.5">
              <Text className="text-[10px] font-bold uppercase tracking-[1.5px] text-vision-green">Meta ENEM 2026</Text>
            </View>
            <Text className="text-2xl font-black leading-7 tracking-[-1px] text-white">Sua semana está no ritmo certo.</Text>
            <Text className="mt-3 text-xs leading-5 text-white/50">5 de 7 sessões concluídas</Text>
          </View>
          <View className="h-28 w-28 items-center justify-center rounded-full border-[10px] border-white/10">
            <View className="absolute h-28 w-28 rotate-45 rounded-full border-[10px] border-vision-green border-l-transparent border-b-transparent" />
            <Text className="text-2xl font-black text-white">68%</Text>
            <Text className="text-[9px] font-bold uppercase tracking-wider text-white/45">da meta</Text>
          </View>
        </View>
      </View>

      <SectionTitle title="Continuar estudando" action="Ver plano" onPress={() => router.push('/plano')} />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/plano')}
        className="rounded-[26px] border border-vision-line bg-white p-4 active:scale-[0.99]">
        <View className="flex-row items-center">
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-vision-green">
            <Icon name={{ ios: 'function', android: 'functions', web: 'functions' }} size={28} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-[10px] font-bold uppercase tracking-[1.5px] text-vision-deep">Matemática • Aula 06</Text>
            <Text className="mt-1 text-base font-extrabold text-vision-black">Funções do 2º grau</Text>
            <View className="mt-3 flex-row items-center gap-3">
              <View className="flex-1"><ProgressBar value={72} /></View>
              <Text className="text-xs font-bold text-vision-gray">72%</Text>
            </View>
          </View>
          <View className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-vision-black">
            <Icon name={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }} color={palette.white} size={18} />
          </View>
        </View>
      </Pressable>

      <SectionTitle title="Agenda de hoje" action="Plano completo" onPress={() => router.push('/plano')} />
      <View className="overflow-hidden rounded-[26px] border border-vision-line bg-white px-4">
        {todayTasks.map((task, index) => (
          <View key={task.id} className={`flex-row items-center py-4 ${index !== todayTasks.length - 1 ? 'border-b border-vision-line' : ''}`}>
            <Text className="w-12 text-xs font-extrabold text-vision-gray">{task.time}</Text>
            <View className={`mr-3 h-10 w-1 rounded-full ${task.done ? 'bg-vision-green' : 'bg-vision-line'}`} />
            <View className="flex-1">
              <Text className={`text-sm font-extrabold ${task.done ? 'text-vision-gray line-through' : 'text-vision-black'}`}>{task.subject}</Text>
              <Text className="mt-0.5 text-xs text-vision-gray">{task.topic} • {task.duration}</Text>
            </View>
            <View className={`h-8 w-8 items-center justify-center rounded-full ${task.done ? 'bg-vision-green' : 'border border-vision-line bg-vision-light'}`}>
              <Icon
                name={task.done
                  ? { ios: 'checkmark', android: 'check', web: 'check' }
                  : { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                color={task.done ? palette.black : palette.gray}
                size={15}
              />
            </View>
          </View>
        ))}
      </View>

      <SectionTitle title="Desempenho por área" />
      <View className="flex-row flex-wrap gap-3">
        {subjectProgress.map((subject) => (
          <View key={subject.name} className="min-w-[46%] flex-1 rounded-[22px] border border-vision-line bg-white p-4">
            <View className="mb-5 h-3 w-3 rounded-full" style={{ backgroundColor: subject.color }} />
            <Text className="text-xs font-bold text-vision-gray">{subject.name}</Text>
            <Text className="mt-1 text-2xl font-black tracking-[-1px] text-vision-black">{subject.progress}%</Text>
            <View className="mt-3"><ProgressBar value={subject.progress} /></View>
          </View>
        ))}
      </View>
    </Screen>
  );
}
