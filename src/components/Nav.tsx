import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {  useState } from 'react';
import { motion } from 'framer-motion';
enum FrameworkEnum {
    manager = 'manager',
    generalUser = 'generalUser',
}

interface IFormInput {
    Name: string;
    Email: string;
    Password: string;
    CallNumber: number;
    Framework: FrameworkEnum;
}

function Nav() {
    const [isPasswordStep, setisPasswordStep] = useState(false);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        setisPasswordStep(true);
    };

    return (
        <>
            <Card className="w-[350px] min-h-[500px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>계정을 생성합니다</CardTitle>
                        <CardDescription>필수 정보를 입력해볼게요</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="grid w-full items-center gap-4"
                            initial={{ opacity: 0, x: -100 }} // 초기 상태
                            animate={{ opacity: 1, x: 0 }} // 애니메이션 후 상태
                            transition={{ duration: 0.5 }} // 애니메이션 지속 시간
                        >
                            {!isPasswordStep ? (
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="Name">이름</Label>
                                        <Input
                                            {...register('Name', {
                                                minLength: 2,
                                                required: '이름은 2글자 이상이어야 합니다.',
                                            })}
                                            placeholder="홍길동"
                                        />
                                        <span>{errors?.Name?.message}</span>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="Email">이메일</Label>
                                        <Input
                                            {...register('Email', {
                                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                required: '올바른 이메일을 입력해주세요.',
                                            })}
                                            placeholder="hello@sparta-devcamp.com"
                                        />
                                        <span>{errors?.Email?.message}</span>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="CallNumber">연락처</Label>
                                        <Input
                                            {...register('CallNumber', {
                                                minLength: 11,
                                                maxLength: 11,
                                                pattern: /^[0-9]+$/,
                                                required: '연락처는 11자리여야 합니다.',
                                            })}
                                            placeholder="01000000000"
                                        />
                                        <span>{errors?.CallNumber?.message}</span>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="Framework">역할</Label>
                                        <Controller
                                            control={control}
                                            name="Framework"
                                            rules={{ required: '역할을 선택해주세요.' }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="역할을 선택해주세요" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="manager">
                                                            관리자
                                                        </SelectItem>
                                                        <SelectItem value="generalUser">
                                                            일반사용자
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <span> {errors?.Framework?.message}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="Password">비밀번호</Label>
                                        <Input
                                            type="Password"
                                            {...register('Password', {
                                                required: true,
                                                minLength: 6,
                                            })}
                                            placeholder="비밀번호 입력"
                                        />
                                        {errors?.Password && (
                                            <span>비밀번호는 최소 6자리 이상이어야 합니다.</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <Button type="submit">다음 단계로</Button>
                        {isPasswordStep ? (
                            <Button onClick={() => setisPasswordStep(false)}>이전 단계로</Button>
                        ) : null}
                    </CardFooter>
                </form>
            </Card>
        </>
    );
}

export default Nav;
