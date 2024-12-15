/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRegister from "@/hooks/useRegister";

import image from "@/assets/Inscription.jpg";
import { Link } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit avoir au moins 3 caractères."),
  email: z.string().email("Adresse email invalide."),
  password: z
    .string()
    .min(5, "Le mot de passe doit contenir au moins 6 caractères."),
});

const RegisterForm = () => {
  const { handleRegister, loading, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    handleRegister(data);
    console.log(data);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Image - côté droit */}
      <div className=" h-full w-1/2 hidden lg:block">
        <img src={image} alt="" className="object-cover h-full w-full" />
      </div>
      {/* Formulaire - côté gauche */}
      <div className="w-full lg:w-1/2 p-2 md:p-8 flex justify-center items-center flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white rounded-lg shadow-lg w-full lg:w-[500px] p-5"
        >
          {/* Champ Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <Input
              {...register("username")}
              placeholder="Votre nom d'utilisateur"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Champ Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              {...register("email")}
              placeholder="exemple@gmail.com"
              className=" border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Champ Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="******"
              className=" border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Bouton Submit */}
          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* Connecte */}
          <div>
            <p className="text-center font-normal">
              Vous avez deja un compte ?{" "}
              <Link to="/login" className="text-purple-500 underline">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
