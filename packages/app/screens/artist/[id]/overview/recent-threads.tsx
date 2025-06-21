import { SectionTitle } from "@/ui/typography";
import { View } from "@/ui/view";
import { useTranslation } from "@/utils/i18n";

const RecentThreads = () => {
  const { t } = useTranslation("artist");

  return (
    <View className="flex flex-col gap-4">
      <SectionTitle>{t("recentFeeds")}</SectionTitle>
      <View className="flex flex-col bg-card rounded-lg p-4">
        <View className="flex flex-row items-center gap-2">
          <View className="bg-primary rounded-full w-8 h-8"></View>
          <View className="flex flex-col bg-gray-100 rounded-lg p-2 relative">
            <span className="text-sm text-gray-500">메시지 내용</span>
            <View className="absolute left-[-10px] bottom-0 transform translate-y-[100%] w-0 h-0 border-t-[10px] border-t-gray-100 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent"></View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecentThreads;
