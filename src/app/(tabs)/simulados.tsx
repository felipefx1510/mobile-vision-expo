import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { palette } from '@/constants/design';
import { mockExams } from '@/data/study';

const filters = ['Todos', 'ENEM', 'Por matéria'];

export default function MockExamsScreen() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  return (
    <Screen header={<PageHeader eyebrow="Pratique com estratégia" title="Simulados" showBell />}>
      <View className="overflow-hidden rounded-[30px] bg-vision-black p-5">
        <View className="absolute -right-8 -top-16 h-48 w-48 rounded-full border-[24px] border-vision-green/10" />
        <View className="self-start rounded-full bg-vision-green px-3 py-1.5">
          <Text className="text-[10px] font-black uppercase tracking-[1.3px] text-vision-black">Destaque da semana</Text>
        </View>
        <Text className="mt-5 max-w-[260px] text-[26px] font-black leading-8 tracking-[-1.1px] text-white">Simulado ENEM completo</Text>
        <Text className="mt-2 max-w-[260px] text-xs leading-5 text-white/50">90 questões • Ciências Humanas e Linguagens</Text>
        <View className="mt-7 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon name={{ ios: 'calendar', android: 'event', web: 'event' }} color={palette.green} size={17} />
            <Text className="text-xs font-bold text-white">Domingo, 09:00</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => Alert.alert('Inscrição confirmada', 'Você receberá um lembrete antes do simulado.')}
            className="rounded-2xl bg-vision-green px-4 py-3 active:scale-95">
            <Text className="text-xs font-black text-vision-black">Participar</Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-6 flex-row gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2.5 ${active ? 'border-vision-black bg-vision-black' : 'border-vision-line bg-white'}`}>
              <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-vision-gray'}`}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Disponíveis para você" action="Histórico" />
      <View className="gap-3">
        {mockExams.map((exam, index) => (
          <Pressable
            key={exam.id}
            accessibilityRole="button"
            onPress={() => Alert.alert(exam.progress > 0 ? 'Continuar simulado' : 'Iniciar simulado', exam.title)}
            className="rounded-[26px] border border-vision-line bg-white p-4 active:scale-[0.99]">
            <View className="flex-row items-start">
              <View className={`h-14 w-14 items-center justify-center rounded-2xl ${index === 0 ? 'bg-vision-green' : index === 1 ? 'bg-[#FFD7A8]' : 'bg-[#D8C8FF]'}`}>
                <Icon
                  name={index === 1
                    ? { ios: 'function', android: 'functions', web: 'functions' }
                    : { ios: 'doc.text.fill', android: 'quiz', web: 'quiz' }}
                  size={24}
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-base font-extrabold text-vision-black">{exam.title}</Text>
                <Text className="mt-0.5 text-xs text-vision-gray">{exam.subtitle}</Text>
                <View className="mt-3 flex-row flex-wrap gap-2">
                  <View className="rounded-full bg-vision-light px-2.5 py-1"><Text className="text-[10px] font-bold text-vision-gray">{exam.questions} questões</Text></View>
                  <View className="rounded-full bg-vision-light px-2.5 py-1"><Text className="text-[10px] font-bold text-vision-gray">{exam.duration}</Text></View>
                  <View className="rounded-full bg-vision-light px-2.5 py-1"><Text className="text-[10px] font-bold text-vision-gray">{exam.level}</Text></View>
                </View>
              </View>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-vision-light">
                <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} color={palette.gray} size={16} />
              </View>
            </View>
            {exam.progress > 0 ? (
              <View className="mt-4 border-t border-vision-line pt-4">
                <View className="mb-2 flex-row justify-between">
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-deep">Em andamento</Text>
                  <Text className="text-xs font-bold text-vision-gray">{exam.progress}%</Text>
                </View>
                <ProgressBar value={exam.progress} />
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>

      <SectionTitle title="Seu desempenho" />
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-[22px] bg-vision-green p-4">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-black/55">Média geral</Text>
          <Text className="mt-2 text-3xl font-black tracking-[-1px] text-vision-black">76%</Text>
          <Text className="mt-1 text-[11px] font-bold text-vision-black/60">↑ 8% este mês</Text>
        </View>
        <View className="flex-1 rounded-[22px] bg-vision-black p-4">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-white/45">Realizados</Text>
          <Text className="mt-2 text-3xl font-black tracking-[-1px] text-white">12</Text>
          <Text className="mt-1 text-[11px] font-bold text-vision-green">3 neste mês</Text>
        </View>
      </View>
    </Screen>
  );
}
