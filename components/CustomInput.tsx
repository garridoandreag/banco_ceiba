import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';

interface CustomInput {
    control: Control<z.infer<typeof authFormSchema>>,
    name: FieldPath<z.infer<typeof authFormSchema>>,
    label: string,
    type: string,
    placeholder: string
}

const CustomInput = ({control, name, label, type, placeholder}: CustomInput) => {
  return (
    <FormField
              control={control}
              name={name}
              render={({ field }) => (
               <FormItem className="form-item">
                    <FormLabel className="form-label">
                       {label}
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input placeholder={placeholder} className="input-class"
                            type={type}
                            {...field}/>
                        </FormControl>
                        <FormMessage className="form-message"/>
                    </div>
                </FormItem>
              )}
            />
  )
}

export default CustomInput