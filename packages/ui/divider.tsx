import { P } from './typography';
import { cn } from './utils/cn';
import { View } from "./view";

interface DividerProps {
    className?: string;
    height?: number;
    middleLabel?: string;
}   

const Divider = ({ className, height = 1, middleLabel }: DividerProps) => {

    const renderDivider = () => {

        return (
            <View className={cn("flex-1 bg-border", className)} style={{ height }} />
        );
    }

   if(!middleLabel) {
    return renderDivider();
   }

   return (
     <View className={cn("w-full flex-row flex items-center gap-3", className)}>
       {renderDivider()}
       <P className="text-center text-sm text-placeholder font-mont">
         {middleLabel}
       </P>
       {renderDivider()}
     </View>
   );

};

export default Divider;