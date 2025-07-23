import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, type RegisterData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChartGantt, UserPlus } from "lucide-react";

export default function Register() {
  const { register: registerUser, registerError, isRegisterLoading } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    registerUser(data, {
      onSuccess: () => {
        toast({
          title: "Conta criada com sucesso!",
          description: "Redirecionando para o dashboard...",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro no cadastro",
          description: error.message || "Erro ao criar conta",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-xl flex items-center justify-center mb-6">
            <ChartGantt className="text-white h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Registre-se para começar a gerenciar seus projetos
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome completo
              </Label>
              <div className="mt-1">
                <Input
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition duration-150"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition duration-150"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="mt-1">
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition duration-150"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar senha
              </Label>
              <div className="mt-1">
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition duration-150"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isRegisterLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 shadow-sm"
              >
                {isRegisterLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                Criar Conta
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">Já tem uma conta? </span>
              <Link
                href="/"
                className="text-sm font-medium text-primary hover:text-primary/80 transition duration-150"
              >
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
