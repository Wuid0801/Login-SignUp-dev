import { Button } from '@/components/ui/button';
import {
    CardBox
} from '@/components/ui/card';
import {
    FormBox
} from '@/components/ui/form';

// import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
    SelectBox
} from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { formSchema } from '../validate/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type SignupInput = z.infer<typeof formSchema>;
function SignUp() {
    const [isPasswordStep, setisPasswordStep] = useState(false);
    // const {
    //     control,
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<SignupInput>();

    const onSubmit: SubmitHandler<SignupInput> = (values) => {
        console.log('data');
        console.log(values);
    };
    const form = useForm<SignupInput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            Email: '',
            Name: '',
            Password: '',
            CallNumber: '',
            Framework: '',
        },
    });

    return (
        <div className='grid place-items-center py-8'>
            <CardBox.Card className="w-[350px] min-h-[500px] z-1">
                <CardBox.CardHeader>
                    <CardBox.CardTitle>계정을 생성합니다</CardBox.CardTitle>
                    <CardBox.CardDescription>필수 정보를 입력해볼게요</CardBox.CardDescription>
                </CardBox.CardHeader>
                <CardBox.CardContent>
                    <FormBox.Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <motion.div
                                className="grid w-full items-center gap-4"
                                initial={{ opacity: 0, x: -100 }} // 초기 상태
                                animate={{ opacity: 1, x: 0 }} // 애니메이션 후 상태
                                transition={{ duration: 0.5 }} // 애니메이션 지속 시간
                            >
                                {!isPasswordStep ? (
                                    <div className="grid w-full items-center gap-4">
                                        <FormBox.FormField
                                            control={form.control}
                                            name="Name"
                                            render={({ field }) => (
                                                <FormBox.FormItem>
                                                    <FormBox.FormLabel>이름</FormBox.FormLabel>
                                                    <FormBox.FormControl>
                                                        <Input placeholder="홍길동" {...field} />
                                                    </FormBox.FormControl>
                                                    <FormBox.FormMessage />
                                                </FormBox.FormItem>
                                            )}
                                        />

                                        <FormBox.FormField
                                            control={form.control}
                                            name="Email"
                                            render={({ field }) => (
                                                <FormBox.FormItem>
                                                    <FormBox.FormLabel>이메일</FormBox.FormLabel>
                                                    <FormBox.FormControl>
                                                        <Input
                                                            placeholder="hello@sparta-devcamp.com"
                                                            {...field}
                                                        />
                                                    </FormBox.FormControl>
                                                    <FormBox.FormMessage />
                                                </FormBox.FormItem>
                                            )}
                                        />
                                        <FormBox.FormField
                                            control={form.control}
                                            name="CallNumber"
                                            render={({ field }) => (
                                                <FormBox.FormItem>
                                                    <FormBox.FormLabel>연락처</FormBox.FormLabel>
                                                    <FormBox.FormControl>
                                                        <Input
                                                            placeholder="01000000000"
                                                            {...field}
                                                        />
                                                    </FormBox.FormControl>
                                                    <FormBox.FormMessage />
                                                </FormBox.FormItem>
                                            )}
                                        />

                                        <FormBox.FormField
                                            control={form.control}
                                            name="Framework"
                                            render={({ field }) => (
                                                <FormBox.FormItem>
                                                    <FormBox.FormLabel>역할</FormBox.FormLabel>
                                                    <SelectBox.Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormBox.FormControl>
                                                            <SelectBox.SelectTrigger>
                                                                <SelectBox.SelectValue placeholder="역할을 선택해주세요" />
                                                            </SelectBox.SelectTrigger>
                                                        </FormBox.FormControl>
                                                        <SelectBox.SelectContent>
                                                            <SelectBox.SelectItem value="admin">
                                                                관리자
                                                            </SelectBox.SelectItem>
                                                            <SelectBox.SelectItem value="user">
                                                                일반사용자
                                                            </SelectBox.SelectItem>
                                                        </SelectBox.SelectContent>
                                                    </SelectBox.Select>
                                                    <FormBox.FormMessage />
                                                </FormBox.FormItem>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <FormBox.FormField
                                        control={form.control}
                                        name="Password"
                                        render={({ field }) => (
                                            <FormBox.FormItem>
                                                <FormBox.FormLabel>비밀번호</FormBox.FormLabel>
                                                <FormBox.FormControl>
                                                    <Input placeholder="비밀번호 입력" type={"password"} {...field} />
                                                </FormBox.FormControl>
                                                <FormBox.FormMessage />
                                            </FormBox.FormItem>
                                        )}
                                    />
                                )}
                            </motion.div>
                            <CardBox.CardFooter className="gap-4">
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        form.trigger(['Name', 'Email', 'CallNumber', 'Framework']);
                                        const phoneState = form.getFieldState('CallNumber');
                                        const emailState = form.getFieldState('Email');
                                        const usernameState = form.getFieldState('Name');
                                        const roleState = form.getFieldState('Framework');
                                        console.log('Phone State:', phoneState);
                                        console.log('Email State:', emailState);
                                        console.log('Username State:', usernameState);
                                        console.log('Role State:', roleState);
                                        if (!phoneState.isDirty || phoneState.invalid) return;
                                        if (!emailState.isDirty || emailState.invalid) return;
                                        if (!usernameState.isDirty || usernameState.invalid) return;
                                        if (!roleState.isDirty || roleState.invalid) return;
                                        setisPasswordStep(true);
                                    }}
                                >
                                    다음 단계로
                                </Button>
                                {isPasswordStep && <Button type="submit"
                                onClick={() => {
                                    setisPasswordStep(false);
                                    form.setValue('Password', '');
                                }}
                                >이전 단계로</Button>}
                            </CardBox.CardFooter>
                        </form>
                    </FormBox.Form>
                </CardBox.CardContent>
            </CardBox.Card>
        </div>
    );
}

export default SignUp;
