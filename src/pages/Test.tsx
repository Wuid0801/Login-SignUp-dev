import * as React from 'react';
import mockData from '@/data/db';
import { CardBox } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectBox } from '@/components/ui/select';
interface FixedAmountCoupon {
    type: string;
    amount: number;
    description: string;
}

interface PercentageCoupon {
    type: string;
    percentage: number;
    description: string;
}

type CouponType = FixedAmountCoupon | PercentageCoupon;

export default function CardWithForm() {
    const [selectedCoupon, setSelectedCoupon] = React.useState<CouponType | null>(null);

    const handleCouponSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCouponText = e.target.value;
        const selectedCoupon = mockData.coupons.find(
            (coupon) => coupon.description === selectedCouponText,
        );
        console.log(selectedCoupon);
        setSelectedCoupon(selectedCoupon ?? null);

    };
    const calculateDiscount = () => {
        if (!selectedCoupon) return 0;

        if (selectedCoupon.type === '정액제') {
            return (selectedCoupon as FixedAmountCoupon).amount ?? 0;
        } else if (selectedCoupon.type === '정률제') {
            return (mockData.productPrice * (selectedCoupon as PercentageCoupon).percentage) / 100;
        }

        return 0;
    };
    const calculateTotalPrice = () => {
        const discount = calculateDiscount() ?? 0;
        return mockData.productPrice - discount + mockData.deliveryFee;
    };

    return (
        <div className="flex items-start gap-4 justify-center tracking-tighter text-sm">
            <div className="flex flex-col gap-4">
                <CardBox.Card className="w-[600px] gap-3">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>주문 상품 정보</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex space-y-1.5 gap-4">
                                    <img
                                        src={'/logo.webp'}
                                        alt={'logo'}
                                        width={100}
                                        height={100}
                                    ></img>
                                    <div>
                                        <Label htmlFor="iPhone">{mockData.products[0].name}</Label>
                                        <p>(필수) 색상: Space Gray - 1개</p>
                                        <p>{mockData.products[0].price}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardBox.CardContent>
                </CardBox.Card>
                <CardBox.Card className="w-[600px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>주문자 정보</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex space-y-1.5 gap-4 justify-between">
                                    <div>
                                        <Label htmlFor="name">홍길동</Label>
                                        <p>01012345678</p>
                                        <p>pig123@naver.com</p>
                                    </div>
                                    <div>
                                        <button>수정</button>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1.5"></div>
                            </div>
                        </form>
                    </CardBox.CardContent>
                </CardBox.Card>
                <CardBox.Card className="w-[600px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>배송 정보</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="name">홍길동</Label>
                                    <p>01012345678</p>
                                    <p>서울특별시 서대문구 성산로7길 89-8 (연희동)</p>
                                    <p>주식회사 아임웹</p>
                                    <p>01012345678</p>
                                </div>
                            </div>
                        </form>
                    </CardBox.CardContent>
                </CardBox.Card>
                <CardBox.Card className="w-[600px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>쿠폰/포인트</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 gap-4">
                                    <label htmlFor="Coupon">쿠폰</label>
                                    <SelectBox.Select
                                        onValueChange={(value) =>
                                            handleCouponSelect({
                                                target: { value },
                                            } as React.ChangeEvent<HTMLSelectElement>)
                                        }
                                    >
                                        <SelectBox.SelectTrigger id="framework">
                                            <SelectBox.SelectValue placeholder="쿠폰선택" />
                                        </SelectBox.SelectTrigger>
                                        <SelectBox.SelectContent>
                                            {mockData.coupons.map((coupon, index) => (
                                                <SelectBox.SelectItem
                                                    key={index}
                                                    value={coupon.description}
                                                >
                                                    {coupon.description}
                                                </SelectBox.SelectItem>
                                            ))}
                                        </SelectBox.SelectContent>
                                    </SelectBox.Select>
                                    <label htmlFor="CouponNumber">쿠폰 번호</label>
                                    <input
                                        type="text"
                                        id="CouponNumber"
                                        placeholder="Coupon Number"
                                    />
                                    <label htmlFor="Point">포인트 사용</label>
                                    <input type="text" id="Point" placeholder="Coupon Point" />
                                </div>
                                <div className="flex flex-col space-y-1.5"></div>
                            </div>
                        </form>
                    </CardBox.CardContent>
                    <CardBox.CardFooter className="grid place-items-start">
                        <p>보유 포인트: 2,300</p>
                        <p>5,000 포인트 이상 보유 및 10,000원 이상 구매시 사용 가능</p>
                    </CardBox.CardFooter>
                </CardBox.Card>
            </div>

            <div className="flex flex-col gap-4">
                <CardBox.Card className="w-[300px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>최종 결제금액</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1">
                                    <div className="flex w-full justify-between">
                                        <p>상품 가격</p>
                                        <p>18,000원</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>쿠폰 할인</p>
                                        <p>-{calculateDiscount()}원</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>포인트 사용</p>
                                        <p>-0원</p>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p>배송비</p>
                                        <p>+2,500원</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ma-auto my-4 flex w-full items-center justify-evenly bg-stone-400 flex-grow h-px opacity-30"></div>
                            <div className="flex w-full justify-between">
                                <p>총 결제금액</p>
                                <p>{calculateTotalPrice()}원</p>
                            </div>
                        </form>
                    </CardBox.CardContent>
                    <CardBox.CardFooter className="bg-gray-50 p-4 pl-6">
                        <div>
                            <p>700 포인트 적립예정</p>
                        </div>
                    </CardBox.CardFooter>
                </CardBox.Card>
                <CardBox.Card className="w-[300px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>결제 방법</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="option" />
                                        <span>신용카드</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="option" />
                                        <span>가상계좌</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="option" />
                                        <span>무통장 입금</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="option" />
                                        <span>핸드폰 결제</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="option" />
                                        <span>카카오페이</span>
                                    </label>
                                </div>

                                <SelectBox.Select>
                                    <SelectBox.SelectTrigger id="framework">
                                        <SelectBox.SelectValue placeholder="Select" />
                                    </SelectBox.SelectTrigger>
                                    <SelectBox.SelectContent position="popper">
                                        <SelectBox.SelectItem value="next">
                                            Next.js
                                        </SelectBox.SelectItem>
                                        <SelectBox.SelectItem value="sveltekit">
                                            SvelteKit
                                        </SelectBox.SelectItem>
                                        <SelectBox.SelectItem value="astro">
                                            Astro
                                        </SelectBox.SelectItem>
                                        <SelectBox.SelectItem value="nuxt">
                                            Nuxt.js
                                        </SelectBox.SelectItem>
                                    </SelectBox.SelectContent>
                                </SelectBox.Select>
                                <Input
                                    id="DepositorName"
                                    placeholder="입금자명 (미입력시 주문자명)"
                                />
                                <p className="text-xs">
                                    주문 후 6시간 동안 미입금시 자동 취소됩니다
                                </p>
                            </div>
                        </form>
                        <div className="ma-auto mt-6 flex w-full items-center justify-evenly bg-stone-400 flex-grow h-px opacity-30"></div>
                    </CardBox.CardContent>
                    <CardBox.CardFooter className="flex space-x-2 ">
                        <input type="checkbox" name="option" />
                        <span>현금영수증 신청</span>
                    </CardBox.CardFooter>
                </CardBox.Card>
                <CardBox.Card className="w-[300px]">
                    <CardBox.CardHeader>
                        <CardBox.CardTitle>전체 동의</CardBox.CardTitle>
                    </CardBox.CardHeader>
                    <CardBox.CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex space-x-2">
                                    <input type="checkbox" name="option" />
                                    <span>구매조건 확인 및 결제진행에 동의</span>
                                </div>
                            </div>
                        </form>
                    </CardBox.CardContent>
                    <CardBox.CardFooter className="bg-blue-500 p-4 grid place-items-center">
                        <div className="text-white">결제하기</div>
                    </CardBox.CardFooter>
                </CardBox.Card>
            </div>
        </div>
    );
}
