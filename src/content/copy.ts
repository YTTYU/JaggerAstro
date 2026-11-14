// Copy in this file is transcribed verbatim from "сайт весь материал.pdf" and
// "сайт начальные блоки шаблон.pdf" (client-supplied source decks) — per explicit
// client instruction, wording is NOT paraphrased or "improved", including any
// typos present in the source (e.g. "нризкий", "Додступ"). Only the designer's
// own meta-notes to self (things like "Переформулировать", "УЖАТЬ по вертикали",
// "такой угол ракурс") were dropped, since those aren't site copy.
//
// Shape mirrors what a future Sanity document per section would look like:
// { kicker?, title, lead?, body: string[], bullets?: string[], stats?: {} }

export const hero = {
  kicker: 'Гусеничный вездеход-амфибия',
  model: 'P-4'
};

export const advantage = {
  id: 'advantage',
  kicker: 'Гусеничное превосходство',
  title: 'Новый класс транспортных средств высокой проходимости',
  body: [
    'База платформы позволяет быстро выпускать модификации с различными характеристиками и назначением, определяемыми на завершающем этапе сборки из заранее подготовленных узлов и подсборок.',
    'П-41 и последующие модификации являются полными преемниками ходовой, разработанной в рамках Проекта П-3 «Шишига на гусеницах». Основные доработки коснулись улучшения эксплуатационных качеств, отказоустойчивости, технологичности производства, эргономики и подготовки к дополнительному оснащению.',
  ],
};

export const keyHighlights = [
  { icon: 'gauge', value: '90', unit: 'км/ч', label: 'Скорость передвижения' },
  { icon: 'weight', value: '3 / 2', unit: 'т', label: 'Перевозка грузов: по суше / по воде' },
  { icon: 'users', value: '16', unit: 'чел.', label: 'Пассажировместимость' },
];

export const platformIntro = {
  id: 'platform-intro',
  kicker: 'Платформа-конструктор',
  title: 'Создан для тяжелых условий и корпоративной эксплуатации',
  body: [
    'П-4 платформа-конструктор для построения вездехода. Спроектирована таким образом, чтобы из одних и тех же заранее подготовленных подсборок можно было собирать различные по функционалу и задачам вездеходы, которые определяются на финальном этапе сборки.',
  ],
  note: 'Утилитарная инженерная машина для нефтегаза, геологоразведки, энергетики, лесной промышленности, строительства и служб реагирования',
};

export const platformVariants = {
  id: 'platform',
  title: 'Варианты исполнения',
  variants: [
    { key: 'single', label: 'Однорядная', image: 'single-cab', desc: 'Однорядная кабина' },
    { key: 'double', label: 'Двухрядная', image: 'double-cab', desc: 'Двухрядная кабина' },
    { key: 'box', label: 'Пассажирский', image: 'box-cab', desc: 'Пассажирский' },
  ],
};
