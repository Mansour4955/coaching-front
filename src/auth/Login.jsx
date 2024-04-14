import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useForm, Controller } from "react-hook-form";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  

 

  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-screen grid place-items-center bg-gray-50">
      <Card color="transparent" shadow={true} className="p-7 bg-white">
        <Typography variant="h4" color="blue-gray">
          Créer Votre Compte
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Saisie vos informations..
        </Typography>
        <br />
        <form
          className="mb-4 w-[500px] grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          
          <div>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "l'email est obligatoire",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Adresse e-mail invalide",
                },
              }}
              render={({ field }) => (
                <Input
                  type="email"
                  size="lg"
                  {...field}
                  label="Email ID"
                  error={Boolean(errors?.email?.message)}
                />
              )}
            />
            {errors?.email?.message && (
              <span className="error-text">{errors?.email?.message}</span>
            )}
          </div>
          
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Veuillez entrer votre mot de passe",
                
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Password"
                  error={Boolean(errors?.password?.message)}
                />
              )}
            />
            {errors?.password?.message && (
              <span className="error-text">{errors?.password?.message}</span>
            )}
          </div>
          
          <Link to="/resetpass" className="col-span-2 grid grid-cols-2 gap-3">
          
            <Button type="reset" variant="outlined" onClick={() => reset()}>
              mot de passe oublié
            </Button>
            <Button type="submit">Se connecter</Button>
            
          </Link>
          
        </form>
      </Card>
    </div>
  );
};


export default Login