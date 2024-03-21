import { CardBox } from '@/components/ui/card';
import { LoginSchema } from '@/validate/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormBox } from '@/components/ui/form';
import { Link } from 'react-router-dom';

type LoginInput = z.infer<typeof LoginSchema>;
function Login() {
    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            Email: '',
            Password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginInput> = (values) => {
        console.log('data');
        console.log(values);
    };
    return (
        <div>
            <CardBox.Card className="w-[350px] min-h-[500px] z-1">
                <CardBox.CardHeader>
                    <CardBox.CardTitle>로그인</CardBox.CardTitle>
                </CardBox.CardHeader>
                <CardBox.CardContent>
                    <FormBox.Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormBox.FormField
                                control={form.control}
                                name="Email"
                                render={({ field }) => (
                                    <FormBox.FormItem>
                                        <FormBox.FormLabel>Email</FormBox.FormLabel>
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
                                name="Password"
                                render={({ field }) => (
                                    <FormBox.FormItem>
                                        <FormBox.FormLabel>Password</FormBox.FormLabel>
                                        <FormBox.FormControl>
                                            <Input
                                                {...field}
                                                type={'password'}
                                                placeholder="비밀번호 입력"
                                            />
                                        </FormBox.FormControl>
                                        <FormBox.FormMessage />
                                    </FormBox.FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                로그인하기
                            </Button>
                        </form>
                    </FormBox.Form>
                    <div>
                        <div className="ma-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                            or
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                            아이디가 없나요? &nbsp;
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                회원가입
                            </Link>
                        </p>
                    </div>
                </CardBox.CardContent>
            </CardBox.Card>
        </div>
    );
}

export default Login;
