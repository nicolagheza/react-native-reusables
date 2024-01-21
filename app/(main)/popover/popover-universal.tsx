import React from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonText } from '~/components/universal-ui/button';
import { Input } from '~/components/universal-ui/input';
import { Label, LabelText } from '~/components/universal-ui/label';
import {
  Popover,
  PopoverContent,
  PopoverText,
  PopoverTrigger,
} from '~/components/universal-ui/popover';

export default function PopoverUniversalScreen() {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <ButtonText>Open popover</ButtonText>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={Platform.OS === 'web' ? 'bottom' : 'top'}
          insets={contentInsets}
          className='w-80'
        >
          <View className='web:grid gap-4'>
            <View className='space-y-2'>
              <PopoverText className='font-medium leading-none native:text-xl'>
                Dimensions
              </PopoverText>
              <Text className='text-sm text-muted-foreground'>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View className='web:grid gap-2'>
              <LabelledInput autoFocus id='width' label='Width' />
              <LabelledInput id='maxWidth' label='Max. Width' />
              <LabelledInput id='height' label='Height' />
              <LabelledInput id='maxHeight' label='Max. Height' />
            </View>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}

function LabelledInput({
  id,
  label,
  autoFocus = false,
}: {
  id: string;
  label: string;
  autoFocus?: boolean;
}) {
  const inputRef = React.useRef<React.ElementRef<typeof Input>>(null);

  function onPress() {
    inputRef.current?.focus();
  }

  return (
    <View className='web:grid web:grid-cols-3 flex-row items-center gap-4'>
      <Label onPress={onPress} className='w-24'>
        <LabelText nativeID={id}>{label}</LabelText>
      </Label>
      <Input
        ref={inputRef}
        autoFocus={autoFocus}
        aria-labelledby={id}
        defaultValue='25px'
        className='web:col-span-2 flex-1 h-8'
      />
    </View>
  );
}
