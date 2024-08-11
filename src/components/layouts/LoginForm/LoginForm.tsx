'use client'
import styles from './LoginForm.module.scss'
import {Form, Formik, FormikHelpers} from "formik";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import * as Yup from 'yup';
import {useLoginMutation} from "@/api/user/useLoginMutations";
import {useRouter} from "next/navigation";
import {useState} from "react";

const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат электронной почты').required('Электронная почта обязательна'),
    password: Yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
});
export type AuthFormValues = {
    email: string;
    password: string;
}
type Props = {
    backUrl?: string[]
}

export default function LoginForm({backUrl}: Props) {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const {mutate: register, isPending} = useLoginMutation()
    
    const initialValues: AuthFormValues = {
        email: '',
        password: ''
    }
    const handleSubmit = (values: AuthFormValues, {setSubmitting, resetForm}: FormikHelpers<AuthFormValues>) => {
        register(values, {
            onSuccess: () => {
                resetForm();
                const returnedUrl = backUrl?.join('/')
                router.push(returnedUrl ? `/${returnedUrl}` : '/');
            },
            onError: (error: Error) => {
                setErrorMessage(error.message)
            }
        });
    }
    return (<section className={styles.auth}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className={styles.form}>
                <div className={styles.title}>Login</div>
                {errorMessage && (
                    <div className={styles.error}> {errorMessage}</div>
                )}
                <Input name={'email'} label={'Email'} placeholder={'example@popnuts.com'}/>
                <Input name={'password'} label={'Password'} placeholder={'*********'} type={'password'}/>
                <Button disabled={isPending} type={'submit'} className={styles.btn}>Login</Button>
            </Form>
        </Formik>
    
    </section>);
}
