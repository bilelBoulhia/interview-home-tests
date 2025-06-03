'use client'




import {useAuth} from "@/app/_hooks/useAuth";
import {useForm} from "react-hook-form";
import {Button} from "@/app/_components/ui/button";
import {CopyField} from "@/app/_components/ui/copy-field";
import Divider from "@/app/_components/ui/divider";

export default function Page() {
    const { login } = useAuth()

    const {register,handleSubmit,formState:{errors},reset
    } = useForm({defaultValues: {username: "", password: ""}});

    const onSubmit = async (data) => {
        await login(data.username, data.password)
    }

    return (
        <div className="min-h-screen flex flex-col justify-center md:flex-row">
            <div className="w-full md:w-1/2 flex  flex-col p-8 md:p-16 bg-[var(--color-background)]">
                <div className="mb-12">
                    <div className="flex items-center gap-2">
                        <IceCreamCone className="h-6 w-6 text-[var(--color-primary)]"/>
                        <span className="font-bold text-xl">apps</span>
                    </div>
                </div>
                <div className="flex-1  flex flex-col justify-center max-w-md mx-auto w-full">
                    <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--color-border)]"></div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium">
                                username
                            </label>
                            <input
                                {...register("username", {
                                    required: "username required",
                                })}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="example"

                                autoComplete="username"
                                className="w-full"
                            />
                            {errors.username &&
                                <p className="text-[var(--color-error)] mt-1 text-sm">{errors.username.message}</p>}
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                            </div>
                            <input
                                {...register("password", {
                                    required: "password required"
                                })}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"

                                autoComplete="current-password"
                                className="w-full"
                            />
                            {errors.password &&
                                <p className="text-[var(--color-error)] mt-1 text-sm">{errors.password.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full mt-3 py-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]">
                            Sign In
                        </Button>


                        <div
                            className="mt-4 p-4 rounded-xl bg-[var(--color-muted-bg)] text-sm text-[var(--color-muted)]">
                            <p className="italic mb-2 text-center">
                                * Use the following credentials for demo login:
                            </p>
                            <div className="space-y-2 ">
                                <CopyField label="Username" value={'mor_2314'}/>
                                <CopyField label="Password" value={'83r5^_'}/>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <Divider/>
            <div
                className="hidden md:flex w-1/2 bg-black p-16 items-center justify-center relative overflow-hidden">
                <div className="relative z-10 max-w-lg">
                    <div className="text-8xl text-gray-700 mb-4"></div>
                    <div className="text-2xl md:text-3xl font-medium text-white mb-6">
                        Simple demo app
                        <span className="block mt-4">
                            as home assigment test :)
                        </span>
                    </div>

                    <div className="flex items-center mt-8">
                        <div className="ml-4">
                            <p>by billel </p>
                        </div>

                    </div>
                </div>
                <div
                    className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#121212] to-[#0f172a] opacity-90"></div>
                <div
                    className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--color-primary)] blur-3xl opacity-20"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[var(--color-secondary)] blur-3xl opacity-20"></div>
            </div>
        </div>


    )
}
