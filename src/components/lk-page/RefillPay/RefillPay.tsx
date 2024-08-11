'use client'
import styles from './RefillPay.module.scss'
import cn from "classnames";
import React, {useState} from "react";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {useWalletInfo} from "@/api/wallet/useWalletInfo";
import {useDepositToWalletMutation} from "@/api/wallet/useDepositToWalletMutation";
import {useConvertCurrencyMutation} from "@/api/wallet/useConvertCurrencyMutation";

const validationSchema = Yup.object({
    amount: Yup.number().max(100001, 'no more than 10,000 at a time'),
});
type WalletValue = {
    amount: number;
}
export default function RefillPay() {
    const [select, setSelect] = useState<'USD' | 'Coin'>('USD')
    const [errorMessage, setErrorMessage] = useState('')
    const {data: walletInfo} = useWalletInfo()
    const {mutate: depositWallet, isPending} = useDepositToWalletMutation()
    const {mutate: convertWallet} = useConvertCurrencyMutation()
    
    const initialValues: WalletValue = {
        amount: 0,
    }
    
    const handleSubmit = (values: WalletValue, {resetForm}: FormikHelpers<WalletValue>) => {
        if(values.amount === 0) return
        if (select === 'USD') {
            const currentValues = {
                currency: select,
                amount: values.amount
            }
            depositWallet(currentValues, {
                onSuccess: () => {
                    resetForm();
                    setErrorMessage('')
                },
                onError: (error: Error) => {
                    setErrorMessage(error.message)
                }
            })
        }
        if (select === 'Coin') {
            const currentValues = {
                fromCurrency: 'USD' as "USD",
                toCurrency: select,
                amount: values.amount
            }
            convertWallet(currentValues, {
                onSuccess: () => {
                    resetForm();
                    setErrorMessage('')
                    
                },
                onError: (error: Error) => {
                    setErrorMessage(error.message)
                }
            })
        }
    }
    return (
        <div className={styles.refill}>
            <div className={styles.title}>Top up your account</div>
            <div className={styles.wallet}>
                <div className={styles.text}>Your wallet</div>
                <div className={styles.walletInfo}>
                    <div>USD: {walletInfo?.walletUSD.toFixed(2)}C</div>
                    <div>COIN: {walletInfo?.walletCoin.toFixed(2)}$</div>
                </div>
            </div>
            <div className={styles.text}>select an account to top up</div>
            <div className={styles.paymentToggle}>
                <div className={cn(styles.paymentItem, select === 'USD' && styles.active)}>
                    <button onClick={() => setSelect('USD')}>
                        $
                    </button>
                </div>
                <div className={cn(styles.paymentItem, select === 'Coin' && styles.active)}>
                    <button onClick={() => setSelect('Coin')}>
                        Coin
                    </button>
                </div>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className={styles.form}>
                    {errorMessage && (
                        <div className={styles.error}> {errorMessage}</div>
                    )}
                    {select === 'Coin' && (
                        <div>Coins are bought for $</div>
                    )}
                    <Input name={'amount'} placeholder={'enter number'} type={'number'}/>
                    <Button disabled={isPending} type={'submit'} className={styles.btn}>Top up</Button>
                </Form>
            </Formik>
        </div>
    );
}
