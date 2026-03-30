import LoginForm from "@/components/modules/Auth/LoginForm";

interface LoginParams {
  searchParams: Promise<{ redirect?: string }>;
}

const LoginPage = async ({ searchParams }: LoginParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <LoginForm redirectPath={redirectPath}/>
    </div>
  )
}

export default LoginPage