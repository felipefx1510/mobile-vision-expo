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
import { mockExams } from '@/data/study';

const filters = ['Todos', 'ENEM', 'Por matéria'];

export default function MockExamsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredExams = mockExams.filter((exam) => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'ENEM') return exam.category === 'ENEM';
    if (activeFilter === 'Por matéria') return exam.category === 'Matéria';
    return true;
  });

  return (
    <Screen header={<PageHeader eyebrow="Pratique com estratégia" title="Simulados" showBell />}>
      {/* Banner de Destaque da Semana */}
      <View className="overflow-hidden rounded-[30px] bg-vision-black p-5 shadow-md">
        <View className="absolute -right-8 -top-16 h-48 w-48 rounded-full border-[24px] border-vision-green/10" />
        <View className="self-start rounded-full bg-vision-green px-3 py-1.5">
          <Text className="text-[10px] font-black uppercase tracking-[1.3px] text-vision-black">
            Destaque da semana
          </Text>
        </View>
        <Text className="mt-5 max-w-[260px] text-[26px] font-black leading-8 tracking-[-1.1px] text-white">
          Simulado ENEM completo
        </Text>
        <Text className="mt-2 max-w-[260px] text-xs leading-5 text-white/50">
          90 questões • Ciências Humanas e Linguagens
        </Text>
        <View className="mt-7 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon
              name={{ ios: 'calendar', android: 'event', web: 'event' }}
              color={palette.green}
              size={17}
            />
            <Text className="text-xs font-bold text-white">Disponível agora</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Iniciar Simulado ENEM completo"
            onPress={() => router.push('/simulado/enem-1')}
            className="min-h-[44px] justify-center rounded-2xl bg-vision-green px-5 py-2.5 active:scale-95">
            <Text className="text-xs font-black text-vision-black">Iniciar Prova</Text>
          </Pressable>
        </View>
      </View>

      {/* Filtros de Categoria */}
      <View className="mt-6 flex-row gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Filtrar por ${filter}`}
              onPress={() => setActiveFilter(filter)}
              className={`min-h-[44px] items-center justify-center rounded-full border px-4 py-2.5 ${
                active
                  ? 'border-vision-black bg-vision-black'
                  : 'border-vision-line bg-white'
              }`}>
              <Text
                className={`text-xs font-bold ${
                  active ? 'text-white' : 'text-vision-gray'
                }`}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <SectionTitle title="Disponíveis para você" action="Histórico" />

      {/* Lista ou Estado Vazio */}
      {filteredExams.length === 0 ? (
        <FeedbackState
          type="empty"
          title="Nenhum simulado nesta categoria"
          description="Alterne o filtro para conferir as demais provas disponíveis."
          actionLabel="Ver Todos os Simulados"
          onAction={() => setActiveFilter('Todos')}
        />
      ) : (
        <View className="gap-3">
          {filteredExams.map((exam, index) => (
            <Pressable
              key={exam.id}
              accessibilityRole="button"
              accessibilityLabel={`Simulado ${exam.title}, ${exam.subtitle}, toque para iniciar`}
              onPress={() => router.push(`/simulado/${exam.id}`)}
              className="rounded-[26px] border border-vision-line bg-white p-4 active:scale-[0.99] shadow-sm">
              <View className="flex-row items-start">
                <View
                  className={`h-14 w-14 items-center justify-center rounded-2xl ${
                    index === 0
                      ? 'bg-vision-green'
                      : index === 1
                      ? 'bg-[#FFD7A8]'
                      : 'bg-[#D8C8FF]'
                  }`}>
                  <Icon
                    name={
                      index === 1
                        ? { ios: 'function', android: 'functions', web: 'functions' }
                        : { ios: 'doc.text.fill', android: 'quiz', web: 'quiz' }
                    }
                    size={24}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-base font-extrabold text-vision-black">
                    {exam.title}
                  </Text>
                  <Text className="mt-0.5 text-xs text-vision-gray">
                    {exam.subtitle}
                  </Text>
                  <View className="mt-3 flex-row flex-wrap gap-2">
                    <View className="rounded-full bg-vision-light px-2.5 py-1">
                      <Text className="text-[10px] font-bold text-vision-gray">
                        {exam.questions} questões
                      </Text>
                    </View>
                    <View className="rounded-full bg-vision-light px-2.5 py-1">
                      <Text className="text-[10px] font-bold text-vision-gray">
                        {exam.duration}
                      </Text>
                    </View>
                    <View className="rounded-full bg-vision-light px-2.5 py-1">
                      <Text className="text-[10px] font-bold text-vision-gray">
                        {exam.level}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="h-9 w-9 items-center justify-center rounded-full bg-vision-light">
                  <Icon
                    name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                    color={palette.gray}
                    size={16}
                  />
                </View>
              </View>
              {exam.progress > 0 ? (
                <View className="mt-4 border-t border-vision-line pt-4">
                  <View className="mb-2 flex-row justify-between">
                    <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-deep">
                      Em andamento
                    </Text>
                    <Text className="text-xs font-bold text-vision-gray">
                      {exam.progress}%
                    </Text>
                  </View>
                  <ProgressBar value={exam.progress} />
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
      )}

      {/* Estatísticas Rápidas */}
      <SectionTitle title="Seu desempenho geral" />
      <View className="flex-row gap-3">
        <View className="flex-1 rounded-[22px] bg-vision-green p-4 shadow-sm">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-vision-black/60">
            Média geral TRI
          </Text>
          <Text className="mt-2 text-3xl font-black tracking-[-1px] text-vision-black">
            760
          </Text>
          <Text className="mt-1 text-[11px] font-bold text-vision-black/70">
            ↑ 28 pts este mês
          </Text>
        </View>
        <View className="flex-1 rounded-[22px] bg-vision-black p-4 shadow-sm">
          <Text className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            Simulados Feitos
          </Text>
          <Text className="mt-2 text-3xl font-black tracking-[-1px] text-white">
            12
          </Text>
          <Text className="mt-1 text-[11px] font-bold text-vision-green">
            3 nesta semana
          </Text>
        </View>
      </View>
    </Screen>
  );
}
