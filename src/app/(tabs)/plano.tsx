import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PageHeader } from '@/components/page-header';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { SectionTitle } from '@/components/section-title';
import { FeedbackState } from '@/components/ui/feedback-state';
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
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('08');
  const [completed, setCompleted] = useState<string[]>(['1']);

  const toggleTask = (id: string) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const isAllDone = completed.length === todayTasks.length;

  return (
    <Screen header={<PageHeader eyebrow="Sua rota personalizada" title="Plano de estudos" />}>
      {/* Navegação entre Semanas */}
      <View className="flex-row items-center justify-between rounded-2xl border border-vision-line bg-white px-4 py-3">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Semana anterior"
          hitSlop={12}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-vision-light active:bg-vision-line">
          <Icon name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} size={18} />
        </Pressable>
        <View className="items-center">
          <Text className="text-sm font-extrabold text-vision-black">07 — 13 de setembro</Text>
          <Text className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-vision-gray">Semana 18</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Próxima semana"
          hitSlop={12}
          className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-vision-light active:bg-vision-line">
          <Icon name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={18} />
        </Pressable>
      </View>

      {/* Seletor de Dias da Semana */}
      <View className="mt-4 flex-row justify-between gap-2">
        {week.map((item) => {
          const selected = item.date === selectedDate;
          return (
            <Pressable
              key={item.date}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`${item.day}, dia ${item.date}`}
              onPress={() => setSelectedDate(item.date)}
              className={`min-h-[50px] flex-1 items-center rounded-2xl py-3 active:scale-95 ${
                selected ? 'bg-vision-black' : 'border border-vision-line bg-white'
              }`}>
              <Text className={`text-[9px] font-bold tracking-wider ${selected ? 'text-vision-green' : 'text-vision-gray'}`}>
                {item.day}
              </Text>
              <Text className={`mt-1 text-lg font-black ${selected ? 'text-white' : 'text-vision-black'}`}>
                {item.date}
              </Text>
              {selected ? <View className="mt-1 h-1.5 w-1.5 rounded-full bg-vision-green" /> : <View className="mt-1 h-1.5 w-1.5" />}
            </Pressable>
          );
        })}
      </View>

      {/* Resumo do Progresso Semanal */}
      <View className="mt-5 rounded-[26px] bg-vision-green p-5 shadow-sm">
        <View className="flex-row items-start justify-between">
          <View className="max-w-[68%]">
            <Text className="text-[10px] font-bold uppercase tracking-[1.5px] text-vision-black/60">
              Progresso semanal
            </Text>
            <Text className="mt-2 text-2xl font-black tracking-[-1px] text-vision-black">
              5 de 7 sessões
            </Text>
            <Text className="mt-1 text-xs leading-5 text-vision-black/65">
              Você está 12% acima do seu ritmo da semana passada.
            </Text>
          </View>
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-vision-black">
            <Icon
              name={{ ios: 'chart.line.uptrend.xyaxis', android: 'trending_up', web: 'trending_up' }}
              color={palette.green}
              size={24}
            />
          </View>
        </View>
        <View className="mt-5">
          <ProgressBar value={68} />
        </View>
      </View>

      {/* Banner de Feedback de Sucesso se Todas as Tarefas Forem Cumpridas */}
      {isAllDone ? (
        <View className="mt-5">
          <FeedbackState
            type="success"
            title="Meta do dia concluída com sucesso!"
            description="Parabéns! Você finalizou todas as 3 sessões planejadas para hoje."
            actionLabel="Fazer Simulado Rápido"
            onAction={() => router.push('/simulado/math-1')}
          />
        </View>
      ) : null}

      <SectionTitle title="Terça-feira, 08" action={`${completed.length}/${todayTasks.length} concluídas`} />
      <View className="gap-3">
        {todayTasks.map((task, index) => {
          const done = completed.includes(task.id);
          return (
            <View
              key={task.id}
              className={`rounded-[24px] border p-4 shadow-sm ${
                done ? 'border-vision-green bg-vision-green/10' : 'border-vision-line bg-white'
              }`}>
              <View className="flex-row items-center">
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: done }}
                  accessibilityLabel={`Marcar ${task.subject}: ${task.topic}`}
                  hitSlop={12}
                  onPress={() => toggleTask(task.id)}
                  className={`h-11 w-11 items-center justify-center rounded-2xl active:scale-90 ${
                    index === 0 ? 'bg-vision-green' : index === 1 ? 'bg-[#D8C8FF]' : 'bg-[#FFD7A8]'
                  }`}>
                  <Text className="text-xs font-black text-vision-black">
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir aula de ${task.subject}: ${task.topic}`}
                  onPress={() => router.push('/aula/1')}
                  className="ml-3 flex-1 active:opacity-70">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-deep">
                      {task.time} • {task.duration}
                    </Text>
                  </View>
                  <Text
                    className={`mt-1 text-[15px] font-extrabold ${
                      done ? 'text-vision-gray line-through' : 'text-vision-black'
                    }`}>
                    {task.subject}
                  </Text>
                  <Text className="mt-0.5 text-xs text-vision-gray">{task.topic} → Ver aula</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: done }}
                  hitSlop={12}
                  onPress={() => toggleTask(task.id)}
                  className={`min-h-[44px] min-w-[44px] items-center justify-center rounded-full ${
                    done ? 'bg-vision-green' : 'border-2 border-vision-line'
                  }`}>
                  {done ? (
                    <Icon name={{ ios: 'checkmark', android: 'check', web: 'check' }} size={16} />
                  ) : null}
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>

      {/* Recomendação da IA */}
      <SectionTitle title="Recomendação da Vision IA" />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/aula/1')}
        className="flex-row rounded-[24px] border border-vision-line bg-white p-4 active:scale-[0.99] shadow-sm">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-vision-black">
          <Icon
            name={{ ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' }}
            color={palette.green}
            size={22}
          />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-sm font-extrabold text-vision-black">Reforce funções quadráticas</Text>
          <Text className="mt-1 text-xs leading-5 text-vision-gray">
            Seus últimos exercícios mostram que uma revisão de 20 minutos pode elevar sua precisão. Toque para acessar a aula.
          </Text>
        </View>
      </Pressable>
    </Screen>
  );
}
