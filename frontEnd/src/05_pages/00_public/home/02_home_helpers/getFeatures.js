export const FEATURE_ICONS = ["📋", "📊", "📅", "🔔", "⚡", "📈"];

export const getFeatures = (t) =>
  Array.from({ length: 6 }, (_, i) => ({
    icon: FEATURE_ICONS[i],
    title: t(`feature${i + 1}Title`),
    desc: t(`feature${i + 1}Desc`),
  }));
