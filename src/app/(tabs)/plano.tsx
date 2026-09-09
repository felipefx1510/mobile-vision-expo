import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { palette } from '@/constants/design';
import { todayTasks } from '@/data/study';

const week = [
  { day: 'SEG', date: '07' },
  { day: 'TER', date: '08' },
  { day: 'QUA', date: '09' },
  { day: 'QUI', date: '10' },
  { day: 'SEX', date: '11' },
];

export default function StudyPlanScreen() {
  const [selectedDate, setSelectedDate] = useState('08');
  const [completed, setCompleted] = useState<string[]>(['1']);

  const toggleTask = (id: string) => {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <Screen header={<PageHeader eyebrow="Sua rota personalizada" title="Plano de estudos" />}>
      <View className="flex-row items-center justify-between rounded-2xl border border-vision-line bg-white px-4 py-3">
        <Pressable accessibilityLabel="Semana anterior" className="h-9 w-9 items-center justify-center rounded-full bg-vision-light">
          <Icon name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} size={18} />
        </Pressable>
        <View className="items-center">
          <Text className="text-sm font-extrabold text-vision-black">07 — 13 de setembro</Text>
          <Text className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-vision-gray">Semana 18</Text>
        </View>
        <Pressable accessibilityLabel="Próxima semana" className="h-9 w-9 items-center justify-center rounded-full bg-vision-light">
          <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={18} />
        </Pressable>
      </View>

      <View className="mt-4 flex-row justify-between gap-2">
        {week.map((item) => {
          const selected = item.date === selectedDate;
          return (
            <Pressable
              key={item.date}
              accessibilityRole="button"
              onPress={() => setSelectedDate(item.date)}
              className={`flex-1 items-center rounded-2xl py-3 ${selected ? 'bg-vision-black' : 'border border-vision-line bg-white'}`}>
              <Text className={`text-[9px] font-bold tracking-wider ${selected ? 'text-vision-green' : 'text-vision-gray'}`}>{item.day}</Text>
              <Text className={`mt-1 text-lg font-black ${selected ? 'text-white' : 'text-vision-black'}`}>{item.date}</Text>
              {selected ? <View className="mt-1 h-1.5 w-1.5 rounded-full bg-vision-green" /> : <View className="mt-1 h-1.5 w-1.5" />}
            </Pressable>
          );
        })}
      </View>

      <View className="mt-5 rounded-[26px] bg-vision-green p-5">
        <View className="flex-row items-start justify-between">
          <View className="max-w-[68%]">
            <Text className="text-[10px] font-bold uppercase tracking-[1.5px] text-vision-black/60">Progresso semanal</Text>
            <Text className="mt-2 text-2xl font-black tracking-[-1px] text-vision-black">5 de 7 sessões</Text>
            <Text className="mt-1 text-xs leading-5 text-vision-black/65">Você está 12% acima do seu ritmo da semana passada.</Text>
          </View>
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-vision-black">
            <Icon name={{ ios: 'chart.line.uptrend.xyaxis', android: 'trending_up', web: 'trending_up' }} color={palette.green} size={24} />
          </View>
        </View>
        <View className="mt-5"><ProgressBar value={68} /></View>
      </View>

      <SectionTitle title="Terça-feira, 08" action={`${completed.length}/3 concluídas`} />
      <View className="gap-3">
        {todayTasks.map((task, index) => {
          const done = completed.includes(task.id);
          return (
            <Pressable
              key={task.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: done }}
              onPress={() => toggleTask(task.id)}
              className={`rounded-[24px] border p-4 active:scale-[0.99] ${done ? 'border-vision-green bg-vision-green/10' : 'border-vision-line bg-white'}`}>
              <View className="flex-row items-center">
                <View className={`h-11 w-11 items-center justify-center rounded-2xl ${index === 0 ? 'bg-vision-green' : index === 1 ? 'bg-[#D8C8FF]' : 'bg-[#FFD7A8]'}`}>
                  <Text className="text-xs font-black text-vision-black">{String(index + 1).padStart(2, '0')}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-deep">{task.time} • {task.duration}</Text>
                  </View>
                  <Text className={`mt-1 text-[15px] font-extrabold ${done ? 'text-vision-gray line-through' : 'text-vision-black'}`}>{task.subject}</Text>
                  <Text className="mt-0.5 text-xs text-vision-gray">{task.topic}</Text>
                </View>
                <View className={`h-7 w-7 items-center justify-center rounded-full ${done ? 'bg-vision-green' : 'border-2 border-vision-line'}`}>
                  {done ? <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={14} /> : null}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Recomendação da Vision IA" />
      <View className="flex-row rounded-[24px] border border-vision-line bg-white p-4">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-vision-black">
          <Icon name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }} color={palette.green} size={22} />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-sm font-extrabold text-vision-black">Reforce geometria plana</Text>
          <Text className="mt-1 text-xs leading-5 text-vision-gray">Seus últimos exercícios mostram que uma revisão de 20 minutos pode elevar sua precisão.</Text>
        </View>
      </View>
    </Screen>
  );
}
