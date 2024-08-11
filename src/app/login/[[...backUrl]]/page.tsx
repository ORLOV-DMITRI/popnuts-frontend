import LoginForm from "@/components/layouts/LoginForm/LoginForm";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login",

};
export default function LoginPage({params}: {params: {backUrl: string[]}}) {
    return <LoginForm backUrl={params.backUrl}/>
}
