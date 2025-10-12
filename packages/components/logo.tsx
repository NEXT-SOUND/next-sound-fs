import { View } from "@/ui/view";
import { Text } from "@/ui/text";
import { cn } from '@/ui/utils/cn';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo = ({ size = 'xl' }: LogoProps) => {
    return (
        <View className='flex flex-row items-baseline'>
            <Text className={cn('font-mont', size === 'sm' && 'text-sm', size === 'md' && 'text-md', size === 'lg' && 'text-lg', size === 'xl' && 'text-xl')}>in</Text>
            <Text className={cn('font-montBold text-xl', size === 'sm' && 'text-md', size === 'md' && 'text-lg', size === 'lg' && 'text-xl', size === 'xl' && 'text-2xl')}>Stage</Text>
        </View>
    )

}

export default Logo;