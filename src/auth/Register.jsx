import React from 'react'
import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    unregister,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const domain = watch("domain");

  // * Remove from FORM
  useEffect(() => {
    if (domain !== "others") {
      unregister("otherdomainname");
    }
  }, [domain, unregister]);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-screen grid place-items-center bg-white_color" >
      <Card color="transparent"  className="p-7 bg-white shadow-lg">
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
              name="Username"
              rules={{
                required: "le nom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Nom"
                  error={Boolean(errors?.Username?.message)}
                />
              )}
            />
            {errors?.Username?.message && (
              <span className="error-text">{errors?.Username?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="Usersecname"
              rules={{
                required: "le prenom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Minimum 3 caractères",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Prenom"
                  error={Boolean(errors?.Usersecname?.message)}
                />
              )}
            />
            {errors?.Usersecname?.message && (
              <span className="error-text">{errors?.Usersecname?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "L'email est obligatoire",
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
                  label="E-mail"
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
              name="domain"
              control={control}
              rules={{
                required: "le Domain est obligatoire",
              }}
              render={({ field }) => (
                <Select
                  label="Domain d'expretise"
                  {...field}
                  error={Boolean(errors?.domain?.message)}
                >
                  
                  <Option value="sport">Domaine sportif</Option>
  <Option value="developpement_personnel">Développement personnel</Option>
  <Option value="relations_psychologie">Relations et psychologie</Option>
  <Option value="carriere_et_entreprenariat">Carrière et entrepreneuriat</Option>
  <Option value="bien_etre">Bien-être</Option>
  <Option value="sante_et_nutrition">Santé et nutrition</Option>
  <Option value="relations_familiales">Relations familiales</Option>
  <Option value="education_et_formation">Éducation et formation</Option>
  <Option value="finance_et_investissement">Finance et investissement</Option>
  <Option value="developpement_personnel">développement personnel</Option>
  <Option value="creativite_et_innovation">Créativité et innovation</Option>
  <Option value="motivation_et_productivite">Motivation et productivité</Option>
                  <Option value="others">Autres</Option>
                </Select>
              )}
            />
            {errors?.domain?.message && (
              <span className="error-text">{errors?.domain?.message}</span>
            )}
          </div>
          {domain === "others" && (
            <div>
              <Controller
                name="otherdomainname"
                control={control}
                rules={{
                  required: "le domaine est obligatoire",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    label="Type Here"
                    error={Boolean(errors?.otherdomainname?.message)}
                  />
                )}
              />
              {errors?.otherdomainname?.message && (
                <span className="error-text">
                  {errors?.otherdomainname?.message}
                </span>
              )}
            </div>
          )}
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Veuillez entrer un mot de passe",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message: "Le mot de passe doit contenir au moins 8 caractères, y compris au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi #$@!%&*?",
                },
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Mot de passe"
                  error={Boolean(errors?.password?.message)}
                />
              )}
            />
            {errors?.password?.message && (
              <span className="error-text">{errors?.password?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="confirmpassword"
              control={control}
              rules={{
                required: "ce champ est obligatoire",
                validate: (value) =>
                  getValues("password") === value || "Les mots de passe ne correspondent pas",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Resaisir le mot de passe"
                  error={Boolean(errors?.confirmpassword?.message)}
                />
              )}
            />
            {errors?.confirmpassword?.message && (
              <span className="error-text">
                {errors?.confirmpassword?.message}
              </span>
            )}
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <Button   type="reset" variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
            <Button  className="bg-main_color" type="submit">Creér le Compte</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};


export default Register