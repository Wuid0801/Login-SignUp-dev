import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { formSchema } from './auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type LoginInput = z.infer<typeof formSchema>;
function Nav() {
    const [isPasswordStep, setisPasswordStep] = useState(false);
    // const {
    //     control,
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LoginInput>();

    const onSubmit: SubmitHandler<LoginInput> = (values) => {
        console.log('data');
        console.log(values);
    };
    const form = useForm<LoginInput>({
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
        <>
            <Card className="w-[350px] min-h-[500px]">
                <CardHeader>
                    <CardTitle>계정을 생성합니다</CardTitle>
                    <CardDescription>필수 정보를 입력해볼게요</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <motion.div
                                className="grid w-full items-center gap-4"
                                initial={{ opacity: 0, x: -100 }} // 초기 상태
                                animate={{ opacity: 1, x: 0 }} // 애니메이션 후 상태
                                transition={{ duration: 0.5 }} // 애니메이션 지속 시간
                            >
                                {!isPasswordStep ? (
                                    <div className="grid w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="Name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>이름</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="홍길동" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="Email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>이메일</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="hello@sparta-devcamp.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="CallNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>연락처</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="01000000000"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="Framework"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>역할</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="역할을 선택해주세요" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="admin">
                                                                관리자
                                                            </SelectItem>
                                                            <SelectItem value="user">
                                                                일반사용자
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="Password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>비밀번호</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="비밀번호 입력" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </motion.div>
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
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
}

export default Nav;
